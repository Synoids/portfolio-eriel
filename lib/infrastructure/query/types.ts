import { HealthStatus } from '../types';
import { Provider, Environment } from '@/lib/constants';

/**
 * Extends the basic HealthStatus to include 'not_checked'
 * for projects in the registry that haven't been scanned yet.
 */
export type ExtendedHealthStatus = HealthStatus | 'not_checked';

/**
 * Overview statistics for the dashboard cards.
 */
export interface DashboardOverview {
  totalProjects: number;
  healthy: number;
  paused: number;
  offline: number;
  unknown: number;
  notChecked: number;
}

/**
 * Data Transfer Object for rendering a single project row in the dashboard.
 */
export interface DashboardProject {
  id: string;          // Registry ID
  projectId: string;   // Provider's internal ID
  name: string;
  provider: Provider;
  environment: Environment;
  region: string | null;
  status: ExtendedHealthStatus;
  latency: number | null;
  lastChecked: string | null;
}

/**
 * Data Transfer Object for rendering a detailed view of a project.
 */
export interface DashboardDetail {
  project: DashboardProject;
  message: string | null;
  projectUrl: string | null;
  createdAt: string | null;     // When it was added to registry
  // History will be added here if needed, or fetched separately
  historyPreview: {
    status: HealthStatus;
    latency: number | null;
    checkedAt: string;
  }[];
}
