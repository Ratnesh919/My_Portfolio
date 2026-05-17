/**
 * raya-supabase-memory.js — Raya's Cloud Persistent Memory
 * Uses @supabase/supabase-js for Vercel Serverless compatibility.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Guard: if env vars are missing (e.g. Render without configured secrets),
// return a no-op client instead of crashing the process at startup.
let supabase;
if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
} else {
    console.warn('[Supabase] WARNING: SUPABASE_URL or SUPABASE_KEY not set. Memory features will be disabled. Set these in Render > Environment.');
    // No-op stub so the rest of the module loads without throwing
    const noop = async () => ({ data: null, error: null });
    supabase = {
        from: () => ({
            select: () => ({ eq: () => ({ single: noop, order: () => ({ limit: noop }) }), order: () => ({ limit: noop }) }),
            upsert: noop, insert: noop, update: () => ({ eq: noop }), delete: () => ({ neq: noop, eq: noop, ilike: noop })
        })
    };
}


async function initUser(userId, isNewUser, ipAddress) {
    // Upsert User
    const { error: userErr } = await supabase
        .from('users')
        .upsert({ cookie_id: userId, ip_address: ipAddress, last_active_at: new Date() }, { onConflict: 'cookie_id' });
    if (userErr) console.error('[Supabase] InitUser Error:', userErr);

    if (isNewUser) {
        const { data: uniqueData } = await supabase.from('global_stats').select('value').eq('key', 'unique_users').single();
        let unique = parseInt(uniqueData?.value || '0');
        await supabase.from('global_stats').upsert({ key: 'unique_users', value: (unique + 1).toString() }, { onConflict: 'key' });
    }
    
    const { data: totalData } = await supabase.from('global_stats').select('value').eq('key', 'total_visits').single();
    let total = parseInt(totalData?.value || '0');
    await supabase.from('global_stats').upsert({ key: 'total_visits', value: (total + 1).toString() }, { onConflict: 'key' });

    // Read Preferences
    const { data: prefs } = await supabase.from('preferences').select('key, value').eq('user_id', userId);
    const userNameObj = (prefs || []).find(p => p.key === 'user_name');
    
    return { userName: userNameObj ? userNameObj.value : null };
}

async function getSiteStats() {
    const { data: uniqueData } = await supabase.from('global_stats').select('value').eq('key', 'unique_users').single();
    const { data: totalData }  = await supabase.from('global_stats').select('value').eq('key', 'total_visits').single();
    
    return { 
        unique: uniqueData?.value || '0', 
        total: totalData?.value || '0' 
    };
}

async function startSession(userId, sessionId) {
    const { error } = await supabase.from('sessions').upsert({ user_id: userId, session_id: sessionId }, { onConflict: 'session_id' });
    if (error) console.error('[Supabase] startSession Error:', error);
}

async function endSession(sessionId, messages, summary) {
    const { error } = await supabase
        .from('sessions')
        .update({ ended_at: new Date(), msg_count: messages.length, summary: summary || null })
        .eq('session_id', sessionId);
    if (error) console.error('[Supabase] endSession Error:', error);
}

async function saveMessage(sessionId, role, content, lang = 'en') {
    const { error } = await supabase.from('messages').insert({ session_id: sessionId, role, content, lang });
    if (error) console.error('[Supabase] saveMessage Error:', error);
}

async function saveLearning(userId, type, content, sessionId = null) {
    const { data: existing } = await supabase
        .from('learnings')
        .select('id, weight')
        .eq('user_id', userId)
        .eq('content', content)
        .eq('status', 'verified')
        .single();
        
    if (existing) {
        await supabase.from('learnings').update({ weight: existing.weight + 1 }).eq('id', existing.id);
    } else {
        await supabase.from('learnings').insert({ user_id: userId, type, content, source_sid: sessionId, status: 'verified' });
    }
}

async function savePendingLearning(userId, type, content, sessionId = null) {
    await supabase.from('learnings').insert({ user_id: userId, type, content, source_sid: sessionId, status: 'pending' });
}

async function getPendingLearnings() {
    const { data } = await supabase.from('learnings').select('id, content').eq('status', 'pending').order('id', { ascending: true }).limit(10);
    return data || [];
}

async function verifyLearning(id) {
    await supabase.from('learnings').update({ status: 'verified' }).eq('id', id);
}

async function rejectLearning(id) {
    await supabase.from('learnings').update({ status: 'rejected' }).eq('id', id);
}

async function setPreference(userId, key, value) {
    await supabase.from('preferences').upsert({ user_id: userId, key, value, updated_at: new Date() });
}

async function getPreference(userId, key) {
    const { data } = await supabase.from('preferences').select('value').eq('user_id', userId).eq('key', key).single();
    return data ? data.value : null;
}

async function getCachedCommand(query) {
    const q = query.toLowerCase().trim();
    const { data } = await supabase.from('command_cache').select('response, hit_count').eq('query', q).single();
    if (data && data.hit_count >= 3) {
        return data.response;
    }
    return null;
}

async function recordCommand(query, response) {
    const q = query.toLowerCase().trim();
    const { data: existing } = await supabase.from('command_cache').select('hit_count').eq('query', q).single();
    
    if (existing) {
        await supabase.from('command_cache').update({ hit_count: existing.hit_count + 1, updated_at: new Date() }).eq('query', q);
    } else {
        await supabase.from('command_cache').insert({ query: q, response, hit_count: 1 });
    }
}

async function addAdminRule(rule) {
    if (rule.toLowerCase() === 'clear all') {
        await supabase.from('admin_rules').delete().neq('id', 0); // Delete all
    } else {
        await supabase.from('admin_rules').insert({ rule });
    }
}

async function cleanDatabase() {
    // De-duplication is hard in ORM, ideally handled by a Supabase SQL RPC.
    // We will just do a lightweight cleanup of short junk for now.
    await supabase.from('learnings').delete().ilike('content', '%fuck%');
    await supabase.from('learnings').delete().ilike('content', '%shit%');
    console.log('[DB Cleanup] Basic junk removal completed.');
}

async function buildMemoryContext(userId, sessionId) {
    const { data: learnings } = await supabase.from('learnings').select('type, content').eq('user_id', userId).eq('status', 'verified').order('weight', { ascending: false }).order('id', { ascending: false }).limit(10);
    const { data: prefs } = await supabase.from('preferences').select('key, value').eq('user_id', userId);
    let { data: recent } = await supabase.from('messages').select('role, content').eq('session_id', sessionId).order('id', { ascending: false }).limit(6);
    const { data: adminRules } = await supabase.from('admin_rules').select('rule');

    if (recent) recent.reverse();

    let ctx = '';

    if (adminRules && adminRules.length) {
        ctx += '\n[CORE DIRECTIVES FROM ADMIN (RATNESH)]\n';
        adminRules.forEach(r => { ctx += `WARNING: STRICT RULE YOU MUST FOLLOW: ${r.rule}\n`; });
    }

    if (prefs && prefs.length) {
        ctx += '\n[MEMORY - User Preferences]\n';
        prefs.forEach(p => { ctx += `- ${p.key}: ${p.value}\n`; });
    }

    if (learnings && learnings.length) {
        ctx += '\n[MEMORY - Things You Have Learned About This User]\n';
        learnings.forEach(l => { ctx += `- [${l.type}] ${l.content}\n`; });
    }

    if (recent && recent.length) {
        ctx += '\n[MEMORY - Recent Conversation Snippets]\n';
        recent.forEach(m => { ctx += `${m.role === 'user' ? 'User' : 'Raya'}: ${m.content}\n`; });
    }

    return ctx.trim();
}

async function extractLearnings(userId, sessionId, userMsg, assistantReply) {
    const lowerUser = userMsg.toLowerCase();
    const abusePattern = /\b(fuck|shit|bitch|asshole|cunt|dick|bastard|idiot|stupid|slut|whore)\b/i;
    if (abusePattern.test(lowerUser)) return;

    const creatorMatch = lowerUser.match(/(?:i am|i'm) (?:ratnesh|his|your creator)(?:'s)? (father|mother|brother|sister|friend|bestfriend)/i) || 
                         lowerUser.match(/(?:ratnesh|your creator|he) (?:is|likes|hates|wants) (.*)/i);
    
    if (creatorMatch) {
        await savePendingLearning(userId, 'fact', `A user claimed: "${userMsg}"`, sessionId);
        return;
    }

    const correctionTriggers = ['no,', "that's wrong", 'i meant', 'not that', 'incorrect', 'wrong answer', 'bad answer', 'you made a mistake', 'you misunderstood', 'you forgot'];
    if (correctionTriggers.some(t => lowerUser.includes(t))) {
      await saveLearning(userId, 'correction', `Mistake correction from user. User said: "${userMsg}". Raya had said: "${assistantReply}"`, sessionId);
    }

    const hindiPattern = /[\u0900-\u097F]/;
    if (hindiPattern.test(userMsg)) {
      await setPreference(userId, 'preferred_language', 'Hindi');
      await saveLearning(userId, 'preference', 'User prefers to speak in Hindi', sessionId);
    }

    const nameMatch = lowerUser.match(/(?:my name is|i am|i'm|this is|call me) ([a-z]+)/i);
    if (nameMatch) {
      await setPreference(userId, 'user_name', nameMatch[1]);
      await saveLearning(userId, 'fact', `User's name is ${nameMatch[1]}`, sessionId);
    }

    const rememberMatch = lowerUser.match(/(?:remember|note) that (.*)/i);
    if (rememberMatch) await saveLearning(userId, 'fact', `User asked to remember: ${rememberMatch[1]}`, sessionId);

    const likesMatch = lowerUser.match(/(?:i like|i love|my favorite is|i enjoy) (.*)/i);
    if (likesMatch) await saveLearning(userId, 'preference', `User likes: ${likesMatch[1]}`, sessionId);

    if (lowerUser.includes('play') || lowerUser.includes('song')) {
      const match = lowerUser.match(/play\s+(.+)/);
      if (match) await saveLearning(userId, 'preference', `User likes to listen to: ${match[1]}`, sessionId);
    }
}

async function getAllUsers() {
    const { data } = await supabase.from('users').select('cookie_id, last_active_at').order('last_active_at', { ascending: false }).limit(50);
    return data || [];
}

async function getAllVerifiedLearnings() {
    const { data } = await supabase.from('learnings').select('user_id, type, content').eq('status', 'verified').order('id', { ascending: false }).limit(100);
    return data || [];
}

module.exports = {
    initUser, getSiteStats, startSession, endSession, saveMessage, saveLearning,
    savePendingLearning, getPendingLearnings, verifyLearning, rejectLearning,
    setPreference, getPreference, getCachedCommand, recordCommand, addAdminRule,
    buildMemoryContext, extractLearnings, cleanDatabase, getAllUsers, getAllVerifiedLearnings
};
