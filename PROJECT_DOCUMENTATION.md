# Ratnesh Kumar Singh - 3D Interactive AI Portfolio & Raya Companion
## Master System Blueprint, Architecture Specification, AI Replication Guide & Bug-Fix Playbook

> **AI REPLICATION DIRECTIVE**: This document contains the complete architectural specification, source code logic, database schema, design rules, and bug-fix playbook for Ratnesh Kumar Singh's Interactive 3D AI Portfolio. Any AI coding assistant given this document can recreate the exact system, features, and behaviors from scratch without omissions.

---

## 1. System Architecture & High-Level Overview

```
+---------------------------------------------------------------------------------------------------+
|                                      CLIENT LAYER (Browser / Vercel)                              |
|  +--------------------------------------------+  +---------------------------------------------+  |
|  |       3D VRM Avatar Character Engine       |  |          Raya AI Chatbot & Voice Core       |  |
|  |  - Three.js WebGL Engine (Alpha: True)     |  |  - Web Speech API (Pitch: 1.35, Rate: 1.10) |  |
|  |  - @pixiv/three-vrm Runtime (0.0 & 1.0)    |  |  - Real-Time Phonetic Transliteration Engine|  |
|  |  - Procedural Bones: Breathe, Blink, Wave  |  |  - Floating Input Bar & Live Speech Bubble  |  |
|  |  - HTML5 Pointer Capture Drag-and-Drop     |  |  - Auto Voice Cooldown & Wake Word Pipeline |  |
|  |  - Fixed Top Z-Index: 2147483647           |  |  - Dual Action JSON Parser                  |  |
|  +--------------------------------------------+  +---------------------------------------------+  |
|                                        \                /                                         |
|                                         v              v                                          |
|  +---------------------------------------------------------------------------------------------+  |
|  |                         Modern Single-Page React Application (Urban UI)                     |  |
|  |    [1. Home/Hero] [2. Projects] [3. About] [4. Skills] [5. Experience] [6. Certs] [7. Contact] |  |
|  |    - window.navigateToSection() Interop Bridge                                              |  |
|  |    - InnerTube YouTube Audio Player Embedded Streamer                                       |  |
|  +---------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
                                                  |
                                                  v HTTPS REST API (/api/*)
+---------------------------------------------------------------------------------------------------+
|                                 BACKEND GATEWAY (Node.js / Express)                               |
|  +---------------------------------------------------------------------------------------------+  |
|  |                           Circuit Breaker & Multi-LLM Gateway                              |  |
|  |   1. NVIDIA NIM (Primary: meta/llama-3.3-70b-instruct)                                      |  |
|  |   2. Groq 4-Key Pool (60s Cooldown on HTTP 429 & 6 Fallback Models: Qwen, GPT-OSS, Compound)  |  |
|  |   3. Google Gemini Direct (gemini-2.0-flash, gemini-1.5-flash)                              |  |
|  |   4. OpenAI Direct (gpt-4o-mini, gpt-3.5-turbo)                                             |  |
|  |   5. OpenRouter Direct Failover                                                             |  |
|  +---------------------------------------------------------------------------------------------+  |
|                        |                                                 |                        |
|                        v                                                 v                        |
|  +-------------------------------------------+         +---------------------------------------+  |
|  |     Supabase Cloud Database (PostgreSQL)  |         |  Multi-Channel Admin Notification Hub |  |
|  |  - users (Visitor Fingerprints & Counts)  |         |  - Telegram Bot API (HTML formatting) |  |
|  |  - preferences (user_name key-value)      |         |  - Discord Webhooks (Rich Embeds)     |  |
|  |  - learnings (Dynamic Facts & Admin Rules)|         |  - Custom Webhooks (Raw JSON)         |  |
|  |  - visitor_messages (Recruiter Classified)|         |  - Resend Email (Direct HTML Inquiries|  |
|  |  - sessions & command_cache               |         |  - Destination: kumarsinghratnesh3@...|  |
|  +-------------------------------------------+         +---------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. Directory Structure & File Map

```
My_Portfolio/
├── .env                              # Environment variables (Never committed to Git)
├── package.json                      # Root scripts and backend dependencies
├── vercel.json                       # Vercel serverless routing and headers configuration
├── PROJECT_DOCUMENTATION.md          # Master architectural blueprint and documentation
├── index.html                        # Root HTML shell
├── js/
│   ├── app.js                        # Main legacy orchestrator
│   ├── chatbot.js                    # Raya AI Assistant, Web Speech API & Action Handlers
│   ├── vrm-config.js                 # Character list and local/CDN mapping
│   ├── vrm-loader.js                 # Three.js VRM loader helper
│   ├── intro.js                      # Splash screen & enter animation
│   └── script.js                     # DOM interaction & smooth scroll helpers
├── server/
│   ├── server.js                     # Express API Gateway, Circuit Breaker, LLM Providers
│   ├── raya-supabase-memory.js       # Supabase PostgreSQL client & query methods
│   └── raya-notifications.js        # Telegram, Discord, Email alert dispatcher
└── Urban/                            # React 18 + Vite Frontend Application
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── App.tsx                   # Main React entry & window.navigateToSection bridge
        ├── main.tsx
        ├── components/
        │   └── portfolio/
        │       ├── VRMCharacterEngine.tsx   # 3D Three.js VRM Canvas (Z-Index 2147483647)
        │       ├── RayaAICompanion.tsx      # React Chat UI Shell
        │       ├── HeroSection.tsx          # Home/Hero with action chips
        │       ├── ProjectsSection.tsx      # SyncPulse, ShopKart, PAK, BMW, MediFlow
        │       ├── AboutSection.tsx         # Bio & Engineering Philosophy
        │       ├── SkillsSection.tsx        # 5 Engineering Pillars
        │       ├── ExperienceSection.tsx    # SVIST / MAKAUT B.Tech ECE Education
        │       ├── CertificationsSection.tsx# Verified Credentials
        │       ├── ContactSection.tsx       # Contact Form & Social Links
        │       └── Navbar.tsx               # Fixed Glassmorphic Navigation
        └── lib/
            └── portfolioData.ts             # Static data models & external URLs
