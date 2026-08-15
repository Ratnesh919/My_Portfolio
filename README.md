# 🚀 Ratnesh's Multidimensional Portfolio & Raya AI Assistant

An interactive, multi-themed developer portfolio powered by a 3D VRM Anime Avatar AI Assistant (**Raya**) built with Three.js, Groq LLM, Web Speech API, and Supabase Cloud Memory.

---

## ✨ Features Overview

### 🎨 1. Multidimensional Portfolio Themes
Visitors can seamlessly switch between 5 distinct visual theme experiences:
- **3D Immersive**: Interactive 3D model & canvas environment with dynamic lighting and camera positioning.
- **Cosmic**: Cyberpunk space aesthetic with particle fields and glowing neon highlights.
- **Urban**: Street art / bold graffiti styling with vibrant typography.
- **Essential**: Clean, minimalist layout focusing on spatial typography and white space.
- **Lumen**: High-contrast dark mode with soothing UI accents and calm vibes.

---

### 🤖 2. Raya — 3D VRM AI Companion
- **3D Avatar Engine**: Rendered with `@pixiv/three-vrm` and `Three.js` directly in the browser.
- **Interactive VRM Models**: Supports character swapping (e.g. Changli, Camellya) and live avatar scaling controls.
- **Voice & Speech**: Bidirectional voice chat powered by Web Speech API (`SpeechRecognition` & `SpeechSynthesis`).
- **AI Brain**: Connected to Groq LLM (`llama-3.3-70b-versatile`) with circuit breaker fault tolerance and multi-key encryption.
- **Integrated Music Player**: Search and stream YouTube music live on demand through voice or text commands.
- **Interactive Info Panel (`ℹ️`)**: Quick command suggestions including standard portfolio commands and a dedicated `"📩 Leave a message for Ratnesh"` option.
- **Non-Repetitive Joke Engine**: 24+ tech and programmer jokes with session tracking to prevent repetition.

---

### 🔐 3. Admin Mode Features

Raya includes an exclusive **Admin Mode** designed specifically for Ratnesh to monitor portfolio reach, manage visitor messages, and inspect analytics.

#### 🔑 Activating Admin Mode
To enter Admin Mode, type or speak your admin credentials/password directly to Raya in the chatbot chat:
> *"Ratnesh@231"* (or your configured `ADMIN_PASSWORD`)

Raya will verify your identity, grant Admin access, and update her persona to Admin Assistant Mode.

#### 📊 Admin Capabilities & Commands

1. **🌍 Worldwide Visitor Geolocation Tracking**:
   - **Command**: *"Where did the users visit from?"*, *"Show visitor locations"*, or *"From where did users visit?"*
   - **Function**: Raya queries Supabase and Vercel Edge geolocation headers (`x-vercel-ip-city`, `x-vercel-ip-country-region`, `x-vercel-ip-country`) to summarize exact visitor locations worldwide down to city level (e.g., `Kolkata, WB, India`, `California, US`).

2. **📩 Read Visitor Messages**:
   - **Command**: *"Read my messages"*, *"Any messages for me?"*, or *"Check visitor messages"*
   - **Function**: Raya retrieves messages left by visitors using the `"📩 Leave a message for Ratnesh"` feature. Messages are categorized with AI-driven importance flags (`[IMPORTANT]`) for hiring offers, job inquiries, and contact details.

3. **⚙️ Real-time Server Health & API Diagnostics**:
   - **Endpoint**: `/api/health` (Admin Authenticated)
   - **Function**: Displays real-time uptime, memory usage, Groq API key rotation index, and circuit breaker status.

4. **🔒 Session & Device Audit**:
   - **Function**: Tracks active admin sessions across devices (e.g., laptop and mobile phone) to ensure secure administrative access.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Vanilla CSS3, Three.js, `@pixiv/three-vrm`, Lucide Icons.
- **Backend / Serverless**: Node.js, Express, Vercel Serverless Functions (`@vercel/node`).
- **Database & Cloud Memory**: Supabase PostgreSQL (`@supabase/supabase-js`), real-time session tracking, vector/learning storage.
- **AI & LLM**: Groq Cloud API (`llama-3.3-70b-versatile`), AES-256-CBC environment variable encryption.

---

## 🚀 Local Development Setup

1. **Clone Repository**:
   ```bash
   git clone https://github.com/Ratnesh919/My_Portfolio.git
   cd My_Portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (`.env`)**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   GROQ_API_KEY=your_groq_api_key
   ENCRYPTION_KEY=613c728b0fd4bbbe677f464f8afb1ab46b763844b3476661a0a16268315cc1c9
   ADMIN_PASSWORD=your_admin_password
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

4. **Run Server**:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

5. **Open Browser**:
   Navigate to `http://localhost:3000`.

---

## 📜 License

Designed & Developed by **Ratnesh Kumar Singh**. All Rights Reserved © 2026.
