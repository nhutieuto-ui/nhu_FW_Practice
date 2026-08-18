import fs from 'fs';
import path from 'path';

// Cart data is persisted server-side per account (see cart-state-architecture notes),
// so tests sharing that account must not run concurrently across workers/files.
const LOCK_DIR = path.resolve(__dirname, '../../.locks');
// A lock older than this is assumed abandoned (e.g. worker killed on timeout) and is reclaimed automatically
const STALE_LOCK_MS = 45_000;

function lockFilePath(name: string): string {
  return path.join(LOCK_DIR, `${name}.lock`);
}

function removeIfStale(filePath: string): void {
  try {
    const { mtimeMs } = fs.statSync(filePath);
    if (Date.now() - mtimeMs > STALE_LOCK_MS) {
      fs.rmSync(filePath, { force: true });
    }
  } catch {
    // lock was already released by its owner between our check and now; nothing to do
  }
}

// Blocks until the named lock is free, then claims it for the caller
export async function acquireLock(name: string, timeoutMs = 60_000): Promise<void> {
  fs.mkdirSync(LOCK_DIR, { recursive: true });
  const filePath = lockFilePath(name);
  const start = Date.now();

  while (true) {
    try {
      fs.writeFileSync(filePath, String(process.pid), { flag: 'wx' });
      return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      removeIfStale(filePath);
      if (Date.now() - start > timeoutMs) {
        throw new Error(`Timed out waiting for lock "${name}"`);
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

// Releases the named lock so the next waiting test can proceed
export function releaseLock(name: string): void {
  const filePath = lockFilePath(name);
  fs.rmSync(filePath, { force: true });
}
