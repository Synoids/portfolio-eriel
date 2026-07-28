'use client';

import { useState } from 'react';
import { Plus, X, Eye, EyeOff } from 'lucide-react';
import { createCredential } from '@/app/admin/databases/actions';

export default function AddCredentialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [showProjectPassword, setShowProjectPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    try {
      await createCredential(formData);
      setIsOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
      >
        <Plus className="w-5 h-5" />
        Tambah Database
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 shrink-0">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Tambah Data Database
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="add-credential-form" onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Project Info</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="project_name">
                      Nama Project *
                    </label>
                    <input
                      id="project_name"
                      name="project_name"
                      type="text"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="e.g., Portfolio System"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="project_password">
                      Password Project
                    </label>
                    <div className="relative">
                      <input
                        id="project_password"
                        name="project_password"
                        type={showProjectPassword ? "text" : "password"}
                        className="w-full pl-4 pr-12 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowProjectPassword(!showProjectPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showProjectPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Info</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                      Alamat Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email_password">
                      Password Email
                    </label>
                    <div className="relative">
                      <input
                        id="email_password"
                        name="email_password"
                        type={showEmailPassword ? "text" : "password"}
                        className="w-full pl-4 pr-12 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowEmailPassword(!showEmailPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showEmailPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="notes">
                    Notes Tambahan (Host, Port, dll)
                  </label>
                  <input
                    id="notes"
                    name="notes"
                    type="text"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="URL Database / Catatan Lainnya"
                  />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-200 shrink-0 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                form="add-credential-form"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
