import { StateRepository } from './StateRepository';
import { HealthResult, CurrentHealthState, HealthHistoryRecord } from '../types';
import { supabaseAdmin } from '@/lib/supabase'; // Important: we use the admin client to bypass RLS

/**
 * Supabase implementation of the StateRepository.
 */
export class SupabaseStateRepository implements StateRepository {
  
  public async saveCurrent(projectId: string, result: HealthResult, environment?: string): Promise<void> {
    const payload = {
      project_id: projectId,
      status: result.status,
      success: result.success,
      latency: result.latency,
      message: result.message,
      provider: result.provider,
      environment: environment || null,
      checked_at: result.checkedAt.toISOString(),
      debug_json: result.debug || null,
    };

    // Note: To truly 'upsert' without throwing error on unique constraint,
    // Supabase JS requires specifying the 'onConflict' column.
    const { error } = await supabaseAdmin
      .from('project_health_current')
      .upsert(payload, { onConflict: 'project_id' });

    if (error) {
      console.error('Failed to save current state:', error);
      // We don't throw to UI, but we log the error for internal debugging
    }
  }

  public async saveHistory(projectId: string, result: HealthResult, environment?: string): Promise<void> {
    const payload = {
      project_id: projectId,
      status: result.status,
      success: result.success,
      latency: result.latency,
      message: result.message,
      provider: result.provider,
      environment: environment || null,
      checked_at: result.checkedAt.toISOString(),
      debug_json: result.debug || null,
    };

    const { error } = await supabaseAdmin
      .from('project_health_history')
      .insert(payload);

    if (error) {
      console.error('Failed to save health history:', error);
    }
  }

  public async getCurrent(projectId: string): Promise<CurrentHealthState | null> {
    const { data, error } = await supabaseAdmin
      .from('project_health_current')
      .select('*')
      .eq('project_id', projectId)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      projectId: data.project_id,
      status: data.status,
      success: data.success,
      latency: data.latency,
      message: data.message,
      provider: data.provider,
      environment: data.environment,
      checkedAt: data.checked_at,
      debugJson: data.debug_json,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  public async getHistory(projectId: string, limit: number = 50): Promise<HealthHistoryRecord[]> {
    const { data, error } = await supabaseAdmin
      .from('project_health_history')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data) return [];

    return data.map(row => ({
      id: row.id,
      projectId: row.project_id,
      status: row.status,
      success: row.success,
      latency: row.latency,
      message: row.message,
      provider: row.provider,
      environment: row.environment,
      checkedAt: row.checked_at,
      debugJson: row.debug_json,
      createdAt: row.created_at,
    }));
  }

  public async deleteCurrent(projectId: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from('project_health_current')
      .delete()
      .eq('project_id', projectId);

    if (error) console.error('Failed to delete current state:', error);
  }

  public async clearHistory(projectId: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from('project_health_history')
      .delete()
      .eq('project_id', projectId);

    if (error) console.error('Failed to clear history:', error);
  }
}
