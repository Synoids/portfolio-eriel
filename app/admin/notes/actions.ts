'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createNote(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title) return { error: 'Title is required' };

  const { error } = await supabaseAdmin.from('notes').insert([{ title, content }]);

  if (error) {
    console.error('Error creating note:', error);
    return { error: 'Failed to create note' };
  }

  revalidatePath('/admin/notes');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteNote(id: string) {
  const { error } = await supabaseAdmin.from('notes').delete().eq('id', id);

  if (error) {
    console.error('Error deleting note:', error);
    return { error: 'Failed to delete note' };
  }

  revalidatePath('/admin/notes');
  revalidatePath('/admin');
  return { success: true };
}
