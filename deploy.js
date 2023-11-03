var supa_url, supa_key, image_url;

var region, max_instances, cpu, memory, timeout;

if (process.env.SUPA_URL && process.env.SUPA_KEY && process.env.IMAGE_URL) {
  supa_url = process.env.SUPA_URL;
  supa_key = process.env.SUPA_KEY;
  image_url = process.env.IMAGE_URL;
} else {
  throw new Error('Missing SUPA_URL, SUPA_KEY or IMAGE_URL environment variable');
}

if (process.env.REGION && process.env.MAX_INSTANCES && process.env.CPU && process.env.MEMORY && process.env.TIMEOUT) {
  region = process.env.REGION;
  max_instances = process.env.MAX_INSTANCES;
  cpu = process.env.CPU;
  memory = process.env.MEMORY;
  timeout = process.env.TIMEOUT;
} else {
  throw new Error('Missing REGION, MAX_INSTANCES, CPU, MEMORY or TIMEOUT environment variable');
}

function goSudo() {
  const { spawnSync } = require('child_process');
  const result = spawnSync('sudo', ['echo', 'sudo'], { stdio: 'ignore', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

function checkDocker() {
  const { spawnSync } = require('child_process');
  const result = spawnSync('sudo docker', ['version'], { stdio: 'ignore', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

function checkGcloud() {
  const { spawnSync } = require('child_process');
  const result = spawnSync('sudo gcloud', ['version'], { stdio: 'ignore', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

function build() {
  const { spawnSync } = require('child_process');
  const args = [
    'build',
    '-t',
    image_url,
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

function push() {
  const { spawnSync } = require('child_process');
  const args = ['push', image_url];
  const result = spawnSync('sudo docker', args, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

function deploy() {
  const { spawnSync } = require('child_process');
  const args = [
    'run',
    'deploy',
    'max-services',
    '--image',
    image_url,
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
    'zvyezda',
  ];
  const result = spawnSync('sudo gcloud', args, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    return false;
  }
  return true;
}

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
