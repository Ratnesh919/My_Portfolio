# ⚙️ Server — Node.js & Express AI Gateway

This directory contains the server-side architecture, LLM circuit breaker, Supabase cloud memory client, and multi-channel notification dispatcher for Ratnesh Kumar Singh's 3D Interactive AI Portfolio.

---

## 🏛️ Architecture Overview

The backend acts as an intelligent, fault-tolerant gateway between the client frontend, multiple AI / LLM cloud providers, Supabase PostgreSQL database, and alert channels:

```
                          Client Requests (/api/*)
                                     |
                                     v
                          [Express 5 Web Server]
                                     |
    +--------------------------------+--------------------------------+
    |                                |                                |
    v                                v                                v
[/api/chat]                   [/api/yt-search]              [/api/admin/*]
    |                                |                                |
    v                                v                                v
[Opossum Circuit Breaker]      [YouTube InnerTube]           [Admin Authenticator]
    |                                                                 |
    +--> 1. NVIDIA NIM API                                            +--> /api/admin/visitor-profiles
    +--> 2. Groq Cloud 4-Key Pool (60s cooldown on 429)               +--> /api/admin/messages
    +--> 3. Google Gemini Direct API                                  +--> /api/admin/unread-count
    +--> 4. OpenAI Direct API                                         +--> /api/admin/stats
    +--> 5. OpenRouter Failover                                       +--> /api/admin/rule
                                     |
                                     v
                       [Supabase PostgreSQL Memory]
                       - users (Visitor Fingerprints)
                       - visitor_profiles (userid, name, ip, loc)
                       - preferences (Key-Value pairs)
                       - learnings (Dynamic Facts & Admin Rules)
                       - visitor_messages (Recruiter Classified)
                                     |
                                     v
                   [Multi-Channel Notification Hub]
                   - Telegram Bot API
                   - Discord Webhooks
                   - Resend Email API
                   - Custom Webhook Dispatcher
```

---

## 📁 File Manifest

| File | Purpose |
| :--- | :--- |
| `server.js` | Main Express application, circuit breaker, rate limiters, route definitions, and LLM providers. |
| `raya-supabase-memory.js` | Supabase PostgreSQL client, user initialization, visitor profile tracking, and conversation context builder. |
| `raya-notifications.js` | Notification dispatcher for Telegram, Discord, Resend email, and external webhooks. |

---

## 🛡️ Circuit Breaker & Multi-LLM Provider Failover

The `/api/chat` route is protected by an **Opossum Circuit Breaker** (`timeout: 28000ms`, `errorThresholdPercentage: 50%`, `resetTimeout: 30000ms`):

1. **Tier 1: NVIDIA NIM API (Primary)**
   - Model: `meta/llama-3.3-70b-instruct`
   - Fast-fail timeout: 7000ms
2. **Tier 2: Groq Cloud Multi-Key Pool**
   - 4 rotating API keys (`GROQ_API_KEYS` or `GROQ_API_KEY_1..4`).
   - On HTTP 429 (Rate Limit), key enters a 60-second cooldown in `rateLimitedKeys`, immediately trying the next key.
   - Rotates across 6 models (`qwen/qwen3.8-27b`, `openai/gpt-oss-20b`, `qwen/qwen3.6-27b`, `groq/compound-mini`, `groq/compound`, `openai/gpt-oss-120b`), providing **24 distinct fallback combinations**.
3. **Tier 3: Google Gemini API Direct**
   - Models: `gemini-2.0-flash`, `gemini-1.5-flash`
4. **Tier 4: OpenAI API Direct**
   - Models: `gpt-4o-mini`, `gpt-3.5-turbo`
5. **Tier 5: OpenRouter API**
   - Global fallback for maximum uptime.

---

## ☁️ Supabase Cloud Database & Visitor Tracking

Connected via `@supabase/supabase-js` using service role credentials with strict parameterized SQL:

### Table Schemas:
- **`users`**: Visitor fingerprints, visit counts, IP hashes, city/country, and timestamps.
- **`visitor_profiles`**: Synchronized visitor identity (`userid`, `name`, `ip_address`, `location`, `updated_at`).
- **`preferences`**: Key-value pairs per user (e.g. `user_name`).
- **`learnings`**: Self-learning system (`type IN ('fact', 'preference', 'correction', 'admin_rule')`).
- **`visitor_messages`**: Captured inquiries with auto-recruiter classification (`is_recruiter`).

### Recruiter Detection Logic:
```javascript
const recruiterKeywords = [
    'hire', 'interview', 'salary', 'ctc', 'role', 'opening', 'opportunity',
    'job', 'resume', 'profile', 'package', 'full-time', 'internship',
    'recruiter', 'hr', 'talent', 'position', 'hiring'
];
```

### Visitor Name Sanitization & Validation (`validatePersonName`):
To prevent bot injections, button commands (e.g. "Take", "Tour", "Recruiter", "Scroll"), or arbitrary conversational words from polluting `visitor_profiles` and `preferences`:
- `/api/learn` and `/api/init-user` validate candidate names against `SERVER_FORBIDDEN_NAME_WORDS` and strict length/character rules before committing to Supabase.
- Disallowed words return `null` and are discarded without interrupting the user's conversation.

---

## 🔔 Multi-Channel Notification Dispatcher

When a visitor leaves a message, `raya-notifications.js` sends alerts to:
- **Telegram Bot**: Formats rich HTML with recruiter badge, contact info, and timestamp.
- **Discord Webhook**: Sends an embedded card (Green for Recruiters, Blue for Visitors).
- **Resend Email**: Direct HTML email delivered to `kumarsinghratnesh3@gmail.com`.
- **Custom Webhook**: Raw JSON payload for external automation workflows.

---

## 🔒 Security & Defense Implementation

1. **Row Level Security (RLS)**: Enforced across all Supabase tables; service role operations are isolated on the server.
2. **SQL Injection Immune**: All database queries use Supabase SDK parameterized methods (`.from().select().eq()`). Zero string concatenation.
3. **Prompt Injection Guard**: Inputs are filtered via `sanitizePromptInjection()` to neutralize jailbreaks (`ignore previous instructions`, `you are now`, `DAN`, etc.).
4. **Input Sanitization**: Strings are HTML-escaped and character-length bounded to prevent XSS.

---

## 🚀 Running the Server Locally

```bash
# From project root:
npm start

# Or with live reload:
npm run dev
```

---

<div align="center">
  <sub>Part of Ratnesh Kumar Singh's 3D Interactive AI Portfolio.</sub>
</div>
