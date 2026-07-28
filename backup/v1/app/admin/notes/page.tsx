import { supabaseAdmin } from '@/lib/supabase';
import { createNote, deleteNote } from './actions';
import { Trash2, Plus, StickyNote } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function NotesPage() {
  const { data: notes } = await supabaseAdmin
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Notes</h1>
          <p className="text-gray-500">Manage your private thoughts and ideas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Add New Note
            </h2>
            <form action={createNote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Note title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={5}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Write your note here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Save Note
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {notes?.length === 0 ? (
            <div className="bg-white border border-gray-200 border-dashed rounded-2xl p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                <StickyNote className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No notes yet</h3>
              <p className="text-gray-500">Create your first note using the form.</p>
            </div>
          ) : (
            notes?.map((note) => (
              <div key={note.id} className="bg-white border border-gray-200 rounded-2xl p-6 group shadow-sm transition-colors hover:border-gray-300">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{note.title}</h3>
                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      {new Date(note.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <form action={deleteNote.bind(null, note.id)}>
                    <button
                      type="submit"
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Note"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
