'use server';

import { DashboardQueryService } from '@/lib/infrastructure/query/DashboardQueryService';
import { InfrastructureActionService } from '@/lib/infrastructure/actions/InfrastructureActionService';
import { revalidatePath } from 'next/cache';

const queryService = new DashboardQueryService();
const actionService = new InfrastructureActionService();

export async function fetchMonitoringOverview() {
  try {
    return await queryService.getDashboardData();
  } catch (error) {
    console.error('Error fetching monitoring overview:', error);
    // Return empty state gracefully
    return {
      overview: { totalProjects: 0, healthy: 0, paused: 0, offline: 0, unknown: 0, notChecked: 0 },
      projects: []
    };
  }
}

export async function fetchMonitoringDetail(registryId: string) {
  try {
    return await queryService.getProjectDetailData(registryId);
  } catch (error) {
    console.error(`Error fetching monitoring detail for ${registryId}:`, error);
    return null;
  }
}

export async function refreshMonitoring() {
  // Revalidate the monitoring paths to force a fresh fetch from DB
  revalidatePath('/admin/monitoring');
  revalidatePath('/admin/monitoring/[projectId]', 'page');
  return { success: true };
}

export async function checkProjectAction(registryId: string) {
  const result = await actionService.runHealthCheck(registryId);
  revalidatePath('/admin/monitoring');
  revalidatePath('/admin/monitoring/[projectId]', 'page');
  return result;
}

export async function checkAllProjectsAction() {
  const result = await actionService.runHealthCheckForAll();
  revalidatePath('/admin/monitoring');
  revalidatePath('/admin/monitoring/[projectId]', 'page');
  return result;
}

export async function wakeProjectAction(registryId: string) {
  try {
    const result = await actionService.runWake(registryId, { trigger: 'manual', startedAt: new Date() });
    revalidatePath('/admin/monitoring');
    revalidatePath('/admin/monitoring/[projectId]', 'page');
    return result;
  } catch (error) {
    console.error('Error waking project:', error);
    return { success: false, message: 'Failed to wake project due to unexpected error' };
  }
}

export async function wakeAllProjectsAction() {
  try {
    const result = await actionService.runWakeForAll({ trigger: 'manual', startedAt: new Date() });
    revalidatePath('/admin/monitoring');
    revalidatePath('/admin/monitoring/[projectId]', 'page');
    return result;
  } catch (error) {
    console.error('Error in bulk wake:', error);
    return { success: false, total: 0, results: [] };
  }
}