import { supabaseAdmin } from '../lib/supabase';
import { InfrastructureConfig } from '../lib/infrastructure/config';

async function runPreflight() {
  console.log('--- PHASE 1: PRE-FLIGHT ---');
  let pass = true;
  const assert = (cond: boolean, msg: string) => {
    if (cond) { console.log(`[PASS] ${msg}`); }
    else { console.error(`[FAIL] ${msg}`); pass = false; }
  };

  assert(!!process.env.CRON_SECRET, 'CRON_SECRET is available in environment');
  assert(!!process.env.ENCRYPTION_KEY, 'ENCRYPTION_KEY is available in environment');
  assert(InfrastructureConfig.WAKE_ENABLED === false, 'WAKE_ENABLED is explicitly false');

  try {
    const { data, error } = await supabaseAdmin.from('project_credentials').select('anon_key_encrypted').not('anon_key_encrypted', 'is', null).limit(1);
    assert(!error, 'Database registry is accessible');
    assert(data && data.length > 0 && !!data[0].anon_key_encrypted, 'Project registry has project with anon_key_encrypted');
  } catch (err) {
    assert(false, `Database error: ${err}`);
  }

  if (pass) {
    console.log('\nPRE-FLIGHT PASS');
  } else {
    console.log('\nPRE-FLIGHT FAIL');
  }
}

runPreflight().catch(console.error);
