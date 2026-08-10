import { Provider } from '@/lib/constants';

/**
 * Pure function to generate a dashboard URL based on the provider and project ID.
 * Does not rely on React, API, or Server actions.
 * 
 * @param provider The provider type.
 * @param projectId The extracted project ID.
 * @returns The dashboard URL or null if not applicable.
 */
export function generateDashboardUrl(provider: Provider | string, projectId: string | null | undefined): string | null {
  if (provider === 'Supabase' && projectId) {
    return `https://supabase.com/dashboard/project/${projectId}`;
  }
  
  return null;
}
