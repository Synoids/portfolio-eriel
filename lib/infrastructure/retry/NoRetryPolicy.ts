import { RetryPolicy } from './RetryPolicy';

/**
 * A retry policy that never retries.
 * Used as the default to maintain current behavior.
 */
export class NoRetryPolicy implements RetryPolicy {
  shouldRetry(attempt: number, error: any): boolean {
    return false;
  }

  getDelay(attempt: number): number {
    return 0;
  }
}