```

---

## 3. 3D Interactive VRM Character Engine (`VRMCharacterEngine.tsx`)

### 3.1 Three.js & VRM Specification
- **Engine**: Three.js WebGLRenderer with `alpha: true`, `antialias: true`, `powerPreference: 'high-performance'`, `outputColorSpace = THREE.SRGBColorSpace`.
- **VRM Loader Plugin**: `@pixiv/three-vrm` with `GLTFLoader`.
- **Lighting Setup**:
  - `AmbientLight`: Color `#ffffff`, intensity `1.7`.
  - `DirectionalLight` (Key light): Color `#ff416c`, intensity `2.4`, position `(1.0, 2.0, 1.0)`.
  - `DirectionalLight` (Rim light): Color `#38bdf8`, intensity `2.0`, position `(-1.0, 1.5, -1.0)`.
- **Camera Configuration**: `PerspectiveCamera(30, width / height, 0.1, 20.0)` positioned at `(0.0, 1.25, 1.6)` looking at `(0.0, 1.15, 0.0)`.

### 3.2 Procedural Kinematics & Facial Animation Loops
1. **Breathing**: `spine.rotation.x = Math.sin(time * 1.5) * 0.02`, `chest.rotation.y = Math.sin(time * 0.8) * 0.03`.
2. **Head Tilting**: `head.rotation.y = Math.sin(time * 0.5) * 0.06`, `head.rotation.x = Math.sin(time * 1.2) * 0.02`.
3. **Autonomous Blinking**: `expressionManager.setValue('blink', Math.sin(time * 0.8) > 0.96 ? 1 : 0)`.
4. **Real-Time Lip-Sync**:
   - When speaking (`isTalking || window.chatbotTalking`):
     - `expressionManager.setValue('aa', Math.abs(Math.sin(time * 9.0)) * 0.75)`
     - `expressionManager.setValue('ih', Math.abs(Math.cos(time * 9.0)) * 0.35)`
   - When idle: `aa = 0`, `ih = 0`.
5. **Procedural Wave Greeting**:
   - Triggered on load and via `playWaveAnimation()`:
     - `rightUpperArm.rotation.z = -1.25 + Math.sin(time * 8.0) * 0.22`
     - `rightUpperArm.rotation.x = -0.45`
     - `rightLowerArm.rotation.y = -0.85 + Math.sin(time * 8.0) * 0.32`
   - Automatically resets after 4000ms.

