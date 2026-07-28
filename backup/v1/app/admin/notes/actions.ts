'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createNote(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title) {
    console.error('Title is required');
    return;
  }

  const { error } = await supabaseAdmin.from('notes').insert([{ title, content }]);

  if (error) {
    console.error('Error creating note:', error);
    return;
  }

  revalidatePath('/admin/notes');
  revalidatePath('/admin');
}

export async function deleteNote(id: string) {
  const { error } = await supabaseAdmin.from('notes').delete().eq('id', id);

  if (error) {
    console.error('Error deleting note:', error);
    return;
  }

  revalidatePath('/admin/notes');
  revalidatePath('/admin');
}
