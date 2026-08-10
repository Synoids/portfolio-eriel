import { SchedulerLock } from './SchedulerLock';

interface LockEntry {
  acquiredAt: number;
  expiresAt: number;
}

/**
 * A simple in-memory implementation of a SchedulerLock.
 * NOTE: This is a process-local lock and is NOT safe for multi-instance (distributed) deployments.
 * It primarily prevents duplicate executions within the same Node.js process.
 */
export class InMemorySchedulerLock implements SchedulerLock {
  private locks = new Map<string, LockEntry>();

  async acquire(key: string, timeoutMs: number): Promise<boolean> {
    const now = Date.now();
    const existingLock = this.locks.get(key);

    if (existingLock) {
      // If the existing lock has expired, we can forcefully take it over
      if (now > existingLock.expiresAt) {
        this.locks.set(key, {
          acquiredAt: now,
          expiresAt: now + timeoutMs,
        });
        return true;
      }
      
      // The lock is still actively held
      return false;
    }

    // No lock exists, acquire it
    this.locks.set(key, {
      acquiredAt: now,
      expiresAt: now + timeoutMs,
    });
    return true;
  }

  async release(key: string): Promise<void> {
    this.locks.delete(key);
  }
}
