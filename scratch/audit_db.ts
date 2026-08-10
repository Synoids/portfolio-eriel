
import { supabaseAdmin } from '../lib/supabase';
async function runAudit() {
  console.log('Checking project_credentials columns...');
  const { data: cols, error: err1 } = await supabaseAdmin.rpc('get_columns', { table_name: 'project_credentials' });
  if (err1) {
    // Fallback: try selecting provider_account_id
    const { error: err2 } = await supabaseAdmin.from('project_credentials').select('provider_account_id').limit(1);
    console.log('provider_account_id exists in project_credentials?', err2 ? 'NO' : 'YES');
  }

  console.log('Checking provider_accounts table...');
  const { error: err3 } = await supabaseAdmin.from('provider_accounts').select('id').limit(1);
  console.log('provider_accounts exists?', err3 ? 'NO' : 'YES');

  console.log('Checking provider_management_credentials table...');
  const { error: err4 } = await supabaseAdmin.from('provider_management_credentials').select('id').limit(1);
  console.log('provider_management_credentials exists?', err4 ? 'NO' : 'YES');
}
runAudit().catch(console.error);

