/**
 * raya-supabase-memory.js — Raya's Cloud Persistent Memory
 * Uses @supabase/supabase-js for Vercel Serverless compatibility.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
let supabase;

if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('🟢 [Supabase Memory] Cloud database client connected: ' + supabaseUrl);
} else {
    console.warn('\n======================================================');
    console.warn('⚠️ WARNING: SUPABASE_URL and SUPABASE_KEY are not set in .env.');
    console.warn('⚠️ Running in mock mode. Cloud persistence will not be saved.');
    console.warn('======================================================\n');
    
    const makeMock = () => {
        const mock = {
            then: (onFulfilled) => Promise.resolve({ data: [], error: null }).then(onFulfilled),
            catch: (onRejected) => Promise.resolve({ data: [], error: null }).catch(onRejected),
        };
        const handler = {
            get(target, prop) {
                if (prop === 'then' || prop === 'catch') {
                    return target[prop];
                }
                return () => new Proxy(mock, handler);
            }
        };
        return new Proxy(mock, handler);
    };

    supabase = {
        from: () => makeMock()
    };
}

// ── Strict Input Sanitization & SQL Defense Helpers ──────────────────────────
function sanitizeId(id, defaultPrefix = 'usr') {
    if (!id || typeof id !== 'string') return `${defaultPrefix}_${Date.now()}`;
    const cleaned = id.replace(/[^a-zA-Z0-9_\-]/g, '').slice(0, 64);
    return cleaned.length > 0 ? cleaned : `${defaultPrefix}_${Date.now()}`;
}

function sanitizeText(input, maxLen = 2000) {
    if (input === null || input === undefined) return '';
    return String(input)
        .replace(/\0/g, '')
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .slice(0, maxLen)
        .trim();
}

function sanitizeKey(key, maxLen = 64) {
    if (!key || typeof key !== 'string') return 'unknown_key';
    return key.replace(/[^a-zA-Z0-9_\-\.]/g, '').slice(0, maxLen);
}

async function initUser(rawUserId, isNewUser, ipAddress, rawLocation = null) {
    const userId = sanitizeId(rawUserId, 'usr');
    const location = rawLocation ? sanitizeText(rawLocation, 120) : null;
    const safeIp = ipAddress ? sanitizeText(ipAddress, 64) : null;

    // Upsert User
    const userPayload = { cookie_id: userId, ip_address: safeIp, last_active_at: new Date() };
    if (location) userPayload.location = location;

    const { error: userErr } = await supabase
        .from('users')
        .upsert(userPayload, { onConflict: 'cookie_id' });
    if (userErr) console.error('[Supabase] InitUser Error:', userErr);

    if (location) {
        await setPreference(userId, 'user_location', location);
    }

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

async function startSession(rawUserId, rawSessionId) {
    const userId = sanitizeId(rawUserId, 'usr');
    const sessionId = sanitizeId(rawSessionId, 'ses');
    const { error } = await supabase.from('sessions').upsert({ user_id: userId, session_id: sessionId }, { onConflict: 'session_id' });
    if (error) console.error('[Supabase] startSession Error:', error);
}

async function endSession(rawSessionId, messages, rawSummary) {
    const sessionId = sanitizeId(rawSessionId, 'ses');
    const summary = sanitizeText(rawSummary, 1000);
    const msgCount = Array.isArray(messages) ? messages.length : 0;
    const { error } = await supabase
        .from('sessions')
        .update({ ended_at: new Date(), msg_count: msgCount, summary: summary || null })
        .eq('session_id', sessionId);
    if (error) console.error('[Supabase] endSession Error:', error);
}

async function saveMessage(rawSessionId, rawRole, rawContent, rawLang = 'en') {
    const sessionId = sanitizeId(rawSessionId, 'ses');
    const role = ['user', 'assistant', 'system'].includes(rawRole) ? rawRole : 'user';
    const content = sanitizeText(rawContent, 4000);
    const lang = sanitizeKey(rawLang, 10);
    const { error } = await supabase.from('messages').insert({ session_id: sessionId, role, content, lang });
    if (error) console.error('[Supabase] saveMessage Error:', error);
}

async function saveLearning(rawUserId, rawType, rawContent, rawSessionId = null) {
    const userId = sanitizeId(rawUserId, 'usr');
    const type = sanitizeKey(rawType, 32);
    const content = sanitizeText(rawContent, 1000);
    const sessionId = rawSessionId ? sanitizeId(rawSessionId, 'ses') : null;

    if (!content) return;

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

async function savePendingLearning(rawUserId, rawType, rawContent, rawSessionId = null) {
    const userId = sanitizeId(rawUserId, 'usr');
    const type = sanitizeKey(rawType, 32);
    const content = sanitizeText(rawContent, 1000);
    const sessionId = rawSessionId ? sanitizeId(rawSessionId, 'ses') : null;

    if (!content) return;
    await supabase.from('learnings').insert({ user_id: userId, type, content, source_sid: sessionId, status: 'pending' });
}

async function getPendingLearnings() {
    const { data } = await supabase.from('learnings').select('id, content').eq('status', 'pending').order('id', { ascending: true }).limit(10);
    return data || [];
}

async function verifyLearning(id) {
    const safeId = parseInt(id, 10);
    if (!isNaN(safeId)) {
        await supabase.from('learnings').update({ status: 'verified' }).eq('id', safeId);
    }
}

async function rejectLearning(id) {
    const safeId = parseInt(id, 10);
    if (!isNaN(safeId)) {
        await supabase.from('learnings').update({ status: 'rejected' }).eq('id', safeId);
    }
}

async function setPreference(rawUserId, rawKey, rawValue) {
    const userId = sanitizeId(rawUserId, 'usr');
    const key = sanitizeKey(rawKey, 64);
    const value = sanitizeText(rawValue, 500);
    await supabase.from('preferences').upsert({ user_id: userId, key, value, updated_at: new Date() });
}

async function getPreference(rawUserId, rawKey) {
    const userId = sanitizeId(rawUserId, 'usr');
    const key = sanitizeKey(rawKey, 64);
    const { data } = await supabase.from('preferences').select('value').eq('user_id', userId).eq('key', key).single();
    return data ? data.value : null;
}

async function getCachedCommand(rawQuery) {
    const q = sanitizeText(rawQuery, 300).toLowerCase().trim();
    if (!q) return null;
    const { data } = await supabase.from('command_cache').select('response, hit_count').eq('query', q).single();
    if (data && data.hit_count >= 3) {
        return data.response;
    }
    return null;
}

async function recordCommand(rawQuery, rawResponse) {
    const q = sanitizeText(rawQuery, 300).toLowerCase().trim();
    const response = sanitizeText(rawResponse, 2000);
    if (!q || !response) return;

    const { data: existing } = await supabase.from('command_cache').select('hit_count').eq('query', q).single();
    
    if (existing) {
        await supabase.from('command_cache').update({ hit_count: existing.hit_count + 1, updated_at: new Date() }).eq('query', q);
    } else {
        await supabase.from('command_cache').insert({ query: q, response, hit_count: 1 });
    }
}

async function addAdminRule(rawRule) {
    const rule = sanitizeText(rawRule, 500);
    if (!rule) return;
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
    // Execute all memory database queries concurrently in parallel for sub-second database context building
    const [learningsRes, prefsRes, recentRes, adminRulesRes, outboxRes] = await Promise.all([
        supabase.from('learnings').select('type, content').eq('user_id', userId).eq('status', 'verified').order('weight', { ascending: false }).order('id', { ascending: false }).limit(10),
        supabase.from('preferences').select('key, value').eq('user_id', userId),
        supabase.from('messages').select('role, content').eq('session_id', sessionId).order('id', { ascending: false }).limit(6),
        supabase.from('admin_rules').select('rule'),
        supabase.from('learnings').select('content').eq('type', 'admin_outbox').eq('status', 'verified').order('id', { ascending: false }).limit(5)
    ]);

    const learnings = learningsRes.data;
    const prefs = prefsRes.data;
    let recent = recentRes.data;
    const adminRules = adminRulesRes.data;
    const outbox = outboxRes.data;

    if (recent) recent.reverse();

    let ctx = '';

    if (adminRules && adminRules.length) {
        ctx += '\n[CORE DIRECTIVES FROM ADMIN (RATNESH)]\n';
        adminRules.forEach(r => { ctx += `WARNING: STRICT RULE YOU MUST FOLLOW: ${r.rule}\n`; });
    }

    if (outbox && outbox.length) {
        ctx += '\n[RATNESH OUTBOX - MESSAGES TO CONVEY TO VISITORS/RECRUITERS]\n';
        outbox.forEach(item => {
            try {
                const parsed = JSON.parse(item.content);
                ctx += `- MESSAGE FROM RATNESH FOR "${parsed.recipient || 'Visitors/Recruiters'}": "${parsed.message}"\n`;
            } catch(e) {
                ctx += `- MESSAGE FROM RATNESH: "${item.content}"\n`;
            }
        });
        ctx += 'DIRECTIVE: If the visitor introduces themselves, or is a recruiter, or when greeting them, tell them warmly: "Welcome! You have a personal message from Ratnesh. If you like, I can convey it to you." When they say yes, deliver Ratnesh\'s exact message clearly.\n';
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
    if (!userMsg) return;
    const lowerUser = userMsg.toLowerCase();
    const abusePattern = /\b(fuck|shit|bitch|asshole|cunt|dick|bastard|idiot|stupid|slut|whore)\b/i;
    if (abusePattern.test(lowerUser)) return;

    // 1. Detect visitor name
    const nameMatch = userMsg.match(/(?:my name is|i am|i'm|this is|call me|mera naam|amar naam)\s+([a-zA-Z]+)/i);
    if (nameMatch && nameMatch[1] && !['ratnesh', 'admin', 'user', 'guest', 'raya', 'here', 'looking', 'interested', 'trying', 'exploring', 'a'].includes(nameMatch[1].toLowerCase())) {
        const uName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1).toLowerCase();
        await setPreference(userId, 'user_name', uName);
        await saveLearning(userId, 'profile', `User introduced themselves as ${uName}`, sessionId);
    }

    // 2. Detect recruiter / hiring / contact info
    const emailMatch = userMsg.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    const phoneMatch = userMsg.match(/(?:\+\d{1,3}[- ]?)?\b\d{10}\b/);
    const isJobInquiry = /\b(recruiter|hiring|job|offer|interview|salary|contract|freelance|hire|collaborate|opportunity|position|role|vacancy|hr)\b/i.test(lowerUser);

    if (emailMatch || phoneMatch || isJobInquiry) {
        const contact = emailMatch ? emailMatch[1] : (phoneMatch ? phoneMatch[0] : null);
        const storedName = await getPreference(userId, 'user_name');
        await saveVisitorMessage(userId, userMsg, storedName || '(anonymous)', contact);
        if (contact) {
            await setPreference(userId, 'contact_info', contact);
        }
        await saveLearning(userId, 'recruiter_inquiry', `Visitor message: "${userMsg}" | Contact: ${contact || 'N/A'}`, sessionId);
    }

    // 3. Detect user preferences (e.g. favorite project, music taste)
    if (lowerUser.includes('favorite') || lowerUser.includes('like') || lowerUser.includes('interested in')) {
        await saveLearning(userId, 'preference', `User expressed interest: "${userMsg}"`, sessionId);
    }

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

    const rememberMatch = lowerUser.match(/(?:remember|note) that (.*)/i);
    if (rememberMatch) await saveLearning(userId, 'fact', `User asked to remember: ${rememberMatch[1]}`, sessionId);

    const likesMatch = lowerUser.match(/(?:i like|i love|my favorite is|i enjoy) (.*)/i);
    if (likesMatch) await saveLearning(userId, 'preference', `User likes: ${likesMatch[1]}`, sessionId);
}

async function getAllUsers() {
    const { data: users } = await supabase.from('users').select('cookie_id, ip_address, last_active_at').order('last_active_at', { ascending: false }).limit(50);
    if (!users || !users.length) return [];

    // Enrich with stored user names and locations from preferences table
    const userIds = users.map(u => u.cookie_id);
    const { data: namePref } = await supabase
        .from('preferences')
        .select('user_id, value')
        .eq('key', 'user_name')
        .in('user_id', userIds);

    const { data: locPref } = await supabase
        .from('preferences')
        .select('user_id, value')
        .eq('key', 'user_location')
        .in('user_id', userIds);

    const nameMap = {};
    (namePref || []).forEach(p => { nameMap[p.user_id] = p.value; });

    const locMap = {};
    (locPref || []).forEach(p => { locMap[p.user_id] = p.value; });

    return users.map(u => ({
        cookie_id: u.cookie_id,
        name: nameMap[u.cookie_id] || '(anonymous)',
        location: locMap[u.cookie_id] || 'Unknown Location',
        last_active_at: u.last_active_at
    }));
}

async function getLocationStats() {
    const { data: locPrefs } = await supabase
        .from('preferences')
        .select('user_id, value')
        .eq('key', 'user_location');

    const { data: users } = await supabase
        .from('users')
        .select('cookie_id, ip_address, last_active_at')
        .order('last_active_at', { ascending: false })
        .limit(100);

    const userIds = (users || []).map(u => u.cookie_id);
    let nameMap = {};
    if (userIds.length > 0) {
        const { data: namePrefs } = await supabase
            .from('preferences')
            .select('user_id, value')
            .eq('key', 'user_name')
            .in('user_id', userIds);
        (namePrefs || []).forEach(p => { nameMap[p.user_id] = p.value; });
    }

    const locMap = {};
    (locPrefs || []).forEach(p => { locMap[p.user_id] = p.value; });

    const countryBreakdown = {};
    const cityBreakdown = {};
    const visitorList = [];

    (users || []).forEach(u => {
        const loc = locMap[u.cookie_id] || u.location || 'Unknown Location';
        if (loc !== 'Unknown Location' && loc !== 'Local / Unknown') {
            const parts = loc.split(',').map(s => s.trim());
            const country = parts[parts.length - 1] || 'Unknown';
            countryBreakdown[country] = (countryBreakdown[country] || 0) + 1;
            cityBreakdown[loc] = (cityBreakdown[loc] || 0) + 1;
        } else {
            countryBreakdown['Unknown Location'] = (countryBreakdown['Unknown Location'] || 0) + 1;
        }

        visitorList.push({
            user_id: u.cookie_id,
            name: nameMap[u.cookie_id] || '(anonymous)',
            location: loc,
            last_active: u.last_active_at
        });
    });

    const topCities = Object.entries(cityBreakdown)
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    return {
        total_visitors_tracked: (users || []).length,
        countries: countryBreakdown,
        top_cities: topCities,
        recent_visitors: visitorList.slice(0, 15)
    };
}

async function getAllVerifiedLearnings() {
    const { data } = await supabase.from('learnings').select('user_id, type, content').eq('status', 'verified').order('id', { ascending: false }).limit(100);
    return data || [];
}

function classifyMessageImportance(messageText) {
    const text = (messageText || '').toLowerCase();
    const urgentJobPattern = /\b(hiring|job|offer|interview|salary|contract|project|freelance|client|hire|collaborate|opportunity|recruiter|hr|position|role|vacancy|budget|paid|rate)\b/i;
    const contactPattern = /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\+\d{1,3}[- ]?)?\d{10})\b/;
    
    const isJobOrOffer = urgentJobPattern.test(text);
    const hasContactInfo = contactPattern.test(text);

    if (isJobOrOffer && hasContactInfo) {
        return { isImportant: true, reason: 'HIGH PRIORITY: Job Offer / Hiring Inquiry with Contact Info' };
    }
    if (isJobOrOffer) {
        return { isImportant: true, reason: 'IMPORTANT: Job / Career / Project Inquiry' };
    }
    if (hasContactInfo) {
        return { isImportant: true, reason: 'IMPORTANT: Visitor provided contact information' };
    }
    if (text.length > 40 && (text.includes('ratnesh') || text.includes('contact') || text.includes('message') || text.includes('work'))) {
        return { isImportant: true, reason: 'NOTE: Direct message left for Ratnesh' };
    }

    return { isImportant: false, reason: 'General visitor note' };
}

async function saveVisitorMessage(rawUserId, rawMessage, rawUserName = null, rawContactInfo = null) {
    const userId = sanitizeId(rawUserId, 'usr');
    const message = sanitizeText(rawMessage, 2000);
    const userName = rawUserName ? sanitizeText(rawUserName, 100) : null;
    const contactInfo = rawContactInfo ? sanitizeText(rawContactInfo, 200) : null;

    if (!message) return { is_important: false, importance_reason: 'Empty message' };

    const { isImportant, reason } = classifyMessageImportance(message);
    const payload = {
        user_id: userId,
        user_name: userName || '(anonymous)',
        message: message,
        contact_info: contactInfo || null,
        is_important: isImportant,
        importance_reason: reason,
        status: 'unread'
    };

    const { data, error } = await supabase
        .from('visitor_messages')
        .insert(payload)
        .select('id, is_important, importance_reason')
        .single();

    if (error) {
        console.error('[Supabase] saveVisitorMessage Error:', error);
    }
    return data || { is_important: isImportant, importance_reason: reason };
}

async function getVisitorMessages() {
    const { data } = await supabase
        .from('visitor_messages')
        .select('id, user_id, user_name, message, contact_info, is_important, importance_reason, status, created_at')
        .order('created_at', { ascending: false })
        .limit(50);
    return data || [];
}

async function markMessageRead(id) {
    const safeId = parseInt(id, 10);
    if (!isNaN(safeId)) {
        await supabase.from('visitor_messages').update({ status: 'read' }).eq('id', safeId);
    }
}

async function getAdminHistoricalContext() {
    try {
        const [stats, locStats, visitorMsgs, recentMsgs, verifiedLearnings, users] = await Promise.all([
            getSiteStats().catch(() => ({ unique: '0', total: '0' })),
            getLocationStats().catch(() => ({ total_visitors_tracked: 0, top_cities: [], countries: {} })),
            getVisitorMessages().catch(() => []),
            supabase.from('messages').select('session_id, role, content, lang, created_at').order('id', { ascending: false }).limit(40),
            getAllVerifiedLearnings().catch(() => []),
            getAllUsers().catch(() => [])
        ]);

        const messagesList = recentMsgs?.data || [];
        // Group messages by session
        const sessionMap = {};
        messagesList.slice().reverse().forEach(m => {
            if (!sessionMap[m.session_id]) sessionMap[m.session_id] = [];
            sessionMap[m.session_id].push(`${m.role === 'user' ? 'User' : 'Raya'}: ${m.content}`);
        });

        const formattedConversations = Object.entries(sessionMap).map(([sid, convs]) => ({
            session_id: sid,
            dialogue: convs.slice(-6).join(' | ')
        })).slice(0, 10);

        const recruiterInquiries = (visitorMsgs || []).map(m => ({
            id: m.id,
            from: m.user_name || 'Anonymous Recruiter/Visitor',
            contact_info: m.contact_info || 'Not provided',
            message: m.message,
            importance: m.is_important ? m.importance_reason : 'Standard note',
            date: m.created_at
        })).slice(0, 20);

        const HISTORICAL_CSV_LOGS = [
            { name: "Shubham", inquiry: "Expressed interest in Ratnesh and stated he wanted to contact Ratnesh", timestamp_ist: "22 May 2026, 08:05 PM IST" },
            { name: "Divya Raj Singh", inquiry: "Explored Ratnesh's projects and education sections", timestamp_ist: "21 May 2026, 05:44 PM IST" },
            { name: "Recruiter (Mode Triggered)", inquiry: "Switched to Recruiter Mode and analyzed portfolio projects", timestamp_ist: "31 Jul 2026, 06:54 PM IST" },
            { name: "VLSI / Hardware Inquirer", inquiry: "Inquired about VLSI semiconductor domain, discipline, and hardware design", timestamp_ist: "22 May 2026, 09:42 PM IST" },
            { name: "RF Engineering Inquirer", inquiry: "Asked specifically about Ratnesh's HFSS antenna RF simulation project", timestamp_ist: "27 Jul 2026, 08:19 PM IST" },
            { name: "Rahul", inquiry: "Multilingual interaction in Bengali and Hindi, explored themes", timestamp_ist: "25 Aug 2026, 10:54 AM IST (also 20 Aug 2026, 08:38 PM IST)" },
            { name: "Raam", inquiry: "Explored projects and music", timestamp_ist: "30 May 2026, 08:59 AM IST & 27 May 2026, 02:53 PM IST" },
            { name: "Darshan", inquiry: "Interacted with portfolio themes", timestamp_ist: "07 May 2026, 08:29 PM IST" }
        ];

        return {
            stats,
            location_summary: {
                total_tracked: locStats.total_visitors_tracked,
                top_cities: locStats.top_cities,
                countries: locStats.countries
            },
            recruiter_messages: recruiterInquiries,
            recent_conversations: formattedConversations,
            known_users: knownUsers,
            verified_learnings: (verifiedLearnings || []).slice(0, 20),
            historical_visitor_log: HISTORICAL_CSV_LOGS
        };
    } catch (err) {
        console.error('[Supabase] getAdminHistoricalContext Error:', err);
        return null;
    }
}

async function saveAdminOutboxMessage(targetRecipient, messageText) {
    const payload = {
        user_id: 'admin_ratnesh',
        type: 'admin_outbox',
        content: JSON.stringify({
            recipient: targetRecipient || 'all_recruiters',
            message: sanitizeText(messageText, 1500),
            created_at: new Date()
        }),
        status: 'verified',
        weight: 10
    };
    const { data, error } = await supabase.from('learnings').insert(payload);
    if (error) console.error('[Supabase] saveAdminOutboxMessage Error:', error);
    return !error;
}

async function getPendingOutboxMessages() {
    const { data, error } = await supabase.from('learnings').select('content').eq('type', 'admin_outbox').eq('status', 'verified').order('id', { ascending: false }).limit(5);
    if (error) return [];
    return (data || []).map(d => {
        try { return JSON.parse(d.content); } catch(e) { return { message: d.content }; }
    });
}

module.exports = {
    initUser, getSiteStats, startSession, endSession, saveMessage, saveLearning,
    savePendingLearning, getPendingLearnings, verifyLearning, rejectLearning,
    setPreference, getPreference, getCachedCommand, recordCommand, addAdminRule,
    buildMemoryContext, extractLearnings, cleanDatabase, getAllUsers, getAllVerifiedLearnings,
    getUserProfile, getLocationStats, classifyMessageImportance, saveVisitorMessage,
    getVisitorMessages, markMessageRead, getAdminHistoricalContext, saveAdminOutboxMessage,
    getPendingOutboxMessages
};
