export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projectsData: ProjectItem[] = [
  {
    id: "syncpulse",
    title: "SyncPulse",
    tagline: "Synchronized Spatial Audio Network",
    description: "Multi-device real-time audio sync using Cristian's NTP algorithm (±5ms accuracy), 8D binaural 360° soundstage, and 3D WebGL atmosphere visualizer.",
    category: "Real-Time Web & Audio DSP",
    tech: ["Node.js", "Web Audio API", "Three.js", "WebSockets", "NTP Clock"],
    liveUrl: "https://syncpulse-1igt.onrender.com",
    githubUrl: "https://github.com/Ratnesh919/SyncPulse",
    featured: true
  },
  {
    id: "mediflow",
    title: "MediFlow",
    tagline: "Smart Hospital Queue & ML Wait-Time Forecasting",
    description: "Enterprise outpatient queue platform combining Random Forest ML wait-time forecasting, real-time WebSocket token broadcasts, emergency triage preemption, and executive analytics.",
    category: "Healthcare & Machine Learning",
    tech: ["FastAPI", "React 18", "TypeScript", "PostgreSQL", "Scikit-Learn", "WebSockets"],
    liveUrl: "https://github.com/Ratnesh919/Medi_Flow",
    githubUrl: "https://github.com/Ratnesh919/Medi_Flow",
    featured: true
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
    featured: true
  },
  {
    id: "pak-converter",
    title: "PAK Video Converter",
    tagline: "Pro-Grade Android Media Extractor & Transcoder",
    description: "Modern Android application using low-latency MediaCodec & MediaMuxer hardware pipelines to extract, transcode, and play video game assets, dashcam archives, and raw stream payloads.",
    category: "Android & Hardware Transcoding",
    tech: ["Kotlin", "Jetpack Compose", "MediaCodec", "Room SQLite", "Gemini Vision"],
    githubUrl: "https://github.com/Ratnesh919/PAK_Video_Converter_Android_App",
    featured: true
  },
  {
    id: "jobpilot",
    title: "JobPilot AI",
    tagline: "Autonomous AI Job Search & Application Automation",
    description: "Production n8n automation matched with Google Gemini to discover jobs, evaluate fit against resumes, generate tailored applications, and track dispatches.",
    category: "AI Workflows & Automation",
    tech: ["n8n", "Google Gemini API", "Webhooks", "TypeScript"],
    liveUrl: "https://ratnesh919.app.n8n.cloud",
    githubUrl: "https://github.com/Ratnesh919/Job_Pilot-AI"
  },
  {
    id: "bmw-m3",
    title: "BMW M3 GTR 3D Visualizer",
    tagline: "Interactive WebGL 3D Automotive Experience",
    description: "Interactive 3D vehicle showcase with real-time lighting, reflection environment maps, orbit inspection controls, and GLSL shaders in Three.js.",
    category: "3D Graphics & WebGL",
    tech: ["Three.js", "WebGL", "GLSL", "JavaScript"],
    githubUrl: "https://github.com/Ratnesh919/BMW-M3-GTR"
  },
  {
    id: "smart-antenna",
    title: "Smart Antenna (V2X)",
    tagline: "Low-Profile Monopole Antenna for Vehicular Communications",
    description: "Designed and simulated a dielectric-loaded capacitive monopole antenna in Ansys HFSS. Achieved 74% size reduction at 535.57 MHz with -31.87 dB return loss and 98.34% efficiency.",
    category: "ECE Hardware & Simulation",
    tech: ["Ansys HFSS", "VNA Testing", "Dielectric Sleeve", "V2X Comms"]
  }
];
