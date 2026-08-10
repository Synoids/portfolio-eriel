'use client';

import { useState } from 'react';
import { ProviderAccount } from '@/lib/infrastructure/credentials/types';
import { createProviderAccountAction, upsertManagementCredentialAction } from '@/app/admin/credentials/actions';

export function CredentialManagementClient({ initialAccounts }: { initialAccounts: ProviderAccount[] }) {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  // New Account State
  const [showNewAccount, setShowNewAccount] = useState(false);

  // Token Input State
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [tokenInput, setTokenInput] = useState('');

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await createProviderAccountAction(formData);
      if (res.success && res.data) {
        setAccounts([res.data, ...accounts]);
        setShowNewAccount(false);
        setMessage({ text: 'Provider Account created successfully.', type: 'success' });
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ text: res.error || 'Failed to create account.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'An unexpected error occurred.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCredential = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await upsertManagementCredentialAction(formData);
      if (res.success) {
        setMessage({ text: 'Credential tersimpan dengan aman. Token tidak dapat ditampilkan kembali.', type: 'success' });
        setTokenInput(''); // Clear immediately from state
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ text: res.error || 'Failed to save credential.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'An unexpected error occurred saving the credential.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Accounts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Provider Accounts</h2>
          <button 
            onClick={() => setShowNewAccount(!showNewAccount)}
            className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-md text-sm font-medium hover:bg-blue-500/30 transition-colors"
          >
            {showNewAccount ? 'Cancel' : '+ New Account'}
          </button>
        </div>

        {showNewAccount && (
          <form onSubmit={handleCreateAccount} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Provider</label>
              <select name="provider" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" required>
                <option value="Supabase">Supabase</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Account Name</label>
              <input type="text" name="accountName" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. Personal, Corp" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Account Identifier (Optional)</label>
              <input type="text" name="accountIdentifier" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. org_12345" />
            </div>
            <button disabled={isLoading} type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50">
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        )}

        <div className="space-y-3">
          {accounts.map(acc => (
            <div key={acc.id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">{acc.accountName}</p>
                <p className="text-xs text-slate-500">{acc.provider} {acc.accountIdentifier && `• ${acc.accountIdentifier}`}</p>
              </div>
              <div className="text-xs text-slate-500">
                Created: {new Date(acc.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          {accounts.length === 0 && (
            <div className="text-sm text-slate-500 italic py-4">No accounts configured yet.</div>
          )}
        </div>
      </div>

      {/* Credential Manager */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Update Management Token</h2>
        
        {message && (
          <div className={`p-3 rounded-lg text-sm border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdateCredential} className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Target Account</label>
            <select 
              name="accountId" 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500" 
              required
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="" disabled>Select an account...</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.accountName} ({acc.provider})</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Credential Type</label>
            <select name="credentialType" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500" required>
              <option value="management_api">Management API Token (PAT)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">New Token Value</label>
            <input 
              type="password" 
              name="token" 
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600" 
              placeholder="sbp_xxxxxxxxxxxxxxxxx" 
              required 
            />
            <p className="text-xs text-amber-500/80 mt-2 font-medium">
              Warning: This token will be immediately encrypted. It can NEVER be viewed again after submission.
            </p>
          </div>

          <button 
            disabled={isLoading || !selectedAccount || !tokenInput} 
            type="submit" 
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Encrypting & Saving...' : 'Save Credential'}
          </button>
        </form>
      </div>
    </div>
  );
}
