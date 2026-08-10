import { BaseProvider } from './providers/BaseProvider';
import { SupabaseProvider } from './providers/SupabaseProvider';
import { InfrastructureProject, HealthResult } from './types';
import { Provider } from '@/lib/constants';
import { SupabaseStateRepository } from './state/SupabaseStateRepository';
import { Logger } from './logging/Logger';
import { ConsoleLogger } from './logging/ConsoleLogger';

import { CredentialResolver } from './credentials/CredentialResolver';

type ProviderConstructor = new (project: InfrastructureProject, credentialResolver?: CredentialResolver) => BaseProvider;

const providerRegistry: Partial<Record<Provider, ProviderConstructor>> = {
  Supabase: SupabaseProvider,
};

export class InfrastructureManager {
  private logger: Logger;
  private credentialResolver: CredentialResolver;

  constructor(logger: Logger = new ConsoleLogger(), credentialResolver: CredentialResolver = new CredentialResolver()) {
    this.logger = logger;
    this.credentialResolver = credentialResolver;
  }

  /**
   * Retrieves the appropriate provider instance for a given project.
   */
  public get(project: InfrastructureProject): BaseProvider {
    const ProviderClass = providerRegistry[project.provider];
    
    if (!ProviderClass) {
      throw new Error(`Provider implementation not yet available for: ${project.provider}`);
    }

    return new ProviderClass(project, this.credentialResolver);
  }

  /**
   * Orchestrates the health check and immediately saves the result to the State Engine.
   */
  public async runAndSaveHealthCheck(project: InfrastructureProject, signal?: AbortSignal): Promise<HealthResult> {
    const provider = this.get(project);
    const result = await provider.healthCheck(signal);

    const stateRepository = new SupabaseStateRepository();
    
    if (project.projectId) {
      try {
        await Promise.all([
          stateRepository.saveCurrent(project.projectId, result, project.environment),
          stateRepository.saveHistory(project.projectId, result, project.environment)
        ]);
      } catch (err: any) {
        this.logger.error(`Failed to save state for ${project.projectName}`, err);
      }
    } else {
      this.logger.warn(`Cannot save state: projectId is null for ${project.projectName}`);
    }

    return result;
  }

  /**
   * Orchestrates the wake process for a given project.
   */
  public async runWake(project: InfrastructureProject, signal?: AbortSignal): Promise<import('./types').WakeResult> {
    const provider = this.get(project);
    
    // Check if the provider actually supports waking up
    if (!provider.capabilities.wake) {
      this.logger.warn(`Wake operation is not supported by provider: ${project.provider} for project: ${project.projectName}`);
      return {
        success: false,
        status: 'unsupported',
        projectId: project.projectId || 'unknown',
        message: `Provider ${project.provider} does not support wake operations.`,
        startedAt: new Date(),
        endedAt: new Date(),
        latency: undefined,
        provider: project.provider
      };
    }

    try {
      const result = await provider.wake(signal);
      return result;
    } catch (err: any) {
      this.logger.error(`Failed to execute wake for ${project.projectName}`, err);
      return {
        success: false,
        status: 'failed',
        projectId: project.projectId || 'unknown',
        message: err.message || 'Unexpected error during wake operation',
        startedAt: new Date(),
        endedAt: new Date(),
        latency: undefined,
        provider: project.provider,
        debug: { error: String(err) }
      };
    }
  }
}
