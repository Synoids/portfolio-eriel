export interface RetryPolicy {
  shouldRetry(attempt: number, error: any): boolean;
  getDelay(attempt: number): number;
}
