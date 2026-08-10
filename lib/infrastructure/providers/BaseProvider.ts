import { InfrastructureProject, HealthResult } from '../types';
import { generateDashboardUrl } from '../utils/generateDashboardUrl';
import { measureLatency } from '../utils/measureLatency';
import { buildHealthResult } from '../utils/buildHealthResult';
import { HealthClassifier } from '../classification/HealthClassifier';

import { CredentialResolver } from '../credentials/CredentialResolver';

/**
 * Base abstract class representing a generic database/infrastructure provider.
 * Enforces the Health Check pipeline and shared utilities.
 */
export abstract class BaseProvider {
  protected project: InfrastructureProject;
  protected credentialResolver?: CredentialResolver;

  constructor(project: InfrastructureProject, credentialResolver?: CredentialResolver) {
    this.project = project;
    this.credentialResolver = credentialResolver;
  }

  /**
   * Generates the dashboard URL for the project.
   */
  public getDashboardUrl(): string | null {
    return generateDashboardUrl(this.project.provider, this.project.projectId);
  }

  /**
   * Validates if the project has the minimum required configuration.
   */
  public validateProject(): boolean {
    if (!this.project.projectUrl) return false;
    if (!this.project.provider) return false;
    return true;
  }

  /**
   * Orchestrates the health check pipeline.
   * Pipeline: validate -> getHealthEndpoint -> measureLatency -> classify -> buildHealthResult
   */
  public async healthCheck(signal?: AbortSignal): Promise<HealthResult> {
    if (!this.validateProject()) {
      return buildHealthResult({
        provider: this.project.provider,
        status: 'invalid',
        message: 'Invalid project configuration or missing URL',
      });
    }

    const endpoint = this.getHealthEndpoint();
    if (!endpoint) {
      return buildHealthResult({
        provider: this.project.provider,
        status: 'invalid',
        message: 'No health endpoint defined for this provider',
      });
    }

    const headers = await this.getHealthHeaders();
    const { response, latency, error } = await measureLatency(endpoint, signal, headers);
    
    // Delegate the interpretation to the external classifier
    const classifier = this.getClassifier();
    const classification = classifier.classify(response, error);

    return buildHealthResult({
      provider: this.project.provider,
      status: classification.status,
      message: classification.message,
      latency,
      debug: classification.debug,
    });
  }

  /**
   * Defines the capabilities supported by this provider.
   */
  public abstract get capabilities(): import('../types').ProviderCapabilities;

  /**
   * Returns the specific URL used for pinging/health checking this provider.
   */
  protected abstract getHealthEndpoint(): string | null;

  /**
   * Returns custom headers for the health check request. Default is empty.
   */
  protected async getHealthHeaders(): Promise<Record<string, string> | undefined> {
    return undefined;
  }

  /**
   * Returns the HealthClassifier implementation for this provider.
   */
  protected abstract getClassifier(): HealthClassifier;

  /**
   * Wakes up the infrastructure if it's in a sleep or suspended state.
   */
  public abstract wake(signal?: AbortSignal): Promise<import('../types').WakeResult>;

  /**
   * Measures the latency of connecting to the infrastructure (standalone if needed).
   */
  public abstract getLatency(signal?: AbortSignal): Promise<number>;
}
