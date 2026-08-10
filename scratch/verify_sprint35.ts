import { InfrastructureManager } from '../lib/infrastructure';
import { InfrastructureProject } from '../lib/infrastructure/types';
import { SupabaseStateRepository } from '../lib/infrastructure/state/SupabaseStateRepository';

async function runVerification() {
  console.log('--- Sprint 3.5: State Engine Verification ---');
  console.log('Pastikan Anda telah menjalankan supabase/schema_state_engine.sql di Supabase!\n');

  const project: InfrastructureProject = {
    id: 'test-1234',
    projectName: 'Verification Test Project',
    provider: 'Supabase',
    environment: 'Development',
    projectUrl: 'https://rcwoxctedzwndkewtjaf.supabase.co', // Finance Tracker URL
    projectId: 'rcwoxctedzwndkewtjaf',
    region: 'Singapore',
  };

  const repo = new SupabaseStateRepository();

  const manager = new InfrastructureManager();

  console.log('\n1. Menjalankan Health Check Pertama...');
  const result1 = await manager.runAndSaveHealthCheck(project);
  console.log(`   Status: ${result1.status}, Latency: ${result1.latency}ms`);

  console.log('2. Menjalankan Health Check Kedua...');
  const result2 = await manager.runAndSaveHealthCheck(project);
  console.log(`   Status: ${result2.status}, Latency: ${result2.latency}ms`);

  console.log('\n3. Memverifikasi Database...');
  
  const current = await repo.getCurrent(project.projectId!);
  const history = await repo.getHistory(project.projectId!);

  if (current) {
    console.log(`✅ Current State ada (1 record). Updated At: ${current.updatedAt}`);
  } else {
    console.log(`❌ Current State tidak ditemukan!`);
  }

  if (history.length >= 2) {
    console.log(`✅ History State bertambah (${history.length} records). Append-only berfungsi!`);
  } else {
    console.log(`❌ History State kurang dari 2. Ditemukan: ${history.length}`);
  }
}

runVerification().catch(console.error);
