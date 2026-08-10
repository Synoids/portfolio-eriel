import { supabaseAdmin } from '@/lib/supabase';
import { InfrastructureManager } from '../InfrastructureManager';
import { ActionResult, BulkActionResult, ActionContext } from './types';
import { InfrastructureProject } from '../types';
import { Logger } from '../logging/Logger';
import { ConsoleLogger } from '../logging/ConsoleLogger';
import { RetryPolicy } from '../retry/RetryPolicy';
import { NoRetryPolicy } from '../retry/NoRetryPolicy';

export class InfrastructureActionService {
  private manager: InfrastructureManager;
  private logger: Logger;
  private retryPolicy: RetryPolicy;

  constructor(
    logger: Logger = new ConsoleLogger(),
    retryPolicy: RetryPolicy = new NoRetryPolicy()
  ) {
    this.logger = logger;
    this.retryPolicy = retryPolicy;
    // Inject logger into manager
    this.manager = new InfrastructureManager(this.logger);
  }

  /**
   * Runs a health check for a single project by its Registry ID.
   */
  public async runHealthCheck(
    registryId: string, 
    context?: ActionContext, 
    signal?: AbortSignal
  ): Promise<ActionResult> {
    const startTime = performance.now();
    let checkedAt = new Date();
    
    const fallbackResult: ActionResult = {
      success: false,
      projectId: registryId,
      projectName: 'Unknown',
      provider: 'Supabase',
      action: 'HealthCheck',
      message: 'Failed to initiate check',
      duration: 0,
      checkedAt,
    };

    try {
      const { data: reg, error } = await supabaseAdmin
        .from('project_credentials')
        .select('*')
        .eq('id', registryId)
        .single();

      if (error || !reg) {
        return {
          ...fallbackResult,
          error: error?.message || 'Project not found in registry',
        };
      }

      fallbackResult.projectName = reg.project_name;
      fallbackResult.provider = reg.provider;

      const project: InfrastructureProject = {
        id: reg.id,
        projectName: reg.project_name,
        provider: reg.provider,
        environment: reg.environment,
        projectUrl: reg.project_url,
        projectId: reg.project_id,
        region: reg.region,
        providerAccountId: reg.provider_account_id,
        anonKey: reg.anon_key_encrypted || null,
        serviceRoleKey: null,
      };

      // In future: we can implement retry loop here using this.retryPolicy
      // Currently NoRetryPolicy will just execute once
      
      const healthResult = await this.manager.runAndSaveHealthCheck(project, signal);
      
      const duration = Math.round(performance.now() - startTime);
      checkedAt = new Date();

      const actionResult: ActionResult = {
        success: healthResult.success,
        projectId: registryId,
        projectName: project.projectName,
        provider: project.provider,
        action: 'HealthCheck',
        message: healthResult.message,
        duration,
        checkedAt,
        ...(healthResult.debug?.error && { error: healthResult.debug.error })
      };

      this.logAction(actionResult, context);
      return actionResult;
    } catch (error: any) {
      const duration = Math.round(performance.now() - startTime);
      const errResult = {
        ...fallbackResult,
        message: 'Unexpected error during action',
        duration,
        error: error.message || String(error),
      };
      this.logAction(errResult, context);
      return errResult;
    }
  }

  public async runHealthCheckForProjects(
    registryIds: string[], 
    context?: ActionContext, 
    signal?: AbortSignal
  ): Promise<BulkActionResult> {
    const startTime = performance.now();
    const results: ActionResult[] = [];
    let successCount = 0;
    let failedCount = 0;

    for (const id of registryIds) {
      if (signal?.aborted) {
        this.logger.warn(`Bulk check aborted before project ${id}`);
        break; // Stop loop if explicitly aborted
      }
      
      const res = await this.runHealthCheck(id, context, signal);
      results.push(res);
      if (res.success) successCount++;
      else failedCount++;
    }

    return {
      total: registryIds.length,
      success: successCount,
      failed: failedCount,
      duration: Math.round(performance.now() - startTime),
      results,
    };
  }

