import { HealthStatus } from '../types';

export interface ClassificationResult {
  status: HealthStatus;
  message: string;
  debug?: {
    error?: string;
    httpStatus?: number;
  };
}

export interface HealthClassifier {
  /**
   * Classifies the raw HTTP response and error into a ClassificationResult.
   */
  classify(response: Response | null, error?: Error): ClassificationResult;
}
