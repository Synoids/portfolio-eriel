'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { encrypt, decrypt } from '@/lib/crypto';
import { revalidatePath } from 'next/cache';

export async function createCredential(formData: FormData) {
  const project_name = formData.get('project_name') as string;
  const project_password = formData.get('project_password') as string;
  const email = formData.get('email') as string;
  const email_password = formData.get('email_password') as string;
  const notes = formData.get('notes') as string;

  if (!project_name) {
    throw new Error('Project name is required');
  }

  // Encrypt passwords if they are provided
  const project_password_encrypted = project_password ? encrypt(project_password) : null;
  const email_password_encrypted = email_password ? encrypt(email_password) : null;

  const { error } = await supabaseAdmin.from('project_credentials').insert([{
    project_name,
    project_password_encrypted,
    email,
    email_password_encrypted,
    notes
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
    throw new Error('Failed to delete credential record: ' + error.message);
  }

  revalidatePath('/admin/databases');
  revalidatePath('/admin');
  return { success: true };
}

export async function updateCredential(id: string, formData: FormData) {
  const project_name = formData.get('project_name') as string;
  const project_password = formData.get('project_password') as string;
  const email = formData.get('email') as string;
  const email_password = formData.get('email_password') as string;
  const notes = formData.get('notes') as string;

  if (!project_name) {
    throw new Error('Project name is required');
  }

  const updates: any = {
    project_name,
    email,
    notes,
  };

  // Only update passwords if they are provided (not empty)
  if (project_password) {
    updates.project_password_encrypted = encrypt(project_password);
  }
  if (email_password) {
    updates.email_password_encrypted = encrypt(email_password);
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
export async function getDecryptedPassword(encryptedPassword: string) {
  try {
    if (!encryptedPassword) return { success: true, password: '' };
    return { success: true, password: decrypt(encryptedPassword) };
  } catch (error) {
    return { error: 'Decryption failed' };
  }
}
