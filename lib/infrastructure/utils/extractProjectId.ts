import { Provider } from '@/lib/constants';

/**
 * Pure function to extract a project ID from a given URL based on the provider.
 * Does not rely on React, API, or Server actions.
 * 
 * @param url The project URL.
 * @param provider The provider type.
 * @returns The extracted project ID or null if not applicable or not found.
 */
export function extractProjectId(url: string | null | undefined, provider: Provider | string): string | null {
  if (!url) return null;
  
  if (provider === 'Supabase') {
    const match = url.match(/^https?:\/\/([a-z0-9-]+)\.supabase\.co/i);
    if (match) return match[1];
  }
  
  return null;
}
