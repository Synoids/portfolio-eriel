import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase URL or Service Role Key is missing from environment variables.');
}

// This client uses the Service Role Key to bypass RLS.
// It MUST ONLY be used on the server-side (Server Actions, Route Handlers, Server Components).
// Never expose this client to the browser.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
