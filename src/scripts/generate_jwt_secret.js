/**
 * This script generates a JWT secret key and saves it to the .env file
 * inside the variable JWT_SECRET_KEY
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const colors = require('colors');

const envPath = path.join(__dirname, '..', '..', '.env');

const jwtSecret = crypto.randomBytes(64).toString('hex');

const envFile = fs.readFileSync(envPath, 'utf-8');
if (!envFile.includes('JWT_SECRET_KEY')) {
  console.error(colors.red('JWT_SECRET_KEY not found in .env file'));
  process.exit(1);
}
const newEnvFile = envFile.replace(/JWT_SECRET_KEY=.*/, `JWT_SECRET_KEY=${jwtSecret}`);
fs.writeFileSync(envPath, newEnvFile);

console.log(`JWT secret key written to ${envPath}`);
console.log(colors.yellow(jwtSecret));