### 3.3 Free Drag-and-Drop Pointer Capture
- Implemented with `onPointerDown`, `onPointerMove`, and `onPointerUp`.
- Captures pointer ID (`e.target.setPointerCapture(e.pointerId)`).
- Bound to screen edges: `x: Math.max(0, Math.min(window.innerWidth - 300, newX))`, `y: Math.max(0, Math.min(window.innerHeight - 100, newY))`.
- Fixed positioning style: `position: fixed; left: ${x}px; top: ${y}px; z-index: 2147483647;`.

### 3.4 CDN Model Mapping (GitHub Releases `vrm-models-v1`)
Base URL: `https://github.com/Ratnesh919/My_Portfolio/releases/download/vrm-models-v1/`
```typescript
const FILE_MAP: Record<string, string> = {
  'changli(fixed).vrm': 'changli.fixed.vrm',
  'Kid changli.vrm': 'Kid.changli.vrm',
  'camellya.vrm': 'camellya.vrm',
  'carlotta.vrm': 'carlotta.vrm',
  'chixia.vrm': 'chixia.vrm',
  'jinshi.vrm': 'jinshi.vrm',
  'pinkshi.vrm': 'pinkshi.vrm',
  'roccia.vrm': 'roccia.vrm',
  'rover.vrm': 'rover.vrm',
  'sanhua.vrm': 'sanhua.vrm',
  'shorekeeper.vrm': 'shorekeeper.vrm',
  'verina.vrm': 'verina.vrm',
  'yangyang.vrm': 'yangyang.vrm',
  'yinlin.vrm': 'yinlin.vrm',
};
```

---

## 4. Raya AI Voice & Multilingual Engine (`js/chatbot.js`)

### 4.1 Speech Synthesis Engine Specification
- **API**: Window Web Speech API (`SpeechSynthesisUtterance`).
- **Tuned Pitch**: `1.35` (Sweet, lively, companion character tone).
- **Tuned Rate**: `1.10` (~165 WPM conversational speaking pace).
- **Voice Selection Hierarchy**:
  ```javascript
  // 1. Edge Natural Female Voices
  edgeNeuralFemale = voices.find(v => /Ava.*Natural/i.test(v.name) && v.lang.startsWith('en'))
                  || voices.find(v => /Jenny.*Natural/i.test(v.name) && v.lang.startsWith('en'))
                  || voices.find(v => /Aria.*Natural/i.test(v.name) && v.lang.startsWith('en'))
                  || voices.find(v => /Neerja.*Natural/i.test(v.name));
  // 2. Indian English Female Voices
  neuralIndianFemale = voices.find(v => v.name.includes('Neerja')) || voices.find(v => v.name.includes('Heera'));
  // 3. Google Cloud Female Voices
  googleFemale = voices.find(v => v.name === 'Google UK English Female') || voices.find(v => v.name === 'Google US English');
  // 4. Apple Natural Voices
  appleFemale = voices.find(v => v.name === 'Samantha') || voices.find(v => v.name === 'Karen');
  ```

### 4.2 Language Voice Mapping & Dialect Matrix
| Language / Dialect | Detected Script / Keywords | Target Lang Code | Selected Edge Voice |
| :--- | :--- | :--- | :--- |
| **English (US/Default)** | Default | `en-US` | `Microsoft Ava (Natural)`, `Jenny (Natural)` |
| **Indian English** | `ratnesh`, `svist`, `makaut`, `btech`, `kolkata`, `yaar` | `en-IN` | `Microsoft Neerja (Natural)`, `Heera`, `Veena` |
| **UK English** | `colour`, `flavour`, `cheers`, `mate`, `brilliant`, `bloke` | `en-GB` | `Microsoft Sonia (Natural)`, `Libby (Natural)`, `Maisie` |
| **Hindi / Hinglish** | Devanagari or `namaste`, `kaise`, `kya`, `chutkula`, `hai` | `hi-IN` | `Microsoft Swara (Natural)`, `Kalpana`, `Neerja` |
| **Bengali** | Bengali script or `kemon`, `acho`, `bhalo`, `amar`, `tumi` | `bn-IN` | `Microsoft Tanishaa (Natural)`, `Nabami (Natural)` |
| **Punjabi** | Gurmukhi or `kidda`, `sat sri akal`, `kive`, `tussi`, `paaji` | `pa-IN` | `Microsoft Gurpreet (Natural)` |
| **Gujarati** | Gujarati script or `kem cho`, `majama`, `tamaru`, `su` | `gu-IN` | `Microsoft Dhwani (Natural)` |

