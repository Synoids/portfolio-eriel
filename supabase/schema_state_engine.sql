-- Sprint 3.5: Infrastructure State Engine SQL Schema
-- Execute this directly in your Supabase SQL Editor

-- 1. Create project_health_current table (Upsert logic based on project_id)
CREATE TABLE IF NOT EXISTS public.project_health_current (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id TEXT NOT NULL UNIQUE, -- Unique constraint to enforce 1 record per project
    status TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    latency INTEGER,
    message TEXT NOT NULL,
    provider TEXT NOT NULL,
    environment TEXT,
    checked_at TIMESTAMP WITH TIME ZONE NOT NULL,
    debug_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookup by status/environment on current table
CREATE INDEX IF NOT EXISTS idx_health_current_status ON public.project_health_current (status);
CREATE INDEX IF NOT EXISTS idx_health_current_environment ON public.project_health_current (environment);


-- 2. Create project_health_history table (Append only)
CREATE TABLE IF NOT EXISTS public.project_health_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id TEXT NOT NULL, -- No unique constraint here because it's history
    status TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    latency INTEGER,
    message TEXT NOT NULL,
    provider TEXT NOT NULL,
    environment TEXT,
    checked_at TIMESTAMP WITH TIME ZONE NOT NULL,
    debug_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for analytics and history rendering
CREATE INDEX IF NOT EXISTS idx_health_history_project_id ON public.project_health_history (project_id);
CREATE INDEX IF NOT EXISTS idx_health_history_created_at ON public.project_health_history (created_at DESC);


-- 3. Add updated_at trigger for project_health_current
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_project_health_current_updated_at ON public.project_health_current;

CREATE TRIGGER update_project_health_current_updated_at
    BEFORE UPDATE ON public.project_health_current
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
