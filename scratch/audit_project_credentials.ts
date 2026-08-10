
import { supabaseAdmin } from '../lib/supabase';
async function run() {
  const { data } = await supabaseAdmin.from('project_credentials').select('*').limit(1);
  if (data && data.length > 0) {
    console.log(Object.keys(data[0]));
  }
}
run().catch(console.error);

