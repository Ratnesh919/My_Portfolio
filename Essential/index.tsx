import { useState } from 'react';
import './tailwind.css';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Code2, Cpu, Wrench, Gamepad2, Layers, ExternalLink, FileText, Sparkles, ChevronRight, Award, X, Github } from 'lucide-react';

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
  liveUrl?: string;
  githubUrl?: string;
}

const liveProjectsData: ProjectItem[] = [
  {
    id: "syncpulse",
    title: "SyncPulse",
    tagline: "Real-Time Synchronized Spatial Audio Network",
    type: "Real-Time Web / Audio DSP",
    desc: "Multi-device real-time audio synchronization using Cristian's NTP algorithm (±5ms accuracy), 8D spatial binaural soundstage, and 3D WebGL frequency visualizer.",
    tags: ["Node.js", "Web Audio API", "Three.js", "WebSockets", "NTP Sync"],
    liveUrl: "https://syncpulse-1igt.onrender.com",
    githubUrl: "https://github.com/Ratnesh919/SyncPulse"
  },
  {
    id: "mediflow",
    title: "MediFlow",
    tagline: "Hospital Queue & ML Wait-Time Forecasting",
    type: "Healthcare / Machine Learning",
    desc: "Outpatient queue platform combining Random Forest ML wait-time forecasting, real-time WebSocket token broadcasts, emergency triage preemption, and executive analytics.",
    tags: ["FastAPI", "React 18", "TypeScript", "PostgreSQL", "Scikit-Learn"],
    liveUrl: "https://github.com/Ratnesh919/Medi_Flow",
    githubUrl: "https://github.com/Ratnesh919/Medi_Flow"
  },
  {
    id: "shopkart",
    title: "ShopKart",
    tagline: "Modern E-Commerce Shopping Platform",
    type: "E-Commerce / Full-Stack",
    desc: "Full-featured online shopping platform featuring dynamic product catalog, category filters, responsive cart management, and seamless modern design.",
    tags: ["React", "JavaScript", "REST APIs", "CSS3", "Netlify"],
    liveUrl: "https://shopkart919.netlify.app",
    githubUrl: "https://github.com/Ratnesh919/Shop_Kart-"
  },
  {
    id: "pak-converter",
    title: "PAK Video Converter",
    tagline: "Pro-Grade Android Media Extractor & Transcoder",
    type: "Android / Hardware Transcoding",
    desc: "Modern Android application using low-latency MediaCodec & MediaMuxer hardware pipelines to extract, transcode, and play video game assets, dashcam archives, and raw stream payloads.",
    tags: ["Kotlin", "Jetpack Compose", "MediaCodec", "Room SQLite", "Gemini Vision"],
    githubUrl: "https://github.com/Ratnesh919/PAK_Video_Converter_Android_App"
  },
  {
    id: "jobpilot",
    title: "JobPilot AI",
    tagline: "Autonomous AI Job Search & Application Automation",
    type: "AI Workflows / Automation",
    desc: "Production n8n automation matched with Google Gemini to discover jobs, evaluate fit against resumes, generate tailored applications, and track dispatches.",
    tags: ["n8n", "Google Gemini API", "Webhooks", "TypeScript"],
    liveUrl: "https://ratnesh919.app.n8n.cloud",
    githubUrl: "https://github.com/Ratnesh919/Job_Pilot-AI"
  },
  {
    id: "bmw-m3",
    title: "BMW M3 GTR 3D",
    tagline: "Interactive WebGL 3D Automotive Showcase",
    type: "3D Graphics / WebGL",
    desc: "Interactive 3D vehicle showcase with real-time lighting, reflection environment maps, orbit inspection controls, and GLSL shaders in Three.js.",
    tags: ["Three.js", "WebGL", "GLSL", "JavaScript"],
    githubUrl: "https://github.com/Ratnesh919/BMW-M3-GTR"
  },
  {
    id: "smart-antenna",
    title: "Smart Antenna (V2X)",
    tagline: "Low-Profile Monopole Antenna for Vehicular Communications",
    type: "ECE Hardware / Simulation",
    desc: "Designed and simulated a dielectric-loaded capacitive monopole antenna in Ansys HFSS. Achieved 74% size reduction at 535.57 MHz with -31.87 dB return loss and 98.34% efficiency.",
    tags: ["Ansys HFSS", "VNA Testing", "Dielectric Sleeve", "V2X Comms"]
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Portfolio() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#ffffff_0%,#f4f5f8_100%)] text-[#1f2937] selection:bg-[#5438dc]/20 font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#5438dc]/5 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-0 -right-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-500/5 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '13s', animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-8 md:px-12">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-12 h-[70px] w-full rounded-full border border-black/5 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="flex h-full items-center justify-between px-8 text-sm font-semibold tracking-widest text-[#4b5563]">
            <a href="#home" className="text-base font-extrabold text-[#111827] tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5438dc]"></span>
              RATNESH
            </a>

            <div className="hidden md:flex items-center gap-10">
              {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#5438dc] hover:scale-105 transition-all duration-300">
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsProjectsModalOpen(true)}
              className="py-2 px-5 rounded-full bg-[#5438dc] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#432bb5] transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={14} /> Explore Work
            </button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section 
          id="home" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-32 flex w-full items-center justify-center rounded-[40px] border border-black/5 bg-[#e5e7eb] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden group hover:cursor-crosshair"
        >
          {/* STITCH HERO IMAGE */}
          <img 
            src="./stitch-screen2.png" 
            alt="Ratnesh Portrait" 
            className="w-full h-auto object-contain pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          />
          
          {/* Light edge rim shadow for depth */}
          <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_0_30px_rgba(0,0,0,0.03)] pointer-events-none" />
        </motion.section>

        {/* About Info Section */}
        <motion.section 
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div className="flex flex-col justify-center">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#5438dc]/20 bg-[#5438dc]/5 text-[#5438dc] w-fit mb-6 shadow-sm">
              <Sparkles size={16} />
              <span className="text-sm font-bold tracking-wider uppercase">About Me</span>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8 text-[#111827]">
              ECE Student <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5438dc] to-[#2563eb]">
                &amp; Builder.
              </span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg lg:text-xl text-[#4b5563] leading-relaxed mb-8 max-w-xl font-medium">
              Electronics and Communication Engineering student based in Kolkata. I build embedded hardware, RF antenna designs, and full-stack web software with a focus on practical, working tools.
            </motion.p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => setIsProjectsModalOpen(true)}
                className="py-3 px-8 rounded-full bg-gradient-to-r from-[#5438dc] to-[#2563eb] text-white font-bold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} /> Explore My Work
              </button>
              <a
                href="#projects"
                className="py-3 px-8 rounded-full border border-black/10 bg-white text-[#111827] font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition-all shadow-sm"
              >
                View Projects
              </a>
            </div>

            {/* Contact Card */}
            <motion.div variants={fadeIn} className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_50px_rgba(84,56,220,0.08)] transition-all duration-300 flex flex-col gap-6">
              
              <div className="flex gap-4">
                <a href="mailto:kumarsinghratnesh3@gmail.com" className="w-12 h-12 rounded-full bg-[#f4f5f8] flex items-center justify-center text-[#5438dc] hover:bg-[#5438dc] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
                <a href="https://github.com/Ratnesh919" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#f4f5f8] flex items-center justify-center text-[#1f2937] hover:bg-[#1f2937] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="https://www.instagram.com/ratnesh.199?igsh=MXF3aDd0eWRhaGhiaA==" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#f4f5f8] flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/ratnesh-kumar-singh-16749325b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#f4f5f8] flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1De11Vypsn/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#f4f5f8] flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-4">
                <MapPin className="text-[#5438dc]" /> <span className="text-[#1f2937] font-medium">Kolkata, India</span>
                <GraduationCap className="text-[#5438dc]" /> <span className="text-[#1f2937] font-medium">B.Tech ECE - 2026</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="relative h-full min-h-[400px]">
            <div className="absolute inset-0 rounded-[40px] border border-black/5 bg-white p-10 flex flex-col justify-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_50px_rgba(84,56,220,0.06)] transition-all overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5438dc]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
              
              <h3 className="relative z-10 text-3xl font-extrabold mb-8 text-[#111827]">Special Interests</h3>
              <ul className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg font-medium">
                {[
                  { name: 'Embedded Systems', icon: Cpu },
                  { name: 'UX/UI Design', icon: Layers },
                  { name: 'Digital Electronics', icon: Code2 },
                  { name: 'Machine Learning', icon: Gamepad2 },
                  { name: 'Artificial Intelligence', icon: Sparkles },
                  { name: 'Electric Vehicles', icon: Wrench },
                ].map((interest, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#4b5563] group">
                    <div className="p-2 rounded-xl bg-[#f4f5f8] border border-black/5 group-hover:border-[#5438dc]/30 group-hover:bg-[#5438dc]/5 transition-colors shadow-sm">
                      <interest.icon size={22} className="text-[#5438dc]" />
                    </div>
                    <span className="group-hover:text-[#111827] transition-colors">{interest.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Details & Education Section */}
        <motion.section 
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-black/5 pb-6">
            <h2 className="text-4xl md:text-5xl font-black text-[#111827]">Details & Education</h2>
            <p className="text-[#6b7280] mt-4 md:mt-0 font-medium flex items-center gap-2"><FileText size={18}/> From CV (privacy-safe)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div variants={fadeIn} className="group rounded-[30px] border border-black/5 bg-white p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#5438dc]/20 transition-all duration-300">
              <h3 className="text-2xl font-extrabold mb-6 text-[#111827]">Profile Details</h3>
              <div className="space-y-4 text-[#4b5563] font-medium">
                <p className="flex justify-between border-b border-black/5 pb-3"><span>Name</span> <span className="text-[#111827] font-semibold">Ratnesh Kumar Singh</span></p>
                <p className="flex justify-between border-b border-black/5 pb-3"><span>Department</span> <span className="text-right text-[#111827] font-semibold">Electronics & Communication</span></p>
                <p className="flex justify-between border-b border-black/5 pb-3"><span>Languages</span> <span className="text-right text-[#111827] font-semibold">English, Hindi, Bengali</span></p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="group rounded-[30px] border border-black/5 bg-gradient-to-br from-[#ffffff] to-[#f8f9fa] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#2563eb]/20 transition-all duration-300 relative overflow-hidden">
              <h3 className="text-2xl font-extrabold mb-6 text-[#2563eb]">Workshops & Training</h3>
              <ul className="space-y-4 text-[#4b5563] font-medium relative z-10">
                {['Python course (1 month)', 'C language course (1 month)', 'EV Service Technician (1 month)', 'GIS training (2 weeks)', 'HAM Radio Innovation Workshop (2025)', 'Cyber Awareness Workshop (2025)', 'BSNL Telecom Industrial Visit (2025)'].map((cert, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <ChevronRight size={18} className="text-[#2563eb]" /> {cert}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Licenses & Certifications Grid */}
          <motion.div variants={fadeIn} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-extrabold text-[#111827] flex items-center gap-2">
                <Award className="text-[#5438dc]" size={24} /> Licenses &amp; Certifications
              </h3>
              <span className="text-sm font-semibold text-[#5438dc] hidden sm:inline">Verified Udemy Credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-3xl border border-black/5 bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#5438dc]/30 transition-all duration-300 flex flex-col group"
                >
                  <div
                    className="relative aspect-[4/3] bg-[#f4f5f8] overflow-hidden cursor-pointer"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-bold text-white uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
                        Preview
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5438dc] bg-[#5438dc]/10 px-2.5 py-0.5 rounded-full">
                        {cert.issuer}
                      </span>
                      <span className="text-xs text-[#6b7280] font-medium">
                        {cert.date}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#111827] leading-snug mb-2 group-hover:text-[#5438dc] transition-colors">
                      {cert.title}
                    </h4>

                    <p className="text-xs text-[#6b7280] mb-2 font-medium">
                      By {cert.instructor}
                    </p>

                    <p className="text-[10px] font-mono text-[#9ca3af] break-all mb-4 mt-auto">
                      ID: {cert.certId}
                    </p>

                    <div className="flex gap-2 pt-3 border-t border-black/5">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#f4f5f8] hover:bg-[#e5e7eb] text-[#1f2937] text-xs font-bold transition-colors"
                      >
                        Preview
                      </button>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-[#5438dc]/10 hover:bg-[#5438dc] hover:text-white text-[#5438dc] text-xs font-bold transition-colors flex items-center justify-center border border-[#5438dc]/20"
                      >
                        Verify ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Cards */}
          <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { level: '10th Standard', inst: 'Vidyanjali High School', board: 'I.G.C.S.E', year: '2018', spec: 'Science' },
              { level: '12th Standard', inst: 'P.B.S College', board: 'B.S.E.B', year: '2020', spec: 'Science (P.C.M.)' },
              { level: 'B.Tech', inst: 'Swami Vivekananda Institute', board: 'M.A.K.A.U.T.', year: '2026', spec: 'Electronics & Comm.' }
            ].map((edu, i) => (
              <div key={i} className="rounded-2xl border border-black/5 bg-white p-7 flex flex-col items-start hover:border-[#5438dc]/30 hover:shadow-lg transition-all shadow-sm">
                <span className="text-xs font-bold text-[#5438dc] mb-3 tracking-widest uppercase bg-[#5438dc]/5 px-3 py-1 rounded-full">{edu.level} &bull; {edu.year}</span>
                <h4 className="text-xl font-extrabold text-[#111827] mb-2 leading-tight">{edu.inst}</h4>
                <p className="text-sm font-medium text-[#6b7280] mb-5">{edu.board}</p>
                <span className="mt-auto inline-block rounded-lg border border-black/5 bg-[#f4f5f8] px-3 py-1.5 text-sm font-semibold text-[#4b5563]">{edu.spec}</span>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Featured Live Projects Section */}
        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#5438dc]/20 bg-[#5438dc]/5 text-[#5438dc] w-fit mb-4 shadow-sm">
                <Sparkles size={16} />
                <span className="text-sm font-bold tracking-wider uppercase">Portfolio</span>
              </motion.div>
              <motion.h3 variants={fadeIn} className="text-4xl lg:text-5xl font-black text-[#111827]">
                Featured Live Projects
              </motion.h3>
            </div>

            <button
              onClick={() => setIsProjectsModalOpen(true)}
              className="py-3 px-8 rounded-full bg-[#5438dc] hover:bg-[#432bb5] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Sparkles size={14} /> Explore All Projects ↗
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveProjectsData.slice(0, 6).map((proj) => (
              <motion.div 
                key={proj.id}
                variants={fadeIn}
                className="rounded-3xl border border-black/5 bg-white p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#5438dc]/20 transition-all"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5438dc] bg-[#5438dc]/10 px-2.5 py-1 rounded-full inline-block mb-3">
                    {proj.type}
                  </span>
                  <h4 className="text-xl font-bold text-[#111827]">{proj.title}</h4>
                  <p className="text-xs font-semibold text-[#2563eb] mt-1">{proj.tagline}</p>
                  <p className="text-sm text-[#4b5563] mt-3 leading-relaxed font-normal">{proj.desc}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-[#6b7280] bg-[#f4f5f8] px-2.5 py-1 rounded-full border border-black/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 flex gap-2">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#5438dc] hover:bg-[#432bb5] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-[#f4f5f8] hover:bg-[#e5e7eb] text-[#111827] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-black/5"
                    >
                      <Github size={14} /> Repo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsProjectsModalOpen(true)}
              className="py-3.5 px-10 rounded-full bg-gradient-to-r from-[#5438dc] via-[#2563eb] to-[#00b4d8] text-white font-extrabold text-sm uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer"
            >
              ✨ View Complete Project Directory & Source Code
            </button>
          </div>
        </motion.section>

        {/* Skills & Experience */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          <motion.div variants={fadeIn} className="rounded-[40px] border border-black/5 bg-white p-10 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <h3 className="text-3xl font-extrabold mb-8 text-[#111827] flex items-center gap-3"><Code2 className="text-[#2563eb]"/> Technical Skills</h3>
            <div className="space-y-7">
              <div>
                <p className="text-[#6b7280] text-sm font-bold tracking-wider uppercase mb-1">Networking & IT</p>
                <p className="text-base font-bold text-[#1f2937]">TCP/IP, DNS, Routing & Switching, Cyber Security</p>
              </div>
              <div>
                <p className="text-[#6b7280] text-sm font-bold tracking-wider uppercase mb-1">Programming</p>
                <p className="text-base font-bold text-[#1f2937]">C, C++, Python, HTML, CSS, JavaScript, API Integration</p>
              </div>
              <div>
                <p className="text-[#6b7280] text-sm font-bold tracking-wider uppercase mb-1">AI & Automation</p>
                <p className="text-base font-bold text-[#1f2937]">n8n, Google AI Studio, OpenAI API, Gemini Vision</p>
              </div>
              <div>
                <p className="text-[#6b7280] text-sm font-bold tracking-wider uppercase mb-1">Embedded & Engineering</p>
                <p className="text-base font-bold text-[#1f2937]">Arduino IDE, MATLAB, Tinkercad, Verilog, Ansys HFSS Simulation</p>
              </div>
              <div>
                <p className="text-[#6b7280] text-sm font-bold tracking-wider uppercase mb-1">UI/UX & Design</p>
                <p className="text-base font-bold text-[#1f2937]">Figma, Wireframing, Prototyping, Canva</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="rounded-[40px] border border-black/5 bg-gradient-to-br from-white to-[#f4f5f8] p-10 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <h3 className="text-3xl font-extrabold mb-8 text-[#111827] flex items-center gap-3"><Cpu className="text-[#5438dc]"/> Engineering Highlights</h3>
            <ul className="space-y-4">
              {[
                'Smart Antenna for Vehicular Applications (74% size reduction, HFSS, 535.57 MHz)',
                'SyncPulse Multi-Device Spatial Audio Network (±5ms NTP sync)',
                'MediFlow Outpatient Wait-Time Forecasting & Triage',
                'PAK Video Converter Android Media Transcoder',
                'JobPilot Autonomous AI Application Agent',
                'HAM Radio workshop (4 Mar 2025)',
                'BSNL industrial visit (24 Apr 2025)'
              ].map((proj, i) => (
                <li key={i} className="flex gap-4 p-5 rounded-2xl bg-white border border-black/5 hover:border-[#5438dc]/30 hover:shadow-md transition-all">
                  <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#5438dc] shrink-0" />
                  <span className="text-[#1f2937] font-semibold">{proj}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="py-10 border-t border-black/10 text-center text-[#6b7280] font-medium text-sm">
          <p>&copy; {new Date().getFullYear()} Ratnesh Kumar Singh. Built with modern web tech.</p>
        </footer>
      </main>

      {/* Lightbox Modal for Certificate */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative rounded-[28px] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden bg-white shadow-2xl border border-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-[#1f2937] flex items-center justify-center font-bold text-sm transition-colors"
            >
              ✕
            </button>

            <div className="p-6 border-b border-black/5 pr-16 bg-[#fafafa]">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5438dc] bg-[#5438dc]/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
                {selectedCert.issuer}
              </span>
              <h3 className="text-xl sm:text-2xl text-[#111827] font-extrabold">
                {selectedCert.title}
              </h3>
              <p className="text-xs text-[#6b7280] mt-1 font-medium">
                Issued {selectedCert.date} &bull; ID: {selectedCert.certId}
              </p>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-[#f4f5f8]">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-lg border border-black/5"
              />
            </div>

            <div className="p-4 sm:p-6 border-t border-black/5 flex justify-between items-center bg-white">
              <span className="text-xs text-[#6b7280] font-medium hidden sm:inline">
                Verified Udemy Credential
              </span>
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-6 rounded-full bg-[#5438dc] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#432bb5] transition-colors"
              >
                Verify on Udemy ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Explore My Work / Live Projects Modal */}
      {isProjectsModalOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsProjectsModalOpen(false)}
        >
          <div
            className="relative rounded-[28px] max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden bg-white shadow-2xl border border-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5 pr-16 bg-[#fafafa] flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5438dc] bg-[#5438dc]/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  PROJECT DIRECTORY
                </span>
                <h3 className="text-2xl sm:text-3xl text-[#111827] font-black">
                  Explore My <span className="text-[#5438dc]">Work</span>
                </h3>
                <p className="text-xs text-[#6b7280] mt-1 font-medium">
                  Direct access to deployed applications, AI workflows, and hardware projects.
                </p>
              </div>

              <button
                onClick={() => setIsProjectsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-[#1f2937] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content List */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f8f9fa]">
              {liveProjectsData.map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-2xl bg-white border border-black/5 hover:border-[#5438dc]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5438dc] bg-[#5438dc]/10 px-2 py-0.5 rounded-full">
                        {project.type}
                      </span>
                    </div>

                    <h4 className="text-xl font-extrabold text-[#111827]">{project.title}</h4>
                    <p className="text-xs font-semibold text-[#2563eb] mt-1">{project.tagline}</p>
                    <p className="text-xs text-[#4b5563] mt-2 leading-relaxed">{project.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium text-[#6b7280] bg-[#f4f5f8] px-2.5 py-0.5 rounded-full border border-black/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/5 flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 rounded-xl bg-[#5438dc] hover:bg-[#432bb5] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4 rounded-xl bg-[#f4f5f8] hover:bg-[#e5e7eb] text-[#111827] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-black/5 transition-colors"
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
