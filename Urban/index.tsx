
import { useState } from 'react';
import './tailwind.css';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, GraduationCap, Code2, Cpu, Wrench, 
  Sparkles, ChevronRight, Linkedin, Instagram, Facebook, Github,
  MousePointer2, ExternalLink, X
} from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  instructor: string;
  date: string;
  certId: string;
  image: string;
  verifyUrl: string;
}

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  type: string;
  tags: string[];
  accent: string;
  liveUrl?: string;
  githubUrl?: string;
}

const liveProjectsData: ProjectItem[] = [
  {
    id: "pak-converter",
    title: "PAK Video Converter",
    tagline: "Pro-Grade Android Media Extractor & Transcoder",
    type: "ANDROID / HARDWARE CODEC",
    desc: "Modern Android application using low-latency MediaCodec & MediaMuxer hardware pipelines to extract, transcode, and play video game assets, dashcam archives, and raw stream payloads in Kotlin & Jetpack Compose.",
    tags: ["Kotlin", "Jetpack Compose", "MediaCodec", "Room SQLite", "Coroutines"],
    accent: "#ffaa00",
    githubUrl: "https://github.com/Ratnesh919/PAK_Video_Converter_Android_App"
  },
  {
    id: "syncpulse",
    title: "SyncPulse",
    tagline: "Real-Time Synchronized Spatial Audio Network",
    type: "REAL-TIME WEB / DSP",
    desc: "Sub-millisecond multi-device synchronized audio playback over WebSockets using Cristian's NTP clock sync (±5ms accuracy), 8D binaural 360° soundstage, and interactive Three.js 3D visualizer.",
    tags: ["Node.js", "Web Audio API", "Three.js", "WebSockets", "NTP Sync"],
    accent: "#00ffff",
    liveUrl: "https://syncpulse-1igt.onrender.com",
    githubUrl: "https://github.com/Ratnesh919/SyncPulse"
  },
  {
    id: "mediflow",
    title: "MediFlow",
    tagline: "Hospital Queue & ML Wait-Time Forecasting",
    type: "HEALTHCARE / MACHINE LEARNING",
    desc: "Outpatient queue platform combining Random Forest ML wait-time forecasting, real-time WebSocket token broadcasts, emergency triage preemption, and executive analytics.",
    tags: ["FastAPI", "React 18", "TypeScript", "PostgreSQL", "Scikit-Learn"],
    accent: "#ff00ff",
    liveUrl: "https://github.com/Ratnesh919/Medi_Flow",
    githubUrl: "https://github.com/Ratnesh919/Medi_Flow"
  },
  {
    id: "shopkart",
    title: "ShopKart",
    tagline: "Modern E-Commerce Shopping Platform",
    type: "E-COMMERCE / FULL-STACK",
    desc: "Full-featured online shopping platform featuring dynamic product catalog, category filters, responsive cart management, and seamless modern design.",
    tags: ["React", "JavaScript", "REST APIs", "CSS3", "Netlify"],
    accent: "#00ff88",
    liveUrl: "https://shopkart919.netlify.app",
    githubUrl: "https://github.com/Ratnesh919/Shop_Kart-"
  },
  {
    id: "jobpilot",
    title: "JobPilot AI",
    tagline: "Autonomous AI Job Search & Application Automation",
    type: "AI WORKFLOWS / AUTOMATION",
    desc: "Production n8n automation matched with Google Gemini to discover jobs, evaluate fit against resumes, generate tailored applications, and track dispatches.",
    tags: ["n8n", "Google Gemini API", "Webhooks", "TypeScript"],
    accent: "#a855f7",
    liveUrl: "https://ratnesh919.app.n8n.cloud",
    githubUrl: "https://github.com/Ratnesh919/Job_Pilot-AI"
  },
  {
    id: "bmw-m3",
    title: "BMW M3 GTR 3D",
    tagline: "Interactive WebGL 3D Automotive Showcase",
    type: "3D GRAPHICS / WEBGL",
    desc: "Interactive 3D vehicle showcase with real-time lighting, reflection environment maps, orbit inspection controls, and GLSL shaders in Three.js.",
    tags: ["Three.js", "WebGL", "GLSL", "JavaScript"],
    accent: "#38bdf8",
    githubUrl: "https://github.com/Ratnesh919/BMW-M3-GTR"
  },
  {
    id: "smart-antenna",
    title: "Smart Antenna (V2X)",
    tagline: "Low-Profile Monopole Antenna for Vehicular Communications",
    type: "ECE HARDWARE / SIMULATION",
    desc: "Designed and simulated a dielectric-loaded capacitive monopole antenna in Ansys HFSS. Achieved 74% size reduction at 535.57 MHz with -31.87 dB return loss and 98.34% efficiency.",
    tags: ["Ansys HFSS", "VNA Testing", "Dielectric Sleeve", "V2X Comms"],
    accent: "#00ff88"
  }
];