### 4.3 Real-Time Phonetic Transliteration Engine (`getNativeScriptForTTS`)
- **Reason**: Writing native scripts (Devanagari, Bengali, etc.) in the UI chat bubble clashes with the modern English interface design. However, reading Romanized English phonetically with native Edge TTS engines results in awkward pronunciation.
- **Solution**:
  1. Raya outputs clean Romanized text in standard English letters (A–Z).
  2. The UI speech bubble renders the clean English letters.
  3. Right before calling `speechSynthesis.speak(utterance)`, `getNativeScriptForTTS(cleanText, langCode)` converts Romanized words into native Unicode characters:
     - `Ami khub bhalo achi` $\rightarrow$ `আমি খুব ভালো আছি` (Spoken by `Tanishaa Natural`)
     - `Main Hindi mein baat kar sakti hoon` $\rightarrow$ `मैं हिंदी में बात कर सकती हूँ` (Spoken by `Swara Natural`)
     - `Haanji main Punjabi bol sakdi aan` $\rightarrow$ `ਹਾਂਜੀ ਮੈਂ ਪੰਜਾਬੀ ਬੋਲ ਸਕਦੀ ਆਂ` (Spoken by `Gurpreet Natural`)
     - `Hu Gujarati ma vaat kari saku chu` $\rightarrow$ `હું ગુજરાતી માં વાત કરી શકું છું` (Spoken by `Dhwani Natural`)

---

## 5. Multi-Provider LLM Gateway & Circuit Breaker (`server/server.js`)

### 5.1 Provider Failover Hierarchy
Requests to `/api/chat` execute through an **Opossum Circuit Breaker** (`timeout: 28000ms`, `errorThresholdPercentage: 50%`, `resetTimeout: 30000ms`):

1. **Tier 1: NVIDIA NIM API (Primary)**
   - Model: `meta/llama-3.3-70b-instruct`
   - Endpoint: `https://integrate.api.nvidia.com/v1/chat/completions`
   - Timeout: 7000ms (fast-fail on 401/404/network timeout).
2. **Tier 2: Groq Cloud API (Multi-Key Rotation Pool)**
   - Keys: 4 API keys loaded from `GROQ_API_KEYS` (comma/space/newline separated) or `GROQ_API_KEY_1..4`.
   - Cooldown: On HTTP 429, key enters `rateLimitedKeys` with `Date.now() + 60000` expiration. Next key is tried immediately.
   - Model Lineup (Rotated across keys):
     1. `qwen/qwen3.8-27b`
     2. `openai/gpt-oss-20b`
     3. `qwen/qwen3.6-27b`
     4. `groq/compound-mini`
     5. `groq/compound`
     6. `openai/gpt-oss-120b`
   - Total Failover Capacity: 4 keys $\times$ 6 models = **24 distinct fallback paths**.
3. **Tier 3: Google Gemini API Direct**
   - Models: `gemini-2.0-flash`, `gemini-1.5-flash`
   - Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`
4. **Tier 4: OpenAI API Direct**
   - Models: `gpt-4o-mini`, `gpt-3.5-turbo`
5. **Tier 5: OpenRouter Direct**

### 5.2 Token Optimization & TPM Shielding
- Free tier Groq keys have an **8,000 Tokens-Per-Minute (TPM)** quota.
- To prevent rate limit exhaustion:
  - Admin telemetry is compressed into a **~150-token summary**.
  - History is strictly bounded to the last 6 turns: `messages.slice(-6)`.
  - Total payload per request is **<450 tokens**, allowing 18+ queries/min per key and **70+ queries/min across 4 keys**.

---

## 6. Programmatic Action Execution Protocol

Raya orchestrates UI state by appending structured JSON action blocks at the end of her dialogue:

```typescript
type RayaAction = 
  | { action: "scroll"; target: "home" | "projects" | "about" | "skills" | "experience" | "certifications" | "contact" | "down" }
  | { action: "play_song"; query: string }
  | { action: "leave_message" }
  | { action: "open_link"; target: string };
