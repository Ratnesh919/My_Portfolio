# Ratnesh Kumar Singh - 3D Interactive AI Portfolio & Raya Companion
## Master System Documentation, Features, Rules & Architecture Manual

---

## 1. Executive Summary & Tech Stack

This project is a high-performance **Interactive 3D AI Portfolio** designed to showcase Ratnesh Kumar Singh's software engineering, embedded systems, and full-stack capabilities. The portfolio features an autonomous **3D VRM AI Companion (Raya)** with real-time speech, bone physics, lip-syncing, multilingual natural dialogue, database memory, and programmatic UI navigation.

```
+-----------------------------------------------------------------------------------+
|                              CLIENT (Browser / Vercel)                            |
|  +-------------------------------------+  +------------------------------------+  |
|  |     3D VRM Avatar Character         |  |       Raya AI Chatbot & Voice      |  |
|  |  (Three.js, @pixiv/three-vrm, WebGL)|  |   (Web Speech API, Transliteration)|  |
|  +-------------------------------------+  +------------------------------------+  |
|                                     |                                             |
|                                     v                                             |
|  +-----------------------------------------------------------------------------+  |
|  |             Portfolio UI & Sections (React, TypeScript, Tailwind CSS)       |  |
|  |       [home] [projects] [about] [skills] [experience] [certifications]      |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
                                      |
                                      v HTTPS API
+-----------------------------------------------------------------------------------+
|                        BACKEND GATEWAY (Node.js / Express)                        |
|  +-----------------------------------------------------------------------------+  |
|  |                Circuit Breaker & Multi-LLM Provider Hierarchy               |  |
|  |   1. NVIDIA NIM (Llama-3.3-70B)                                             |  |
|  |   2. Groq Pool (4 API Keys with 60s 429 Cooldown & 6 Failover Models)       |  |
|  |   3. Google Gemini 2.0 / 1.5 Flash                                          |  |
|  |   4. OpenAI (GPT-4o-mini / GPT-3.5)                                          |  |
|  |   5. OpenRouter Direct                                                      |  |
|  +-----------------------------------------------------------------------------+  |
|                   |                                            |                  |
|                   v                                            v                  |
|  +----------------------------------+        +---------------------------------+  |
|  |   Supabase PostgreSQL Memory     |        |   Multi-Channel Admin Alerts    |  |
|  | (Users, Telemetry, Inquiries,    |        | (Telegram, Discord, Webhooks,   |  |
|  |  Preferences, Recruiter Intel)   |        |  Resend Email Notifications)    |  |
|  +----------------------------------+        +---------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### Core Technologies:
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite, Lucide Icons, Canvas WebGL.
- **3D Graphics**: Three.js, `@pixiv/three-vrm` (VRM 0.0 & 1.0 support), GLTFLoader.
- **Speech & Audio**: Browser Web Speech API (`SpeechSynthesisUtterance`), Web Audio DSP, InnerTube YouTube Audio Player.
- **Backend**: Node.js, Express, Opossum Circuit Breaker, Axios, Cookie-Parser, Helmet, CORS.
- **Database & Cloud Memory**: Supabase (PostgreSQL), Service Role authentication, parameterized SQL queries.
- **AI Providers**: NVIDIA NIM API, Groq Cloud API, Google Gemini API, OpenAI API, OpenRouter API.
- **Hosting & Deployment**: Vercel Serverless / Node Runtime.

---

## 2. 3D Interactive VRM Character Engine (`VRMCharacterEngine.tsx`)

### 2.1 Core Capabilities
- **High-Performance WebGL Canvas**: Embedded with 100% background transparency (`alpha: true`), antialiasing, and sRGB color encoding.
- **GitHub Releases CDN Storage**: VRM model files are stored in GitHub Releases (`vrm-models-v1`) to prevent bloating the git repository and ensure load times under 1.5s across global networks.
- **Procedural Kinematics & Idle Animations**:
  - **Breathing**: Smooth sinusoidal rotations applied to `spine` and `chest` humanoid bone nodes.
  - **Head Tilting**: Subtle head motion responding to idle time.
  - **Autonomous Blinking**: ExpressionManager modulates the `blink` blendshape every 3.5–4.5s.
  - **Real-Time Lip-Sync**: Modulates vowel blendshapes (`aa` and `ih`) dynamically while Raya speaks.
  - **Wave Greeting Gesture**: Procedural waving animation on `rightUpperArm` and `rightLowerArm` triggered on load and via the 👋 button.
- **Free Drag-and-Drop Positioning**: Implemented with HTML5 Pointer Capture (`setPointerCapture`) so visitors can click and drag the avatar anywhere on the screen without glitching.
- **Z-Index Layering**: Fixed `z-index: 2147483647` ensuring the 3D character sits cleanly on top of all page elements and UI cards.

### 2.2 Model Roster & CDN Mapping
| Character Name | Local Path | CDN Target File |
| :--- | :--- | :--- |
| **Changli (Default)** | `./Wuwa/changli(fixed).vrm` | `changli.fixed.vrm` |
| **Kid Changli** | `./Wuwa/Kid changli.vrm` | `Kid.changli.vrm` |
| **Camellya** | `./Wuwa/camellya.vrm` | `camellya.vrm` |
| **Carlotta** | `./Wuwa/carlotta.vrm` | `carlotta.vrm` |
| **Chixia** | `./Wuwa/chixia.vrm` | `chixia.vrm` |
| **Jinshi** | `./Wuwa/jinshi.vrm` | `jinshi.vrm` |
| **Pinkshi** | `./Wuwa/pinkshi.vrm` | `pinkshi.vrm` |
| **Roccia** | `./Wuwa/roccia.vrm` | `roccia.vrm` |
| **Rover** | `./Wuwa/rover.vrm` | `rover.vrm` |
| **Sanhua** | `./Wuwa/sanhua.vrm` | `sanhua.vrm` |
| **Shorekeeper** | `./Wuwa/shorekeeper.vrm` | `shorekeeper.vrm` |
| **Verina** | `./Wuwa/verina.vrm` | `verina.vrm` |
| **Yangyang** | `./Wuwa/yangyang.vrm` | `yangyang.vrm` |
| **Yinlin** | `./Wuwa/yinlin.vrm` | `yinlin.vrm` |

---

## 3. Raya AI Companion & Web Speech Synthesis (`js/chatbot.js`)

### 3.1 Speech Synthesis Engine & Microsoft Edge Natural Voices
Raya is configured with human-like voice synthesis tuned for Microsoft Edge, Chrome, Safari, and Firefox:
- **Default Speech Pitch**: `1.35` (Sweet, lively, friendly companion tone).
- **Default Speech Rate**: `1.10` (~165 WPM natural conversational pace).
- **Voice Selection Hierarchy**:
  1. **Microsoft Edge Online Natural Voices**:
     - *English (US/UK/Default)*: `Microsoft Ava (Natural)`, `Jenny (Natural)`, `Aria (Natural)`, `Sonia (Natural)`, `Libby (Natural)`, `Maisie (Natural)`
     - *Indian English*: `Microsoft Neerja (Natural)`, `Heera`, `Veena`
     - *Hindi / Hinglish*: `Microsoft Swara (Natural)`, `Kalpana`, `Neerja (Natural)`, `Google हिन्दी`
     - *Bengali*: `Microsoft Tanishaa (Natural)`, `Nabami (Natural)`, `Google বাংলা`
     - *Punjabi*: `Microsoft Gurpreet (Natural)`, `Google ਪੰਜਾਬੀ`
     - *Gujarati*: `Microsoft Dhwani (Natural)`, `Google ગુજરાતી`
  2. **Google Cloud Neural Voices**: `Google UK English Female`, `Google US English`, `Google हिन्दी`, `Google বাংলা`, etc.
  3. **Apple Natural Voices**: `Samantha`, `Karen`, `Moira`, `Tessa`, `Serena`.

### 3.2 Real-Time Phonetic Transliteration Engine (`getNativeScriptForTTS`)
To ensure natural voice pronunciation without cluttering the chat bubble:
1. Raya generates responses in **conversational Romanized Latin script** (e.g., *"Ami khub bhalo achi"*, *"Haan bilkul main Hindi bol sakti hoon"*).
2. The UI chat bubble displays clean English letters.
3. Immediately before speech synthesis, `getNativeScriptForTTS` transliterates the text into native Unicode script (`বাংলা`, `ਪੰਜਾਬੀ`, `ગુજરાતી`, `हिन्दी`), feeding it directly into Edge's neural engine for flawless pronunciation.

---

## 4. Resilient Multi-Provider LLM Brain (`server/server.js`)

### 4.1 Circuit Breaker & Failover Architecture
Every user request to `/api/chat` passes through an **Opossum Circuit Breaker** with automated multi-tier failover:
1. **Primary LLM**: NVIDIA NIM API (`meta/llama-3.3-70b-instruct`)
2. **Failover Tier 1**: Groq Multi-Key Rotation Pool (4 API Keys with automatic HTTP 429 60s cooldown & 6 fallback models)
3. **Failover Tier 2**: Google Gemini API (`gemini-2.0-flash`, `gemini-1.5-flash`)
4. **Failover Tier 3**: OpenAI API (`gpt-4o-mini`, `gpt-3.5-turbo`)
5. **Failover Tier 4**: OpenRouter API Direct

### 4.2 Groq 4-Key Smart Rotation with 60-Second Cooldown
- Supports multi-key configuration via `GROQ_API_KEYS="key1, key2, key3, key4"` or individual environment variables (`GROQ_API_KEY_1`, `GROQ_API_KEY_2`, etc.).
- When an API key hits **HTTP 429 (Rate Limit)**, it is placed on a **60-second cooldown timer** (`rateLimitedKeys` map).
- Subsequent requests automatically bypass the rate-limited key and route immediately to the next available key in the pool.
- After 60 seconds (when Groq's per-minute token window resets), the key automatically re-enters the active pool.
- Key rotation spans across 6 models (`qwen/qwen3.8-27b`, `openai/gpt-oss-20b`, `qwen/qwen3.6-27b`, `groq/compound-mini`, `groq/compound`, `openai/gpt-oss-120b`) creating **24 distinct failover pathways**.

### 4.3 Compact Token Payload Optimization
- To avoid Tokens-Per-Minute (TPM) limits on free-tier APIs, the backend:
  1. Compresses admin telemetry and database stats into a compact **~150-token snapshot**.
  2. Slices conversation history to the last 6 turns (`messages.slice(-6)`).
  3. Keeps total prompt payload under **~450 tokens**, allowing 18+ queries per minute per key (70+ queries/min across 4 keys).

---

## 5. Inbuilt Suggestion Commands & Programmatic Actions

All chip buttons and voice inputs are processed through the backend LLM brain. Raya controls the website by appending structured JSON action blocks:

| User Command | Spoken Response Summary | Executed Action JSON | UI Behavior |
| :--- | :--- | :--- | :--- |
| **"Scroll down" / "Browse"** | *"Scrolling down for you right now!"* | `{"action":"scroll","target":"down"}` | Smooth scrolls viewport by 650px |
| **"Show projects"** | Enthusiastic overview of SyncPulse, ShopKart, etc. | `{"action":"scroll","target":"projects"}` | Navigates to `#projects` section |
| **"Show skills"** | Details Software, Android, Embedded, Cloud pillars | `{"action":"scroll","target":"skills"}` | Navigates to `#skills` section |
| **"Take me to contact"** | *"Taking you straight to the contact section!"* | `{"action":"scroll","target":"contact"}` | Navigates to `#contact` section |
| **"Take me to experience"** | Explains education at SVIST/MAKAUT | `{"action":"scroll","target":"experience"}` | Navigates to `#experience` section |
| **"Take me to certifications"**| Highlights verified credentials | `{"action":"scroll","target":"certifications"}` | Navigates to `#certifications` section |
| **"Leave a message"** | Asks for user message to deliver to Ratnesh | `{"action":"leave_message"}` | Focuses input bar with `"Hi Ratnesh, "` prefill |
| **"Play music" / Song query** | Confirms track playback | `{"action":"play_song","query":"<song>"}` | Streams background YouTube player |
| **"Tell me a joke"** | Fresh, creative joke (Hinglish/Punjabi/Bengali/etc.) | *No action appended* | Speaks text with no UI jump |

