-- ═══════════════════════════════════════════════════════════════════════════
-- SUPABASE SECURITY FIX: Enable Row-Level Security (RLS) & Revoke Public Access
-- ═══════════════════════════════════════════════════════════════════════════
-- RUN THIS IN YOUR SUPABASE PROJECT'S SQL EDITOR:
--   1. Go to: https://supabase.com/dashboard/project/srwmkciescfhnrrfwssx/sql
--   2. Click "New Query"
--   3. Paste this entire script and click "Run"
--
-- What this does:
--   1. Enables Row-Level Security (RLS) on all 9 public tables.
--   2. Revokes public/anonymous access via PostgREST REST API.
--   3. Resolves both 'rls_disabled_in_public' and 'sensitive_columns_exposed' warnings.
--   4. Your backend on Vercel continues working 100% because it uses the SERVICE ROLE key.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Enable RLS on all public tables
ALTER TABLE IF EXISTS users            ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sessions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS messages         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS learnings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS preferences      ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS global_stats     ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS command_cache    ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS admin_rules      ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS visitor_messages ENABLE ROW LEVEL SECURITY;

-- 2. Revoke all default public/anon permissions from public schema tables
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated;

-- 3. Grant full permissions to service_role (used by your Node.js backend)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- 4. Verify RLS is active on all tables (all rows should show rls_enabled = true)
SELECT 
    schemaname,
    tablename,
    rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

