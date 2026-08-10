import { getProviderAccountsAction } from './actions';
import { CredentialManagementClient } from '@/components/admin/credentials/CredentialManagementClient';

export default async function CredentialsPage() {
  const accounts = await getProviderAccountsAction();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Credential Management</h1>
        <p className="text-slate-400">
          Securely manage Provider Accounts and highly-privileged Management API Tokens.
          Tokens are encrypted immediately and can never be retrieved or viewed.
        </p>
      </div>

      <CredentialManagementClient initialAccounts={accounts} />
    </div>
  );
}
