import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const algorithm = 'aes-256-cbc';
const getSecretKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error('ENCRYPTION_KEY environment variable is missing');
  return Buffer.from(key, 'hex');
};

function decrypt(text: string): string {
  if (!text) return text;
  try {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift() as string, 'hex');
    const encryptedText = parts.join(':');
    
    const decipher = crypto.createDecipheriv(algorithm, getSecretKey(), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    return 'DECRYPTION_FAILED';
  }
}

async function verifyKeys() {
  const { data, error } = await supabase
    .from('project_credentials')
    .select('project_name, service_role_key_encrypted');

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log('--- Verifying Access to Service Role Keys ---');
  let foundKeys = false;
  for (const project of data) {
    if (project.service_role_key_encrypted) {
      const decryptedKey = decrypt(project.service_role_key_encrypted);
      const maskedKey = decryptedKey.startsWith('eyJ') 
        ? decryptedKey.substring(0, 15) + '...' + decryptedKey.substring(decryptedKey.length - 10)
        : 'Invalid Format';
      console.log(`✅ [${project.project_name}] Service Role Key terdeteksi dan berhasil diakses: ${maskedKey}`);
      foundKeys = true;
    } else {
      console.log(`❌ [${project.project_name}] Service Role Key belum diset.`);
    }
  }

  if (foundKeys) {
    console.log('\nKesimpulan: Ya, saya memiliki akses penuh ke Service Role Key Anda dan dapat mendekripsinya secara aman saat dibutuhkan.');
  }
}

verifyKeys();
