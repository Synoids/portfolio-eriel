export interface SchedulerLock {
  /**
   * Attempts to acquire a lock for a given key.
   * @param key The unique identifier for the lock (e.g. "health-check:all").
   * @param timeoutMs How long the lock is valid before it expires and can be acquired again.
   * @returns true if the lock was successfully acquired, false if it is currently held by another execution.
   */
  acquire(key: string, timeoutMs: number): Promise<boolean>;

  /**
   * Releases a previously acquired lock.
   * @param key The unique identifier for the lock.
   */
  release(key: string): Promise<void>;
}
