import { supabaseAdmin } from '@/lib/supabase';
import { Database } from 'lucide-react';
import AddCredentialModal from '@/components/admin/AddCredentialModal';
import CredentialRow from '@/components/admin/CredentialRow';

export const dynamic = 'force-dynamic';

export default async function DatabasesPage() {
  const { data: credentials } = await supabaseAdmin
    .from('project_credentials')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Databases Manager</h1>
          <p className="text-gray-500">Securely store your project and database credentials.</p>
        </div>
        <AddCredentialModal />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {(!credentials || credentials.length === 0) ? (
          <div className="p-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6 border border-gray-200">
              <Database className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Belum Ada Data</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Silakan klik tombol &quot;Tambah Database&quot; di pojok kanan atas untuk menyimpan kredensial pertamamu.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-semibold">Project & Info</th>
                  <th className="p-4 font-semibold">Project Password</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Email Password</th>
                  <th className="p-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {credentials.map((cred) => (
                  <CredentialRow key={cred.id} credential={cred} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
