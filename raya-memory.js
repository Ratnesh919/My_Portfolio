/**
 * raya-memory.js — Raya's Persistent Memory & Learning Database
 * ─────────────────────────────────────────────────────────────
 * Uses SQLite (better-sqlite3) for zero-config local storage.
 * Scaled-down production schema with user_id scoping.
 */

const Database = require('better-sqlite3');
const path     = require('path');

const DB_PATH  = path.join(__dirname, 'raya-memory.db');
const db       = new Database(DB_PATH);

// ── Performance PRAGMAs (must run before schema, outside transactions) ───────
// WAL mode: readers never block writers and vice versa.
db.pragma('journal_mode = WAL');
// NORMAL sync is safe with WAL and avoids expensive full fsync on every write.
db.pragma('synchronous = NORMAL');
// 32MB page cache to reduce disk reads.
db.pragma('cache_size = -32000');
// Allow OS to handle memory-mapped I/O for large reads.
db.pragma('mmap_size = 134217728');
// Foreign keys enforcement.
db.pragma('foreign_keys = ON');

// ── Schema ──────────────────────────────────────────────────────────────────
db.exec(`

  CREATE TABLE IF NOT EXISTS users (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    cookie_id      TEXT UNIQUE NOT NULL,
    created_at     TEXT DEFAULT (datetime('now')),
    last_active_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     TEXT    NOT NULL,
    session_id  TEXT    UNIQUE NOT NULL,
    started_at  TEXT    DEFAULT (datetime('now')),
    ended_at    TEXT,
    msg_count   INTEGER DEFAULT 0,
    summary     TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id  TEXT    NOT NULL,
    role        TEXT    NOT NULL,  -- 'user' or 'assistant'
    content     TEXT    NOT NULL,
    lang        TEXT    DEFAULT 'en',
    created_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS learnings (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     TEXT    NOT NULL,
    type        TEXT    NOT NULL,  -- 'correction', 'preference', 'fact', 'summary'
    content     TEXT    NOT NULL,
    source_sid  TEXT,
    weight      INTEGER DEFAULT 1,
    created_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS preferences (
    user_id     TEXT    NOT NULL,
    key         TEXT    NOT NULL,
    value       TEXT    NOT NULL,
    updated_at  TEXT    DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, key)
  );

  -- Global stats table for site analytics
  CREATE TABLE IF NOT EXISTS global_stats (
    key         TEXT    PRIMARY KEY,
    value       TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS command_cache (
    query       TEXT PRIMARY KEY,
    response    TEXT NOT NULL,
    hit_count   INTEGER DEFAULT 1,
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS admin_rules (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    rule        TEXT    NOT NULL,
    created_at  TEXT    DEFAULT (datetime('now'))
  );

  -- Indices for faster querying
  CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
  CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id);
  CREATE INDEX IF NOT EXISTS idx_learnings_user ON learnings(user_id);
`);

try { db.exec('ALTER TABLE users ADD COLUMN ip_address TEXT'); } catch(e){}

// ── Prepared Statements ──────────────────────────────────────────────────────
const stmts = {
  upsertUser:     db.prepare(`INSERT INTO users (cookie_id, ip_address) VALUES (?, ?) ON CONFLICT(cookie_id) DO UPDATE SET last_active_at = datetime('now'), ip_address = excluded.ip_address`),
  
  upsertSession:  db.prepare(`INSERT INTO sessions (user_id, session_id) VALUES (?, ?) ON CONFLICT(session_id) DO NOTHING`),
  endSession:     db.prepare(`UPDATE sessions SET ended_at = datetime('now'), msg_count = ?, summary = ? WHERE session_id = ?`),
  
  insertMessage:  db.prepare(`INSERT INTO messages (session_id, role, content, lang) VALUES (?, ?, ?, ?)`),
  
  insertLearning: db.prepare(`INSERT INTO learnings (user_id, type, content, source_sid) VALUES (?, ?, ?, ?)`),
  checkLearning:  db.prepare(`SELECT id, weight FROM learnings WHERE user_id = ? AND content = ?`),
  updateLearningWeight: db.prepare(`UPDATE learnings SET weight = weight + 1 WHERE id = ?`),
  
  upsertPref:     db.prepare(`INSERT INTO preferences (user_id, key, value, updated_at) VALUES (?, ?, ?, datetime('now')) ON CONFLICT(user_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`),
  getPref:        db.prepare(`SELECT value FROM preferences WHERE user_id = ? AND key = ?`),
  
  getRecentMsgs:  db.prepare(`SELECT role, content FROM messages WHERE session_id = ? ORDER BY id DESC LIMIT ?`),
  getLearnings:   db.prepare(`SELECT type, content FROM learnings WHERE user_id = ? ORDER BY weight DESC, id DESC LIMIT ?`),
  getPrefs:       db.prepare(`SELECT key, value FROM preferences WHERE user_id = ?`),
  
  getGlobalStat:  db.prepare(`SELECT value FROM global_stats WHERE key = ?`),
  setGlobalStat:  db.prepare(`INSERT INTO global_stats (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`),
  
  getCommandCache: db.prepare(`SELECT response, hit_count FROM command_cache WHERE query = ?`),
  recordCommandCache: db.prepare(`INSERT INTO command_cache (query, response) VALUES (?, ?) ON CONFLICT(query) DO UPDATE SET hit_count = hit_count + 1, updated_at = datetime('now')`),

  getAdminRules: db.prepare(`SELECT rule FROM admin_rules`),
  addAdminRule:  db.prepare(`INSERT INTO admin_rules (rule) VALUES (?)`),
  clearAdminRules: db.prepare(`DELETE FROM admin_rules`),
};

