var server_port, socket_host, server_host;
var supa_url, supa_key, image_url, image_name, project_id;

var region, max_instances, cpu, memory, timeout;

// Get server port from environment variables
if (process.env.PROD_SERVER_PORT && process.env.PROD_SOCKET_HOST && process.env.PROD_SERVER_HOST) {
  server_port = process.env.PROD_SERVER_PORT;
  socket_host = process.env.PROD_SOCKET_HOST;
  server_host = process.env.PROD_SERVER_HOST;
} else {
  throw new Error('Missing PROD_SERVER_PORT, PROD_SOCKET_HOST or PROD_SERVER_HOST environment variable');
}

// Get Supabase URL and Key from environment variables
if (process.env.PROD_SUPA_URL && process.env.PROD_SUPA_KEY) {
  supa_url = process.env.PROD_SUPA_URL;
  supa_key = process.env.PROD_SUPA_KEY;
} else {
  throw new Error('Missing PROD_SUPA_URL or PROD_SUPA_KEY environment variable');
}

// Get machine specific variables from environment variables
if (
  process.env.PROJECT_ID &&
  process.env.REGION &&
  process.env.MAX_INSTANCES &&
  process.env.CPU &&
  process.env.MEMORY &&
  process.env.TIMEOUT
) {
  project_id = process.env.PROJECT_ID;
  region = process.env.REGION;
  max_instances = process.env.MAX_INSTANCES;
  cpu = process.env.CPU;
  memory = process.env.MEMORY;
  timeout = process.env.TIMEOUT;
} else {
  throw new Error('Missing PROJECT_ID, REGION, MAX_INSTANCES, CPU, MEMORY or TIMEOUT environment variable');
}

if (process.env.IMAGE_URL) {
  image_url = process.env.IMAGE_URL;
} else {
  throw new Error('Missing IMAGE_URL environment variable');
}

// Get package name and version from package.json and configure it as Docker image name
const package = require('./package.json');
if (!package.name || !package.version) {
  throw new Error('Missing package name or version');
} else {
  image_name = `${image_url}/${package.name}:${package.version}`;
}

// Go into Sudo mode
function goSudo() {
  const { spawnSync } = require('child_process');
  const result = spawnSync('sudo', ['echo', 'sudo'], { stdio: 'ignore', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

// Check if Docker is installed
function checkDocker() {
  const { spawnSync } = require('child_process');
  const result = spawnSync('sudo docker', ['version'], { stdio: 'ignore', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

// Check if Gcloud is installed
function checkGcloud() {
  const { spawnSync } = require('child_process');
  const result = spawnSync('sudo gcloud', ['version'], { stdio: 'ignore', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

// Build Docker image
function build() {
  const { spawnSync } = require('child_process');
  const args = [
    'build',
    '-t',
    image_name,
    '--build-arg',
    'SERVER_PORT=' + server_port,
    '--build-arg',
    'SOCKET_HOST=' + socket_host,
    '--build-arg',
    'SERVER_HOST=' + server_host,
    '--build-arg',
    'SUPA_URL=' + supa_url,
    '--build-arg',
    'SUPA_KEY=' + supa_key,
    '.',
  ];
  const result = spawnSync('sudo docker', args, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

// Push Docker image to Google Container Registry
function push() {
  const { spawnSync } = require('child_process');
  const args = ['push', image_name];
  const result = spawnSync('sudo docker', args, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

// Deploy Docker image to Google Cloud Run
function deploy() {
  const { spawnSync } = require('child_process');
  const args = [
    'run',
    'deploy',
    package.name,
    '--image',
    image_name,
    '--platform',
    'managed',
    '--region',
    region,
    '--max-instances',
    max_instances,
    '--cpu',
    cpu,
    '--memory',
    memory,
    '--timeout',
    timeout,
    '--project',
    project_id,
  ];
  const result = spawnSync('sudo gcloud', args, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

// Optionally delete all old images from Google Container Registry
function deleteGoogleContainerRegistryImages() {
  const { spawnSync } = require('child_process');
  const args = [
    'container',
    'images',
    'list-tags',
    image_url + '/' + package.name,
    '--limit=999999',
    '--format=json',
    '--project',
    project_id,
  ];
  const result = spawnSync('sudo gcloud', args, { stdio: 'pipe', shell: true });
  if (result.status !== 0) {
    return false;
  }
  const images = JSON.parse(result.stdout.toString());
  for (const image of images) {
    const args = [
      'container',
      'images',
      'delete',
      image_url + '/' + package.name + ':' + image.tags[0],
      '--force-delete-tags',
      '--quiet',
      '--project',
      project_id,
    ];
    const result = spawnSync('sudo gcloud', args, { stdio: 'inherit', shell: true });
    if (result.status !== 0) {
      return false;
    }
  }
  return true;
}

// Delete unused GCR revisions
function deleteUnusedGCRRevisions() {
  const { spawnSync } = require('child_process');
  const args = [
    'run',
    'services',
    'list',
    '--platform=managed',
    '--region=' + region,
    '--project=' + project_id,
    '--format=json',
  ];
  const result = spawnSync('sudo gcloud', args, { stdio: 'pipe', shell: true });
  if (result.status !== 0) {
    return false;
  }
  const services = JSON.parse(result.stdout.toString());
  for (const service of services) {
    const args = [
      'run',
      'revisions',
      'list',
      service.metadata.name,
      '--platform=managed',
      '--region=' + region,
      '--project=' + project_id,
      '--format=json',
    ];
    const result = spawnSync('sudo gcloud', args, { stdio: 'pipe', shell: true });
    if (result.status !== 0) {
      return false;
    }
    const revisions = JSON.parse(result.stdout.toString());
    for (const revision of revisions) {
      if (revision.status.conditions[0].status === 'True') {
        continue;
      }
      const args = [
        'run',
        'revisions',
        'delete',
        revision.metadata.name,
        '--platform=managed',
        '--region=' + region,
        '--project=' + project_id,
        '--quiet',
      ];
      const result = spawnSync('sudo gcloud', args, { stdio: 'inherit', shell: true });
      if (result.status !== 0) {
        return false;
      }
    }
  }
  return true;
}

/*
  Main
*/

if (!goSudo()) {
  console.log('Cannot elevate privileges');
  process.exit(1);
}

if (!checkDocker()) {
  console.log('Docker is not installed');
  process.exit(1);
}

if (!checkGcloud()) {
  console.log('Gcloud is not installed');
  process.exit(1);
}

var build_result = build();
if (build_result) {
  console.log('Build successful');
} else {
  console.log('Build failed');
  process.exit(1);
}

var push_result = push();
if (push_result) {
  console.log('Push successful');
} else {
  console.log('Push failed');
  process.exit(1);
}

var deploy_result = deploy();
if (deploy_result) {
  console.log('Deploy successful');
} else {
  console.log('Deploy failed');
  process.exit(1);
}
