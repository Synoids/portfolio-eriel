import { InfrastructureConfig } from '../config';

export interface LatencyResult {
  response: Response | null;
  latency: number;
  error?: Error;
}

/**
 * Pure function to perform an HTTP request and measure response latency.
 * Now supports AbortSignal chaining and returns raw response for the Classifier.
 */
export async function measureLatency(url: string, signal?: AbortSignal, headers?: Record<string, string>): Promise<LatencyResult> {
  // We combine the incoming signal (if any) with our internal timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), InfrastructureConfig.DEFAULT_REQUEST_TIMEOUT);

  // If the parent aborts, we abort our fetch too
  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  const startTime = performance.now();

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...headers
      }
    });

    const latency = Math.round(performance.now() - startTime);
    clearTimeout(timeoutId);

    return { response, latency };
  } catch (error: any) {
    const latency = Math.round(performance.now() - startTime);
    clearTimeout(timeoutId);
    
    return { response: null, latency, error };
  }
}
