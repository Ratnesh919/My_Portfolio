export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  desc: string;
  category: 'Full-Stack' | 'Android' | 'Workflow & Automation' | '3D Graphics' | 'Hardware & IoT';
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
  role: "Full Stack Developer & Electronics Engineer",
  subRole: "Electronics & Communication Engineering (2026)",
  tagline: "I build apps, websites, and smart hardware that people actually enjoy using.",
  location: "Kolkata, India",
  email: "kumarsinghratnesh3@gmail.com",
  github: "https://github.com/Ratnesh919",
  linkedin: "https://www.linkedin.com/in/ratnesh-kumar-singh-16749325b",
  instagram: "https://www.instagram.com/ratnesh.199?igsh=MXF3aDd0eWRhaGhiaA==",
  facebook: "https://www.facebook.com/share/1De11Vypsn/",
  twitter: "https://x.com",
  stats: [
    { label: "B.Tech ECE (2026)", value: "MAKAUT", icon: "GraduationCap" },
    { label: "Projects Built", value: "10+", icon: "FolderGit2" },
    { label: "Audio Precision", value: "±5ms", icon: "Radio" },
    { label: "Certifications", value: "4+", icon: "Award" },
  ],
  bio: "Final year Electronics & Communication Engineering student (MAKAUT, graduating 2026). I build web apps, Android apps, IoT hardware, and 3D experiences. I enjoy making things work fast, look great, and feel smooth — whether it's a website, a mobile app, or a circuit board.",
  
  projects: [
    {
      id: "syncpulse",
      title: "SyncPulse",
      subtitle: "Synchronized Audio Across Multiple Devices",
      tagline: "Play music in perfect sync across multiple phones or speakers at the same time.",
      desc: "A real-time audio sync system that keeps music perfectly timed across different devices on the same network — within 5 milliseconds of each other. Includes an interactive 3D sound visualizer and 8D surround sound effects.",
      category: "Full-Stack",
      tags: ["Node.js", "Web Audio API", "Three.js", "WebSockets", "NTP Sync"],
      techStack: "Node.js · Web Audio · Three.js",
      accent: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.4)",
      badge: "Featured / Real-Time Audio",
      liveUrl: "https://syncpulse-1igt.onrender.com",
      githubUrl: "https://github.com/Ratnesh919/SyncPulse",
      highlights: [
        "±5ms timing accuracy — audio stays in sync across all connected devices",
        "Interactive 3D visualizer that reacts to the music in real time",
        "Supports multiple rooms and devices over WebSockets"
      ]
    },
    {
      id: "pak-converter",
      title: "PAK Video Converter",
      subtitle: "Android Video Extractor & Converter",
      tagline: "Convert, extract and save videos from game files and dashcam footage on Android.",
      desc: "A native Android app built with Kotlin that uses the phone's own video processing chip to convert game archives, PAK files, and dashcam footage into regular video files — fast and without quality loss.",
      category: "Android",
      tags: ["Kotlin", "Jetpack Compose", "MediaCodec", "Room SQLite", "Coroutines"],
      techStack: "Kotlin · Jetpack Compose · MediaCodec",
      accent: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.4)",
      badge: "Native Android",
      githubUrl: "https://github.com/Ratnesh919/PAK_Video_Converter_Android_App",
      highlights: [
        "Uses the phone's hardware chip for fast video conversion with no frame drops",
        "Clean, modern UI built with Jetpack Compose",
        "Can read proprietary file formats used in games and dashcams"
      ]
    },
    {
      id: "mediflow",
      title: "MediFlow",
      subtitle: "Hospital Queue & Wait-Time Prediction",
      tagline: "Helps hospitals manage patient queues and predict how long the wait will be.",
      desc: "A full hospital queue management system that uses machine learning to predict how long a patient will wait, and shows live queue updates on a display board. Built with FastAPI, React, and PostgreSQL.",
      category: "Full-Stack",
      tags: ["FastAPI", "React 18", "PostgreSQL", "Scikit-Learn", "WebSockets"],
      techStack: "FastAPI · React 18 · Scikit-Learn",
      accent: "#ec4899",
      glowColor: "rgba(236, 72, 153, 0.4)",
      badge: "Healthcare Tech",
      liveUrl: "https://github.com/Ratnesh919/Medi_Flow",
      githubUrl: "https://github.com/Ratnesh919/Medi_Flow",
      highlights: [
        "Predicts patient wait time using a machine learning model",
        "Live queue display board updates in real time",
        "Emergency patients can be moved to the front automatically"
      ]
    },
    {
      id: "jobpilot",
      title: "JobPilot",
      subtitle: "Automated Job Application System",
      tagline: "Automatically finds job openings and sends tailored applications for you.",
      desc: "An automated workflow built on n8n that constantly scans job boards, scores each listing against a resume, rewrites the application to match the job, and sends it — all without manual effort.",
      category: "Workflow & Automation",
      tags: ["n8n Cloud", "Google Gemini API", "Webhooks", "Automation", "TypeScript"],
      techStack: "n8n · Cloud Webhooks · TypeScript",
      accent: "#22c55e",
      glowColor: "rgba(34, 197, 94, 0.4)",
      badge: "Workflow Automation",
      liveUrl: "https://ratnesh919.app.n8n.cloud",
      githubUrl: "https://github.com/Ratnesh919/Job_Pilot-AI",
      highlights: [
        "Scans multiple job sites continuously and scores each match",
        "Rewrites the resume and cover letter to fit each job automatically",
        "Sends email notifications and tracks every application"
      ]
    },
    {
      id: "bmw-m3",
      title: "BMW M3 GTR 3D",
      subtitle: "Interactive 3D Car Showcase",
      tagline: "Spin, zoom, and inspect a BMW M3 GTR in real-time 3D right in your browser.",
      desc: "A 3D car viewer built with Three.js that lets you rotate, zoom, and explore a BMW M3 GTR with realistic lighting, reflections, and paint shaders — all running live in the browser with no app needed.",
      category: "3D Graphics",
      tags: ["Three.js", "WebGL", "GLSL Shaders", "JavaScript", "OrbitControls"],
      techStack: "Three.js · WebGL · GLSL",
      accent: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.4)",
      badge: "WebGL / Three.js",
      liveUrl: "https://relaxed-nasturtium-3abd55.netlify.app/",
      githubUrl: "https://github.com/Ratnesh919/BMW-M3-GTR",
      highlights: [
        "Drag to spin the car 360° with smooth camera controls",
        "Realistic paint, metallic flakes, and studio lighting effects",
        "Live environment reflections on the car body"
      ]
    },
    {
      id: "smart-antenna",
      title: "Vehicular Smart Antenna",
      subtitle: "Small Car-to-Car Communication Antenna",
      tagline: "Designed a tiny antenna for vehicles that communicates with the road and other cars.",
      desc: "Designed and simulated a compact vehicle antenna in Ansys HFSS that is 74% smaller than a standard antenna while still communicating reliably at the correct frequency for vehicle-to-vehicle and vehicle-to-road systems.",
      category: "Hardware & IoT",
      tags: ["Ansys HFSS", "RF Design", "V2X Antennas", "VNA Testing", "Microwave"],
      techStack: "Ansys HFSS · RF Simulation",
      accent: "#06b6d4",
      glowColor: "rgba(6, 182, 212, 0.4)",
      badge: "Electronics Hardware",
      githubUrl: "https://github.com/Ratnesh919/Smart_Antenna_For_Vehicular_Applications",
      highlights: [
        "74% size reduction — fits in a tiny space while working at 535 MHz",
        "Near-perfect signal efficiency with -31.87 dB return loss",
        "Tested and verified with professional lab equipment"
      ]
    },
    {
      id: "smart-parking",
      title: "Smart Parking System",
      subtitle: "Sensor-Based Parking Slot Detector",
      tagline: "Shows drivers which parking spots are free using Arduino and ultrasonic sensors.",
      desc: "A real hardware prototype that uses ultrasonic distance sensors connected to an Arduino to detect whether each parking bay is occupied or free. Status lights show drivers instantly where to park.",
      category: "Hardware & IoT",
      tags: ["Arduino", "C++", "Ultrasonic Sensors", "IoT", "Embedded C"],
      techStack: "Arduino · C++ · Sensors",
      accent: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.4)",
      badge: "IoT Prototype",
      githubUrl: "https://github.com/Ratnesh919/Smart_Parking_System",
      highlights: [
        "Detects cars instantly using ultrasonic distance sensors",
        "Clean C++ firmware that is easy to expand and maintain",
        "LED lights show free and occupied bays at a glance"
      ]
    }
  ] as ProjectItem[],

  skillCategories: [
    {
      title: "Web Apps & Audio",
      description: "Building fast websites, real-time audio tools, and interactive web experiences.",
      icon: "Code2",
      skills: [
        { name: "React 18 & TypeScript", level: 92, highlight: true },
        { name: "Node.js & FastAPI", level: 88, highlight: true },
        { name: "Web Audio API & Sound Processing", level: 90, highlight: true },
        { name: "WebSockets & Real-Time Sync", level: 92, highlight: true },
        { name: "PostgreSQL & Tailwind CSS", level: 86 }
      ]
    },
    {
      title: "Android App Development",
      description: "Building fast, native Android apps that use the phone's hardware directly.",
      icon: "Smartphone",
      skills: [
        { name: "Kotlin & Android SDK", level: 88, highlight: true },
        { name: "Jetpack Compose", level: 85, highlight: true },
        { name: "Hardware Video Processing", level: 90, highlight: true },
        { name: "Room Database (SQLite)", level: 84 },
        { name: "Kotlin Coroutines & Flow", level: 86 }
      ]
    },
    {
      title: "Automation & Workflows",
      description: "Setting up systems that do repetitive work automatically so you don't have to.",
      icon: "Cpu",
      skills: [
        { name: "n8n Workflow Automation", level: 92, highlight: true },
        { name: "Cloud Webhooks & APIs", level: 90, highlight: true },
        { name: "API Integrations", level: 85 },
        { name: "System Integration", level: 94, highlight: true },
        { name: "Python & Machine Learning", level: 82 }
      ]
    },
    {
      title: "Electronics & RF Hardware",
      description: "Designing circuits, antennas, and microcontroller projects in the real world.",
      icon: "Radio",
      skills: [
        { name: "Ansys HFSS Simulation", level: 86, highlight: true },
        { name: "RF Antennas & Wireless", level: 85, highlight: true },
        { name: "Arduino & IoT Projects", level: 88 },
        { name: "MATLAB & Tinkercad", level: 80 },
        { name: "Verilog & Digital Logic", level: 75 }
      ]
    },
    {
      title: "3D Design & Visual Effects",
      description: "Creating interactive 3D visuals, animations, and polished user interfaces.",
      icon: "Sparkles",
      skills: [
        { name: "Three.js & WebGL", level: 88, highlight: true },
        { name: "GLSL Shader Programming", level: 82, highlight: true },
        { name: "Figma UI/UX Design", level: 90 },
        { name: "Framer Motion", level: 88 },
        { name: "3D & Glass UI Effects", level: 94, highlight: true }
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
      title: "System Integration & Prompting Strategies",
      issuer: "Udemy",
      instructor: "Dr. Amar Massoud",
      date: "May 4, 2025",
      certId: "UC-58952f65-94dc-45c4-abd9-aa490de18afc",
      category: "Tools & Workflow",
      verifyUrl: "https://ude.my/UC-58952f65-94dc-45c4-abd9-aa490de18afc",
      skills: ["Logical Structuring", "Reasoning Chains", "Workflow Automation"]
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
