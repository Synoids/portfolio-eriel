-- ==========================================
-- SPRINT 8: CREDENTIAL ARCHITECTURE SCHEMA
-- ==========================================
-- This file is for review purposes and is NOT automatically executed.

-- 1. Create provider accounts table
CREATE TABLE IF NOT EXISTS public.provider_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider VARCHAR(50) NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    account_identifier VARCHAR(100), -- E.g. Organization ID / Reference ID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create provider management credentials table
CREATE TABLE IF NOT EXISTS public.provider_management_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_account_id UUID NOT NULL REFERENCES public.provider_accounts(id) ON DELETE CASCADE,
    credential_type VARCHAR(50) NOT NULL, -- E.g., 'management_api'
    token_encrypted TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Constraint: Ensure an account only has one active credential per type
CREATE UNIQUE INDEX idx_unique_active_credential 
ON public.provider_management_credentials(provider_account_id, credential_type) 
WHERE status = 'active';

-- 3. Safely migrate existing project_credentials
-- Adds a nullable foreign key so old projects don't break.
ALTER TABLE public.project_credentials 
ADD COLUMN IF NOT EXISTS provider_account_id UUID REFERENCES public.provider_accounts(id) ON DELETE SET NULL;

-- Index for efficient lookup
CREATE INDEX IF NOT EXISTS idx_project_credentials_account_id ON public.project_credentials(provider_account_id);
