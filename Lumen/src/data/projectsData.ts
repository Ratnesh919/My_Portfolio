export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  video?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "bmw-m3",
    title: "BMW M3 GTR 3D",
    tagline: "Interactive WebGL 3D Automotive Showcase",
    description: "Interactive 3D vehicle showcase with real-time lighting, reflection environment maps, orbit inspection controls, and GLSL shaders in Three.js.",
    category: "3D Graphics & WebGL",
    tech: ["Three.js", "WebGL", "GLSL", "JavaScript", "OrbitControls"],
    githubUrl: "https://github.com/Ratnesh919/BMW-M3-GTR",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
  },
  {
    id: "syncpulse",
    title: "SyncPulse",
    tagline: "Real-Time Synchronized Spatial Audio Network",
    description: "Multi-device real-time audio synchronization using Cristian's NTP algorithm (±5ms accuracy), 8D binaural 360° soundstage, and 3D WebGL atmosphere visualizer.",
    category: "Real-Time Web & Audio DSP",
    tech: ["Node.js", "Web Audio API", "Three.js", "WebSockets", "NTP Sync"],
    liveUrl: "https://syncpulse-1igt.onrender.com",
    githubUrl: "https://github.com/Ratnesh919/SyncPulse",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
  },
  {
    id: "pak-converter",
    title: "PAK Video Converter",
    tagline: "Pro-Grade Android Media Extractor & Transcoder",
    description: "Modern Android application using low-latency MediaCodec & MediaMuxer hardware pipelines to extract, transcode, and play video game assets, dashcam archives, and raw stream payloads.",
    category: "Android & Hardware Transcoding",
    tech: ["Kotlin", "Jetpack Compose", "MediaCodec", "Room SQLite", "Coroutines"],
    githubUrl: "https://github.com/Ratnesh919/PAK_Video_Converter_Android_App",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
  },
  {
    id: "mediflow",
    title: "MediFlow",
    tagline: "Smart Hospital Queue & ML Wait-Time Forecasting",
    description: "Enterprise outpatient queue platform combining Random Forest ML wait-time forecasting, real-time WebSocket token broadcasts, emergency triage preemption, and executive analytics.",
    category: "Full-Stack & Machine Learning",
    tech: ["FastAPI", "React 18", "TypeScript", "PostgreSQL", "Scikit-Learn", "WebSockets"],
    liveUrl: "https://github.com/Ratnesh919/Medi_Flow",
    githubUrl: "https://github.com/Ratnesh919/Medi_Flow",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
  },
  {
    id: "shopkart",
    title: "ShopKart",
    tagline: "Modern E-Commerce Web Application",
    description: "Full-featured online shopping platform featuring dynamic product catalog, category filters, responsive cart management, and seamless modern design.",
    category: "E-Commerce & Frontend",
    tech: ["React", "JavaScript", "REST APIs", "CSS3", "Netlify"],
    liveUrl: "https://shopkart919.netlify.app",
    githubUrl: "https://github.com/Ratnesh919/Shop_Kart-",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
  },
  {
    id: "jobpilot",
    title: "JobPilot AI",
    tagline: "Autonomous AI Job Search & Application Automation",
    description: "Production n8n automation matched with Google Gemini to discover jobs, evaluate fit against resumes, generate tailored applications, and track dispatches.",
    category: "AI Workflows & Automation",
    tech: ["n8n", "Google Gemini API", "Webhooks", "TypeScript"],
    liveUrl: "https://ratnesh919.app.n8n.cloud",
    githubUrl: "https://github.com/Ratnesh919/Job_Pilot-AI",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
  },
  {
    id: "smart-antenna",
    title: "Smart Antenna (V2X)",
    tagline: "Low-Profile Monopole Antenna for Vehicular Communications",
    description: "Designed and simulated a dielectric-loaded capacitive monopole antenna in Ansys HFSS. Achieved 74% size reduction at 535.57 MHz with -31.87 dB return loss and 98.34% efficiency.",
    category: "ECE Hardware & Simulation",
    tech: ["Ansys HFSS", "VNA Testing", "Dielectric Sleeve", "V2X Comms"],
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
  }
];
