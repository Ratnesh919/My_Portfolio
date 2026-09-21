# 🌟 Ratnesh Kumar Singh — 3D Interactive AI Portfolio & Raya Companion

[![Live Demo](https://img.shields.io/badge/Live_Portfolio-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://my-portfolio-omega-liart-40.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Ratnesh919-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ratnesh919/My_Portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ratnesh_Kumar_Singh-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ratnesh-kumar-singh-16749325b)
[![License](https://img.shields.io/badge/License-All_Rights_Reserved-ff416c?style=for-the-badge)](LICENSE)

An interactive, high-performance 3D engineering portfolio featuring **Raya**, a fully embodied 3D VRM anime AI companion. Built with **React 18**, **TypeScript**, **Three.js**, **@pixiv/three-vrm**, **Tailwind CSS**, **Node.js/Express**, **Groq / NVIDIA / Gemini / OpenAI LLMs**, **Web Speech API**, and **Supabase PostgreSQL Cloud Memory**.

---

## 📑 Table of Contents

1. [Architectural Overview](#-architectural-overview)
2. [Key System Features](#-key-system-features)
   - [⚡ Cyber-Glass "Enter Experience" CTA](#-1-cyber-glass-enter-experience-cta)
   - [🎭 3D VRM Avatar Character Engine](#-2-3d-vrm-avatar-character-engine)
   - [🤖 Raya AI Companion & Natural Voice Core](#-3-raya-ai-companion--natural-voice-core)
   - [⚡ Inbuilt AI Commands with Natural Interaction Delay](#-4-inbuilt-ai-commands-with-natural-interaction-delay)
   - [☁️ Supabase Cloud Memory & Visitor Profiles](#-5-supabase-cloud-memory--visitor-profiles)
   - [🔔 Multi-Channel Admin Notification Engine](#-6-multi-channel-admin-notification-engine)
3. [Featured Engineering Projects](#-featured-engineering-projects)
4. [Technology Stack](#-technology-stack)
5. [Directory Structure](#-directory-structure)
6. [Local Development Setup](#-local-development-setup)
7. [Environment Variables](#-environment-variables)
8. [Git Restore Points & Recovery](#-git-restore-points--recovery)
9. [Author & Contact](#-author--contact)

---

## 🏛️ Architectural Overview

The portfolio uses a **hybrid architecture** combining a modern **React 18 single-page application** with a **hardware-accelerated Three.js VRM rendering pipeline** and a **fault-tolerant Node.js / Express AI gateway**:

```
+----------------------------------------------------------------------------------------------------+
|                                    BROWSER CLIENT LAYER (Vercel)                                   |
|                                                                                                    |
|  +--------------------------------------------+    +--------------------------------------------+  |
|  |       3D VRM Avatar Character Engine       |    |       Raya AI Chatbot & Voice Pipeline     |  |
|  |  - Three.js WebGL (Alpha: True)            |    |  - Web Speech API (SpeechRecognition & TTS)|  |
|  |  - @pixiv/three-vrm Model Runtime          |    |  - Real-Time Phonetic Transliteration      |  |
|  |  - 30-Bone Finger Rigging & Joint Rippling |    |  - Edge Neural Voices (Pitch 1.35, Rate 1.1) |
|  |  - Procedural Breathing, Blinking, Wave    |    |  - Floating Input Bar & Live Speech Bubble |  |
|  |  - HTML5 Pointer Capture Drag-and-Drop     |    |  - YouTube Music Embedded Streamer         |  |
|  |  - Z-Index: 2147483647 (Top Layer)         |    |  - Cross-VRM 0.0/1.0 Expression Aliases    |  |
|  +--------------------------------------------+    +--------------------------------------------+  |
|                         \                                       /                                  |
|                          v                                     v                                   |
|  +----------------------------------------------------------------------------------------------+  |
|  |                                React 18 Single-Page Application (Urban UI)                   |  |
|  |     [⚡ Cyber-Glass Enter Experience CTA] (Real-Time VRM Download Progress + Audio Primer)    |  |
|  |     [1. Hero] [2. Projects] [3. About] [4. Experience] [5. Certifications] [6. Contact]      |  |
|  |     - window.navigateToSection() Interop Bridge                                              |  |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
                                                   |
                                                   v HTTPS REST API (/api/*)
+----------------------------------------------------------------------------------------------------+
|                                  BACKEND GATEWAY (Node.js / Express)                               |
|                                                                                                    |
|  +----------------------------------------------------------------------------------------------+  |
|  |                             Circuit Breaker & Multi-LLM Gateway                              |  |
|  |   1. NVIDIA NIM API (Primary: meta/llama-3.3-70b-instruct)                                   |  |
|  |   2. Groq Cloud Pool (4-Key Rotation, 60s HTTP 429 Cooldown, 6 Fallback Models)              |  |
|  |   3. Google Gemini API (gemini-2.0-flash, gemini-1.5-flash)                                  |  |
|  |   4. OpenAI API (gpt-4o-mini, gpt-3.5-turbo)                                                 |  |
|  |   5. OpenRouter Direct Failover                                                              |  |
|  +----------------------------------------------------------------------------------------------+  |
|                         |                                                |                         |
|                         v                                                v                         |
|  +--------------------------------------------+    +--------------------------------------------+  |
|  |      Supabase Cloud Database (PostgreSQL)  |    |     Multi-Channel Admin Notifications      |  |
|  |  - users (Visitor Fingerprints & Counts)   |    |  - Telegram Bot API (Rich HTML Alerts)     |  |
|  |  - visitor_profiles (userid, name, IP, loc)|    |  - Discord Webhooks (Embed Cards)          |  |
|  |  - preferences (user_name Key-Value)       |    |  - Resend Email API (Direct HTML Inbox)    |  |
|  |  - learnings (Dynamic Facts & Admin Rules) |    |  - Custom Webhooks (Raw JSON Payloads)     |  |
|  |  - visitor_messages (Recruiter Classified) |    |  - Destination: kumarsinghratnesh3@...     |  |
|  +--------------------------------------------+    +--------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```

---

## ✨ Key System Features

### ⚡ 1. Cyber-Glass "Enter Experience" CTA
- **Streamlined Two-Stage Experience**:
  - **Stage 1 (Live WebGL Loader)**: Direct telemetry hook into the 3D VRM model download stream (`window.onVRMLoadProgress`), displaying live download percentages (0–100%) and ready states (`window.onVRMReady`).
  - **Stage 2 (Cyber Glass CTA Button)**: When download and shader setup reach 100%, an animated glowing "Enter Experience" button emerges with pulsing neon gradients, micro-shimmer, and sound context priming.
- **Cinematic Unveil**:
  - Clicking the CTA button primes the browser's speech synthesis audio context, smoothly dissolves the master loader overlay, unveils the full portfolio, and triggers Raya's initial greeting wave and voice intro.
  - Zero clutter: replaces legacy floating bubble mini-games with a direct, ultra-crisp interface.

### 🎭 2. 3D VRM Avatar Character Engine
- **Engine**: Three.js WebGL with `@pixiv/three-vrm` plugin.
- **Avatar Selection**: Supports 14 high-fidelity VRM anime avatars (Changli, Camellya, Carlotta, Chixia, Jinshi, Shorekeeper, Yinlin, Rover, Sanhua, etc.) served directly from GitHub Releases CDN (`vrm-models-v1`).
- **Comprehensive Kinematics & Finger Rigging**:
  - Full **30-bone finger rig mapping** across all five fingers (`Thumb1..3`, `Index1..3`, `Middle1..3`, `Ring1..3`, `Little1..3`) for left and right hands.
  - Procedural breathing, curl, and micro-ripple joint dynamics.
  - Cached humanoid bone nodes for instant frame lookups with zero GC overhead.
- **Facial Expressions & Cross-VRM Compatibility**:
  - Seamless expression aliasing (`EXPR_ALIASES`) supporting both VRM 0.0 (capitalized) and VRM 1.0 (lowercase) presets.
  - 23 companion emotion presets (`happy`, `joy`, `caring`, `console`, `empathy`, `advice`, `surprised`, `sad`, `angry`, `relaxed`, `wink`, `blush`, etc.).
  - Automatic mouth lipsync synchronized with speech output (`aa`, `ih`).
  - Eye squint and micro-smile overlays.
- **Full Viewport Interactivity**:
  - Click-and-drag avatar across the screen with HTML5 Pointer Capture.
  - Minimized floating dock button when avatar is stowed.
  - Top-layer Z-Index (`2147483647`) to stay visible without card clipping.

### 🤖 3. Raya AI Companion & Natural Voice Core
- **Speech Synthesis (TTS)**: Web Speech API tuned to a lively character voice (`pitch: 1.35`, `rate: 1.10`), prioritizing Microsoft Edge Natural Neural voices (`Microsoft Ava`, `Jenny`, `Neerja`, `Aria`).
- **Speech Recognition (STT)**: Hands-free continuous listening with wake-word detection (`hey raya`, `raya`, `raaya`, etc.).
- **Real-Time Phonetic Transliteration**:
  - Chat bubbles display clean Romanized English letters (A–Z) across all languages.
  - Text sent to the speech synthesizer is dynamically converted into native Unicode scripts (Devanagari for Hindi, Bengali script for Bengali, Gurmukhi for Punjabi, Gujarati script for Gujarati) for flawless native phonetic pronunciation by Edge neural TTS engines.
- **Music Jukebox**: Integrated YouTube audio search and streaming desk (`#raya-yt-player-widget`) that plays requested songs or background lofi directly inside the portfolio without opening external tabs.

### ⚡ 4. Inbuilt AI Commands with Natural Interaction Delay
- Suggestion chips in the chat bar (`Scroll down`, `Tell me about Ratnesh's project`, `Tell me a joke`, `Tell me about Ratnesh's skills`, `Take me to contact section`, `Play a song`, `Leave a message`) route **directly through the AI brain**.
- **Natural Interaction Flow**: Rather than instantly scrolling the screen like a static button, Raya processes the intent, generates a warm conversational response, speaks it aloud, and *then* fires the page scroll or action with a built-in smooth delay. It feels like an AI assistant actively operating the site for you.

### ☁️ 5. Supabase Cloud Memory & Visitor Profiles
- **Visitor Profiles**: Automatically tracks and upserts visitor records (`visitor_profiles` table: `userid`, `name`, `ip_address`, `location`, `updated_at`).
- **Persistent User Memory**: Retains visitor preferences, introduced names, interaction history, and dynamic learnings across visits.
- **Admin Command Mode**: Ratnesh can unlock admin verification with secure credentials to inspect visitor logs, traffic hotspots, recruiter inquiries, and database stats.
- **Recruiter Message Detection**: Keyword classification algorithm detects recruiter inquiries (`hire`, `interview`, `role`, `ctc`, `internship`) and flags messages for priority alert delivery.

### 🔔 6. Multi-Channel Admin Notification Engine
Whenever a visitor or recruiter leaves a message, notifications dispatch concurrently to:
- **Telegram Bot API**: Instant rich HTML message with recruiter badge, contact info, and timestamp.
- **Discord Webhooks**: Embedded message card with distinct color coding.
- **Resend Email API**: Clean HTML inquiry email sent to `kumarsinghratnesh3@gmail.com`.
- **Custom Webhook**: Raw JSON payload for external automation (e.g., n8n workflows).

---

## 🚀 Featured Engineering Projects

| Project | Live Demo | Repository | Core Tech Stack | Highlights |
| :--- | :---: | :---: | :--- | :--- |
| **SyncPulse** | [Live Demo](https://syncpulse-1igt.onrender.com) | [GitHub](https://github.com/Ratnesh919/SyncPulse) | Web Audio API, Cristian's NTP, WebSockets | Synchronized spatial audio network (±5ms accuracy), 8D Binaural rotating soundstage, Dolby 5.1/7.1 multi-device channel matrix, 3D bass-reactive visualizers. |
| **PAK Video Converter** | — | [GitHub](https://github.com/Ratnesh919/PAK_Video_Converter_Android_App) | Kotlin, Jetpack Compose, MediaCodec, Room DB | Native Android app, hardware-accelerated video transcoding (AVC/AAC, 480p to 4K), multi-format `.pak` stream carving (ZIP, Quake, CCTV MP4), Gemini Vision sensor telemetry. |
| **ShopKart** | [Live Demo](https://shopkart919.netlify.app) | [GitHub](https://github.com/Ratnesh919/Shop_Kart-) | HTML5, CSS3, JavaScript, LocalStorage | Indian e-commerce platform, 40+ products, Deals countdown, multi-factor search & sorting, Free Delivery meter, full checkout with pincode validation. |
| **JobPilot-AI** | [Live Demo](https://ratnesh919.app.n8n.cloud) | [GitHub](https://github.com/Ratnesh919/Job_Pilot-AI) | Python 3.10+, Electron, Playwright, Llama-3.3-70B, n8n | Autonomous job-hunting agent, multi-portal auto-applier (LinkedIn, Naukri, Indeed), 30-day duplicate blocker, Gmail interview tracker, tailored cover letters. |
| **BMW M3 GTR 3D** | [Live Demo](https://relaxed-nasturtium-3abd55.netlify.app/) | [GitHub](https://github.com/Ratnesh919/BMW-M3-GTR) | Next.js App Router, React, Canvas, GSAP ScrollTrigger | Cinematic 3D experience, dual-sequence engine (225-frame loop + 240-frame velocity-synced 360° scroll scrubbing), real-time telemetry HUD. |
| **MediFlow** | Private | Private | FastAPI, React 18, PostgreSQL, Scikit-Learn | Outpatient queue management and wait-time AI forecasting. *(Undergoing database schema refactoring)* |
| **Smart Vehicular Antenna**| — | [GitHub](https://github.com/Ratnesh919/Smart_Antenna_For_Vehicular_Applications) | Ansys HFSS, RF Design, VNA | Low-profile vehicular antenna for 535 MHz V2X with 74% size reduction and -31.87 dB return loss (S11). |
| **Smart Parking System** | — | [GitHub](https://github.com/Ratnesh919/Smart_Parking_System) | Arduino C++, Ultrasonic Sensors, IoT | Sensor-based parking bay occupancy detection with real-time slot telemetry. |

---

## 🛠️ Technology Stack

```
Frontend:
  ├── Framework: React 18, Vite 5, TypeScript
  ├── Styling: Tailwind CSS, CSS3 Glassmorphism, Custom Animations
  ├── 3D Graphics: Three.js (r163), @pixiv/three-vrm (v3.5.5)
  ├── Voice & Audio: Web Speech API (SpeechSynthesis + SpeechRecognition), Web Audio API
  ├── Icons: Lucide React

Backend & Services:
  ├── Runtime: Node.js, Express 5
  ├── Circuit Breaker: Opossum
  ├── Database: Supabase PostgreSQL (@supabase/supabase-js)
  ├── AI / LLM Providers: NVIDIA NIM, Groq Cloud, Google Gemini, OpenAI, OpenRouter
  ├── Audio Extraction: YouTube InnerTube / yt-search proxy
  ├── Notifications: Telegram Bot API, Discord Webhooks, Resend API
  ├── Deployment: Vercel (Frontend & Serverless Functions), Render (Backend services)
```

---

## 📁 Directory Structure

```
My_Portfolio/
├── .env                              # Environment variables (Never committed)
├── .gitignore                        # Git exclusion rules
├── package.json                      # Root scripts and backend dependencies
├── vercel.json                       # Vercel serverless routing & API redirects
├── README.md                         # Master project documentation (You are here)
├── BUBBLE_INTERFACE_BACKUP.md        # Soap bubble implementation specification & backup
├── PROJECT_DOCUMENTATION.md          # Master architecture manual & bug-fix playbook (Local)
├── index.html                        # Root HTML shell mounting React + Three.js canvas
├── assets/                           # Production compiled bundles (JS & CSS)
├── css/
│   └── chatbot.css                   # Custom styles for chat UI, badges, and animations
├── js/
│   ├── vrm-config.js                 # Character list, CDN mapping, and rig configs
│   ├── vrm-character.js              # Three.js VRM engine with download progress hooks
│   └── chatbot.js                    # Legacy helper and companion interface
├── server/
│   ├── README.md                     # Backend API Gateway documentation
│   ├── server.js                     # Express API, Circuit Breaker, LLM Providers
│   ├── raya-supabase-memory.js       # Supabase PostgreSQL client & visitor memory queries
│   └── raya-notifications.js        # Telegram, Discord, Email alert dispatcher
└── Urban/                            # React 18 + Vite Frontend Application
    ├── README.md                     # Frontend application documentation
    ├── package.json                  # Frontend dependencies
    ├── vite.config.ts                # Vite build configuration
    ├── tailwind.config.js            # Tailwind styling tokens & theme colors
    ├── index.html                    # Vite HTML entry template
    └── src/
        ├── App.tsx                   # Main React entry & window.navigateToSection bridge
        ├── main.tsx                  # React DOM mount point
        ├── components/
        │   └── portfolio/
        │       ├── IntroLoader.tsx          # Soap Bubble Entry with VRM download progress
        │       ├── VRMCharacterEngine.tsx   # React 3D VRM Canvas wrapper
        │       ├── RayaAICompanion.tsx      # Raya AI chat panel & natural interaction core
        │       ├── ChatbotBar.tsx           # Floating input bar & quick command chips
        │       ├── HeroSection.tsx          # Hero landing section & CV download button
        │       ├── ProjectsSection.tsx      # Interactive showcase for top engineering projects
        │       ├── AboutSection.tsx         # Engineering background & philosophy
        │       ├── SkillsSection.tsx        # 5 core technical skill pillars
        │       ├── ExperienceSection.tsx    # Academic journey at SVIST / MAKAUT (ECE)
        │       ├── CertificationsSection.tsx# Verified credentials & licenses
        │       ├── ContactSection.tsx       # Contact form & social media links
        │       └── Navbar.tsx               # Fixed glassmorphic navigation bar
        └── lib/
            └── portfolioData.ts             # Static portfolio information, links, and projects
```

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git** installed

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ratnesh919/My_Portfolio.git
   cd My_Portfolio
   ```

2. **Install Root & Backend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd Urban
   npm install
   cd ..
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the project root (refer to the [Environment Variables](#-environment-variables) section).

5. **Build the Frontend**:
   ```bash
   npm --prefix Urban run build
   # Sync compiled assets to root assets/ folder
   # On Windows PowerShell:
   Copy-Item "Urban\dist\assets\*" "assets\" -Force
   Copy-Item "index.html" "Urban\dist\index.html" -Force
   ```

6. **Start the Development Server**:
   ```bash
   npm start
   ```
   Open your browser at `http://localhost:3000`.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
ADMIN_PASSWORD=your_admin_password

# Primary AI / LLM Providers
NVIDIA_API_KEY=nvapi-...
GROQ_API_KEYS=gsk_key1, gsk_key2, gsk_key3, gsk_key4
GEMINI_API_KEY=AIzaSy...
OPENAI_API_KEY=sk-...
OPENROUTER_API_KEY=sk-or-...

# Supabase PostgreSQL Configuration
SUPABASE_URL=https://your-project.supabase.co
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

## 📌 Git Restore Points & Recovery

To safeguard production integrity and enable instant rollbacks, milestone states are tagged and branched:

| Restore Point | Git Tag / Branch | Commit Hash | Key Milestone & Status |
| :--- | :---: | :---: | :--- |
| **Restore Point 1** | `restore-point-1` | `c112947` | Microsoft Edge Natural Neural voice pipeline with sweet `1.35` pitch baseline. |
| **Restore Point 2** | `restore-point-2` | `5ec2cf2` | Single-page layout, viewport scrolling, and initial command routing. |
| **Restore Point 3** | `restore-point-3` | `5e3fe22` | Real-time VRM avatar loading progress bar, enhanced soap bubble entry screen, site title set to `Ratnesh Kumar Singh`. |
| **Restore Point 4** | `restore-point-4` | `b05c3bb` | Inbuilt commands wired through AI brain with natural response delays, visitor profiles sync with Supabase (`visitor_profiles` table), and admin endpoints. |
| **Restore Point 5** | `restore-point-5` | `e2a4dc1` | Comprehensive architecture documentation, full project manuals across all directories, and zero legacy remnants. |
| **Restore Point 6** | `restore-point-6` | `HEAD` | **Current Master Baseline**: Cyber-Glass "Enter Experience" CTA button with WebGL progress & audio primer, 30-bone finger rig mapping with cached bone lookups, cross-VRM 0.0 & 1.0 expression aliases, 23 emotion presets, Software & Technical Skills section retired, and Certifications renamed. |

### How to Roll Back to a Restore Point:
```bash
# Checkout a specific restore point (read-only inspection)
git checkout restore-point-4

# Or hard reset your working branch to a restore point:
git checkout main
git reset --hard restore-point-4
```

---

## 👨‍💻 Author & Contact

**Ratnesh Kumar Singh**  
*Final-Year B.Tech in Electronics & Communication Engineering (ECE)*  
*Swami Vivekananda Institute of Science & Technology, MAKAUT (2022–2026)*  
*Kolkata, West Bengal, India*

- 🌐 **Portfolio**: [https://my-portfolio-omega-liart-40.vercel.app/](https://my-portfolio-omega-liart-40.vercel.app/)
- 📧 **Email**: [kumarsinghratnesh3@gmail.com](mailto:kumarsinghratnesh3@gmail.com)
- 🐙 **GitHub**: [@Ratnesh919](https://github.com/Ratnesh919)
- 💼 **LinkedIn**: [ratnesh-kumar-singh-16749325b](https://www.linkedin.com/in/ratnesh-kumar-singh-16749325b)
- 📸 **Instagram**: [@ratnesh.199](https://www.instagram.com/ratnesh.199)

---

<div align="center">
  <sub>Designed & Developed with ❤️ by <b>Ratnesh Kumar Singh</b>. All Rights Reserved © 2026.</sub>
</div>