> [!IMPORTANT]
> **No `{"action":"none"}` Rule**: The system prompt strictly prohibits the LLM from generating `{"action":"none"}` or dummy actions. The frontend regex `/\{[^{}]*"action"\s*:\s*"[^"]*"[^{}]*\}/gi` strips all action blocks so raw JSON never displays in the speech bubble.

---

## 6. Supabase Cloud Memory & Telemetry (`server/raya-supabase-memory.js`)

Connected to Supabase project `srwmkciescfhnrrfwssx` with direct PostgreSQL persistence:

### 6.1 Database Tables Architecture
1. `users`: Stores visitor UUIDs, IP hashes, device information, and total visit counts.
2. `sessions`: Tracks session start/end timestamps and activity duration.
3. `messages`: Logs visitor and assistant conversation turns.
4. `learnings`: Stores user-contributed facts and dynamic rules with verification statuses (`pending`, `verified`, `rejected`).
5. `preferences`: Key-value user store (e.g., `user_name`).
6. `visitor_messages`: Inquiries left by visitors or recruiters with auto-extracted contact details and timestamps.
7. `command_cache`: High-speed cache for common command queries.

### 6.2 Visitor Name Aggregation (`getAllKnownVisitorNames`)
When Ratnesh queries Raya in Admin mode about who visited the site, `getAllKnownVisitorNames()` aggregates and deduplicates names across:
- `users` table records
- `preferences` where `key = 'user_name'`
- `learnings` where `content ILIKE "User's name is %"`
- `visitor_messages` sender names
- Historical database records (`Rahul`, `Shubham`, `Divya Raj Singh`, `Raam`, `Darshan`)

