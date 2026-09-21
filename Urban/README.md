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
│   └── portfolioData.ts        # Single source of truth for projects, education, certs, links
└── components/
    └── portfolio/
        ├── IntroLoader.tsx     # ⚡ Cyber-Glass "Enter Experience" Screen & VRM Download Progress
        ├── VRMCharacterEngine.tsx # 🎭 React wrapper for Three.js VRM Viewport
        ├── RayaAICompanion.tsx # 🤖 Raya AI Chat UI, natural voice engine, and command executor
        ├── ChatbotBar.tsx      # 💬 Floating bottom input bar with quick suggestion chips
        ├── HeroSection.tsx     # ⚡ Landing hero, punchy tagline, CV download button
        ├── ProjectsSection.tsx # 🚀 Showcase for SyncPulse, PAK, ShopKart, JobPilot, BMW 3D
        ├── AboutSection.tsx    # 👤 Bio, engineering mindset, hardware/software balance
        ├── ExperienceSection.tsx# 🎓 Academic journey at SVIST / MAKAUT (ECE 2022–2026)
        ├── CertificationsSection.tsx # 📜 Verified certifications & credentials
        ├── ContactSection.tsx  # 📬 Contact form & social media profiles
        └── Sidebar.tsx         # 🧭 Fixed glassmorphic navigation sidebar with active section indicator
```

---

## ⚡ 1. Cyber-Glass "Enter Experience" Screen (`IntroLoader.tsx`)

The portfolio features a streamlined, high-craft introductory entry experience:
1. **Phase 1: VRM Model Download Progress**:
   - Listens to global download hooks: `window.onVRMLoadProgress = (pct, status) => { ... }` and `window.onVRMReady = () => { ... }`.
   - Displays a glowing neon progress bar that tracks the real-time byte stream of the 3D VRM model.
   - Dynamic status messages inform the visitor of model loading, texture decompression, and animation retargeting.
   - Includes a 40-second safety timeout so visitors on slow mobile connections are never permanently blocked.
2. **Phase 2: Elite Cyber CTA Button**:
   - Once loading reaches 100%, an animated glowing **"Enter Experience"** button smoothly appears with neon border gradients and micro-shimmer.
   - Clicking or tapping the button primes browser audio contexts, smoothly fades out the loader overlay, unveils the full portfolio, and triggers Raya's greeting wave and voice intro.

---

## 🎭 2. 3D VRM Avatar Integration & Global Interop

The 3D character engine runs via Three.js and `@pixiv/three-vrm` directly inside `<canvas id="vrm-canvas">`:
- **Z-Index Layering**: Rendered at `z-index: 2147483647` (maximum 32-bit integer) to ensure the avatar is always visible above UI cards.
- **Draggable Viewport**: Users can drag the avatar anywhere across the screen using HTML5 Pointer Capture (`setPointerCapture`).
- **Finger Kinematics & Expressions**:
  - Full 30 finger bone rig mapping across thumb, index, middle, ring, and pinky joints.
  - Cached bone lookups for smooth 60 FPS performance.
  - Cross-VRM 0.0 & 1.0 `EXPR_ALIASES` for universal facial morph expression playback.
  - 23 emotional presets (`happy`, `joy`, `caring`, `console`, `empathy`, `advice`, `surprised`, `sad`, `angry`, `relaxed`, `wink`, `blush`, etc.).
- **Global Communication Bridge**:
  - `window.activateAvatarAndChatbot()`: Unveils the canvas and triggers Raya's audio introduction upon entry.
  - `window.playWaveAnimation()`: Triggers procedural arm-waving gesture.
  - `window.setVRMVisibility(bool)`: Programmatically shows or hides the 3D model.
  - `window.setVRMCharacter(filename)`: Changes the active VRM avatar model.
  - `window.setVRMEmotion(name, intensity, autoResetMs)`: Triggers companion facial expressions.
  - `window.navigateToSection(sectionId)`: Smoothly scrolls the viewport to specific portfolio sections.

---

## 🛠️ Build & Development Commands

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Compile TypeScript and build production bundle into dist/
npm run build
```
