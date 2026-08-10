'use client';

import { useState } from 'react';
import { FileText, X, ExternalLink, ShieldAlert, Server } from 'lucide-react';
import { Provider, Environment } from '@/lib/constants';
import { getDecryptedPassword } from '@/app/admin/databases/actions';
import { generateDashboardUrl } from '@/lib/infrastructure/utils/generateDashboardUrl';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

type CredentialType = {
  id: string;
  project_name: string;
  notes?: string;
  project_password_encrypted: string | null;
  email?: string;
  email_password_encrypted: string | null;
  project_url?: string;
  project_id?: string;
  region?: string;
  provider?: Provider;
  environment?: Environment;
  anon_key_encrypted?: string | null;
  service_role_key_encrypted?: string | null;
  created_at?: string;
  updated_at?: string;
};

// Reusing PasswordField logic specifically for the detail modal to keep it styled
function DetailPasswordField({ encryptedValue, placeholder = '••••••••' }: { encryptedValue: string | null | undefined, placeholder?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState(placeholder);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!encryptedValue) {
    return <span className="text-gray-500 text-sm italic">Not set</span>;
  }

  const toggleVisibility = async () => {
    if (isVisible) {
      setIsVisible(false);
      setPassword(placeholder);
    } else {
      setIsLoading(true);
      const res = await getDecryptedPassword(encryptedValue);
      if (res.success && res.password) {
        setPassword(res.password);
        setIsVisible(true);
      } else {
        alert('Failed to decrypt value');
      }
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    let textToCopy = password;
    if (!isVisible) {
      const res = await getDecryptedPassword(encryptedValue);
      if (res.success && res.password) {
        textToCopy = res.password;
      }
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-gray-700 break-all bg-gray-50 px-2 py-1 rounded border border-gray-200 min-w-[200px]">
        {isLoading ? '...' : password}
      </span>
      <button
        onClick={toggleVisibility}
        disabled={isLoading}
        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        title={isVisible ? 'Hide' : 'Show'}
      >
        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
      <button
        onClick={copyToClipboard}
        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        title="Copy"
      >
        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default function DetailCredentialModal({ credential }: { credential: CredentialType }) {
  const [isOpen, setIsOpen] = useState(false);

  const provider = credential.provider || 'Supabase';
  const environment = credential.environment || 'Development';
  
  const dashboardUrl = generateDashboardUrl(provider, credential.project_id);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="View Details"
      >
        <FileText className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm text-left">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 shrink-0 bg-gray-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg border border-blue-200">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {credential.project_name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                      {provider}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      environment === 'Production' ? 'bg-green-100 text-green-700 border border-green-200' :
                      environment === 'Testing' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                      'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {environment}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {dashboardUrl && (
                  <a
                    href={dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    Open Dashboard
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-200 p-1.5 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Metadata Section */}
              <section className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  Metadata
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-gray-500 mb-1">Project ID</span>
                    <span className="font-mono text-gray-900">{credential.project_id || '-'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Region</span>
                    <span className="text-gray-900">{credential.region || '-'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Created At</span>
                    <span className="text-gray-900">{credential.created_at ? new Date(credential.created_at).toLocaleString() : '-'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Updated At</span>
                    <span className="text-gray-900">{credential.updated_at ? new Date(credential.updated_at).toLocaleString() : '-'}</span>
                  </div>
                </div>
              </section>

              {/* Project Information Section */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">
                  Project Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="block text-gray-500 mb-1">Project URL</span>
                    {credential.project_url ? (
                      <a href={credential.project_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-mono">
                        {credential.project_url}
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">Not set</span>
                    )}
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Email / Username</span>
                    <span className="text-gray-900">{credential.email || <span className="text-gray-400 italic">Not set</span>}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">Notes</span>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap text-gray-700 font-mono text-xs">
                      {credential.notes || <span className="text-gray-400 italic font-sans">No notes available.</span>}
                    </div>
                  </div>
                </div>
              </section>

              {/* Credentials Section */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2 border-b border-red-100 pb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Credentials & Secrets
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <span className="text-sm font-medium text-gray-700">Project Password</span>
                    <div className="col-span-2">
                      <DetailPasswordField encryptedValue={credential.project_password_encrypted} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <span className="text-sm font-medium text-gray-700">Email Password</span>
                    <div className="col-span-2">
                      <DetailPasswordField encryptedValue={credential.email_password_encrypted} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <span className="text-sm font-medium text-gray-700">Anon Key</span>
                    <div className="col-span-2">
                      <DetailPasswordField encryptedValue={credential.anon_key_encrypted} placeholder="eyJh..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <span className="text-sm font-medium text-gray-700">Service Role Key</span>
                    <div className="col-span-2">
                      <DetailPasswordField encryptedValue={credential.service_role_key_encrypted} placeholder="eyJh..." />
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
