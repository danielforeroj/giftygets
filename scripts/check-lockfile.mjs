import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const lockfilePath = resolve(process.cwd(), 'pnpm-lock.yaml');

if (!existsSync(lockfilePath)) {
  console.error('Missing pnpm-lock.yaml. Run `pnpm install` and commit the lockfile before building.');
  process.exit(1);
}

console.log('pnpm-lock.yaml found.');
