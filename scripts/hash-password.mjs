// Genera la sal y el hash PBKDF2-SHA256 de una contraseña para src/lib/auth.js
// Uso: node scripts/hash-password.mjs "nueva-contraseña"
import { pbkdf2Sync, randomBytes } from 'node:crypto';

const ITERATIONS = 310000;
const password = process.argv[2];
if (!password) {
  console.error('Uso: node scripts/hash-password.mjs "nueva-contraseña"');
  process.exit(1);
}
const salt = randomBytes(16).toString('hex');
const hash = pbkdf2Sync(password.trim(), Buffer.from(salt, 'hex'), ITERATIONS, 32, 'sha256').toString('hex');
console.log(JSON.stringify({ salt, hash }, null, 2));