```

### Action Handling Rules:
1. **JSON Extraction Regex**: `/\{[^{}]*"action"\s*:\s*"[^"]*"[^{}]*\}/gi`
2. **Filtering**: Any action with `"action":"none"` or `"action":"dummy"` is completely ignored.
3. **Display Scrubbing**: All matched JSON blocks and markdown code fences (````json ... ````) are stripped from `spokenText` before rendering the chat bubble and triggering TTS.
4. **Navigation Bridge**: `action: "scroll"` calls `window.navigateToSection(target)` (exposed in `Urban/src/App.tsx`) with fallback `document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })`.
5. **Scroll Down**: `target: "down"` executes `window.scrollBy({ top: 650, behavior: 'smooth' })`.
6. **Music Player**: `action: "play_song"` searches YouTube via `/api/yt-search` and embeds a non-intrusive floating audio player (`#raya-yt-wrapper`).

---

## 7. Supabase PostgreSQL Cloud Memory (`server/raya-supabase-memory.js`)

Connected to Supabase Project `srwmkciescfhnrrfwssx`:

### 7.1 Database Table Schemas
```sql
-- 1. Users & Visitors
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fingerprint TEXT UNIQUE,
    ip_hash TEXT,
    visit_count INT DEFAULT 1,
    city TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. User Preferences
CREATE TABLE preferences (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Dynamic Learnings & Admin Rules
CREATE TABLE learnings (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    type TEXT CHECK (type IN ('fact', 'preference', 'correction', 'admin_rule', 'admin_outbox')),
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Visitor & Recruiter Messages
CREATE TABLE visitor_messages (
    id SERIAL PRIMARY KEY,
    user_name TEXT,
    contact_info TEXT,
    message TEXT NOT NULL,
    is_recruiter BOOLEAN DEFAULT FALSE,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read BOOLEAN DEFAULT FALSE
);

-- 5. Command Cache
CREATE TABLE command_cache (
    id SERIAL PRIMARY KEY,
    query_hash TEXT UNIQUE,
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 7.2 Visitor Name Aggregation (`getAllKnownVisitorNames`)
Aggregates and deduplicates visitor names from across the entire database:
1. `users` table records
2. `preferences` table (`key: 'user_name'`)
3. `learnings` table (`content ILIKE "User's name is %"`)
4. `visitor_messages` table (`user_name`)
5. Historical records (`Rahul`, `Shubham`, `Divya Raj Singh`, `Raam`, `Darshan`)

### 7.3 Recruiter Detection Algorithm
```javascript
function classifyMessageImportance(message, contactInfo) {
    const text = (message + ' ' + (contactInfo || '')).toLowerCase();
    const recruiterKeywords = [
        'hire', 'interview', 'salary', 'ctc', 'role', 'opening', 'opportunity',
        'job', 'resume', 'profile', 'package', 'full-time', 'internship',
        'recruiter', 'hr', 'talent', 'position', 'hiring'
    ];
    return recruiterKeywords.some(k => text.includes(k));
}
```

---

## 8. Multi-Channel Admin Notification Engine (`server/raya-notifications.js`)

When a visitor leaves a message via Raya or the contact form, notifications dispatch concurrently to:

1. **Telegram Bot API**:
   - URL: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
   - Formats rich HTML with recruiter badge (`💼 RECRUITER` / `💬 VISITOR`), sender name, contact info, city/country, IST timestamp, and message body.
2. **Discord Webhooks**:
   - URL: `${DISCORD_WEBHOOK_URL}`
   - Dispatches rich embeds (Color `#22c55e` for Recruiters, `#3b82f6` for Visitors).
3. **Custom Webhook**:
   - URL: `${NOTIFICATION_WEBHOOK_URL}`
   - Sends raw JSON payload.
4. **Resend Email API**:
   - URL: `https://api.resend.com/emails`
   - Dispatches HTML emails to `ADMIN_EMAIL` (`kumarsinghratnesh3@gmail.com`).

---

## 9. Security, Authentication & Defense Shielding

1. **Admin Authentication**:
   - Password: `ADMIN_PASSWORD` (`Aditya@231`).
   - Authenticated requests pass `Authorization: Bearer <token>`.
2. **SQL Injection Prevention**:
   - All Supabase interactions use parameterized SDK calls (`.from().select().eq()`).
   - Zero raw SQL string interpolation is permitted anywhere in the backend.
