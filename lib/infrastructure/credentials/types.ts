import { Provider } from '../../constants';

/**
 * Represents a high-level provider account (e.g., a specific Supabase Organization).
 */
export interface ProviderAccount {
  id: string;
  provider: Provider;
  accountName: string;
  accountIdentifier?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Publicly safe metadata about a management credential.
 * CRITICAL: This MUST NEVER contain the decrypted token, plaintext token, or encrypted token,
 * ensuring it is safe to be serialized or passed to the UI/frontend.
 */
export interface ManagementCredentialMetadata {
  id: string;
  providerAccountId: string;
  provider: Provider;
  credentialType: 'management_api' | string;
  status: 'active' | 'revoked' | 'expired';
  createdAt: Date;
  updatedAt: Date;
  lastUsedAt?: Date | null;
  expiresAt?: Date | null;
}

/**
 * Internal/Server-only representation of a decrypted credential.
 * CRITICAL: This MUST NEVER leave the server context. 
 * Do NOT use this type in Server Actions that return data to the client.
 */
export interface DecryptedManagementCredential {
  providerAccountId: string;
  provider: Provider;
  credentialType: 'management_api' | string;
  tokenPlaintext: string;
}
