-- ═══════════════════════════════════════════════════════════════════════════
-- SUPABASE SECURITY FIX: Enable Row-Level Security (RLS)
-- ═══════════════════════════════════════════════════════════════════════════
-- RUN THIS IN YOUR SUPABASE PROJECT'S SQL EDITOR:
--   Supabase Dashboard → SQL Editor → New Query → Paste & Run
--
-- What this does:
--   Enables RLS on all public tables, blocking unauthenticated/anonymous
--   access via the public REST API. Your server (using the Service Role
--   key) will continue to work normally since it bypasses RLS.
--
-- ⚠️  IMPORTANT: Make sure your SUPABASE_KEY env var on Vercel is set to
--   your SERVICE ROLE key (NOT the anon/public key). You can find it in:
--   Supabase Dashboard → Project Settings → API → service_role (secret)
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE users            ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages         ENABLE ROW LEVEL SECURITY;
ALTER TABLE learnings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferences      ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_stats     ENABLE ROW LEVEL SECURITY;
ALTER TABLE command_cache    ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_rules      ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_messages ENABLE ROW LEVEL SECURITY;

-- Verify RLS is active (should show relrowsecurity = true for all tables)
SELECT relname AS table_name, relrowsecurity AS rls_enabled
FROM   pg_class
WHERE  relname IN (
    'users', 'sessions', 'messages', 'learnings',
    'preferences', 'global_stats', 'command_cache', 'admin_rules', 'visitor_messages'
)
ORDER BY relname;
