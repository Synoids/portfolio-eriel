import { InfrastructureManager } from '../lib/infrastructure';
import { InfrastructureProject } from '../lib/infrastructure/types';

async function runTests() {
  console.log('--- Sprint 3: Health Check Engine Verification ---\n');

  // Scenario 1: Valid and active Supabase project
  const validProject: InfrastructureProject = {
    id: '1',
    projectName: 'Valid Project',
    provider: 'Supabase',
    environment: 'Development',
    projectUrl: 'https://jhyxoxwqzswwudwqunla.supabase.co', // A known working mock URL or use the user's actual URL if needed
    projectId: 'jhyxoxwqzswwudwqunla',
    region: 'Singapore',
  };

  // Scenario 2: Project URL is empty
  const emptyUrlProject: InfrastructureProject = {
    id: '2',
    projectName: 'Empty URL Project',
    provider: 'Supabase',
    environment: 'Development',
    projectUrl: '',
    projectId: null,
    region: 'Singapore',
  };

  // Scenario 3: URL with invalid format
  const invalidUrlProject: InfrastructureProject = {
    id: '3',
    projectName: 'Invalid URL Project',
    provider: 'Supabase',
    environment: 'Development',
    projectUrl: 'https://not-supabase-format.com',
    projectId: null,
    region: 'Singapore',
  };

  // Scenario 4: DNS lookup failed / Unreachable (Non-existent supabase ref)
  const offlineProject: InfrastructureProject = {
    id: '4',
    projectName: 'Offline Project',
    provider: 'Supabase',
    environment: 'Development',
    projectUrl: 'https://thisdoesnotexist-12345.supabase.co',
    projectId: 'thisdoesnotexist-12345',
    region: 'Singapore',
  };

  const projects = [validProject, emptyUrlProject, invalidUrlProject, offlineProject];

  for (const proj of projects) {
    console.log(`Testing: [${proj.projectName}] - ${proj.projectUrl || 'NO_URL'}`);
    const manager = new InfrastructureManager();
    const provider = manager.get(proj);
    
    // We expect NO exceptions thrown here!
    const result = await provider.healthCheck();
    
    console.log(`  Success : ${result.success}`);
    console.log(`  Status  : ${result.status}`);
    console.log(`  Latency : ${result.latency !== null ? result.latency + 'ms' : 'N/A'}`);
    console.log(`  Message : ${result.message}`);
    if (result.debug) {
      console.log(`  Debug   : ${JSON.stringify(result.debug)}`);
    }
    console.log('--------------------------------------------------\n');
  }
}

runTests().catch(console.error);
