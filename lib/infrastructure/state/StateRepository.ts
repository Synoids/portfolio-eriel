import { HealthResult, CurrentHealthState, HealthHistoryRecord } from '../types';

/**
 * Generic contract for storing Health Check states.
 * This separates the storage implementation from the Infrastructure Manager.
 */
export interface StateRepository {
  /**
   * Saves the most recent health check result for a project (Upsert).
   */
  saveCurrent(projectId: string, result: HealthResult, environment?: string): Promise<void>;

  /**
   * Saves the health check result into a historical append-only log.
   */
  saveHistory(projectId: string, result: HealthResult, environment?: string): Promise<void>;

  /**
   * Retrieves the current health state for a project.
   */
  getCurrent(projectId: string): Promise<CurrentHealthState | null>;

  /**
   * Retrieves the history of health states for a project.
   */
  getHistory(projectId: string, limit?: number): Promise<HealthHistoryRecord[]>;

  /**
   * Deletes the current health state for a project (e.g. if a project is deleted).
   */
  deleteCurrent(projectId: string): Promise<void>;

  /**
   * Clears the history for a project.
   */
  clearHistory(projectId: string): Promise<void>;
}
