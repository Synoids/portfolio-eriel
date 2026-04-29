import { supabaseAdmin } from '@/lib/supabase';
import { StickyNote, Database } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Prevent caching for dashboard data

export default async function AdminDashboardPage() {
  const [notesResult, databasesResult] = await Promise.all([
    supabaseAdmin.from('notes').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('project_credentials').select('id', { count: 'exact', head: true }),
  ]);

  const stats = [
    {
      name: 'Total Notes',
      value: notesResult.count || 0,
      icon: StickyNote,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      href: '/admin/notes'
    },
    {
      name: 'Total Databases',
      value: databasesResult.count || 0,
      icon: Database,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      href: '/admin/databases'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Admin</h1>
        <p className="text-gray-500">Here&apos;s an overview of your secure data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.name} className="block group">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-colors hover:border-gray-300 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Security Status</h2>
        <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 px-4 py-3 rounded-lg border border-emerald-200">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-medium text-sm">System Secure - AES-256 Encryption Active</span>
        </div>
      </div>
    </div>
  );
}
