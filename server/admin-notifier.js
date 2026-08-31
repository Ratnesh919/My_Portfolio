/**
 * admin-notifier.js — Real-Time Admin Notification Engine
 * Automatically delivers visitor and recruiter messages to Ratnesh via:
 * 1. Telegram Bot (Instant Push to Mobile / Desktop)
 * 2. Discord Webhook (Rich Embeds)
 * 3. Email (Resend API / Webhook)
 * 4. Fallback in-app unread telemetry for Raya AI
 */

const axios = require('axios');

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'kumarsinghratnesh3@gmail.com';

/**
 * Format and dispatch an instant admin notification across all configured channels
 */
async function notifyAdminNewMessage(messageData) {
    const {
        senderName = '(Anonymous Visitor)',
        contactInfo = 'Not provided',
        location = 'Unknown Location',
        category = 'General Visitor Message',
        isRecruiter = false,
        isImportant = false,
        importanceReason = '',
        message = '',
        userId = '',
        timestamp = new Date().toISOString()
    } = messageData;

    console.log(`\n📢 [Admin Notifier] Dispatching alert for message from: ${senderName} (${location})`);

    const promises = [];

    // ── 1. Telegram Bot Notification ──────────────────────────────────────────
    const tgToken = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_ADMIN_ID;

    if (tgToken && tgChatId) {
        const priorityTag = isRecruiter ? '🚨 RECRUITER / JOB INQUIRY' : (isImportant ? '⭐ IMPORTANT INQUIRY' : '📩 NEW VISITOR MESSAGE');
        const tgText = 
            `<b>${priorityTag}</b>\n\n` +
            `👤 <b>From:</b> ${escapeHtml(senderName)}\n` +
            `📍 <b>Location:</b> ${escapeHtml(location)}\n` +
            `✉️ <b>Contact:</b> ${escapeHtml(contactInfo)}\n` +
            `🏷️ <b>Category:</b> ${escapeHtml(category)}\n` +
            (importanceReason ? `💡 <b>Reason:</b> <i>${escapeHtml(importanceReason)}</i>\n` : '') +
            `\n💬 <b>Message:</b>\n<i>"${escapeHtml(message)}"</i>\n\n` +
            `🕒 <i>${new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</i>`;

        promises.push(
            axios.post(`https://api.telegram.org/bot${tgToken.trim()}/sendMessage`, {
                chat_id: tgChatId.trim(),
                text: tgText,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            }, { timeout: 8000 })
            .then(() => console.log('🟢 [Admin Notifier] Telegram notification delivered.'))
            .catch(err => console.warn('⚠️ [Admin Notifier] Telegram error:', err.response?.data || err.message))
        );
    }

    // ── 2. Discord Webhook Notification ───────────────────────────────────────
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL || process.env.DISCORD_NOTIFICATION_WEBHOOK;
    if (discordWebhook) {
        const color = isRecruiter ? 0xff416c : (isImportant ? 0xa855f7 : 0x38bdf8);
        const discordPayload = {
            embeds: [{
                title: isRecruiter ? '💼 New Recruiter Inquiry' : '💬 New Visitor Message',
                description: `> "${message}"`,
                color: color,
                fields: [
                    { name: '👤 Sender', value: senderName, inline: true },
                    { name: '📍 Location', value: location, inline: true },
                    { name: '✉️ Contact', value: contactInfo, inline: true },
                    { name: '🏷️ Category', value: category, inline: true },
                    { name: '💡 Note', value: importanceReason || 'Standard message', inline: true }
                ],
                footer: { text: `User ID: ${userId} • Ratnesh 3D Portfolio` },
                timestamp: timestamp
            }]
        };

        promises.push(
            axios.post(discordWebhook.trim(), discordPayload, { timeout: 8000 })
            .then(() => console.log('🟢 [Admin Notifier] Discord webhook delivered.'))
            .catch(err => console.warn('⚠️ [Admin Notifier] Discord error:', err.response?.data || err.message))
        );
    }

    // ── 3. Resend Email API Notification ─────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY || process.env.RESEND_KEY;
    if (resendKey) {
        const emailSubject = isRecruiter 
            ? `[Portfolio Recruiter Alert] Message from ${senderName} (${location})`
            : `[Portfolio Visitor Message] from ${senderName}`;

        const emailHtml = `
            <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0d081a;color:#f1f5f9;border-radius:16px;border:1px solid rgba(168,85,247,0.3);">
                <h2 style="color:#c084fc;margin-top:0;">${isRecruiter ? '🚨 Recruiter / Hiring Inquiry' : '📩 New Visitor Message'}</h2>
                <p style="font-size:15px;line-height:1.6;background:rgba(255,255,255,0.06);padding:16px;border-radius:10px;border-left:4px solid #a855f7;">
                    "${escapeHtml(message)}"
                </p>
                <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px;">
                    <tr><td style="padding:6px 0;color:#94a3b8;">Sender Name:</td><td style="padding:6px 0;font-weight:600;color:#fff;">${escapeHtml(senderName)}</td></tr>
                    <tr><td style="padding:6px 0;color:#94a3b8;">Location:</td><td style="padding:6px 0;color:#fff;">${escapeHtml(location)}</td></tr>
                    <tr><td style="padding:6px 0;color:#94a3b8;">Contact Info:</td><td style="padding:6px 0;color:#38bdf8;">${escapeHtml(contactInfo)}</td></tr>
                    <tr><td style="padding:6px 0;color:#94a3b8;">Category:</td><td style="padding:6px 0;color:#fff;">${escapeHtml(category)}</td></tr>
                </table>
                <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:20px 0;" />
                <p style="font-size:12px;color:#64748b;margin-bottom:0;">
                    Delivered automatically by Raya AI Companion • Ratnesh Kumar Singh Portfolio
                </p>
            </div>
        `;

        promises.push(
            axios.post('https://api.resend.com/emails', {
                from: 'Raya Portfolio <notifications@resend.dev>',
                to: [ADMIN_EMAIL],
                subject: emailSubject,
                html: emailHtml
            }, {
                headers: { Authorization: `Bearer ${resendKey.trim()}` },
                timeout: 8000
            })
            .then(() => console.log('🟢 [Admin Notifier] Resend email alert delivered to ' + ADMIN_EMAIL))
            .catch(err => console.warn('⚠️ [Admin Notifier] Resend error:', err.response?.data || err.message))
        );
    }

    // Wait for all active delivery channels without blocking
    if (promises.length > 0) {
        await Promise.allSettled(promises);
    } else {
        console.log('ℹ️ [Admin Notifier] No external webhook/bot configured. Message saved in Supabase for in-app admin telemetry.');
    }
}

function escapeHtml(text) {
    if (!text || typeof text !== 'string') return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

module.exports = {
    notifyAdminNewMessage
};
