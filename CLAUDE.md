# Agent Instructions & Architecture Map

## Package Manager & Commands
- **Root**: `npm start` (Runs Express server on port 3000)
- **Frontend**: `cd Urban && npm run dev` (Vite dev server)
- **Build**: `npm run build` (`Urban: tsc && vite build`)

## Feature-to-File Direct Map (JUMP DIRECTLY TO THESE FILES)
When asked to modify a feature, NEVER perform broad directory searches. Go directly to:

- **Raya Chatbot & AI Companion** (Chatbot responses, name handling, voice, prompt logic):
  - Frontend Chatbot & Web Speech API: `js/chatbot.js`
  - React Chat Shell & Widget: `Urban/src/components/portfolio/RayaAICompanion.tsx`
  - Backend API Gateway, LLM Fallbacks, Circuit Breaker: `server/server.js`
  - Memory & Supabase DB: `server/raya-supabase-memory.js`
  - Admin Notifications (Telegram/Discord): `server/raya-notifications.js`

- **3D VRM Avatar Character Engine** (Model kinematics, blinking, waving, Three.js canvas):
  - VRM Engine & Kinematics: `js/vrm-character.js`
  - VRM Loader & Config: `js/vrm-loader.js`, `js/vrm-config.js`
  - React 3D Canvas Component: `Urban/src/components/portfolio/VRMCharacterEngine.tsx`

- **Portfolio UI & Content (React 18 + Vite + Tailwind)**:
  - App Root & Navigation Bridge: `Urban/src/App.tsx`
  - Portfolio Sections: `Urban/src/components/portfolio/` (`HeroSection.tsx`, `ProjectsSection.tsx`, `AboutSection.tsx`, `ExperienceSection.tsx`, `CertificationsSection.tsx`, `ContactSection.tsx`, `Sidebar.tsx`, `IntroLoader.tsx`)
  - Static Data & Links: `Urban/src/lib/portfolioData.ts`

- **Detailed Blueprint Reference**:
  - Full system specification & schemas: `PROJECT_DOCUMENTATION.md`

## Token & Credit Conservation Rules (CRITICAL FOR AGENTS)
1. **Target Files Directly**: Read ONLY the specific file mapped above. Do NOT do repository-wide greps or searches.
2. **Never Search Heavy Folders**: Ignore `Model Animation/`, `assets/`, `certificates/`, `docs/`, `scratch/`, `node_modules/`, `Urban/node_modules/`.
3. **Never Read Binary Files**: Avoid `.vrm`, `.glb`, `.pdf`, `.mp3`, `.wav`, `.png`, `.jpg`.
4. **Minimal Edits**: Apply precise modifications using line-specific replacement tools.
