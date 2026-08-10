import { fetchMonitoringOverview, refreshMonitoring } from './actions';
import OverviewCard from '@/components/admin/monitoring/OverviewCard';
import StatusBadge from '@/components/admin/monitoring/StatusBadge';
import { CheckProjectButton, CheckAllButton, WakeProjectButton } from '@/components/admin/monitoring/CheckButtons';
import { Database, CheckCircle2, PauseCircle, XCircle, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Monitoring Dashboard | Admin',
};

export default async function MonitoringDashboard() {
  const data = await fetchMonitoringOverview();
  
  if (!data) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load monitoring data. Please check your database connection.
      </div>
    );
  }

  const { overview, projects } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monitoring Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time overview of your infrastructure health</p>
        </div>
        <div className="flex items-center gap-3">
          <form action={async () => {
            'use server';
            await refreshMonitoring();
          }}>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </form>
          <CheckAllButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <OverviewCard 
          title="Total Projects" 
          value={overview.totalProjects} 
          icon={Database} 
          colorClass="bg-blue-50 text-blue-600" 
        />
        <OverviewCard 
          title="Healthy" 
          value={overview.healthy} 
          icon={CheckCircle2} 
          colorClass="bg-green-50 text-green-600" 
        />
        <OverviewCard 
          title="Paused" 
          value={overview.paused} 
          icon={PauseCircle} 
          colorClass="bg-yellow-50 text-yellow-600" 
        />
        <OverviewCard 
          title="Offline" 
          value={overview.offline} 
          icon={XCircle} 
          colorClass="bg-red-50 text-red-600" 
        />
        <OverviewCard 
          title="Not Checked" 
          value={overview.notChecked} 
          icon={HelpCircle} 
          colorClass="bg-gray-50 text-gray-500" 
        />
        <OverviewCard 
          title="Unknown" 
          value={overview.unknown} 
          icon={AlertCircle} 
          colorClass="bg-orange-50 text-orange-500" 
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Project Status</h2>
        </div>
        <div className="overflow-x-auto">
          {projects.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Database className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>No projects registered in the database.</p>
              <p className="text-sm mt-1">Add projects from the Databases tab to start monitoring.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Project Name</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Environment</th>
                  <th className="px-6 py-4">Region</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Latency</th>
                  <th className="px-6 py-4 text-right">Last Checked</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/monitoring/${project.id}`} className="font-medium text-blue-600 hover:underline">
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.provider}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.environment}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.region || '-'}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {project.latency !== null ? `${project.latency} ms` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right">
                      {project.lastChecked 
                        ? new Date(project.lastChecked).toLocaleString('en-GB', { 
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                          }) 
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      {project.status === 'paused' && (
                        <WakeProjectButton registryId={project.id} />
                      )}
                      <CheckProjectButton registryId={project.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
