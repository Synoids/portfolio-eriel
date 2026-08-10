'use server';

import { CredentialManagementService } from '@/lib/infrastructure/credentials/CredentialManagementService';
import { Provider } from '@/lib/constants';
import { revalidatePath } from 'next/cache';
import { ProviderAccount, ManagementCredentialMetadata } from '@/lib/infrastructure/credentials/types';

const service = new CredentialManagementService();

export async function createProviderAccountAction(
  formData: FormData
): Promise<{ success: boolean; data?: ProviderAccount; error?: string }> {
  const provider = formData.get('provider') as Provider;
  const accountName = formData.get('accountName') as string;
  const accountIdentifier = formData.get('accountIdentifier') as string | undefined;

  if (!provider || !accountName) {
    return { success: false, error: 'Provider and Account Name are required.' };
  }

  const result = await service.createProviderAccount(provider, accountName, accountIdentifier);
  if (!result) {
    return { success: false, error: 'Failed to create provider account.' };
  }

  revalidatePath('/admin/credentials');
  return { success: true, data: result };
}

export async function upsertManagementCredentialAction(
  formData: FormData
): Promise<{ success: boolean; data?: ManagementCredentialMetadata; error?: string }> {
  const accountId = formData.get('accountId') as string;
  const credentialType = formData.get('credentialType') as string;
  const token = formData.get('token') as string;

  if (!accountId || !credentialType || !token) {
    return { success: false, error: 'Account, credential type, and token are required.' };
  }

  // The plaintext token is passed directly to the service. 
  // It is NOT returned to the client under any circumstance.
  const result = await service.upsertManagementCredential(accountId, credentialType, token);
  
  if (!result) {
    return { success: false, error: 'Failed to save credential safely.' };
  }

  revalidatePath('/admin/credentials');
  return { success: true, data: result }; // `data` is exclusively safe metadata
}

export async function getProviderAccountsAction(): Promise<ProviderAccount[]> {
  return await service.getProviderAccounts();
}

export async function getActiveCredentialMetadataAction(accountId: string): Promise<ManagementCredentialMetadata[]> {
  return await service.getActiveCredentialMetadata(accountId);
}
