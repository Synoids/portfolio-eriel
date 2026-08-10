import { fetchMonitoringDetail } from '../actions';
import StatusBadge from '@/components/admin/monitoring/StatusBadge';
import { CheckProjectButton } from '@/components/admin/monitoring/CheckButtons';
import Link from 'next/link';
import { ArrowLeft, Server, Activity, Clock, FileText, Globe } from 'lucide-react';

export const metadata = {
  title: 'Project Details | Monitoring',
};

// Next.js 15 requires params to be a Promise.
export default async function ProjectDetail({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = await params;
  const detail = await fetchMonitoringDetail(resolvedParams.projectId);

  if (!detail) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Project Not Found</h2>
        <p className="text-gray-500 mt-2">The requested project could not be found or has been deleted.</p>
        <Link href="/admin/monitoring" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  const { project, message, projectUrl, createdAt, historyPreview } = detail;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/monitoring" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4 inline-flex">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
        </div>
        <div>
          <CheckProjectButton registryId={project.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Project Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1"><Server className="w-4 h-4" /> Provider</p>
              <p className="font-medium text-gray-900 mt-1">{project.provider}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1"><Globe className="w-4 h-4" /> Environment</p>
              <p className="font-medium text-gray-900 mt-1">{project.environment}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">URL</p>
              <a href={projectUrl || '#'} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline mt-1 truncate block">
                {projectUrl || 'Not specified'}
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-500">Region</p>
              <p className="font-medium text-gray-900 mt-1">{project.region || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registered At</p>
              <p className="font-medium text-gray-900 mt-1">
                {createdAt ? new Date(createdAt).toLocaleDateString('en-GB') : '-'}
              </p>
            </div>
          </div>
        </div>

        {/* Current State Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Current State</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1"><Activity className="w-4 h-4" /> Latency</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {project.latency !== null ? `${project.latency} ms` : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1"><FileText className="w-4 h-4" /> Message</p>
              <p className="font-medium text-gray-900 mt-1">{message || 'No specific message recorded.'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1"><Clock className="w-4 h-4" /> Last Checked</p>
              <p className="font-medium text-gray-900 mt-1">
                {project.lastChecked 
                  ? new Date(project.lastChecked).toLocaleString('en-GB') 
                  : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Basic History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Checks (Top 10)</h2>
        </div>
        <div className="overflow-x-auto">
          {historyPreview.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No history recorded for this project yet.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {historyPreview.map((record, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(record.checkedAt).toLocaleString('en-GB')}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.latency !== null ? `${record.latency} ms` : '-'}
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