  public async runHealthCheckForAll(
    context?: ActionContext, 
    signal?: AbortSignal
  ): Promise<BulkActionResult> {
    const { data: registry, error } = await supabaseAdmin
      .from('project_credentials')
      .select('id');

    if (error || !registry) {
      this.logger.error('Failed to fetch registry for bulk action', error);
      return { total: 0, success: 0, failed: 0, duration: 0, results: [] };
    }

    const ids = registry.map(r => r.id);
    return this.runHealthCheckForProjects(ids, context, signal);
  }

  /**
   * Orchestrates a wake operation for a single project by its Registry ID.
   */
  public async runWake(
    registryId: string,
    context?: ActionContext,
    signal?: AbortSignal
  ): Promise<ActionResult> {
    const startTime = performance.now();
    let checkedAt = new Date();
    
    const fallbackResult: ActionResult = {
      success: false,
      projectId: registryId,
      projectName: 'Unknown',
      provider: 'Supabase',
      action: 'Wake',
      message: 'Failed to initiate wake',
      duration: 0,
      checkedAt,
    };

    try {
      const { data: reg, error } = await supabaseAdmin
        .from('project_credentials')
        .select('*')
        .eq('id', registryId)
        .single();

      if (error || !reg) {
        return {
          ...fallbackResult,
          error: error?.message || 'Project not found in registry',
        };
      }

      fallbackResult.projectName = reg.project_name;
      fallbackResult.provider = reg.provider;

      const project: InfrastructureProject = {
        id: reg.id,
        projectName: reg.project_name,
        provider: reg.provider,
        environment: reg.environment,
        projectUrl: reg.project_url,
        projectId: reg.project_id,
        region: reg.region,
        providerAccountId: reg.provider_account_id,
        anonKey: reg.anon_key_encrypted || null,
        serviceRoleKey: null,
      };

      const wakeResult = await this.manager.runWake(project, signal);
      
      const duration = Math.round(performance.now() - startTime);
      checkedAt = new Date();

      const actionResult: ActionResult = {
        success: wakeResult.success,
        projectId: registryId,
        projectName: project.projectName,
        provider: project.provider,
        action: 'Wake',
        message: wakeResult.message,
        duration,
        checkedAt,
        ...(wakeResult.debug?.error ? { error: String(wakeResult.debug.error) } : {})
      };

      this.logAction(actionResult, context);
      return actionResult;
    } catch (error: any) {
      const duration = Math.round(performance.now() - startTime);
      const errResult = {
        ...fallbackResult,
        message: 'Unexpected error during wake action',
        duration,
        error: error.message || String(error),
      };
      this.logAction(errResult, context);
      return errResult;
    }
  }

  public async runWakeForProjects(
    registryIds: string[],
    context?: ActionContext,
    signal?: AbortSignal
  ): Promise<BulkActionResult> {
    const startTime = performance.now();
    const results: ActionResult[] = [];
    let successCount = 0;
    let failedCount = 0;

    for (const id of registryIds) {
      if (signal?.aborted) {
        this.logger.warn(`Bulk wake aborted before project ${id}`);
        break; // Stop loop if explicitly aborted
      }
      
      const res = await this.runWake(id, context, signal);
      results.push(res);
      if (res.success) successCount++;
      else failedCount++;
    }

    return {
      total: registryIds.length,
      success: successCount,
      failed: failedCount,
      duration: Math.round(performance.now() - startTime),
      results,
    };
  }

  public async runWakeForAll(
    context?: ActionContext,
    signal?: AbortSignal
  ): Promise<BulkActionResult> {
    const { data: registry, error } = await supabaseAdmin
      .from('project_credentials')
      .select('id');

    if (error || !registry) {
      this.logger.error('Failed to fetch registry for bulk wake action', error);
      return { total: 0, success: 0, failed: 0, duration: 0, results: [] };
    }

    const ids = registry.map(r => r.id);
    return this.runWakeForProjects(ids, context, signal);
  }

  private logAction(result: ActionResult, context?: ActionContext) {
    const contextStr = context ? ` [Trigger: ${context.trigger}]` : '';
    const logStr = `[Action Log]${contextStr} ${result.action} | Project: ${result.projectName} | Provider: ${result.provider} | Success: ${result.success} | Duration: ${result.duration}ms | Msg: ${result.message}`;
    
    if (result.success) {
      this.logger.info(logStr);
    } else {
      this.logger.warn(logStr + (result.error ? ` | Err: ${result.error}` : ''));
    }
  }
}