const certificatesData: Certificate[] = [
  {
    id: "cert-iot",
    title: "Internet of Things (IoT) Online Course",
    issuer: "Udemy",
    instructor: "Makeintern Course, Learntoupgrade Online",
    date: "July 30, 2026",
    certId: "UC-45f867df-23bf-440a-b362-0508bfb8d29f",
    image: "./certificates/cert-iot.jpg",
    verifyUrl: "https://ude.my/UC-45f867df-23bf-440a-b362-0508bfb8d29f",
  },
  {
    id: "cert-prompt-engineering",
    title: "Prompt Engineering for Everyone (Tool-Agnostic)",
    issuer: "Udemy",
    instructor: "Dr. Amar Massoud",
    date: "May 4, 2025",
    certId: "UC-58952f65-94dc-45c4-abd9-aa490de18afc",
    image: "./certificates/cert-prompt-engineering.jpg",
    verifyUrl: "https://ude.my/UC-58952f65-94dc-45c4-abd9-aa490de18afc",
  },
  {
    id: "cert-multi-programming",
    title: "Master Java, Python, C & C++: All-in-One Programming Course",
    issuer: "Udemy",
    instructor: "Knowledge Nest",
    date: "May 5, 2025",
    certId: "UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",
    image: "./certificates/cert-multi-programming.jpg",
    verifyUrl: "https://ude.my/UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",
  },
  {
    id: "cert-cpp",
    title: "The Complete Introduction to C++ Programming",
    issuer: "Udemy",
    instructor: "Yassin Marco MBA",
    date: "July 14, 2025",
    certId: "UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",
    image: "./certificates/cert-cpp.jpg",
    verifyUrl: "https://ude.my/UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Portfolio() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id.toLowerCase());
    if (elem) {
      const y = elem.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e7eb] selection:bg-[#ff00ff]/30 font-sans overflow-x-hidden selection:text-white">
      {/* Interactive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-150 brightness-50 mix-blend-overlay"></div>
        {/* Spray paint effect blobs (Static) */}
        <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-[#ff00ff]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[30%] right-[10%] w-48 h-48 bg-[#00ffff]/05 blur-[100px] rounded-full" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-8 md:px-12">
        
        {/* Navigation */}
        <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-6">
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[950px] rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl ring-1 ring-white/5"
          >
            <div className="flex h-[64px] items-center justify-between px-6 md:px-10">
              <div 
                className="text-base md:text-lg font-black tracking-tighter text-white cursor-pointer group flex items-center shrink-0" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span className="group-hover:text-[#ff00ff] transition-colors duration-300">RATNESH</span>
                <span className="text-[#00ffff]">.</span>
              </div>

              <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-[10px] lg:text-xs font-bold tracking-[0.2em] text-white/50 hover:text-[#ff00ff] transition-all duration-300 relative group overflow-hidden"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#ff00ff] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setIsProjectsModalOpen(true)}
                className="px-4 py-1.5 rounded-full bg-[#ff00ff] text-black font-black text-[10px] tracking-widest uppercase hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)] flex items-center gap-1.5"
              >
                <Sparkles size={12} /> EXPLORE WORK
              </button>
            </div>
          </motion.nav>
        </div>

        {/* Hero Section */}
        <section id="home" className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[#00ffff] mb-8 shadow-sm backdrop-blur-md">
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">Mobile App &amp; Android Engineer</span>
            </div>
            
            <h1 className="relative mb-12 mt-8">
              <div className="text-4xl md:text-[70px] lg:text-[90px] font-black leading-tight tracking-[0.1em] text-white/5 select-none absolute left-1/2 -translate-x-1/2 -top-3/4 whitespace-nowrap opacity-20 pointer-events-none" style={{ fontFamily: '"Abraham Outline", sans-serif' }}>
                 ANDROID DEV
              </div>
              <div className="text-5xl md:text-[80px] lg:text-[100px] font-black leading-[1.8] tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 relative z-10 py-12" style={{ fontFamily: '"Next Ups", sans-serif' }}>
                MOBILE &amp; ANDROID
              </div>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto font-medium tracking-tight mb-12"
            >
              Building native Android applications with <span className="text-white">Kotlin</span>, Jetpack Compose, and <span className="text-[#ff00ff]">MediaCodec</span> hardware transcoding.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setIsProjectsModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-[#ff00ff] to-[#00ffff] text-black font-black text-sm tracking-widest rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,0,255,0.4)] flex items-center gap-2"
              >
                <Sparkles size={16} /> EXPLORE MOBILE APPS
              </button>
              <button 
                onClick={() => scrollTo('projects')}
                className="px-8 py-4 bg-white text-black font-black text-sm tracking-widest rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                VIEW CODE
              </button>
              <button 
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-black text-sm tracking-widest rounded-full hover:bg-white/5 transition-all active:scale-95 backdrop-blur-md"
              >
                GET IN TOUCH
              </button>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 mb-20 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="mb-10 flex items-center gap-4">
                <span className="text-[#ff00ff] font-black tracking-[.4em] uppercase text-[10px]">01 / THE ANDROID ENGINE</span>
                <div className="h-[1px] w-20 bg-[#ff00ff]/30" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-[0.2em] py-6 flex flex-col gap-6 md:gap-10 leading-[1.8]" style={{ fontFamily: '"Next Ups", sans-serif' }}>
                 <span>NATIVE</span>
                 <span>ANDROID</span>
                 <span>CODE.</span>
              </h2>
              <p className="text-xl text-white/50 leading-relaxed font-medium mb-10 max-w-xl">
                I build high-performance Android applications with clean architecture in Kotlin. My focus includes low-latency hardware video/audio processing using Android's MediaCodec subsystem, responsive declarative UIs in Jetpack Compose, and SQLite offline databases.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Focus", value: "Kotlin & Compose", icon: Code2 },
                  { label: "Hardware", value: "MediaCodec / NDK", icon: Cpu },
                  { label: "Location", value: "Kolkata, India", icon: MapPin },
                  { label: "Education", value: "B.Tech ECE '26", icon: GraduationCap },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:border-[#ff00ff]/30 transition-all">
                    <item.icon size={18} className="text-[#ff00ff]" />
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{item.label}</span>
                    <span className="text-sm font-bold text-white line-clamp-1">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-[#ff00ff]/10 opacity-20 pointer-events-none">
                  <Sparkles size={160} />
                </div>
                <h3 className="text-2xl font-black text-white mb-10 tracking-widest uppercase" style={{ fontFamily: '"Abraham Outline", sans-serif' }}>
                  MOBILE STACK
                </h3>
                <div className="grid grid-cols-1 gap-8 relative z-10">
                  {[
                    { title: "Jetpack Compose & Kotlin", desc: "Building fluid declarative interfaces with reactive state handling and Kotlin Coroutines.", icon: Code2 },
                    { title: "Hardware MediaCodec Engine", desc: "Direct hardware decoding and transcoding of raw video streams, dashcam footage, and game assets.", icon: Cpu },
                    { title: "Offline Storage & APIs", desc: "Room SQLite databases, WorkManager tasks, and secure RESTful backend communication.", icon: Wrench },
                  ].map((focus, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff00ff]/20 group-hover:border-[#ff00ff]/30 transition-all">
                        <focus.icon size={20} className="text-white group-hover:text-[#ff00ff]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-white mb-2">{focus.title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed font-medium">{focus.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Floating element */}
              <motion.div 
                 animate={{ y: [0, -20, 0] }} 
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -bottom-10 -right-10 px-8 py-4 rounded-2xl bg-[#ff00ff] text-black font-black text-xs tracking-widest shadow-2xl"
              >
                ANDROID &amp; HARDWARE
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills & Experience */}
        <section id="skills" className="py-20 mb-20 scroll-mt-32">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-white/5 mb-4 tracking-[0.1em] select-none" style={{ fontFamily: '"Abraham Outline", sans-serif' }}>
              STREET CRED.
            </h2>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-[0.2em] leading-[1.8] py-6" style={{ fontFamily: '"Next Ups", sans-serif' }}>
              SKILLS & EDUCATION
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Education Card */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="lg:col-span-2 p-10 rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ffff]/10 blur-[100px] -z-10" />
                <h3 className="text-2xl font-black text-white mb-8">Academic Journey</h3>
                <div className="space-y-8">
                  {[
                    { year: "2022 - 2026", inst: "Swami Vivekananda Institute", degree: "B.Tech in ECE", detail: "Coursework in embedded systems, signal processing, and telecommunications." },
                    { year: "2018 - 2020", inst: "P.B.S College", degree: "Higher Secondary", detail: "Science Stream (PCM) — Physics, Chemistry, and Mathematics." },
                    { year: "2016 - 2018", inst: "Vidyanjali High School", degree: "Secondary Schooling", detail: "IGCSE Board — Science and foundational computing." },
                  ].map((edu, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full border-2 border-[#00ffff] bg-[#050505] z-10" />
                        {i !== 2 && <div className="w-[1px] flex-grow bg-white/10 mt-2 mb-[-12px]" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-[#00ffff] tracking-widest">{edu.year}</span>
                        <h4 className="text-xl font-bold text-white mt-1 group-hover:text-[#00ffff] transition-colors">{edu.inst}</h4>
                        <p className="text-sm font-semibold text-white/70 mb-2">{edu.degree}</p>
                        <p className="text-xs text-white/40 leading-relaxed">{edu.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </motion.div>

             {/* Skills List Card */}
             <div className="flex flex-col gap-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-8 rounded-[40px] border border-[#ff00ff]/20 bg-[#ff00ff]/5"
                >
                   <h4 className="text-xs font-black text-[#ff00ff] tracking-[.4em] mb-6 uppercase">The Arsenal</h4>
                   <div className="flex flex-wrap gap-2">
                     {[
                        "TCP/IP", "DNS", "Routing & Switching", "Cybersecurity",
                        "C", "C++", "Python", "HTML", "CSS", "API Integration",
                        "n8n", "Google AI Studio", "OpenAI", "AI Agents",
                        "Arduino", "MATLAB", "Tinkercad", "Verilog", "ArcGIS",
                        "Figma", "Wireframing", "Prototyping", "Canva"
                     ].map((skill, i) => (
                       <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-default">
                         {skill}
                       </span>
                     ))}
                   </div>
                </motion.div>

                <motion.div 
                   whileHover={{ scale: 1.02 }}
                   className="p-8 rounded-[40px] border border-white/10 bg-white/5 flex-grow group"
                >
                   <h4 className="text-xs font-black text-[#00ffff] tracking-[.4em] mb-6 uppercase">Workshops & Training</h4>
                   <ul className="space-y-3">
                     {["Python Advanced Training (1 Month)", "Electric Vehicle Service Tech (1 Month)", "GIS Training Specialist (2 Weeks)", "HAM Radio Innovation Workshop", "Cyber Awareness Lead (2025)", "BSNL Telecom Industrial Visit"].map((cert, i) => (
                       <li key={i} className="flex items-center gap-3 text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                         <ChevronRight size={14} className="text-[#00ffff]" /> {cert}
                       </li>
                     ))}
                   </ul>
                </motion.div>
             </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 mb-20 scroll-mt-32">
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-4">
              <span className="text-[#00ffff] font-black tracking-[.4em] uppercase text-[10px]">03 / CREDENTIALS</span>
              <div className="h-[1px] w-20 bg-[#00ffff]/30" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-[0.2em] leading-[1.8] py-4" style={{ fontFamily: '"Next Ups", sans-serif' }}>
              LICENSES &amp; CERTIFICATIONS.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificatesData.map((cert, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-[32px] border border-white/10 bg-white/5 overflow-hidden flex flex-col group hover:border-[#ff00ff]/50 hover:bg-white/[0.08] transition-all duration-300"
              >
                <div 
                  className="relative aspect-[4/3] bg-black/60 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-black tracking-widest text-[#00ffff] uppercase px-3 py-1.5 rounded-full border border-[#00ffff]/50 bg-black/80 backdrop-blur-md">
                      View Cert
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-black text-[#ff00ff] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#ff00ff]/10 border border-[#ff00ff]/30">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-bold text-white/40">
                      {cert.date}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-white leading-snug mb-2 group-hover:text-[#00ffff] transition-colors">
                    {cert.title}
                  </h4>

                  <p className="text-xs font-semibold text-white/50 mb-2">
                    By {cert.instructor}
                  </p>

                  <p className="text-[10px] font-mono text-white/30 break-all mb-5 mt-auto">
                    ID: {cert.certId}
                  </p>

                  <div className="flex gap-2 pt-3 border-t border-white/10">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Full View
                    </button>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-[#00ffff]/10 hover:bg-[#00ffff]/20 text-[#00ffff] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center border border-[#00ffff]/30"
                    >
                      Verify ↗
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="py-20 mb-20 scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
            <div>
              <span className="text-[#ff00ff] font-black tracking-[.4em] text-[10px] uppercase block mb-6">03 / Selected Works</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-[0.2em] leading-[1.8] py-6" style={{ fontFamily: '"Next Ups", sans-serif' }}>
                 LIVE PROJECTS.
              </h2>
            </div>

            <button
              onClick={() => setIsProjectsModalOpen(true)}
              className="px-8 py-4 bg-transparent border-2 border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black font-black text-xs tracking-widest uppercase rounded-full transition-all shadow-[0_0_30px_rgba(255,0,255,0.2)] flex items-center gap-2 self-start md:self-auto"
            >
              <Sparkles size={14} /> EXPLORE ALL PROJECTS ↗
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveProjectsData.slice(0, 6).map((proj, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-[40px] border border-white/10 bg-white/5 hover:border-white/20 transition-all min-h-[420px] flex flex-col justify-between relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <MousePointer2 size={120} />
                 </div>
                 
                 <div>
                   <div 
                     className="w-12 h-1 mb-6 rounded-full" 
                     style={{ backgroundColor: proj.accent }}
                   />
                   <span className="text-[10px] font-black text-white/40 tracking-[.3em] uppercase block mb-2">{proj.type}</span>
                   <h3 className="text-2xl font-black text-white mb-2 leading-tight tracking-tight group-hover:text-[#ff00ff] transition-colors">
                      {proj.title}
                   </h3>
                   <p className="text-xs font-bold text-[#00ffff] tracking-wide mb-3">{proj.tagline}</p>
                   <p className="text-sm text-white/50 leading-relaxed font-medium mb-6">
                      {proj.desc}
                   </p>
                   <div className="flex flex-wrap gap-2 mb-6">
                     {proj.tags.slice(0, 4).map((tag, j) => (
                       <span key={j} className="text-[10px] font-bold text-white/50 px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest whitespace-nowrap">
                         {tag}
                       </span>
                     ))}
                   </div>
                 </div>

                 <div className="pt-4 border-t border-white/10 flex gap-2 relative z-10">
                   {proj.liveUrl && (
                     <a
                       href={proj.liveUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex-1 py-2.5 px-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#00ffff] transition-colors"
                     >
                       <ExternalLink size={14} /> Live Demo
                     </a>
                   )}
                   {proj.githubUrl && (
                     <a
                       href={proj.githubUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
                     >
                       <Github size={14} /> Repo
                     </a>
                   )}
                 </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsProjectsModalOpen(true)}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[#ff00ff] via-[#3400f1] to-[#00ffff] text-white font-black text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,0,255,0.3)]"
            >
              ✨ Full Live Portfolio & Code Directory
            </button>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-20 mb-20 scroll-mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full rounded-[60px] bg-gradient-to-br from-[#ff00ff] via-[#3400f1] to-[#00ffff] p-[1px] group overflow-hidden"
          >
             <div className="w-full h-full bg-[#050505] rounded-[60px] p-12 lg:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
                
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-[0.25em] mb-12 py-10 flex flex-col gap-6 md:gap-10 leading-[1.8] relative z-10" style={{ fontFamily: '"Abraham Outline", sans-serif' }}>
                   <span>READY</span>
                   <span>TO</span>
                   <span>BUILD?</span>
                </h2>
                
                <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 font-medium relative z-10">
                   Currently open to collaborations and full-time opportunities. Drop a ping if you want to create something truly unique.
                </p>

                <div className="flex flex-col items-center gap-8 relative z-10">
                  <div className="flex gap-8 flex-wrap justify-center">
                    <a href="mailto:kumarsinghratnesh3@gmail.com" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-[#ff00ff] hover:bg-[#ff00ff]/10 transition-all hover:scale-110">
                      <Mail size={24} />
                    </a>
                    <a href="https://github.com/Ratnesh919" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white hover:bg-white/10 transition-all hover:scale-110">
                      <Github size={24} />
                    </a>
                    <a href="https://www.instagram.com/ratnesh.199?igsh=MXF3aDd0eWRhaGhiaA==" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-[#E4405F] hover:bg-[#E4405F]/10 transition-all hover:scale-110">
                      <Instagram size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/ratnesh-kumar-singh-16749325b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all hover:scale-110">
                      <Linkedin size={24} />
                    </a>
                    <a href="https://www.facebook.com/share/1De11Vypsn/" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all hover:scale-110">
                      <Facebook size={24} />
                    </a>
                  </div>
                </div>
             </div>
          </motion.div>
        </section>

        <footer className="py-20 text-center">
           <div className="text-lg font-black text-white/10 mb-4 tracking-[.5em]" style={{ fontFamily: '"Next Ups", sans-serif' }}>
              RATNESH SINGH
           </div>
           <p className="text-[10px] font-black text-white/20 tracking-widest uppercase">
              &copy; {new Date().getFullYear()} — Handcrafted in Kolkata
           </p>
        </footer>

      </main>

      {/* LIGHTBOX MODAL */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative rounded-[32px] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-white/20 shadow-2xl bg-[#0a0a0a]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff00ff] hover:text-black text-white flex items-center justify-center font-black text-sm transition-colors"
            >
              ✕
            </button>

            <div className="p-6 border-b border-white/10 pr-16">
              <span className="text-[9px] font-black text-[#ff00ff] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#ff00ff]/10 border border-[#ff00ff]/30 inline-block mb-2">
                {selectedCert.issuer}
              </span>
              <h3 className="text-xl sm:text-2xl text-white font-black">
                {selectedCert.title}
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Issued {selectedCert.date} &bull; ID: {selectedCert.certId}
              </p>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-black/80">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[60vh] max-w-full object-contain rounded-xl border border-white/10"
              />
            </div>

            <div className="p-4 sm:p-6 border-t border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <span className="text-xs text-white/40 hidden sm:inline font-mono">
                Authentic Udemy Credential
              </span>
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-6 rounded-full bg-[#00ffff] text-black font-black text-xs uppercase tracking-wider hover:scale-105 transition-transform"
              >
                Verify on Udemy ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* EXPLORE MY WORK / LIVE PROJECTS MODAL */}
      {isProjectsModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsProjectsModalOpen(false)}
        >
          <div
            className="relative rounded-[32px] max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-white/20 shadow-2xl bg-[#0a0a0a]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-start">
              <div>
                <span className="text-[9px] font-black text-[#ff00ff] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#ff00ff]/10 border border-[#ff00ff]/30 inline-block mb-2">
                  LIVE CODE & PRODUCTION APPS
                </span>
                <h3 className="text-2xl sm:text-3xl text-white font-black">
                  Explore My <span className="text-[#00ffff]">Work</span>
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  Full list of live interactive web apps, ML pipelines, Android tools, and antenna designs.
                </p>
              </div>

              <button
                onClick={() => setIsProjectsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff00ff] hover:text-black text-white flex items-center justify-center font-black text-sm transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content List */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/60">
              {liveProjectsData.map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-2xl bg-[#111] border border-white/10 hover:border-[#ff00ff]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#00ffff] bg-[#00ffff]/10 px-2 py-0.5 rounded border border-[#00ffff]/20">
                        {project.type}
                      </span>
                    </div>

                    <h4 className="text-xl font-black text-white">{project.title}</h4>
                    <p className="text-xs font-bold text-white/70 mt-1">{project.tagline}</p>
                    <p className="text-xs text-white/50 mt-2 leading-relaxed">{project.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold text-white/50 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#00ffff] transition-colors"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
                      >
                        <Github size={14} /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
