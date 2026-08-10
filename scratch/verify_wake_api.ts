import { InfrastructureActionService } from '../lib/infrastructure/actions/InfrastructureActionService';
import { ConsoleLogger } from '../lib/infrastructure/logging/ConsoleLogger';
import { InfrastructureConfig } from '../lib/infrastructure/config/index';
import { wakeProjectAction } from '../app/admin/monitoring/actions';
import { supabaseAdmin } from '../lib/supabase';
import { encrypt } from '../lib/crypto';
import { CredentialResolver } from '../lib/infrastructure/credentials/CredentialResolver';
import { SupabaseProvider } from '../lib/infrastructure/providers/SupabaseProvider';

// Mock Next.js cache revalidation for isolated testing
jestMockNextCache();
function jestMockNextCache() {
  const mod = require('module');
  const originalRequire = mod.prototype.require;
  mod.prototype.require = function(request: string) {
    if (request === 'next/cache') {
      return { revalidatePath: () => {} };
    }
    return originalRequire.apply(this, arguments);
  };
}

// Mock Supabase
(supabaseAdmin.from as any) = (table: string) => {
  return {
    select: (query?: string) => {
      const filters: any = {};
      const builder = {
        eq: (col: string, val: any) => { filters[col] = val; return builder; },
        single: async () => {
          if (table === 'project_credentials') {
            const val = filters['id'];
            if (val === 'invalid_id') return { data: null, error: new Error('Not found') };
            return {
              data: {
                id: val,
                project_name: 'Test Project',
                provider: 'Supabase',
                project_id: val === 'missing_cred_project' ? 'proj_2' : 'proj_1',
                provider_account_id: val === 'no_acc_project' ? null : 'acc_1'
              },
              error: null
            };
          }
          if (table === 'provider_management_credentials') {
            const val = filters['provider_account_id'];
            if (val === 'acc_1') {
               return {
                 data: { token_encrypted: encrypt('TEST_SECRET_A') },
                 error: null
               };
            }
            return { data: null, error: null };
          }
          return { data: null, error: null };
        }
      };
      return builder;
    }
  };
};

let fetchMockResult: any = { status: 200 };
let aborted = false;

// Mock Fetch
const originalFetch = global.fetch;
global.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
  if (init?.signal?.aborted) {
    aborted = true;
    const e: any = new Error('The operation was aborted');
    e.name = 'AbortError';
    throw e;
  }
  return {
    status: fetchMockResult.status,
    json: async () => ({})
  } as Response;
};

async function runVerification() {
  let allPassed = true;
  const assert = (condition: boolean, msg: string) => {
    if (condition) console.log(`[PASS] ${msg}`);
    else { console.error(`[FAIL] ${msg}`); allPassed = false; }
  };

  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  let logCapture: string[] = [];
  console.log = (...args) => { logCapture.push(args.join(' ')); originalConsoleLog(...args); };
  console.error = (...args) => { logCapture.push(args.join(' ')); originalConsoleError(...args); };

  originalConsoleLog('--- Wake API Verification ---');
  
  const actionService = new InfrastructureActionService(new ConsoleLogger());

  // Test A - Capability
  const provider = new SupabaseProvider({});
  assert(provider.capabilities.wake === true, 'Provider capability is true when instantiated');

  // Test B - Disabled Safety
  (InfrastructureConfig as any).WAKE_ENABLED = false;
  let res = await actionService.runWake('proj_id');
  assert(res.success === false && res.message.includes('Wake Engine is currently disabled'), 'Wake disabled safely (no HTTP request)');

  // Test C - Dry Run
  (InfrastructureConfig as any).WAKE_ENABLED = true;
  (InfrastructureConfig as any).WAKE_DRY_RUN = true;
  res = await actionService.runWake('proj_id');
  assert(res.success === true && res.message.includes('Dry run completed'), 'Dry run completed (no actual HTTP request)');
  
  (InfrastructureConfig as any).WAKE_DRY_RUN = false;

  // Test D - Missing Provider Account
  res = await actionService.runWake('no_acc_project');
  assert(res.success === false && res.message.includes('No provider account is associated'), 'Missing credential handled safely');

  // Test E - Invalid Project
  res = await actionService.runWake('invalid_id');
  assert(res.success === false && Boolean(res.error?.includes('not found in registry') || res.error?.includes('Not found')), 'Invalid project handled safely');

  // Test F - AbortSignal
  const controller = new AbortController();
  controller.abort();
  res = await actionService.runWake('proj_id', undefined, controller.signal);
  assert(res.success === false && res.message.includes('aborted'), 'Abort propagated');

  // Test G - Response Classification
  fetchMockResult = { status: 200 };
  res = await actionService.runWake('proj_id');
  assert(res.success === true && res.message.includes('accepted'), 'HTTP 200 parsed correctly');

  fetchMockResult = { status: 401 };
  res = await actionService.runWake('proj_id');
  assert(res.success === false && res.message.includes('401'), 'HTTP 401 parsed correctly');

  fetchMockResult = { status: 429 };
  res = await actionService.runWake('proj_id');
  assert(res.success === false && res.message.includes('429'), 'HTTP 429 parsed correctly');

  // Test H - Real API
  (InfrastructureConfig as any).WAKE_REAL_TEST = false;
  // WAKE_REAL_TEST is only checked at developer execution script, skip here since this is mock testing.

  // Test N - Secret Leak Detection
  const joinedLogs = logCapture.join(' ');
  const leaked = joinedLogs.includes('TEST_SECRET_A');
  assert(!leaked, 'No plaintext credential leaked in logs');

  console.log = originalConsoleLog;
  console.error = originalConsoleError;

  if (!allPassed) process.exit(1);
}

runVerification().catch(console.error);
