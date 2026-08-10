import { supabaseAdmin } from '../lib/supabase';

async function executePhase2B() {
  console.log('--- SPRINT 10.5 PHASE 2B: PROJECT MAPPING ---');

  const providerAccountId = 'e5e5fc9c-d41d-448a-ae6a-746f70f0e278';
  const targetProjectId = 'f25f2d27-2c8d-44a3-b793-29b5397b23a1';

  // 1. Preflight Validations
  const { data: paData, error: paErr } = await supabaseAdmin
    .from('provider_accounts')
    .select('id, provider, account_name')
    .eq('id', providerAccountId)
    .single();

  if (paErr || !paData) {
    console.error('[FAIL] Provider account not found or error:', paErr?.message);
    return;
  }
  if (paData.provider !== 'Supabase') {
    console.error(`[FAIL] Provider is not Supabase (found ${paData.provider})`);
    return;
  }
  console.log(`[PASS] Provider account verified: ${paData.account_name}`);

  const { data: projData, error: projErr } = await supabaseAdmin
    .from('project_credentials')
    .select('id, project_name, provider, provider_account_id')
    .eq('id', targetProjectId)
    .single();

  if (projErr || !projData) {
    console.error('[FAIL] Target project not found or error:', projErr?.message);
    return;
  }
  if (projData.provider_account_id !== null && projData.provider_account_id !== providerAccountId) {
    console.error(`[FAIL] Project already linked to another account: ${projData.provider_account_id}`);
    return;
  }
  console.log(`[PASS] Target project verified: ${projData.project_name}`);

  // 2. Perform Update
  console.log('[INFO] Mapping target project to provider account...');
  const { error: updateErr } = await supabaseAdmin
    .from('project_credentials')
    .update({ provider_account_id: providerAccountId })
    .eq('id', targetProjectId);

  if (updateErr) {
    console.error('[FAIL] Update failed:', updateErr.message);
    return;
  }

  // 3 & 4. Verification & Output
  const { data: verifyData, error: verifyErr } = await supabaseAdmin
    .from('project_credentials')
    .select('id, project_name, provider, provider_account_id')
    .eq('id', targetProjectId)
    .single();

  if (verifyErr || !verifyData) {
    console.error('[FAIL] Post-update verification failed:', verifyErr?.message);
    return;
  }

  // Check no other projects were affected
  const { data: countData, error: countErr } = await supabaseAdmin
    .from('project_credentials')
    .select('id', { count: 'exact' })
    .eq('provider_account_id', providerAccountId);

  if (countErr) {
    console.error('[FAIL] Could not verify bulk prevention:', countErr.message);
    return;
  }
  if (countData.length !== 1) {
    console.error(`[FAIL] WARNING: Multiple projects (${countData.length}) mapped!`);
  } else {
    console.log('[PASS] Verified only 1 project is mapped.');
  }

  console.log('\n--- PHASE 2B RESULT METADATA ---');
  console.log(`project name: ${verifyData.project_name}`);
  console.log(`project registry ID: ${verifyData.id}`);
  console.log(`provider: ${verifyData.provider}`);
  console.log(`provider_account_id: ${verifyData.provider_account_id}`);
  console.log(`provider account name: ${paData.account_name}`);
}

executePhase2B().catch(err => console.error('\n🚨 FATAL ERROR 🚨', err));
