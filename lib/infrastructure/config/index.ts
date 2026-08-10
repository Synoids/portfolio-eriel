/**
 * Central configuration for the Infrastructure Engine.
 * All magic numbers and timeouts should be placed here.
 */
export const InfrastructureConfig = {
  HEALTH_TIMEOUT_MS: 10000,
  DEFAULT_BATCH_SIZE: 15,
  DEFAULT_CONCURRENCY: 1, // Sequential by default
  DEFAULT_REQUEST_TIMEOUT: 15000,
  DEFAULT_HISTORY_LIMIT: 10,
  
  // Scheduler Configuration
  SCHEDULER_ENABLED: true,
  SCHEDULER_LOCK_TIMEOUT_MS: 60000, // 1 minute default lock expiry

  // Wake Engine Configuration
  WAKE_ENABLED: process.env.WAKE_ENABLED === 'true', // Default: false
  WAKE_DRY_RUN: process.env.WAKE_DRY_RUN !== 'false', // Default: true (Safe)
  WAKE_REAL_TEST: process.env.WAKE_REAL_TEST === 'true', // Default: false
  WAKE_TEST_PROJECT_ID: process.env.WAKE_TEST_PROJECT_ID, // Only for 10.5 Real Test
};
