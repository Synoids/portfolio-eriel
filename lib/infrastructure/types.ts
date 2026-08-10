import { Provider, Environment } from '@/lib/constants';

/**
 * Defines the comprehensive health status of a project.
 */
export type HealthStatus = 'healthy' | 'paused' | 'offline' | 'invalid' | 'unknown';

/**
 * Represents the standardized result of a health check operation across all providers.
 * Providers must NEVER throw exceptions to the UI, but instead encapsulate errors within this object.
 */
export interface HealthResult {
    success: boolean;
    status: HealthStatus;
    latency: number | null;
    checkedAt: Date;
    message: string;
    provider: Provider;
    debug?: {
        error?: string;
        httpStatus?: number;
    };
}

/**
 * Defines the capabilities supported by a specific provider.
 */
export interface ProviderCapabilities {
    healthCheck: boolean;
    wake: boolean;
}

export type WakeStatus =
  | 'success'
  | 'unsupported'
  | 'unauthorized'
  | 'forbidden'
  | 'rate_limited'
  | 'not_found'
  | 'already_running'
  | 'failed'
  | 'aborted'
  | 'invalid'
  | 'unknown';

/**
 * Represents the standardized result of a wake operation.
 * Adheres to the No-Throw Policy.
 */
export interface WakeResult {
    success: boolean;
    status: WakeStatus;
    projectId: string; // The specific project ID string for the provider (not registry ID)
    message: string;
    startedAt: Date;
    endedAt: Date;
    latency?: number;
    httpStatus?: number;
    provider: Provider;
    debug?: Record<string, unknown>;
}

/**
 * Represents a comprehensive project entity within the Infrastructure Engine.
 * This type serves as the main data structure passed to providers.
 */
export interface InfrastructureProject {
  id: string;
  projectName: string;
  provider: Provider;
  environment: Environment;
  projectUrl: string | null;
  projectId: string | null;
  region: string | null;
  anonKey?: string | null;
  serviceRoleKey?: string | null;
  providerAccountId?: string | null;
  notes?: string | null;
}

/**
 * Represents a record in the project_health_current table.
 */
export interface CurrentHealthState {
  id: string;
  projectId: string;
  status: HealthStatus;
  success: boolean;
  latency: number | null;
  message: string;
  provider: Provider;
  environment?: Environment;
  checkedAt: string; // ISO date string
  debugJson?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents a record in the project_health_history table (append only).
 */
export interface HealthHistoryRecord {
  id: string;
  projectId: string;
  status: HealthStatus;
  success: boolean;
  latency: number | null;
  message: string;
  provider: Provider;
  environment?: Environment;
  checkedAt: string;
  debugJson?: Record<string, any>;
  createdAt: string;
}
