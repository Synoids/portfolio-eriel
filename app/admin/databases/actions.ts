'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { encrypt, decrypt } from '@/lib/crypto';
import { extractProjectId } from '@/lib/infrastructure/utils/extractProjectId';
import { revalidatePath } from 'next/cache';

export async function createCredential(formData: FormData) {
  const project_name = formData.get('project_name') as string;
  const project_password = formData.get('project_password') as string;
  const email = formData.get('email') as string;
  const email_password = formData.get('email_password') as string;
  const notes = formData.get('notes') as string;
  
  const project_url = formData.get('project_url') as string;
  const region = formData.get('region') as string;
  const provider = formData.get('provider') as string || 'Supabase';
  const environment = formData.get('environment') as string || 'Development';
  const anon_key = formData.get('anon_key') as string;
  const service_role_key = formData.get('service_role_key') as string;

  if (!project_name) {
    throw new Error('Project name is required');
  }

  // Encrypt passwords if they are provided
  const project_password_encrypted = project_password ? encrypt(project_password) : null;
  const email_password_encrypted = email_password ? encrypt(email_password) : null;
  const anon_key_encrypted = anon_key ? encrypt(anon_key) : null;
  const service_role_key_encrypted = service_role_key ? encrypt(service_role_key) : null;

  const project_id = extractProjectId(project_url, provider) || '';

  const { error } = await supabaseAdmin.from('project_credentials').insert([{
    project_name,
    project_password_encrypted,
    email,
    email_password_encrypted,
    notes,
    project_url,
    project_id: project_id || null,
    region,
    provider,
    environment,
    anon_key_encrypted,
    service_role_key_encrypted,
  }]);

  if (error) {
    console.error('Error creating credential record:', error);
    throw new Error('Failed to create credential record: ' + error.message);
  }

  revalidatePath('/admin/databases');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteCredential(id: string) {
  const { error } = await supabaseAdmin.from('project_credentials').delete().eq('id', id);

  if (error) {
    console.error('Error deleting credential record:', error);
    return;
  }

  revalidatePath('/admin/databases');
  revalidatePath('/admin');
}

export async function updateCredential(id: string, formData: FormData) {
  const project_name = formData.get('project_name') as string;
  const project_password = formData.get('project_password') as string;
  const email = formData.get('email') as string;
  const email_password = formData.get('email_password') as string;
  const notes = formData.get('notes') as string;

  const project_url = formData.get('project_url') as string;
  const region = formData.get('region') as string;
  const provider = formData.get('provider') as string || 'Supabase';
  const environment = formData.get('environment') as string || 'Development';
  const anon_key = formData.get('anon_key') as string;
  const service_role_key = formData.get('service_role_key') as string;

  if (!project_name) {
    throw new Error('Project name is required');
  }

  const project_id = extractProjectId(project_url, provider) || '';

  const updates: Record<string, string | null> = {
    project_name,
    email,
    notes,
    project_url,
    project_id: project_id || null,
    region,
    provider,
    environment,
    updated_at: new Date().toISOString(),
  };

  // Only update passwords if they are provided (not empty)
  if (project_password) {
    updates.project_password_encrypted = encrypt(project_password);
  }
  if (email_password) {
    updates.email_password_encrypted = encrypt(email_password);
  }
  if (anon_key) {
    updates.anon_key_encrypted = encrypt(anon_key);
  }
  if (service_role_key) {
    updates.service_role_key_encrypted = encrypt(service_role_key);
  }

  const { error } = await supabaseAdmin
    .from('project_credentials')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error updating credential record:', error);
    throw new Error('Failed to update credential record: ' + error.message);
  }

  revalidatePath('/admin/databases');
  revalidatePath('/admin');
  return { success: true };
}

// Separate Server Action to Decrypt a specific password on demand
export async function getDecryptedPassword(encryptedPassword: string | null) {
  try {
    if (!encryptedPassword) return { success: true, password: '' };
    return { success: true, password: decrypt(encryptedPassword) };
  } catch {
    return { error: 'Decryption failed' };
  }
}
