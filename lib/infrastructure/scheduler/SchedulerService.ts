import { InfrastructureActionService } from '../actions/InfrastructureActionService';
import { SchedulerLock } from './SchedulerLock';
import { InMemorySchedulerLock } from './InMemorySchedulerLock';
import { SchedulerRunResult } from './types';
import { InfrastructureConfig } from '../config';
import { ActionContext } from '../actions/types';
import { Logger } from '../logging/Logger';
import { ConsoleLogger } from '../logging/ConsoleLogger';

export class SchedulerService {
  private actionService: InfrastructureActionService;
  private lock: SchedulerLock;
  private logger: Logger;

  constructor(
    actionService: InfrastructureActionService = new InfrastructureActionService(),
    lock: SchedulerLock = new InMemorySchedulerLock(),
    logger: Logger = new ConsoleLogger()
  ) {
    this.actionService = actionService;
    this.lock = lock;
    this.logger = logger;
  }

  /**
   * Orchestrates a scheduled bulk health check for all projects.
   * Protects against duplicate executions using the SchedulerLock.
   */
  public async runHealthCheckSchedule(signal?: AbortSignal): Promise<SchedulerRunResult> {
    const lockKey = 'health-check:all';
    const startedAt = new Date();
    const startTimeMs = performance.now();

    if (!InfrastructureConfig.SCHEDULER_ENABLED) {
      return this.buildResult(false, startedAt, startTimeMs, {
        total: 0,
        successCount: 0,
        failedCount: 0,
        message: 'Scheduler is disabled in configuration.'
      });
    }

    const acquired = await this.lock.acquire(lockKey, InfrastructureConfig.SCHEDULER_LOCK_TIMEOUT_MS);
    if (!acquired) {
      this.logger.warn(`Scheduler lock '${lockKey}' is currently held. Skipping execution.`);
      return this.buildResult(false, startedAt, startTimeMs, {
        total: 0,
        successCount: 0,
        failedCount: 0,
        message: 'Scheduler is already running (lock held).'
      });
    }

    try {
      const context: ActionContext = {
        trigger: 'scheduler',
        startedAt,
        source: 'infrastructure-scheduler'
      };

      this.logger.info('Scheduler started: health-check:all');
      
      const bulkResult = await this.actionService.runHealthCheckForAll(context, signal);
      
      return this.buildResult(true, startedAt, startTimeMs, {
        total: bulkResult.total,
        successCount: bulkResult.success,
        failedCount: bulkResult.failed,
        message: 'Scheduled health check completed successfully.'
      });

    } catch (error: any) {
      this.logger.error('Unexpected error in SchedulerService:', error);
      return this.buildResult(false, startedAt, startTimeMs, {
        total: 0,
        successCount: 0,
        failedCount: 0,
        message: `Scheduler failed unexpectedly: ${error.message || String(error)}`
      });
    } finally {
      await this.lock.release(lockKey);
      this.logger.info(`Scheduler released lock: '${lockKey}'`);
    }
  }

  private buildResult(
    success: boolean, 
    startedAt: Date, 
    startTimeMs: number, 
    stats: { total: number, successCount: number, failedCount: number, message: string }
  ): SchedulerRunResult {
    return {
      success,
      startedAt,
      completedAt: new Date(),
      duration: Math.round(performance.now() - startTimeMs),
      action: 'health_check',
      total: stats.total,
      successCount: stats.successCount,
      failedCount: stats.failedCount,
      message: stats.message
    };
  }
}