// ── Write Batching (Event Loop Protection) ───────────────────────────────────
// Group all deferred writes into a single transaction to prevent multiple 
// disk flushes from stalling the Node.js Event Loop.
let writeQueue = [];
let isDraining = false;

const drainTransaction = db.transaction((tasks) => {
    for (const task of tasks) {
        try { task(); } catch (err) { console.error('[DB Task Error]', err); }
    }
});

function drainQueue() {
    if (writeQueue.length === 0) {
        isDraining = false;
        return;
    }
    const tasks = writeQueue;
    writeQueue = []; 
    
    try {
        drainTransaction(tasks);
    } catch(err) {
        console.error('[DB Drain Error]', err);
    }
    
    if (writeQueue.length > 0) {
        setImmediate(drainQueue);
    } else {
        isDraining = false;
    }
}

// Helper: queue a write and schedule the transaction
function deferWrite(fn) { 
    writeQueue.push(fn);
    if (!isDraining) {
        isDraining = true;
        setImmediate(drainQueue);
    }
}

function initUser(userId, isNewUser, ipAddress) {
    // Reads must be sync (need return value), writes deferred
    const prefs = stmts.getPrefs.all(userId);
    const userNameObj = prefs.find(p => p.key === 'user_name');
    const userName = userNameObj ? userNameObj.value : null;

    deferWrite(() => {
        stmts.upsertUser.run(userId, ipAddress || null);
        if (isNewUser) {
            let unique = parseInt(stmts.getGlobalStat.get('unique_users')?.value || '0');
            stmts.setGlobalStat.run('unique_users', (unique + 1).toString());
        }
        let total = parseInt(stmts.getGlobalStat.get('total_visits')?.value || '0');
        stmts.setGlobalStat.run('total_visits', (total + 1).toString());
    });
    return { userName };
}

function getSiteStats() {
    // Read-only — must be sync
    const unique = stmts.getGlobalStat.get('unique_users')?.value || '0';
    const total  = stmts.getGlobalStat.get('total_visits')?.value || '0';
    return { unique, total };
}

function startSession(userId, sessionId) {
    deferWrite(() => stmts.upsertSession.run(userId, sessionId));
}

function endSession(sessionId, messages, summary) {
    deferWrite(() => stmts.endSession.run(messages.length, summary || null, sessionId));
}

function saveMessage(sessionId, role, content, lang = 'en') {
    deferWrite(() => stmts.insertMessage.run(sessionId, role, content, lang));
}

function saveLearning(userId, type, content, sessionId = null) {
    deferWrite(() => {
        const existing = stmts.checkLearning.get(userId, content);
        if (existing) {
            stmts.updateLearningWeight.run(existing.id);
        } else {
            stmts.insertLearning.run(userId, type, content, sessionId);
        }
    });
}

function setPreference(userId, key, value) {
    deferWrite(() => stmts.upsertPref.run(userId, key, value));
}

function getPreference(userId, key) {
    // Read-only — must be sync
    return stmts.getPref.get(userId, key)?.value;
}

function getCachedCommand(query) {
    const q = query.toLowerCase().trim();
    const row = stmts.getCommandCache.get(q);
    // Return cached response if it has been asked and recorded at least 3 times
    if (row && row.hit_count >= 3) {
        return row.response;
    }
    return null;
}

