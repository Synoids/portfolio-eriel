import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const algorithm = 'aes-256-cbc';
const getSecretKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error('ENCRYPTION_KEY environment variable is missing');
  if (key.length !== 64) throw new Error('ENCRYPTION_KEY must be a 64-character hex string');
  return Buffer.from(key, 'hex');
};

function encrypt(text: string): string {
  if (!text) return text;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, getSecretKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

async function fixFinanceTracker() {
  const data = {
    provider: "Supabase",
    environment: "Development",
    project_url: "https://rcwoxctedzwndkewtjaf.supabase.co",
    region: "",
    anon_key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjd294Y3RlZHp3bmRrZXd0amFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNjY3MjAsImV4cCI6MjA5MTY0MjcyMH0.NHOzHMQwDF4gNPz10E1CFtTesw3sgNo5azjcZ63hnE4",
  };

  const anon_key_encrypted = data.anon_key ? encrypt(data.anon_key) : null;
  let project_id = '';
  if (data.project_url) {
    const match = data.project_url.match(/^https?:\/\/([a-z0-9-]+)\.supabase\.co/i);
    if (match) project_id = match[1];
  }

  // 1. Update the old record
  const { error: updateError, data: updateData } = await supabase
    .from('project_credentials')
    .update({
      project_url: data.project_url,
      project_id: project_id,
      provider: data.provider,
      environment: data.environment,
      anon_key_encrypted: anon_key_encrypted,
      updated_at: new Date().toISOString()
    })
    .eq('project_name', 'Finance Tracker')
    .select();

  if (updateError) {
    console.error('Error updating old record:', updateError);
  } else {
    console.log('Successfully updated old record:', updateData?.length ? 'Yes' : 'Not found');
  }

  // 2. Delete the new record
  const { error: deleteError } = await supabase
    .from('project_credentials')
    .delete()
    .eq('project_name', 'finance-tracker');

  if (deleteError) {
    console.error('Error deleting new record:', deleteError);
  } else {
    console.log('Successfully deleted the new duplicate record!');
  }
}

fixFinanceTracker();