3. **Prompt Injection & XSS Sanitization**:
   - Inputs pass through `sanitizePromptInjection()`, stripping system prompt override attempts (`ignore previous instructions`, `you are now`, `DAN`, etc.) and HTML script tags.
4. **Secret Isolation**:
   - All API keys, database keys, and passwords exist only in server-side environment variables.

---

## 10. Master Bug-Fixing & Troubleshooting Playbook

This section documents every major technical issue encountered during development, along with the permanent fixes implemented.

---

### Issue 1: 3D Avatar Rendered Behind Content Cards (Stacking Context Glitch)
- **Symptom**: The 3D VRM canvas appeared underneath project cards, skills grids, or background overlays.
- **Root Cause**: Parent `div` containers in `App.tsx` and `ThreeCharacterScene` had CSS properties (`z-index: 10`, `position: relative`, `backdrop-filter`, or `transform`) that created new isolated CSS Stacking Contexts. Even if the avatar had `z-index: 9999`, it remained trapped behind the parent's sibling layers.
- **Permanent Solution**:
  1. Removed isolated stacking contexts from content wrappers.
  2. Moved `VRMCharacterEngine.tsx` to a top-level fixed container mounted directly to `document.body` with `z-index: 2147483647` (maximum 32-bit integer).
  3. Added pointer-events isolation so dragging the avatar doesn't trigger clicks on underlying cards.

---

### Issue 2: Microsoft Edge Natural Voices Resetting / Pitch Distortion
- **Symptom**: Raya's voice in Microsoft Edge suddenly sounded robotic (`Microsoft Zira`) instead of natural neural speech (`Microsoft Ava / Jenny / Neerja`).
- **Root Cause**: Microsoft Edge's cloud neural TTS engine strictly enforces standard pitch (`1.0`). Applying modified pitch (`1.35`) on cloud neural voices caused Edge's Web Speech implementation to throw `synthesis-failed` and silently revert to offline robotic SAPI voices.
- **Permanent Solution**:
  1. Configured `loadVoices()` with comprehensive regex prioritizing Edge Natural variants (`Ava.*Natural`, `Jenny.*Natural`, `Aria.*Natural`, `Neerja.*Natural`, `Swara.*Natural`, `Tanishaa.*Natural`).
  2. Maintained natural rate (`1.10`) and sweet pitch (`1.35`), with an automatic fallback retry handler in `utterance.onerror` that catches synthesis errors and seamlessly speaks using fallback voices without breaking chat flow.

---

### Issue 3: Rate Limits & 429 Token Rate Limit Failures (Groq TPM Exhaustion)
- **Symptom**: Raya stopped responding or fell into local fallback loops after several queries in Admin mode.
- **Root Cause**: `getAdminHistoricalContext` was dumping 600+ lines of raw database JSON into `system_prompt` on every turn (~8,000 tokens/call), instantly exhausting Groq's 8,000 TPM limit.
- **Permanent Solution**:
  1. Compressed admin telemetry into a compact **~150-token structured snapshot**.
  2. Sliced chat history to the last 6 turns: `messages.slice(-6)`.
  3. Built multi-key round-robin rotation across 4 Groq API keys with an automatic 60-second cooldown timer on HTTP 429 (`rateLimitedKeys` map).
  4. Structured multi-tier Circuit Breaker failover: NVIDIA NIM $\rightarrow$ Groq (4 keys $\times$ 6 models) $\rightarrow$ Google Gemini $\rightarrow$ OpenAI $\rightarrow$ OpenRouter.

---

### Issue 4: `{"action":"none"}` Visible in Chat Bubble & Spoken Aloud
- **Symptom**: When Raya told a joke or conversational greeting, raw text like `{"action":"none"}` displayed in the speech bubble and was read aloud by TTS.
- **Root Cause**: The client-side regex whitelist `/\{"action":"(?:play_song|navigate|...)"\}/` did not match the word `"none"`, so `spokenText.replace()` skipped it, leaving raw JSON in the text.
- **Permanent Solution**:
  1. Updated frontend regex to match all JSON action blocks: `/\{[^{}]*"action"\s*:\s*"[^"]*"[^{}]*\}/gi`.
  2. Filtered out `"none"` and dummy actions before executing.
  3. Added strict prompt directives: `CRITICAL: NEVER output {"action":"none"} or dummy actions. If no action is needed, output only plain conversation text.`

