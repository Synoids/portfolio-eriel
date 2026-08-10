import { InfrastructureActionService } from '../lib/infrastructure/actions/InfrastructureActionService';
import { InfrastructureManager } from '../lib/infrastructure/InfrastructureManager';
import { SupabaseProvider } from '../lib/infrastructure/providers/SupabaseProvider';
import { InfrastructureProject } from '../lib/infrastructure/types';

async function runVerification() {
  console.log('--- Test 1: Capability ---');
  // Mock project just to test capabilities
  const mockProject: InfrastructureProject = {
    id: 'mock-id',
    projectName: 'Mock Project',
    provider: 'Supabase',
    environment: 'Production',
    projectUrl: 'https://mock.supabase.co',
    projectId: 'mock',
    region: 'ap-southeast-1'
  };
  const provider = new SupabaseProvider(mockProject);
  console.log('Capabilities:', provider.capabilities);

  console.log('\n--- Test 2: Unsupported Wake via Manager ---');
  const manager = new InfrastructureManager();
  const wakeResult = await manager.runWake(mockProject);
  console.log('Manager Wake Result:', wakeResult);

  const actionService = new InfrastructureActionService();

  console.log('\n--- Test 3: Invalid Registry ---');
  const invalidResult = await actionService.runWake('invalid-id-1234', { trigger: 'manual', startedAt: new Date(), source: 'verify-script' });
  console.log('Invalid Registry Result:', invalidResult);

  console.log('\n--- Test 4: Abort Signal ---');
  const controller = new AbortController();
  const abortPromise = actionService.runWake('some-id', undefined, controller.signal);
  controller.abort();
  const abortResult = await abortPromise;
  console.log('Abort Result:', abortResult);

  console.log('\n--- Test 5: Bulk Sequential (Safe execution) ---');
  // We will run bulk wake for all projects. Since all will be unsupported, it should finish safely without errors.
  const bulkResult = await actionService.runWakeForAll({ trigger: 'manual', startedAt: new Date(), source: 'verify-bulk' });
  console.log('Bulk Result Total:', bulkResult.total);
  console.log('Bulk Result Success Count:', bulkResult.success);
  console.log('Bulk Result Failed Count:', bulkResult.failed);
  
  console.log('\n--- Test 6: Secret Safety ---');
  console.log('No secrets should have been logged above.');
}

runVerification().catch(console.error);