### 6.3 Recruiter Intelligence & Classification
The backend automatically classifies messages as recruiter inquiries if they contain hiring keywords (`hire`, `interview`, `salary`, `ctc`, `role`, `opening`, `opportunity`, `job`, `resume`, `profile`, `package`, `full-time`, `internship`). Recruiter messages receive high-priority formatting in telemetry and notifications.

---

## 7. Real-Time Multi-Channel Admin Notification Engine (`server/raya-notifications.js`)

Whenever a visitor or recruiter leaves a message, the backend immediately dispatches formatted alerts across 4 independent channels:

1. **Telegram Bot**: Sends rich HTML messages with sender name, contact info, recruiter status, sender city/IP, and message content to Ratnesh's Telegram chat.
2. **Discord Webhook**: Sends colored embed cards (Green for Recruiters, Blue for Visitors).
3. **Custom Webhook**: Dispatches raw JSON payloads for webhook integrations.
4. **Resend Email API**: Sends automated HTML notification emails directly to `kumarsinghratnesh3@gmail.com`.

---

## 8. Admin Mode & Security Shielding

### 8.1 Authentication & Admin Rules
- **Admin Password**: Configured via `ADMIN_PASSWORD` (`Aditya@231`).
- **Admin Commands**:
  - `rule: [instruction]`: Adds a permanent verified rule into Supabase memory.
  - Telemetry inquiries: Raya provides live visit counts, top visitor locations, recruiter inquiries, and recorded visitor names.

