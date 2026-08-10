import { supabaseAdmin } from '../../supabase';
import { decrypt } from '../../crypto';
import { Provider } from '../../constants';
import { ConsoleLogger } from '../logging/ConsoleLogger';
import { Logger } from '../logging/Logger';

/**
 * A strictly server-side abstraction for resolving Provider Management Credentials.
 * Enforces strict multi-account isolation.
 */
export class CredentialResolver {
  private logger: Logger;

  constructor(logger: Logger = new ConsoleLogger()) {
    this.logger = logger;
  }

  /**
   * Resolves a Management Credential for a specific account and provider.
   * STRICT MULTI-ACCOUNT ISOLATION: Forces filtering by `provider_account_id` at the database level.
   * 
   * @param accountId The specific ProviderAccount ID to search within.
   * @param provider The targeted Provider (e.g., 'Supabase'). Acts as a safety net against cross-provider token usage.
   * @param credentialType The type of credential to resolve (e.g., 'management_api').
   * @returns The decrypted token plaintext, or null if not found/failed to decrypt.
   */
  public async resolveCredential(
    accountId: string,
    provider: Provider,
    credentialType: string
  ): Promise<string | null> {
    try {
      // 1. Direct DB Query ensuring strict isolation (No fetching all credentials).
      // We must query both the credential table and join with the account table to verify the provider.
      
      const { data, error } = await supabaseAdmin
        .from('provider_management_credentials')
        .select(`
          token_encrypted,
          status,
          provider_accounts!inner ( provider )
        `)
        .eq('provider_account_id', accountId)
        .eq('credential_type', credentialType)
        .eq('status', 'active')
        .eq('provider_accounts.provider', provider)
        .single();

      if (error || !data) {
        // Safe null return. Does not throw or leak context to UI.
        this.logger.info(`CredentialResolver: No active ${credentialType} found for account ${accountId}`);
        return null;
      }

      // 2. Decrypt the token
      const plainToken = decrypt(data.token_encrypted);
      if (plainToken === 'Decryption Error' || !plainToken) {
        // IMPORTANT: NEVER log the ciphertext or plaintext or include it in error messages.
        this.logger.error(`CredentialResolver: Decryption failed for ${credentialType} on account ${accountId}`);
        return null;
      }

      return plainToken;
    } catch (err) {
      // Fail safely. Do not throw.
      this.logger.error(`CredentialResolver: Unexpected error resolving ${credentialType} for account ${accountId}`);
      return null;
    }
  }
}
