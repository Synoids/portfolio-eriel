
import { supabaseAdmin } from '../lib/supabase';
async function checkSchema() {
  const { data, error } = await supabaseAdmin.from('provider_accounts').select('id').limit(1);
  if (error) {
    console.log('Error provider_accounts:', error.message);
  } else {
    console.log('provider_accounts EXISTS.');
  }
}
checkSchema().catch(console.error);

