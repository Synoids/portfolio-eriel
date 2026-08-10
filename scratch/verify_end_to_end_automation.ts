// Set environment variables before any imports
process.env.CRON_SECRET = 'super-secret-cron-token';
process.env.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '0000000000000000000000000000000000000000000000000000000000000000';
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://mock.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-role-key';

import { POST } from '../app/api/infrastructure/automation/trigger/route';
import { supabaseAdmin } from '../lib/supabase';
import { encrypt } from '../lib/crypto';
import { BaseProvider } from '../lib/infrastructure/providers/BaseProvider';

// Mock DB Projects
const mockProjects = [
  {
    id: 'proj-1',
    project_name: 'Healthy Project',
    provider: 'Supabase',
    environment: 'Production',
    project_url: 'https://healthy.supabase.co/',
    project_id: 'healthy-id',
    anon_key_encrypted: encrypt('healthy-anon-key')
  },
  {
    id: 'proj-2',
    project_name: 'Paused Project',
    provider: 'Supabase',
    environment: 'Production',
    project_url: 'https://paused.supabase.co/',
    project_id: 'paused-id',
    anon_key_encrypted: encrypt('paused-anon-key')
  },
  {
    id: 'proj-3',
    project_name: 'Offline/Failed Project',
    provider: 'Supabase',
    environment: 'Production',
    project_url: 'https://offline.supabase.co/',
    project_id: 'offline-id',
    anon_key_encrypted: encrypt('offline-anon-key')
  }
];

// Mock Supabase Admin
const originalFrom = supabaseAdmin.from;
(supabaseAdmin as any).from = (table: string) => {
  if (table === 'project_credentials') {
    return {
      select: (query: string) => {
        if (query === 'id') {
          return Promise.resolve({ data: mockProjects.map(p => ({ id: p.id })), error: null });
        }
        return {
          eq: (field: string, value: string) => {
            return {
              single: () => {
                const proj = mockProjects.find(p => p.id === value);
                return Promise.resolve({ data: proj, error: null });
              }
            };
          }
        };
      }
    };
  }
  if (table === 'project_health_history' || table === 'project_health_current') {
    return {
      insert: () => Promise.resolve({ error: null }),
      upsert: () => Promise.resolve({ error: null })
    };
  }
  return originalFrom.call(supabaseAdmin, table);
};

// Mock Global Fetch
let fetchLogs: any[] = [];
(global as any).fetch = async (url: string, options: any) => {
  fetchLogs.push({ url, headers: options?.headers });

  if (url.includes('healthy.supabase.co')) {
    return { ok: true, status: 200, json: async () => ({}) };
  } else if (url.includes('paused.supabase.co')) {
    // Supabase returns a 503 or specific error when paused. We mock a 503.
    return { ok: false, status: 503, json: async () => ({}) }; 
  } else if (url.includes('offline.supabase.co')) {
    throw new Error('Network timeout/DNS resolution failed');
  }
  return { ok: false, status: 404, json: async () => ({}) };
};

// Helper to create Request object
const createRequest = (authHeader?: string) => {
  const headers = new Headers();
  if (authHeader) headers.set('authorization', authHeader);
  return { headers, url: 'http://localhost/api/infrastructure/automation/trigger', method: 'POST' } as unknown as Request;
};

async function runTests() {
  console.log('--- STARTING E2E AUTOMATION AUDIT ---\n');
  let passAll = true;
  const assert = (cond: boolean, msg: string) => {
    if (cond) { console.log(`[PASS] ${msg}`); }
    else { console.error(`[FAIL] ${msg}`); passAll = false; }
  };

  // 1. Test Without CRON_SECRET
  console.log('Test 1: Missing CRON_SECRET');
  let res = await POST(createRequest());
  assert(res.status === 401, 'Request rejected with 401');

  // 2. Test With Wrong CRON_SECRET
  console.log('\nTest 2: Wrong CRON_SECRET');
  res = await POST(createRequest('Bearer WRONG-SECRET'));
  assert(res.status === 401, 'Request rejected with 401');

  // 3. Test With Correct CRON_SECRET
  console.log('\nTest 3: Correct CRON_SECRET & Independent Project Processing');
  res = await POST(createRequest('Bearer super-secret-cron-token'));
  const data = await (res as any).json();
  
  assert(res.status === 200, 'Request accepted with 200');
  assert(data.success === true, 'Response indicates success');
  assert(data.result.total === 3, 'Processed all 3 projects');
  
  const results = data.result.results;
  const healthy = results.find((r: any) => r.projectId === 'proj-1');
  const paused = results.find((r: any) => r.projectId === 'proj-2');
  const offline = results.find((r: any) => r.projectId === 'proj-3');

  assert(healthy.success === true, 'Healthy project marked as success');
  assert(paused.success === false, 'Paused project marked as failure');
  assert(offline.success === false, 'Offline project marked as failure');

  assert(fetchLogs.length === 3, 'Global fetch was called exactly 3 times (independent failures did not stop the loop)');
  
  const healthyFetch = fetchLogs.find(f => f.url.includes('healthy'));
  assert(healthyFetch.url.endsWith('/rest/v1/?limit=1'), 'PostgREST endpoint used');
  assert(healthyFetch.headers['apikey'] === 'healthy-anon-key', 'Anon key properly decrypted and injected');

  // 4. Security Audit on Logs and Output
  console.log('\nTest 4: Security Audit');
  const rawResponseStr = JSON.stringify(data);
  assert(!rawResponseStr.includes('healthy-anon-key'), 'Anon key NOT leaked in JSON response');
  assert(!rawResponseStr.includes('paused-anon-key'), 'Anon key NOT leaked in JSON response');
  assert(!rawResponseStr.includes('offline-anon-key'), 'Anon key NOT leaked in JSON response');
  assert(!rawResponseStr.includes('super-secret-cron-token'), 'CRON_SECRET NOT leaked in JSON response');
  
  if (passAll) {
    console.log('\n✅ ALL MOCK VERIFICATIONS PASSED');
  } else {
    console.error('\n❌ SOME VERIFICATIONS FAILED');
  }
}

runTests().catch(console.error);