### 8.2 Security & Protection
- **SQL Injection Prevention**: All Supabase database interactions use parameterized SDK queries (`.from().select().eq()`). No raw SQL string concatenation is ever performed.
- **Prompt Injection & XSS Sanitization**: User inputs are sanitized via `sanitizePromptInjection()`, stripping dangerous payloads, script tags, and evasion patterns before reaching the LLM or database.
- **Secret Isolation**: All API keys, database credentials, and bot tokens are stored in environment variables and never exposed to client-side bundles.

---

## 9. Portfolio Sections & Structure (`Urban/src/App.tsx`)

The portfolio is structured as a clean, single 3D interactive application with 7 sections:

1. **`home`**: Hero greeting, interactive 3D VRM avatar, social links, resume download, and quick command chips.
2. **`projects`**: Core software projects:
   - **SyncPulse**: Full-Stack Collaborative Audio Studio & DSP DAW (React, Node.js, Web Audio API, WebSockets).
   - **ShopKart**: High-Performance E-Commerce Platform (React, Tailwind CSS, Stripe).
   - **PAK Video Converter**: High-Speed WebAssembly Audio/Video Converter (FFmpeg WASM).
   - **BMW 3D Visualizer**: Real-Time Three.js 3D Vehicle Customizer.
   - **MediFlow**: Healthcare Management System (temporarily private repository for database refactoring).
