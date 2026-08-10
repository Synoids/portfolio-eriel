import { HealthResult, HealthStatus } from '../types';
import { Provider } from '@/lib/constants';

interface BuildHealthResultParams {
  provider: Provider;
  status: HealthStatus;
  message: string;
  latency?: number | null;
  debug?: {
    error?: string;
    httpStatus?: number;
  };
}

/**
 * Pure builder function to construct a standardized HealthResult.
 * Ensures consistent output across all providers.
 */
export function buildHealthResult(params: BuildHealthResultParams): HealthResult {
  const success = params.status === 'healthy';
  
  return {
    success,
    status: params.status,
    latency: params.latency ?? null,
    checkedAt: new Date(),
    message: params.message,
    provider: params.provider,
    ...(params.debug && Object.keys(params.debug).length > 0 && { debug: params.debug })
  };
}
