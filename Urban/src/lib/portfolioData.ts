export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  desc: string;
  category: 'Full-Stack' | 'Android' | 'AI & Automation' | '3D Graphics' | 'Hardware & IoT';
  tags: string[];
  techStack: string;
  accent: string;
  glowColor: string;
  badge: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  instructor: string;
  date: string;
  certId: string;
  category: string;
  verifyUrl: string;
  skills: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export interface AcademicExperience {
  period: string;
  title: string;
  institution: string;
  type: 'Education' | 'Training' | 'Industrial Visit' | 'Workshop';
  description: string;
  badge: string;
}

export const PORTFOLIO_DATA = {
  name: "Ratnesh Kumar Singh",
  role: "Full Stack Developer & AI Engineer",
  subRole: "Electronics & Communication Engineer (2026)",
  tagline: "I build exceptional, real-time, and AI-powered digital experiences for web, mobile, and embedded systems.",
  location: "Kolkata, India",
  email: "kumarsinghratnesh3@gmail.com",
  github: "https://github.com/Ratnesh919",
  linkedin: "https://www.linkedin.com/in/ratnesh-kumar-singh-16749325b",
  instagram: "https://www.instagram.com/ratnesh.199?igsh=MXF3aDd0eWRhaGhiaA==",
  facebook: "https://www.facebook.com/share/1De11Vypsn/",
  twitter: "https://x.com",
  stats: [
    { label: "B.Tech ECE (2026)", value: "MAKAUT", icon: "GraduationCap" },
    { label: "Projects Completed", value: "10+", icon: "FolderGit2" },
    { label: "DSP Audio Sync", value: "±5ms", icon: "Radio" },
    { label: "Certifications", value: "4+", icon: "Award" },
  ],
  bio: "Electronics and Communication Engineering undergrad (graduating 2026, MAKAUT) with practical experience across embedded systems, mobile app development, full-stack real-time web, AI workflow automation, and UI/UX design. Passionate about building hardware-software convergence, low-latency audio pipelines, and AI agent workflows.",
  
  projects: [
    {
      id: "syncpulse",
      title: "SyncPulse",
      subtitle: "Multi-Device Spatial Audio Network",
      tagline: "Sub-millisecond multi-device synchronized audio playback over WebSockets.",
      desc: "Architected a real-time distributed audio synchronization engine implementing Cristian's NTP clock sync algorithm to achieve ±5ms precision across diverse client devices, paired with an 8D binaural 360° soundstage and an interactive Three.js 3D audio visualizer.",
      category: "Full-Stack",
      tags: ["Node.js", "Web Audio API", "Three.js", "WebSockets", "NTP Sync"],
      techStack: "Node.js · Web Audio · Three.js",
      accent: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.4)",
      badge: "Featured / Real-Time DSP",
      liveUrl: "https://syncpulse-1igt.onrender.com",
      githubUrl: "https://github.com/Ratnesh919/SyncPulse",
      highlights: [
        "±5ms multi-device audio clock synchronization via custom NTP implementation",
        "Interactive 3D Three.js spatial soundstage with head-tracking",
        "WebSockets broadcast network capable of seamless multi-room streaming"
      ]
    },
    {
      id: "pak-converter",
      title: "PAK Video Converter",
      subtitle: "Android MediaCodec & MediaMuxer Pipeline",
      tagline: "Low-latency hardware accelerated video extractor & transcoder.",
      desc: "Engineered a native Android application using Kotlin and Jetpack Compose that directly interfaces with Android's MediaCodec and MediaMuxer hardware pipelines to extract, transcode, and stream raw video payloads, game archives, and dashcam footage.",
      category: "Android",
      tags: ["Kotlin", "Jetpack Compose", "MediaCodec", "Room SQLite", "Coroutines"],
      techStack: "Kotlin · Jetpack Compose · MediaCodec",
      accent: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.4)",
      badge: "Native Android",
      githubUrl: "https://github.com/Ratnesh919/PAK_Video_Converter_Android_App",
      highlights: [
        "Hardware-accelerated transcoding pipeline with zero frame drops",
        "Reactive modern UI built from scratch using Jetpack Compose",
        "Custom binary header parser for proprietary container formats"
      ]
    },
    {
      id: "mediflow",
      title: "MediFlow",
      subtitle: "Outpatient Queue & Wait-Time Forecasting",
      tagline: "Machine learning wait-time estimation & real-time queue orchestration.",
      desc: "Full-stack hospital queue management system combining FastAPI, React 18, and PostgreSQL with a Scikit-Learn Random Forest ML regression model to forecast patient wait times dynamically with real-time WebSocket token broadcasts.",
      category: "Full-Stack",
      tags: ["FastAPI", "React 18", "PostgreSQL", "Scikit-Learn", "WebSockets"],
      techStack: "FastAPI · React 18 · Scikit-Learn",
      accent: "#ec4899",
      glowColor: "rgba(236, 72, 153, 0.4)",
      badge: "Healthcare ML",
      liveUrl: "https://github.com/Ratnesh919/Medi_Flow",
      githubUrl: "https://github.com/Ratnesh919/Medi_Flow",
      highlights: [
        "Dynamic wait-time prediction using Random Forest regression",
        "Real-time WebSocket token display boards for hospital waiting rooms",
        "Emergency triage preemption system with audit logging"
      ]
    },
    {
      id: "jobpilot",
      title: "JobPilot AI",
      subtitle: "Autonomous Job Search & Application Agent",
      tagline: "Automated agent workflow scanning job feeds and dispatching tailored applications.",
      desc: "Engineered an autonomous workflow on n8n Cloud powered by Google Gemini API to continuously aggregate job openings across platforms, evaluate semantic candidate fit, dynamically tailor resumes, and trigger webhook dispatches.",
      category: "AI & Automation",
      tags: ["n8n Cloud", "Google Gemini API", "Webhooks", "Automation", "TypeScript"],
      techStack: "n8n · Google Gemini · Webhooks",
      accent: "#22c55e",
      glowColor: "rgba(34, 197, 94, 0.4)",
      badge: "AI Agent Workflow",
      liveUrl: "https://ratnesh919.app.n8n.cloud",
      githubUrl: "https://github.com/Ratnesh919/Job_Pilot-AI",
      highlights: [
        "Continuous multi-source RSS and API ingestion pipeline",
        "Semantic matching with Google Gemini 1.5 Flash models",
        "Automated applicant tracking and personalized email notifications"
      ]
    },
    {
      id: "bmw-m3",
      title: "BMW M3 GTR 3D",
      subtitle: "Interactive WebGL Automotive Showcase",
      tagline: "Real-time 3D vehicle inspection with custom GLSL lighting shaders.",
      desc: "Interactive 3D vehicle experience built with Three.js and WebGL. Features real-time PBR shaders, HDRI reflection environment mapping, orbital camera inspection, and interactive customization controls.",
      category: "3D Graphics",
      tags: ["Three.js", "WebGL", "GLSL Shaders", "JavaScript", "OrbitControls"],
      techStack: "Three.js · WebGL · GLSL",
      accent: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.4)",
      badge: "WebGL / Three.js",
      liveUrl: "https://relaxed-nasturtium-3abd55.netlify.app/",
      githubUrl: "https://github.com/Ratnesh919/BMW-M3-GTR",
      highlights: [
        "Physically Based Rendering (PBR) with custom GLSL reflection shaders",
        "Smooth orbital camera kinematics with damping controls",
        "Real-time paint material selector and lighting controls"
      ]
    },
    {
      id: "smart-antenna",
      title: "Smart Antenna V2X",
      subtitle: "Dielectric-Loaded Capacitive Monopole Antenna",
      tagline: "HFSS RF antenna design achieving 74% physical size reduction.",
      desc: "Designed and simulated a capacitive-loaded monopole antenna for automotive Vehicle-to-Everything (V2X) communication at 535.57 MHz in Ansys HFSS. Succeeded in reducing physical footprint by 74% while maintaining -31.87 dB return loss and 98.34% radiation efficiency.",
      category: "Hardware & IoT",
      tags: ["Ansys HFSS", "RF Design", "VNA Testing", "V2X Communication", "Electromagnetics"],
      techStack: "Ansys HFSS · RF Simulation",
      accent: "#6366f1",
      glowColor: "rgba(99, 102, 241, 0.4)",
      badge: "ECE Hardware",
      highlights: [
        "74% physical footprint miniaturization at 535.57 MHz",
        "-31.87 dB return loss with 98.34% radiation efficiency",
        "Full 3D radiation pattern and Smith Chart impedance matching"
      ]
    }
  ] as ProjectItem[],

  skillCategories: [
    {
      title: "Full-Stack & Real-Time Web",
      description: "Building responsive, sub-second web platforms and real-time distributed pipelines.",
      icon: "Code2",
      skills: [
        { name: "React 18 & Next.js", level: 90, highlight: true },
        { name: "TypeScript", level: 88, highlight: true },
        { name: "Node.js & Express", level: 85, highlight: true },
        { name: "FastAPI & Python", level: 82 },
        { name: "WebSockets & Real-Time DSP", level: 92, highlight: true },
        { name: "PostgreSQL & Supabase", level: 80 },
        { name: "Tailwind CSS & Modern UI", level: 95, highlight: true }
      ]
    },
    {
      title: "Mobile App Development",
      description: "Native high-efficiency Android software utilizing hardware decoders.",
      icon: "Smartphone",
      skills: [
        { name: "Kotlin & Android SDK", level: 88, highlight: true },
        { name: "Jetpack Compose", level: 85, highlight: true },
        { name: "MediaCodec & MediaMuxer", level: 90, highlight: true },
        { name: "Room SQLite Database", level: 84 },
        { name: "Kotlin Coroutines & Flow", level: 86 }
      ]
    },
    {
      title: "AI Agents & Automation",
      description: "Orchestrating autonomous AI workflows and LLM applications.",
      icon: "Cpu",
      skills: [
        { name: "n8n Workflow Automation", level: 92, highlight: true },
        { name: "Google Gemini API", level: 90, highlight: true },
        { name: "OpenAI API Integration", level: 85 },
        { name: "Prompt Engineering", level: 94, highlight: true },
        { name: "Python Scripting & Scikit-Learn", level: 82 }
      ]
    },
    {
      title: "Embedded Systems & RF Hardware",
      description: "Hardware circuit modeling, RF antenna simulation, and microcontroller firmware.",
      icon: "Radio",
      skills: [
        { name: "Ansys HFSS Simulation", level: 86, highlight: true },
        { name: "RF Antennas & V2X", level: 85, highlight: true },
        { name: "Arduino IDE & IoT Prototypes", level: 88 },
        { name: "MATLAB & Tinkercad", level: 80 },
        { name: "Verilog & Digital Systems", level: 75 }
      ]
    },
    {
      title: "UI/UX & Interactive 3D",
      description: "Crafting tactile 3D visuals, shaders, and fluid interfaces.",
      icon: "Sparkles",
      skills: [
        { name: "Three.js & WebGL", level: 88, highlight: true },
        { name: "GLSL Fragment Shaders", level: 82, highlight: true },
        { name: "Figma UI/UX Design", level: 90 },
        { name: "Framer Motion", level: 88 },
        { name: "3D Neomorphism & Glassmorphism", level: 94, highlight: true }
      ]
    }
  ] as SkillCategory[],

  certifications: [
    {
      id: "iot-cert",
      title: "Internet of Things (IoT) Online Course",
      issuer: "Udemy (Makeintern & Learntoupgrade Online)",
      instructor: "Learntoupgrade / Makeintern",
      date: "July 30, 2026",
      certId: "UC-45f867df-23bf-440a-b362-0508bfb8d29f",
      category: "IoT & Hardware",
      verifyUrl: "https://ude.my/UC-45f867df-23bf-440a-b362-0508bfb8d29f",
      skills: ["IoT Architecture", "Sensors & Actuators", "Embedded Protocols", "Cloud Telemetry"]
    },
    {
      id: "prompt-eng-cert",
      title: "Prompt Engineering for Everyone (Tool-Agnostic)",
      issuer: "Udemy",
      instructor: "Dr. Amar Massoud",
      date: "May 4, 2025",
      certId: "UC-58952f65-94dc-45c4-abd9-aa490de18afc",
      category: "AI & LLMs",
      verifyUrl: "https://ude.my/UC-58952f65-94dc-45c4-abd9-aa490de18afc",
      skills: ["Zero-shot & Few-shot Prompting", "Chain of Thought", "LLM Reasoning Patterns"]
    },
    {
      id: "all-in-one-prog-cert",
      title: "Master Java, Python, C & C++: All-in-One Programming",
      issuer: "Udemy",
      instructor: "Knowledge Nest",
      date: "May 5, 2025",
      certId: "UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",
      category: "Core Computer Science",
      verifyUrl: "https://ude.my/UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",
      skills: ["Data Structures & Algorithms", "Memory Management", "Object-Oriented Programming"]
    },
    {
      id: "cpp-intro-cert",
      title: "The Complete Introduction to C++ Programming",
      issuer: "Udemy",
      instructor: "Yassin Marco MBA",
      date: "July 14, 2025",
      certId: "UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",
      category: "Systems Programming",
      verifyUrl: "https://ude.my/UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",
      skills: ["Pointers & References", "Templates", "STL Algorithms", "Low-Level Performance"]
    }
  ] as CertificateItem[],

  experiences: [
    {
      period: "2022 – 2026",
      title: "B.Tech in Electronics and Communication Engineering",
      institution: "Swami Vivekananda Institute of Science & Technology, MAKAUT",
      type: "Education",
      description: "Focused on RF antenna design, embedded systems, microprocessors, digital signal processing, and telecommunications alongside independent full-stack and mobile app engineering.",
      badge: "Degree / Graduation 2026"
    },
    {
      period: "2025",
      title: "BSNL Telecom Industrial Visit",
      institution: "Bharat Sanchar Nigam Limited (BSNL)",
      type: "Industrial Visit",
      description: "Studied carrier-grade telecom switching centers, fiber-optic distribution systems, transmission hierarchies (SDH/DWDM), and cellular core network routing infrastructure.",
      badge: "Telecommunications"
    },
    {
      period: "2025",
      title: "HAM Radio Innovation & General Awareness Workshop",
      institution: "Amateur Radio Society / MAKAUT",
      type: "Workshop",
      description: "Hands-on experience with HF/VHF radio transceiver tuning, modulation techniques, antenna impedance matching, and emergency communication protocols.",
      badge: "RF & Wireless"
    },
    {
      period: "2024",
      title: "Electric Vehicle Service Technology (1-Month Training)",
      institution: "Technical Institute of EV Engineering",
      type: "Training",
      description: "Trained on EV powertrain architectures, battery management systems (BMS), regenerative braking motor controllers, and DC-DC converter diagnostics.",
      badge: "EV & Power"
    },
    {
      period: "2025",
      title: "Cyber Security: Cyber Awareness Workshop",
      institution: "Tech Summit 2025",
      type: "Workshop",
      description: "Covered enterprise network security, encryption protocols, defense-in-depth, and secure coding practices.",
      badge: "Security"
    }
  ] as AcademicExperience[]
};