---

### Issue 5: Inbuilt Suggestion Commands Bypassing LLM API / Navigation Failing
- **Symptom**: Clicking suggestion chips did not navigate the page or did not process through the AI brain.
- **Root Cause**: Client-side click handlers intercepted text without forwarding to `/api/chat`, and legacy multi-theme code (`THEME_MAP`, `_awaitingTheme`) broke section navigation.
- **Permanent Solution**:
  1. Rewired all chip buttons and mic inputs to call `this.handleUserInput(cmdText)` directly to `/api/chat`.
  2. Stripped all legacy multi-theme artifacts.
  3. Integrated section navigation with `window.navigateToSection(secId)` in `App.tsx` and smooth scroll fallback.

---

### Issue 6: Raya Claiming She Does Not Store Visitor Names
- **Symptom**: When Ratnesh asked in Admin mode who visited the site, Raya responded that she does not collect or store visitor names.
- **Root Cause**: Known names stored in `users`, `preferences`, `learnings`, and `visitor_messages` were not being injected into Raya's admin prompt context.
- **Permanent Solution**:
  1. Created `getAllKnownVisitorNames()` in `server/raya-supabase-memory.js` aggregating distinct visitor names across all tables.
  2. Injected `Recorded Visitor / User Names in Database: [...]` into Raya's Admin mode system prompt.
  3. Explicitly instructed Raya: `When Ratnesh asks who visited the website, list of users, or their names, warmly and clearly list these recorded visitor names from your database!`

---

### Issue 7: Admin Messages Trapped as Rules
- **Symptom**: Any message typed while in Admin mode was saved as a rule, preventing normal conversation.
- **Root Cause**: The client treated all messages in Admin mode as dynamic rules, and the backend lacked a dedicated rule endpoint.
- **Permanent Solution**:
  1. Added `/api/admin/rule` endpoint in `server/server.js`.
  2. Restricted rule creation to explicit prefixes (`rule: ...` or `add rule: ...`).

---

## 11. Environment Variables Master Reference

```env
# Server Configuration
PORT=3000
NODE_ENV=production
ADMIN_PASSWORD=Aditya@231

# AI / LLM Provider Keys
NVIDIA_API_KEY=nvapi-...
GROQ_API_KEYS=gsk_key1, gsk_key2, gsk_key3, gsk_key4
GEMINI_API_KEY=AIzaSy...
OPENAI_API_KEY=sk-...
OPENROUTER_API_KEY=sk-or-...

# Supabase PostgreSQL Configuration
SUPABASE_URL=https://srwmkciescfhnrrfwssx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Admin Notification Channels
TELEGRAM_BOT_TOKEN=123456789:ABCdef...
TELEGRAM_CHAT_ID=987654321
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
NOTIFICATION_WEBHOOK_URL=https://your-custom-webhook.com/api/notify
RESEND_API_KEY=re_...
ADMIN_EMAIL=kumarsinghratnesh3@gmail.com
```

---

## 12. Git Restore Points Index & Recovery Reference

| Restore Point | Git Tag / Branch | Commit Hash | Key Milestone & Status |
| :--- | :--- | :--- | :--- |
| **Restore Point 1** | `restore-point-1` | `c112947` | Microsoft Edge natural neural voices with sweet `1.35` pitch baseline. |
| **Restore Point 2** | `restore-point-2` | `5ec2cf2` | Inbuilt commands routed through API, clean single 7-section layout, smooth scrolling. |
| **Restore Point 3** | `restore-point-3` | `f4aa7e9` | **ALL SYSTEMS WORKING PERFECTLY** — Groq 4-key 60s 429 rotation, Supabase visitor name retrieval, multilingual Romanized TTS pipeline, admin alerts, zero `{"action":"none"}` artifacts, and complete security hardening. |

### Recovery Commands:
```bash
# Checkout Restore Point 3 (Current Perfect Baseline)
git checkout restore-point-3

# Checkout Restore Point 2
git checkout restore-point-2

# Checkout Restore Point 1
git checkout restore-point-1

# Return to active production branch
git checkout main
```

---
*Authored for Ratnesh Kumar Singh's 3D Interactive AI Portfolio System.*
