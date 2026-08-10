import { SupabaseProvider } from '../lib/infrastructure/providers/SupabaseProvider';
import { InfrastructureProject } from '../lib/infrastructure/types';
import { encrypt } from '../lib/crypto';

// Setup mock ENCRYPTION_KEY if not present
process.env.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '0000000000000000000000000000000000000000000000000000000000000000';

// Mock the global fetch
let fetchCallCount = 0;
let lastFetchUrl = '';
let lastFetchHeaders: any = {};

(global as any).fetch = async (url: string, options: any) => {
  fetchCallCount++;
  lastFetchUrl = url;
  lastFetchHeaders = options?.headers || {};
  
  return {
    status: 200,
    json: async () => ({})
  };
};

async function verifyHealthCheck() {
  console.log('--- VERIFYING SUPABASE HEALTH CHECK ---');
  let passed = true;

  const assert = (condition: boolean, msg: string) => {
    if (condition) {
      console.log(`[PASS] ${msg}`);
    } else {
      console.error(`[FAIL] ${msg}`);
      passed = false;
    }
  };

  const rawAnonKey = 'eyJh...' // Dummy
  const encryptedAnonKey = encrypt(rawAnonKey);

  const project: InfrastructureProject = {
    id: 'test-id',
    projectName: 'Test Project',
    provider: 'Supabase',
    environment: 'Development',
    projectUrl: 'https://test.supabase.co/',
    projectId: 'test',
    region: 'us-east-1',
    anonKey: encryptedAnonKey
  };

  const provider = new SupabaseProvider(project);
  
  await provider.healthCheck();

  assert(fetchCallCount === 1, 'Fetch was called exactly once');
  assert(lastFetchUrl === 'https://test.supabase.co/rest/v1/?limit=1', `Correct PostgREST endpoint used: ${lastFetchUrl}`);
  assert(lastFetchHeaders['apikey'] === rawAnonKey, 'Header apikey was injected and decrypted securely');
  assert(lastFetchHeaders['Authorization'] === `Bearer ${rawAnonKey}`, 'Header Authorization was injected correctly');
  assert(lastFetchHeaders['apikey'] !== 'mock_service_role_key', 'service_role_key was NOT used');
  
  if (passed) {
    console.log('\n✅ Verification passed! Health Check is a valid PostgREST Keep-Alive.');
  } else {
    console.log('\n⚠️ Verification failed.');
  }
}

verifyHealthCheck().catch(console.error);
