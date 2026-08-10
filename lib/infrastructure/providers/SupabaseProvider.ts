import { BaseProvider } from './BaseProvider';
import { extractProjectId } from '../utils/extractProjectId';
import { HealthClassifier } from '../classification/HealthClassifier';
import { SupabaseHealthClassifier } from '../classification/SupabaseHealthClassifier';
import { decrypt } from '../../crypto';

/**
 * Concrete implementation of the BaseProvider for Supabase.
 * Uses the auth/v1/health endpoint for lightweight checking.
 */
export class SupabaseProvider extends BaseProvider {
  private classifier: HealthClassifier;

  constructor(project: any, credentialResolver?: import('../credentials/CredentialResolver').CredentialResolver) {
    super(project, credentialResolver);
    // Manual Dependency Injection for the classifier
    this.classifier = new SupabaseHealthClassifier();
  }
  
  /**
   * Validates if the Supabase project configuration is valid.
   */
  public override validateProject(): boolean {
    const isValidBase = super.validateProject();
    if (!isValidBase) return false;

    // Supabase requires a valid project ID extracted from the URL
    const extractedId = extractProjectId(this.project.projectUrl, this.project.provider);
    return extractedId !== null;
  }

  /**
   * Defines the endpoint used for the health check.
   */
  protected getHealthEndpoint(): string | null {
    if (!this.project.projectUrl) return null;
    
    // Using the root PostgREST endpoint to execute PostgreSQL activity and prevent auto-pause.
    // The ?limit=1 is a safeguard in case the endpoint resolves to a default table in some configs.
    const baseUrl = this.project.projectUrl.replace(/\/$/, '');
    return `${baseUrl}/rest/v1/?limit=1`;
  }

  /**
   * Returns custom headers for the health check.
   * Decrypts the anon_key on the fly to authenticate with Kong/PostgREST.
   */
  protected async getHealthHeaders(): Promise<Record<string, string> | undefined> {
    if (!this.project.anonKey) return undefined;
    
    // anonKey is stored encrypted in the InfrastructureProject object (mapped from anon_key_encrypted)
    const decryptedKey = decrypt(this.project.anonKey);
    if (!decryptedKey || decryptedKey === 'Decryption Error') return undefined;

    return {
      'apikey': decryptedKey,
      'Authorization': `Bearer ${decryptedKey}`
    };
  }

  /**
   * Returns the health classifier.
   */
  protected getClassifier(): HealthClassifier {
    return this.classifier;
  }

  /**
   * Defines the capabilities supported by SupabaseProvider.
   */
  public get capabilities(): import('../types').ProviderCapabilities {
    return {
      healthCheck: true,
      wake: true
    };
  }

  /**
   * Wakes up a paused Supabase project.
   */
  public async wake(signal?: AbortSignal): Promise<import('../types').WakeResult> {
    const startedAt = new Date();
    const projectId = this.project.projectId || extractProjectId(this.project.projectUrl, this.project.provider) || 'unknown';
    const { InfrastructureConfig } = await import('../config/index');

    if (!InfrastructureConfig.WAKE_ENABLED) {
      return {
        success: false,
        status: 'unsupported',
        projectId,
        provider: this.project.provider,
        message: 'Wake Engine is currently disabled in configuration.',
        startedAt,
        endedAt: new Date()
      };
    }

    if (!this.project.providerAccountId) {
      return {
        success: false,
        status: 'invalid',
        projectId,
        provider: this.project.provider,
        message: 'No provider account is associated with this project. Cannot resolve Management API credential.',
        startedAt,
        endedAt: new Date()
      };
    }

    if (!this.credentialResolver) {
      return {
        success: false,
        status: 'failed',
        projectId,
        provider: this.project.provider,
        message: 'CredentialResolver is missing. Cannot proceed securely.',
        startedAt,
        endedAt: new Date()
      };
    }

    const token = await this.credentialResolver.resolveCredential(this.project.providerAccountId, this.project.provider, 'management_api');
    if (!token) {
      return {
        success: false,
        status: 'unauthorized',
        projectId,
        provider: this.project.provider,
        message: 'Management API Credential not found or failed to decrypt.',
        startedAt,
        endedAt: new Date()
      };
    }

    if (InfrastructureConfig.WAKE_DRY_RUN) {
      console.log(`[Wake] DRY RUN | Provider: Supabase | Project: ${projectId} | Endpoint: POST /v1/projects/${projectId}/restore`);
      return {
        success: true,
        status: 'success',
        projectId,
        provider: this.project.provider,
        message: 'Dry run completed successfully. No actual HTTP request was sent.',
        startedAt,
        endedAt: new Date(),
        httpStatus: 200
      };
    }

    if (signal?.aborted) {
      return { success: false, status: 'aborted', projectId, provider: this.project.provider, message: 'Wake aborted', startedAt, endedAt: new Date() };
    }

    const fetchStart = Date.now();
    try {
      const response = await fetch(`https://api.supabase.com/v1/projects/${projectId}/restore`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal
      });
      const latency = Date.now() - fetchStart;

      const httpStatus = response.status;
      let status: import('../types').WakeStatus = 'unknown';
      let success = false;

      if (httpStatus === 200 || httpStatus === 201) {
        success = true;
        status = 'success';
      } else if (httpStatus === 401) {
        status = 'unauthorized';
      } else if (httpStatus === 403) {
        status = 'forbidden';
      } else if (httpStatus === 404) {
        status = 'not_found';
      } else if (httpStatus === 429) {
        status = 'rate_limited';
      } else if (httpStatus >= 500) {
        status = 'failed';
      } else {
        status = 'failed';
      }

      return {
        success,
        status,
        projectId,
        provider: this.project.provider,
        message: success ? 'Restore request accepted.' : `Restore request rejected with HTTP ${httpStatus}.`,
        startedAt,
        endedAt: new Date(),
        latency,
        httpStatus
      };
    } catch (err: any) {
      if (err.name === 'AbortError' || signal?.aborted) {
        return { success: false, status: 'aborted', projectId, provider: this.project.provider, message: 'Wake aborted during fetch', startedAt, endedAt: new Date() };
      }
      return {
        success: false,
        status: 'failed',
        projectId,
        provider: this.project.provider,
        message: 'Network or unexpected failure during wake request.',
        startedAt,
        endedAt: new Date(),
        latency: Date.now() - fetchStart
      };
    }
  }

  /**
   * Measures latency to the Supabase endpoint.
   */
  public async getLatency(signal?: AbortSignal): Promise<number> {
    return -1;
  }
}
