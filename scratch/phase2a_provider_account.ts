import { supabaseAdmin } from '../lib/supabase';

async function executePhase2A() {
  console.log('--- SPRINT 10.5 PHASE 2A: PROVIDER ACCOUNT CREATION ---');

  // 1. Audit read-only schema
  const { data: paData, error: paErr } = await supabaseAdmin.from('provider_accounts').select('id, provider, account_name').limit(1);
  if (paErr) {
    console.error('[FAIL] Audit provider_accounts:', paErr.message);
    return;
  }
  console.log('[PASS] provider_accounts schema exists');

  const { data: pmcData, error: pmcErr } = await supabaseAdmin.from('provider_management_credentials').select('id').limit(1);
  if (pmcErr) {
    console.error('[FAIL] Audit provider_management_credentials:', pmcErr.message);
    return;
  }
  console.log('[PASS] provider_management_credentials schema exists');

  // 2. Audit Project Target
  const targetRegistryId = 'f25f2d27-2c8d-44a3-b793-29b5397b23a1';
  const { data: projectData, error: projErr } = await supabaseAdmin
    .from('project_credentials')
    .select('id, project_name, provider, provider_account_id')
    .eq('id', targetRegistryId)
    .single();

  if (projErr || !projectData) {
    console.error('[FAIL] Audit project_credentials:', projErr?.message || 'Project not found');
    return;
  }
  
  if (projectData.project_name !== 'Employe-Self-Service' || projectData.provider !== 'Supabase') {
    console.error('[FAIL] Project metadata mismatch:', projectData);
    return;
  }
  console.log(`[PASS] Target project found: ${projectData.project_name}`);

  // 3. Check for existing provider account
  const { data: existingAccounts, error: checkAccErr } = await supabaseAdmin
    .from('provider_accounts')
    .select('id, provider, account_name, account_identifier')
    .eq('provider', 'Supabase')
    .limit(1);

  if (checkAccErr) {
    console.error('[FAIL] Check existing accounts:', checkAccErr.message);
    return;
  }

  let accountId: string;
  let accountName: string;
  let accountIdentifier: string | null = null;

  if (existingAccounts && existingAccounts.length > 0) {
    console.log('[INFO] Provider account already exists. Using existing account.');
    const acc = existingAccounts[0];
    accountId = acc.id;
    accountName = acc.account_name;
    accountIdentifier = acc.account_identifier;
  } else {
    // 4 & 5. Create one provider_accounts record
    console.log('[INFO] No existing Supabase account found. Creating Supabase Master Account...');
    const newAccount = {
      provider: 'Supabase',
      account_name: 'Supabase Master Account',
      account_identifier: null // Safely set to NULL as it cannot be guessed
    };

    const { data: insertData, error: insertErr } = await supabaseAdmin
      .from('provider_accounts')
      .insert(newAccount)
      .select('id, provider, account_name, account_identifier')
      .single();

    if (insertErr || !insertData) {
      console.error('[FAIL] Insert provider_accounts:', insertErr?.message || 'Unknown error');
      return;
    }
    
    accountId = insertData.id;
    accountName = insertData.account_name;
    accountIdentifier = insertData.account_identifier;
    console.log('[PASS] Created provider_accounts successfully.');
  }

  // 6. Output Metadata
  console.log('\n--- PHASE 2A RESULT METADATA ---');
  console.log(`provider_account_id: ${accountId}`);
  console.log(`provider: Supabase`);
  console.log(`account_name: ${accountName}`);
  console.log(`account_identifier: ${accountIdentifier === null ? 'NULL' : accountIdentifier}`);
  console.log(`project target: ${projectData.project_name} (${projectData.id})`);
  console.log(`current provider_account_id on target: ${projectData.provider_account_id === null ? 'NULL' : projectData.provider_account_id}`);
}

executePhase2A().catch(err => console.error('\n🚨 FATAL ERROR 🚨', err));
