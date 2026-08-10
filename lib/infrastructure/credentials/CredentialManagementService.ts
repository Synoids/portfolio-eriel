import { supabaseAdmin } from '../../supabase';
import { encrypt } from '../../crypto';
import { Provider } from '../../constants';
import { ConsoleLogger } from '../logging/ConsoleLogger';
import { Logger } from '../logging/Logger';
import { ProviderAccount, ManagementCredentialMetadata } from './types';

export class CredentialManagementService {
  private logger: Logger;

  constructor(logger: Logger = new ConsoleLogger()) {
    this.logger = logger;
  }

  /**
   * Creates a new Provider Account. No secrets are handled here.
   */
  public async createProviderAccount(
    provider: Provider,
    accountName: string,
    accountIdentifier?: string
  ): Promise<ProviderAccount | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('provider_accounts')
        .insert([{ provider, account_name: accountName, account_identifier: accountIdentifier || null }])
        .select()
        .single();

      if (error || !data) {
        this.logger.error('CredentialManagementService: Failed to create provider account');
        return null;
      }

      return {
        id: data.id,
        provider: data.provider as Provider,
        accountName: data.account_name,
        accountIdentifier: data.account_identifier,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };
    } catch (err) {
      this.logger.error('CredentialManagementService: Unexpected error creating provider account');
      return null;
    }
  }

  /**
   * Retrieves all Provider Accounts.
   */
  public async getProviderAccounts(): Promise<ProviderAccount[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from('provider_accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        this.logger.error('CredentialManagementService: Failed to fetch provider accounts');
        return [];
      }

      return data.map(d => ({
        id: d.id,
        provider: d.provider as Provider,
        accountName: d.account_name,
        accountIdentifier: d.account_identifier,
        createdAt: new Date(d.created_at),
        updatedAt: new Date(d.updated_at),
      }));
    } catch (err) {
      this.logger.error('CredentialManagementService: Unexpected error fetching accounts');
      return [];
    }
  }

  /**
   * Safely creates or rotates a Management Credential for an account.
   * STRICT BOUNDARY: The plaintext token is encrypted immediately and never returned.
   */
  public async upsertManagementCredential(
    accountId: string,
    credentialType: string,
    plaintextToken: string
  ): Promise<ManagementCredentialMetadata | null> {
    if (!plaintextToken || plaintextToken.trim() === '') {
      this.logger.error('CredentialManagementService: Attempted to save empty token');
      return null;
    }

    try {
      // 1. Verify the account exists and fetch provider
      const { data: account, error: accError } = await supabaseAdmin
        .from('provider_accounts')
        .select('id, provider')
        .eq('id', accountId)
        .single();

      if (accError || !account) {
        this.logger.error('CredentialManagementService: Account not found for credential insertion');
        return null;
      }

      // 2. Encrypt token immediately
      const token_encrypted = encrypt(plaintextToken);

      // 3. Mark old credentials of the same type as revoked (Rotation)
      await supabaseAdmin
        .from('provider_management_credentials')
        .update({ status: 'revoked', updated_at: new Date().toISOString() })
        .eq('provider_account_id', accountId)
        .eq('credential_type', credentialType)
        .eq('status', 'active');

      // 4. Insert the new active encrypted token
      const { data: cred, error: credError } = await supabaseAdmin
        .from('provider_management_credentials')
        .insert([{
          provider_account_id: accountId,
          credential_type: credentialType,
          token_encrypted,
          status: 'active'
        }])
        .select()
        .single();

      if (credError || !cred) {
        this.logger.error('CredentialManagementService: Failed to save encrypted credential');
        return null;
      }

      this.logger.info(`CredentialManagementService: Credential updated successfully. Account: ${accountId} | Provider: ${account.provider} | Type: ${credentialType}`);

      // 5. Return strictly clean metadata
      return {
        id: cred.id,
        providerAccountId: cred.provider_account_id,
        provider: account.provider as Provider,
        credentialType: cred.credential_type,
        status: cred.status as any,
        createdAt: new Date(cred.created_at),
        updatedAt: new Date(cred.updated_at),
      };
    } catch (err) {
      this.logger.error('CredentialManagementService: Unexpected error during credential upsert');
      return null;
    }
  }

  /**
   * Retrieves strictly clean metadata for active credentials of an account.
   */
  public async getActiveCredentialMetadata(accountId: string): Promise<ManagementCredentialMetadata[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from('provider_management_credentials')
        .select(`
          id,
          provider_account_id,
          credential_type,
          status,
          created_at,
          updated_at,
          last_used_at,
          expires_at,
          provider_accounts!inner ( provider )
        `)
        .eq('provider_account_id', accountId)
        .eq('status', 'active');

      if (error || !data) {
        return [];
      }

      return data.map(d => ({
        id: d.id,
        providerAccountId: d.provider_account_id,
        provider: (d.provider_accounts as any).provider as Provider,
        credentialType: d.credential_type,
        status: d.status as any,
        createdAt: new Date(d.created_at),
        updatedAt: new Date(d.updated_at),
        lastUsedAt: d.last_used_at ? new Date(d.last_used_at) : null,
        expiresAt: d.expires_at ? new Date(d.expires_at) : null,
      }));
    } catch (err) {
      this.logger.error('CredentialManagementService: Unexpected error fetching metadata');
      return [];
    }
  }
}