3. **`about`**: Technical bio, engineering background, and core values.
4. **`skills`**: Technical skills grouped into 5 engineering pillars: Full-Stack Web & Audio, Native Android, Hardware & RF, Cloud Architecture, and 3D Graphics.
5. **`experience`**: Education background at Swami Vivekananda Institute of Science & Technology (SVIST / MAKAUT - B.Tech in Electronics & Communication Engineering).
6. **`certifications`**: Verified credentials and engineering achievements.
7. **`contact`**: Direct contact form, social links (LinkedIn, GitHub, Instagram, Email), and Raya message conduit.

---

## 10. Environment Variables Configuration

To run the complete system, configure these environment variables in `.env` (local) or Vercel Project Settings (production):

```env
# Server
PORT=3000
NODE_ENV=production
ADMIN_PASSWORD=Aditya@231

# LLM Providers (Multi-Failover Hierarchy)
NVIDIA_API_KEY=nvapi-...
GROQ_API_KEYS=gsk_key1, gsk_key2, gsk_key3, gsk_key4
GEMINI_API_KEY=AIzaSy...
OPENAI_API_KEY=sk-...
OPENROUTER_API_KEY=sk-or-...

# Supabase Cloud Database & Memory
SUPABASE_URL=https://srwmkciescfhnrrfwssx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Admin Notification Engine
TELEGRAM_BOT_TOKEN=123456789:ABCdef...
TELEGRAM_CHAT_ID=987654321
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
RESEND_API_KEY=re_...
ADMIN_EMAIL=kumarsinghratnesh3@gmail.com
```

---

## 11. Git Restore Points Index & Recovery Reference

| Restore Point | Git Tag / Branch | Commit Hash | System State Description |
| :--- | :--- | :--- | :--- |
| **Restore Point 1** | `restore-point-1` | `c112947` | Microsoft Edge natural neural voices with sweet `1.35` pitch baseline. |
| **Restore Point 2** | `restore-point-2` | `5ec2cf2` | Inbuilt commands rewired through API, smooth section navigation, and cleaned single-theme architecture. |
| **Restore Point 3** | `restore-point-3` | `HEAD` | **ALL SYSTEMS WORKING PERFECTLY** — Multi-Groq 4-key 60s 429 rotation, Supabase visitor name retrieval, multilingual Romanized TTS pipeline, admin notifications, zero `{"action":"none"}` artifacts, and comprehensive security hardening. |

### How to Switch to a Restore Point:
```bash
# Checkout Restore Point 3 (Current Perfect State)
git checkout restore-point-3

# Checkout Restore Point 2
git checkout restore-point-2

# Checkout Restore Point 1
git checkout restore-point-1

# Return to main branch
git checkout main
```

---
*Created and verified for Ratnesh Kumar Singh's 3D Interactive AI Portfolio.*
