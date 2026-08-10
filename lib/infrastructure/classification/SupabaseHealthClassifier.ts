import { HealthClassifier, ClassificationResult } from './HealthClassifier';

export class SupabaseHealthClassifier implements HealthClassifier {
  classify(response: Response | null, error?: Error): ClassificationResult {
    // 1. Handle explicit errors (Network, DNS, Timeout)
    if (error || !response) {
      const isTimeout = error?.name === 'AbortError' || error?.message.includes('timeout');
      
      return {
        status: 'offline',
        message: isTimeout 
          ? 'Project health check timed out. It might be sleeping or unreachable.' 
          : 'Project is offline or unreachable.',
        debug: {
          error: error?.message,
        }
      };
    }

    // 2. Handle HTTP Response Codes
    const status = response.status;
    const isSuccess = response.ok || status === 401; // 401 from GoTrue means the service is alive

    if (isSuccess) {
      return {
        status: 'healthy',
        message: 'Project is healthy and responding.',
        debug: {
          httpStatus: status,
        }
      };
    }

    if (status === 503 || status === 502) {
      return {
        status: 'paused',
        message: 'Project is paused or temporarily unavailable.',
        debug: {
          httpStatus: status,
        }
      };
    }

    if (status === 404) {
      return {
        status: 'invalid',
        message: 'Project endpoint not found (404).',
        debug: {
          httpStatus: status,
        }
      };
    }

    // Unhandled error codes
    return {
      status: 'unknown',
      message: `Unexpected HTTP status: ${status}`,
      debug: {
        httpStatus: status,
      }
    };
  }
}
