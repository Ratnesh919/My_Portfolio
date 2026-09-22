# 🏙️ Urban — React 18 Frontend Application

This directory contains the single-page **React 18 + Vite + TypeScript + Tailwind CSS** frontend that powers Ratnesh Kumar Singh's 3D Interactive AI Portfolio.

---

## 🏗️ Architecture & Component Hierarchy

The frontend architecture separates high-level portfolio presentation, interactive companion UI, and 3D avatar viewport into modular components:

```
Urban/src/
├── App.tsx                     # Main application layout, scroll listener, section routing
├── main.tsx                    # React root mount point
├── index.css                   # Global Tailwind imports & custom utility classes
├── lib/
│   └── portfolioData.ts        # Single source of truth for projects, skills, education, links
└── components/
    └── portfolio/
        ├── IntroLoader.tsx     # 🫧 Realistic Soap Bubble Entry Screen & VRM Download Progress
        ├── VRMCharacterEngine.tsx # 🎭 React wrapper for Three.js VRM Viewport
        ├── RayaAICompanion.tsx # 🤖 Raya AI Chat UI, natural voice engine, and command executor
        ├── ChatbotBar.tsx      # 💬 Floating bottom input bar with quick suggestion chips
        ├── HeroSection.tsx     # ⚡ Landing hero, punchy tagline, CV download button
        ├── ProjectsSection.tsx # 🚀 Showcase for SyncPulse, PAK, ShopKart, JobPilot, BMW 3D
        ├── AboutSection.tsx    # 👤 Bio, engineering mindset, hardware/software balance
        ├── SkillsSection.tsx   # 🛠️ 5 Core Pillars: Web DSP, Android, AI, RF & Embedded, WebGL
        ├── ExperienceSection.tsx# 🎓 Academic journey at SVIST / MAKAUT (ECE 2022–2026)
        ├── CertificationsSection.tsx # 📜 Verified licenses & specializations
        ├── ContactSection.tsx  # 📬 Contact form & social media profiles
        └── Navbar.tsx          # 🧭 Fixed glassmorphic navigation bar with active section indicator
```

---

## 🫧 1. Soap Bubble Entry Screen (`IntroLoader.tsx`)

The portfolio features a two-phase introductory experience:
1. **Phase 1: VRM Model Download Progress**:
   - Listens to global download hooks: `window.onVRMLoadProgress = (pct, status) => { ... }` and `window.onVRMReady = () => { ... }`.
   - Displays a glowing neon progress bar that tracks the real-time byte stream of the 3D VRM model.
   - Includes a 20-second safety timeout so visitors on slow connections are never permanently blocked.
2. **Phase 2: Floating Soap Bubbles**:
   - Once loading completes, transitions to interactive soap bubbles that drift upward with lateral sine-wave oscillation.
   - Features iridescent thin-film chromatic shift (7-second continuous hue rotation), dual specular catch-lights, and organic wobbling physics.
   - Clicking or tapping **"Pop a Bubble"** triggers a radial crack-line animation and mist burst, revealing the portfolio and initiating Raya's greeting.

---

## 🎭 2. 3D VRM Avatar Integration & Global Interop

The 3D character engine runs via Three.js and `@pixiv/three-vrm` directly inside `<canvas id="vrm-canvas">`:
- **Z-Index Layering**: Rendered at `z-index: 2147483647` (maximum 32-bit integer) to ensure the avatar is always visible above UI cards.
- **Draggable Viewport**: Users can drag the avatar anywhere across the screen using HTML5 Pointer Capture (`setPointerCapture`).
- **Global Communication Bridge**:
  - `window.activateAvatarAndChatbot()`: Unveils the canvas and triggers Raya's audio introduction after bubble pop.
  - `window.playWaveAnimation()`: Triggers procedural arm-waving gesture.
  - `window.setVRMVisibility(bool)`: Programmatically shows or hides the 3D model.
  - `window.setVRMCharacter(filename)`: Changes the active VRM avatar model.
  - `window.navigateToSection(sectionId)`: Smoothly scrolls the viewport to specific portfolio sections.

---

## 🤖 3. Raya AI Companion (`RayaAICompanion.tsx` & `ChatbotBar.tsx`)

- **Natural Command Routing**:
  - All shortcut chips (`Scroll down`, `Tell me about projects`, `Tell me about skills`, `Take me to contact`, `Play a song`, etc.) are routed through the backend AI brain (`/api/chat`).
  - Raya generates a conversational response, speaks it aloud, and *then* fires the action (`window.scrollBy`, `onScrollToSection`, etc.) with a natural delay.
- **Phonetic Script Transliteration**:
  - Dialogue is displayed in standard English/Latin alphabet in the UI chat bubble.
  - When speaking Hindi, Bengali, Punjabi, or Gujarati, the TTS engine receives native Unicode script dynamically via `getNativeScriptForTTS` for natural phonetic pronunciation by Microsoft Edge neural voices.
- **Embedded YouTube Audio Player**:
  - Plays music requests directly inside the portfolio via `/api/yt-search`.
  - Floating player widget allows pausing, stopping, and opening songs on YouTube.

---

## 📦 Build & Production Deployment Workflow

Because the portfolio uses a hybrid vanilla + React root structure, the build process compiles the Vite bundle and syncs the assets to the root directory:

```bash
# 1. Install dependencies
npm install

# 2. Compile production bundle
npm run build

# 3. Sync compiled assets to root assets/ directory (Windows PowerShell)
Copy-Item "dist\assets\*" "..\assets\" -Force
Copy-Item "..\index.html" "dist\index.html" -Force
```

---

## 🛠️ Tech Stack & Dependencies

- **React 18.3.1**
- **Vite 5.4.21**
- **TypeScript 5.5.3**
- **Tailwind CSS 3.4.1**
- **Lucide React 0.344.0**
- **Three.js 0.163.0** & **@pixiv/three-vrm 3.4.0**

---

<div align="center">
  <sub>Part of Ratnesh Kumar Singh's 3D Interactive AI Portfolio.</sub>
</div>
