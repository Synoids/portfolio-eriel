import { supabaseAdmin } from '@/lib/supabase';
import { DashboardOverview, DashboardProject, DashboardDetail, ExtendedHealthStatus } from './types';
import { SupabaseStateRepository } from '../state/SupabaseStateRepository';

/**
 * Service dedicated to serving read-only queries for the Monitoring Dashboard.
 * It merges the source of truth (Registry) with the current health state.
 */
export class DashboardQueryService {
  private stateRepo: SupabaseStateRepository;

  constructor() {
    this.stateRepo = new SupabaseStateRepository();
  }

  /**
   * Fetches all projects and their current health state, computing the overview statistics.
   */
  public async getDashboardData(): Promise<{ overview: DashboardOverview; projects: DashboardProject[] }> {
    // 1. Fetch source of truth: all registered projects
    const { data: registry, error } = await supabaseAdmin
      .from('project_credentials')
      .select('id, project_name, provider, environment, region, project_id, project_url')
      .order('created_at', { ascending: false });

    if (error || !registry) {
      console.error('Failed to fetch registry for dashboard:', error);
      throw new Error('Could not load dashboard data');
    }

    // 2. Fetch current health states
    // We could use the repo, but querying all states in one go is more efficient
    const { data: states, error: statesError } = await supabaseAdmin
      .from('project_health_current')
      .select('project_id, status, latency, checked_at, message');

    if (statesError) {
      console.error('Failed to fetch health states for dashboard:', statesError);
      // We don't throw, we just proceed with empty states
    }

    // Build a map for O(1) lookup
    const stateMap = new Map();
    if (states) {
      states.forEach(s => stateMap.set(s.project_id, s));
    }

    const projects: DashboardProject[] = [];
    const overview: DashboardOverview = {
      totalProjects: registry.length,
      healthy: 0,
      paused: 0,
      offline: 0,
      unknown: 0,
      notChecked: 0,
    };

    // 3. Merge and compute
    for (const reg of registry) {
      const state = reg.project_id ? stateMap.get(reg.project_id) : undefined;
      const status: ExtendedHealthStatus = state ? state.status : 'not_checked';

      projects.push({
        id: reg.id,
        projectId: reg.project_id || '',
        name: reg.project_name,
        provider: reg.provider,
        environment: reg.environment,
        region: reg.region,
        status,
        latency: state ? state.latency : null,
        lastChecked: state ? state.checked_at : null,
      });

      // Update counters
      if (status === 'healthy') overview.healthy++;
      else if (status === 'paused') overview.paused++;
      else if (status === 'offline') overview.offline++;
      else if (status === 'not_checked') overview.notChecked++;
      else overview.unknown++;
    }

    return { overview, projects };
  }

  /**
   * Fetches detailed information for a single project view.
   */
  public async getProjectDetailData(registryId: string): Promise<DashboardDetail | null> {
    // Fetch from registry
    const { data: reg, error } = await supabaseAdmin
      .from('project_credentials')
      .select('*')
      .eq('id', registryId)
      .single();

    if (error || !reg) return null;

    // Fetch state and history via Repo if project_id exists
    let currentState = null;
    let historyPreview: DashboardDetail['historyPreview'] = [];
    
    if (reg.project_id) {
      currentState = await this.stateRepo.getCurrent(reg.project_id);
      const history = await this.stateRepo.getHistory(reg.project_id, 10);
      historyPreview = history.map(h => ({
        status: h.status,
        latency: h.latency,
        checkedAt: h.checkedAt
      }));
    }

    const status: ExtendedHealthStatus = currentState ? currentState.status : 'not_checked';

    return {
      project: {
        id: reg.id,
        projectId: reg.project_id || '',
        name: reg.project_name,
        provider: reg.provider,
        environment: reg.environment,
        region: reg.region,
        status,
        latency: currentState ? currentState.latency : null,
        lastChecked: currentState ? currentState.checkedAt : null,
      },
      message: currentState ? currentState.message : null,
      projectUrl: reg.project_url,
      createdAt: reg.created_at,
      historyPreview,
    };
  }
}