function recordCommand(query, response) {
    deferWrite(() => stmts.recordCommandCache.run(query.toLowerCase().trim(), response));
}

function addAdminRule(rule) {
    if (rule.toLowerCase() === 'clear all') {
        deferWrite(() => stmts.clearAdminRules.run());
    } else {
        deferWrite(() => stmts.addAdminRule.run(rule));
    }
}

/**
 * Build a memory context string to inject into Raya's system prompt.
 * This gives her "memory" of past interactions with THIS specific user.
 */
function buildMemoryContext(userId, sessionId) {
  const learnings = stmts.getLearnings.all(userId, 10); // Limit to top 10 relevant learnings
  const prefs     = stmts.getPrefs.all(userId);
  const recent    = stmts.getRecentMsgs.all(sessionId, 6).reverse(); // Last 6 messages
  const adminRules = stmts.getAdminRules.all();

  let ctx = '';

  if (adminRules.length) {
    ctx += '\n[CORE DIRECTIVES FROM ADMIN (RATNESH)]\n';
    adminRules.forEach(r => { ctx += `WARNING: STRICT RULE YOU MUST FOLLOW: ${r.rule}\n`; });
  }

  if (prefs.length) {
    ctx += '\n[MEMORY - User Preferences]\n';
    prefs.forEach(p => { ctx += `- ${p.key}: ${p.value}\n`; });
  }

  if (learnings.length) {
    ctx += '\n[MEMORY - Things You Have Learned About This User]\n';
    learnings.forEach(l => { ctx += `- [${l.type}] ${l.content}\n`; });
  }

  if (recent.length) {
    ctx += '\n[MEMORY - Recent Conversation Snippets]\n';
    recent.forEach(m => { ctx += `${m.role === 'user' ? 'User' : 'Raya'}: ${m.content}\n`; });
  }

  return ctx.trim();
}

/**
 * Extract learnings from a conversation turn.
 * Detects corrections ("no", "that's wrong", "I meant"), 
 * language preferences, and important user facts.
 */
function extractLearnings(userId, sessionId, userMsg, assistantReply) {
  const lowerUser = userMsg.toLowerCase();

  // Detect corrections / mistakes
  const correctionTriggers = ['no,', 'that\'s wrong', 'i meant', 'not that', 'incorrect', 'wrong answer', 'bad answer', 'you made a mistake', 'you misunderstood', 'you forgot'];
  if (correctionTriggers.some(t => lowerUser.includes(t))) {
    saveLearning(userId, 'correction', `Mistake correction from user. User said: "${userMsg}". Raya had said: "${assistantReply}"`, sessionId);
  }

  // Detect language preference
  const hindiPattern = /[\u0900-\u097F]/;
  if (hindiPattern.test(userMsg)) {
    setPreference(userId, 'preferred_language', 'Hindi');
    saveLearning(userId, 'preference', 'User prefers to speak in Hindi', sessionId);
  }

  // Detect if user shared personal info (enhanced heuristic)
  const nameMatch = lowerUser.match(/(?:my name is|i am|i'm|this is|call me) ([a-z]+)/i);
  if (nameMatch) {
    const name = nameMatch[1];
    setPreference(userId, 'user_name', name);
    saveLearning(userId, 'fact', `User's name is ${name}`, sessionId);
  }

  // Explicit memory requests
  const rememberMatch = lowerUser.match(/(?:remember|note) that (.*)/i);
  if (rememberMatch) {
    saveLearning(userId, 'fact', `User asked to remember: ${rememberMatch[1]}`, sessionId);
  }

  // Detect likes/preferences
  const likesMatch = lowerUser.match(/(?:i like|i love|my favorite is|i enjoy) (.*)/i);
  if (likesMatch) {
    saveLearning(userId, 'preference', `User likes: ${likesMatch[1]}`, sessionId);
  }

  // Detect music/avatar preferences
  if (lowerUser.includes('play') || lowerUser.includes('song')) {
    const match = lowerUser.match(/play\s+(.+)/);
    if (match) saveLearning(userId, 'preference', `User likes to listen to: ${match[1]}`, sessionId);
  }
}

module.exports = {
  initUser,
  getSiteStats,
  startSession,
  endSession,
  saveMessage,
  saveLearning,
  setPreference,
  getPreference,
  getCachedCommand,
  recordCommand,
  addAdminRule,
  buildMemoryContext,
  extractLearnings
};
