import { useState } from 'react';
import { ExternalLink, Code2, X, Sparkles } from 'lucide-react';

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
  description: string;
  category: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  video?: string;
}

const liveProjectsData: ProjectItem[] = [
  {
    id: "syncpulse",
    title: "SYNCPULSE",
    tagline: "Synchronized Spatial Audio Network",
    description: "Multi-device real-time audio sync using Cristian's NTP algorithm (±5ms accuracy), 8D binaural 360° soundstage, and 3D WebGL atmosphere visualizer.",
    category: "REAL-TIME WEB & AUDIO DSP",
    tech: ["Node.js", "Web Audio API", "Three.js", "WebSockets", "NTP Sync"],
    liveUrl: "https://syncpulse-1igt.onrender.com",
    githubUrl: "https://github.com/Ratnesh919/SyncPulse",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4"
  },
  {
    id: "mediflow",
    title: "MEDIFLOW",
    tagline: "Smart Hospital Queue & ML Wait-Time Forecasting",
    description: "Enterprise outpatient queue platform combining Random Forest ML wait-time forecasting, real-time WebSocket token broadcasts, emergency triage preemption, and executive analytics.",
    category: "FULL-STACK & MACHINE LEARNING",
    tech: ["FastAPI", "React 18", "TypeScript", "PostgreSQL", "Scikit-Learn", "WebSockets"],
    liveUrl: "https://github.com/Ratnesh919/Medi_Flow",
    githubUrl: "https://github.com/Ratnesh919/Medi_Flow",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4"
  },
  {
    id: "shopkart",
    title: "SHOPKART",
    tagline: "Modern E-Commerce Web Application",
    description: "Full-featured online shopping platform featuring dynamic product catalog, category filters, responsive cart management, and seamless modern design.",
    category: "E-COMMERCE & FRONTEND",
    tech: ["React", "JavaScript", "REST APIs", "CSS3", "Netlify"],
    liveUrl: "https://shopkart919.netlify.app",
    githubUrl: "https://github.com/Ratnesh919/Shop_Kart-",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4"
  },
  {
    id: "pak-converter",
    title: "PAK VIDEO CONVERTER",
    tagline: "Pro-Grade Android Media Extractor & Transcoder",
    description: "Modern Android application using low-latency MediaCodec & MediaMuxer hardware pipelines to extract, transcode, and play video game assets, dashcam archives, and raw stream payloads.",
    category: "ANDROID & HARDWARE TRANSCODING",
    tech: ["Kotlin", "Jetpack Compose", "MediaCodec", "Room SQLite", "Gemini Vision"],
    githubUrl: "https://github.com/Ratnesh919/PAK_Video_Converter_Android_App",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4"
  },
  {
    id: "jobpilot",
    title: "JOBPILOT AI",
    tagline: "Autonomous AI Job Search & Application Automation",
    description: "Production n8n automation matched with Google Gemini to discover jobs, evaluate fit against resumes, generate tailored applications, and track dispatches.",
    category: "AI WORKFLOWS & AUTOMATION",
    tech: ["n8n", "Google Gemini API", "Webhooks", "TypeScript"],
    liveUrl: "https://ratnesh919.app.n8n.cloud",
    githubUrl: "https://github.com/Ratnesh919/Job_Pilot-AI",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4"
  },
  {
    id: "bmw-m3",
    title: "BMW M3 GTR 3D VISUALIZER",
    tagline: "Interactive WebGL 3D Automotive Experience",
    description: "Interactive 3D vehicle showcase with real-time lighting, reflection environment maps, orbit inspection controls, and GLSL shaders in Three.js.",
    category: "3D GRAPHICS & WEBGL",
    tech: ["Three.js", "WebGL", "GLSL", "JavaScript"],
    githubUrl: "https://github.com/Ratnesh919/BMW-M3-GTR",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4"
  },
  {
    id: "smart-antenna",
    title: "SMART ANTENNA (V2X)",
    tagline: "Low-Profile Monopole Antenna for Vehicular Communications",
    description: "Designed and simulated a dielectric-loaded capacitive monopole antenna in Ansys HFSS. Achieved 74% size reduction at 535.57 MHz with -31.87 dB return loss and 98.34% efficiency.",
    category: "ECE HARDWARE & SIMULATION",
    tech: ["Ansys HFSS", "VNA Testing", "Dielectric Sleeve", "V2X Comms"],
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4"
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

function App() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#010828] text-cream overflow-x-hidden selection:bg-neon selection:text-[#010828]">
      {/* GLOBAL TEXTURE OVERLAY */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none mix-blend-lighten opacity-60 bg-cover bg-center"
        style={{ backgroundImage: 'url(/texture.png)' }}
      ></div>

      {/* SECTION 1: HERO */}
      <section className="relative w-full h-[100vh] min-h-[600px] overflow-hidden rounded-b-[32px]">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay gradient to ensure text readability if needed */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

        <div className="relative w-full h-full max-w-[1831px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center w-full">
            <div className="font-grotesk text-[16px] uppercase tracking-widest leading-none mt-1">
              RATNESH.PORTFOLIO
            </div>

            {/* Navbar (Hidden on mobile) */}
            <nav className="hidden lg:flex items-center space-x-12 liquid-glass rounded-[28px] px-[52px] py-[24px]">
              {['About', 'Education', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="font-grotesk text-[13px] uppercase tracking-wider hover:text-neon transition-colors duration-300 leading-none mt-1"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Explore My Work Top Button */}
            <button 
              onClick={() => setIsProjectsModalOpen(true)}
              className="py-2.5 px-6 rounded-full bg-neon text-[#010828] font-grotesk text-xs uppercase tracking-wider font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_25px_rgba(0,255,255,0.4)]"
            >
              <Sparkles size={14} /> EXPLORE WORK
            </button>
            
            {/* Desktop Socials Removed */}
          </header>

          {/* Hero Content */}
          <div className="flex-grow flex flex-col justify-center pb-20">
            <div className="relative lg:ml-32 max-w-[780px]">
              <h1 className="font-grotesk text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] uppercase leading-[1.05] sm:leading-[1] relative z-10 break-words">
                ELECTRONICS & COMMUNICATION
                <br />
                ENGINEERING STUDENT
              </h1>
              
              <div className="absolute top-[-10%] right-[-5%] sm:top-[-5%] sm:right-[-10%] md:right-0 lg:right-[-20%]">
                <span className="font-condiment text-neon text-[24px] sm:text-[36px] md:text-[42px] lg:text-[48px] mix-blend-exclusion opacity-90 block -rotate-1 transform">
                  Portfolio
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsProjectsModalOpen(true)}
                  className="py-3 px-8 rounded-full bg-gradient-to-r from-neon to-[#00c8ff] text-[#010828] font-grotesk text-sm uppercase tracking-wider font-extrabold hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,255,255,0.4)] flex items-center gap-2"
                >
                  <Sparkles size={16} /> Explore My Work
                </button>
                <a
                  href="#projects"
                  className="py-3 px-8 rounded-full liquid-glass border border-white/20 text-cream font-grotesk text-sm uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                  Featured Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT / INTRO */}
      <section id="about" className="relative w-full min-h-[60vh] py-[64px] lg:py-[96px] overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        <div className="relative w-full h-full max-w-[1831px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-between">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0 lg:mb-32">
            
            {/* Left Heading */}
            <div className="relative">
              <h2 className="font-grotesk text-[32px] sm:text-[48px] lg:text-[60px] uppercase leading-none z-10 relative">
                HELLO!
                <br />
                I'M RATNESH
              </h2>
              <span className="font-condiment text-neon text-[36px] sm:text-[52px] lg:text-[68px] mix-blend-exclusion absolute bottom-[-15%] right-[-20%] sm:right-[-40%] lg:-right-32 -rotate-1">
                Ratnesh
              </span>
            </div>

            {/* Right paragraph */}
            <p className="font-mono text-[14px] lg:text-[16px] uppercase max-w-[280px] leading-relaxed text-cream mt-8 lg:mt-0">
              ECE STUDENT BUILDING EMBEDDED HARDWARE, RF ANTENNAS, AND CLEAN FULL-STACK WEB SOFTWARE.
            </p>
          </div>


        </div>
      </section>

      {/* SECTION: EDUCATION & TRAINING */}
      <section id="education" className="relative w-full bg-[#010828] py-[60px] lg:py-[80px]">
        <div className="relative w-full max-w-[1831px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col">
          <div className="mb-12">
            <h2 className="font-grotesk text-[32px] sm:text-[48px] lg:text-[60px] uppercase leading-none">
              EDUCATION &
              <br />
              <span className="block ml-12 sm:ml-24 lg:ml-32 mt-2 md:mt-4">
                <span className="font-condiment text-neon normal-case mix-blend-exclusion">Lifelong </span>
                LEARNING
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="liquid-glass rounded-[32px] p-[24px] lg:p-[40px] hover:bg-white/10 transition duration-300">
              <h3 className="font-grotesk text-[24px] sm:text-[32px] text-neon mb-6">ACADEMIC BACKGROUND</h3>
              <div className="flex flex-col gap-6 font-mono text-[14px] sm:text-[16px] uppercase">
                <div className="pb-6 border-b border-white/10">
                  <div className="text-cream/60 mb-2">2026 - B.TECH ECE</div>
                  <div className="text-cream">SWAMI VIVEKANANDA INST. OF SCIENCE & TECH (M.A.K.A.U.T.)</div>
                </div>
                <div className="pb-6 border-b border-white/10">
                  <div className="text-cream/60 mb-2">2020 - 12TH STANDARD (SCIENCE P.C.M)</div>
                  <div className="text-cream">P.B.S COLLEGE (B.S.E.B)</div>
                </div>
                <div>
                  <div className="text-cream/60 mb-2">2018 - 10TH STANDARD (SCIENCE)</div>
                  <div className="text-cream">VIDYANJALI HIGH SCHOOL (I.G.C.S.E)</div>
                </div>
              </div>
            </div>

            <div className="liquid-glass rounded-[32px] p-[24px] lg:p-[40px] hover:bg-white/10 transition duration-300">
              <h3 className="font-grotesk text-[24px] sm:text-[32px] text-neon mb-6">TRAINING & COURSES</h3>
              <ul className="flex flex-col gap-4 font-mono text-[14px] sm:text-[16px] uppercase list-disc list-inside text-cream">
                <li className="leading-relaxed">PYTHON COURSE (1 MONTH)</li>
                <li className="leading-relaxed">C LANGUAGE COURSE (1 MONTH)</li>
                <li className="leading-relaxed">ELECTRIC VEHICLE SERVICE TECHNICIAN (1 MONTH)</li>
                <li className="leading-relaxed">GIS TRAINING (2 WEEKS)</li>
                <li className="leading-relaxed mt-4 list-none text-neon">EXTRACURRICULARS:</li>
                <li className="leading-relaxed text-[12px] sm:text-[14px]">WORKSHOP - HAM RADIO INNOVATION & AWARENESS</li>
                <li className="leading-relaxed text-[12px] sm:text-[14px]">WORKSHOP - CYBER SECURITY AWARENESS</li>
                <li className="leading-relaxed text-[12px] sm:text-[14px]">INDUSTRIAL VISIT - BSNL TELECOM</li>
              </ul>
            </div>
          </div>

          {/* LICENSES & CERTIFICATIONS */}
          <div className="mt-12">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-grotesk text-[22px] sm:text-[28px] uppercase tracking-wider text-neon">
                LICENSES & CERTIFICATIONS
              </h3>
              <div className="h-px flex-grow bg-white/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  className="liquid-glass rounded-[24px] overflow-hidden flex flex-col border border-white/10 hover:border-neon/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden bg-black/40 cursor-pointer"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-neon px-3 py-1.5 rounded-full border border-neon/50 bg-black/60 backdrop-blur-md">
                        Preview
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[10px] text-neon uppercase tracking-widest px-2 py-0.5 rounded bg-neon/10 border border-neon/30">
                        {cert.issuer}
                      </span>
                      <span className="font-mono text-[11px] text-cream/50">
                        {cert.date}
                      </span>
                    </div>

                    <h4 className="font-grotesk text-[15px] sm:text-[16px] text-cream font-bold leading-snug mt-1 mb-2 group-hover:text-neon transition-colors">
                      {cert.title}
                    </h4>

                    <p className="font-mono text-[11px] text-cream/60 uppercase mb-2">
                      By {cert.instructor}
                    </p>

                    <p className="font-mono text-[10px] text-cream/30 break-all mb-4 mt-auto">
                      ID: {cert.certId}
                    </p>

                    <div className="flex gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 text-cream font-mono text-[11px] uppercase tracking-wider transition-colors"
                      >
                        View Full
                      </button>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-neon/10 hover:bg-neon/25 text-neon font-mono text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center border border-neon/30"
                      >
                        Verify ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SKILLS */}
      <section id="skills" className="relative w-full bg-[#010828] py-[60px] lg:py-[80px]">
        <div className="relative w-full max-w-[1831px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col">
          <div className="mb-12">
            <h2 className="font-grotesk text-[32px] sm:text-[48px] lg:text-[60px] uppercase leading-none">
              TECHNICAL
              <br />
              <span className="block ml-12 sm:ml-24 lg:ml-32 mt-2 md:mt-4">
                <span className="font-condiment text-neon normal-case mix-blend-exclusion">Core </span>
                SKILLS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="liquid-glass rounded-[32px] p-[32px] hover:bg-white/10 transition duration-300">
              <h3 className="font-grotesk text-[20px] text-neon mb-4">NETWORKING & IT</h3>
              <div className="font-mono text-[14px] uppercase text-cream leading-relaxed flex flex-col gap-2">
                <span>TCP/IP</span>
                <span>DNS</span>
                <span>ROUTING & SWITCHING</span>
                <span>CYBER SECURITY</span>
              </div>
            </div>

            <div className="liquid-glass rounded-[32px] p-[32px] hover:bg-white/10 transition duration-300">
              <h3 className="font-grotesk text-[20px] text-neon mb-4">PROGRAMMING</h3>
              <div className="font-mono text-[14px] uppercase text-cream leading-relaxed flex flex-col gap-2">
                <span>C, C++</span>
                <span>PYTHON</span>
                <span>HTML, CSS</span>
                <span>API INTEGRATION</span>
              </div>
            </div>

            <div className="liquid-glass rounded-[32px] p-[32px] hover:bg-white/10 transition duration-300">
              <h3 className="font-grotesk text-[20px] text-neon mb-4">AI & AUTOMATION</h3>
              <div className="font-mono text-[14px] uppercase text-cream leading-relaxed flex flex-col gap-2">
                <span>n8n</span>
                <span>GOOGLE AI STUDIO</span>
                <span>OPENAI</span>
                <span>AI AGENTS</span>
              </div>
            </div>

            <div className="liquid-glass rounded-[32px] p-[32px] hover:bg-white/10 transition duration-300">
              <h3 className="font-grotesk text-[20px] text-neon mb-4">EMBEDDED & ENG.</h3>
              <div className="font-mono text-[14px] uppercase text-cream leading-relaxed flex flex-wrap gap-x-4 gap-y-2">
                <span>ARDUINO</span> <span>MATLAB</span> <span>TINKERCAD</span>
                <span>VERILOG</span> <span>ARCGIS</span> <span>HFSS SIMULATION</span>
              </div>
            </div>

            <div className="liquid-glass rounded-[32px] p-[32px] hover:bg-white/10 transition duration-300">
              <h3 className="font-grotesk text-[20px] text-neon mb-4">UI/UX & DESIGN</h3>
              <div className="font-mono text-[14px] uppercase text-cream leading-relaxed flex flex-col gap-2">
                <span>FIGMA</span>
                <span>WIREFRAMING</span>
                <span>PROTOTYPING</span>
                <span>CANVA</span>
              </div>
            </div>
            
            <div className="liquid-glass rounded-[32px] p-[32px] hover:bg-white/10 transition duration-300">
               <h3 className="font-grotesk text-[20px] text-neon mb-4">CORE STRENGTHS</h3>
               <div className="font-mono text-[14px] uppercase text-cream leading-relaxed flex flex-col gap-2">
                 <span>CIRCUIT PROTOTYPING</span>
                 <span>HARDWARE & CODE DEBUGGING</span>
                 <span>SELF-DIRECTED LEARNING</span>
                 <span>TECHNICAL DOCUMENTATION</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: NFT COLLECTION GRID */}
      <section id="projects" className="relative w-full bg-[#010828] py-[80px] lg:py-[120px]">
        <div className="relative w-full max-w-[1831px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-12 md:gap-0">
            <div>
              <h2 className="font-grotesk text-[32px] sm:text-[48px] lg:text-[60px] uppercase leading-none">
                MY RECENT
                <br />
                <span className="block ml-12 sm:ml-24 lg:ml-32 mt-2 md:mt-4">
                  <span className="font-condiment text-neon normal-case mix-blend-exclusion">Featured </span>
                  PROJECTS
                </span>
              </h2>
            </div>
            
            <button 
              onClick={() => setIsProjectsModalOpen(true)}
              className="group relative flex flex-col items-end hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="flex items-baseline gap-3 md:gap-4">
                <span className="font-grotesk text-[32px] sm:text-[48px] lg:text-[60px] uppercase leading-none">SEE</span>
                <div className="flex flex-col items-start leading-none gap-1 sm:gap-2">
                  <span className="font-grotesk text-[20px] sm:text-[28px] lg:text-[36px] uppercase block tracking-wide text-neon">ALL</span>
                  <span className="font-grotesk text-[20px] sm:text-[28px] lg:text-[36px] uppercase block tracking-wide">PROJECTS</span>
                </div>
              </div>
              <div className="w-full bg-neon h-[6px] md:h-[10px] mt-2 group-hover:scale-y-110 transition-transform origin-top"></div>
            </button>
          </div>

          {/* NFT Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveProjectsData.slice(0, 6).map((proj) => (
              <div key={proj.id} className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition duration-300 flex flex-col justify-between">
                <div>
                  <div className="relative w-full pb-[85%] rounded-[24px] overflow-hidden bg-black/50">
                    {proj.video && (
                      <video 
                        autoPlay loop muted playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={proj.video} type="video/mp4" />
                      </video>
                    )}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-neon font-mono text-[10px] uppercase">
                      {proj.category}
                    </div>
                  </div>

                  <div className="mt-4 px-2">
                    <h3 className="font-grotesk text-[20px] tracking-wide uppercase text-white font-bold">{proj.title}</h3>
                    <p className="font-mono text-[11px] text-cream/70 mt-1 uppercase">{proj.tagline}</p>
                    <p className="font-mono text-[12px] text-cream/50 mt-2 line-clamp-2 leading-relaxed">{proj.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.tech.slice(0, 4).map((t, idx) => (
                        <span key={idx} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cream/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex gap-2">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-neon text-[#010828] font-grotesk text-xs uppercase font-extrabold flex items-center justify-center gap-1.5 hover:scale-105 transition-transform"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-grotesk text-xs uppercase font-bold flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
                    >
                      <Code2 size={14} /> Repo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsProjectsModalOpen(true)}
              className="py-3.5 px-10 rounded-full bg-gradient-to-r from-neon via-[#a855f7] to-[#ec4899] text-white font-grotesk text-sm uppercase tracking-widest font-extrabold hover:scale-105 transition-transform shadow-[0_0_40px_rgba(168,85,247,0.4)]"
            >
              ✨ Explore All Live Projects & Repositories
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA / FINAL */}
      <section id="contact" className="relative w-full bg-[#010828] overflow-hidden">
        {/* Background Video using native aspect ratio */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-auto block"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4" type="video/mp4" />
        </video>

        {/* Text Area over video */}
        <div className="absolute inset-0 flex flex-col justify-center items-end px-6 sm:px-8 lg:pr-[20%] lg:pl-[15%] pointer-events-none">
          <div className="relative text-right max-w-full">
            <span className="font-condiment text-neon text-[17px] sm:text-[36px] lg:text-[68px] mix-blend-exclusion absolute -top-[1.5em] lg:-top-[1.2em] left-[-2em] lg:left-[-3em] -rotate-1 pointer-events-auto">
              Let's connect
            </span>
            <h2 className="font-grotesk text-[16px] sm:text-[36px] lg:text-[50px] uppercase leading-[1.1] pointer-events-auto tracking-wide">
              <span className="block mb-4 md:mb-6 lg:mb-10">AVAILABLE FOR NEW OPPORTUNITIES.</span>
              <span className="block">LET'S BUILD SOMETHING GREAT.</span>
              <span className="block">REACH OUT TO ME.</span>
              <div className="flex gap-4 sm:gap-6 justify-end mt-4 sm:mt-6 pointer-events-auto">
                <a href="mailto:kumarsinghratnesh3@gmail.com" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-neon/30 flex items-center justify-center text-neon hover:bg-neon hover:text-[#010828] transition-all hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
                <a href="https://github.com/Ratnesh919" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#010828] transition-all hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="https://www.instagram.com/ratnesh.199?igsh=MXF3aDd0eWRhaGhiaA==" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-[#E4405F]/30 flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/ratnesh-kumar-singh-16749325b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1De11Vypsn/" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </h2>
          </div>
        </div>

        {/* Floating Social Icons Removed */}

      </section>

      {/* LIGHTBOX MODAL */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative liquid-glass rounded-[28px] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-white/20 shadow-2xl bg-[#010828]/95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-neon hover:text-[#010828] text-white flex items-center justify-center font-mono text-sm transition-colors"
            >
              ✕
            </button>

            <div className="p-6 border-b border-white/10 pr-16">
              <span className="font-mono text-[10px] text-neon uppercase tracking-widest px-2 py-0.5 rounded bg-neon/10 border border-neon/30 inline-block mb-2">
                {selectedCert.issuer}
              </span>
              <h3 className="font-grotesk text-xl sm:text-2xl text-cream font-bold">
                {selectedCert.title}
              </h3>
              <p className="font-mono text-xs text-cream/50 mt-1">
                Issued {selectedCert.date} &bull; ID: {selectedCert.certId}
              </p>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-black/60">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[60vh] max-w-full object-contain rounded-xl border border-white/10"
              />
            </div>

            <div className="p-4 sm:p-6 border-t border-white/10 flex justify-between items-center bg-[#010828]">
              <span className="font-mono text-xs text-cream/40 hidden sm:inline">
                Verified Credential
              </span>
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-6 rounded-full bg-neon text-[#010828] font-grotesk text-xs uppercase tracking-wider font-bold hover:scale-105 transition-transform"
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
            className="relative liquid-glass rounded-[28px] max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-white/20 shadow-2xl bg-[#010828]/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-neon uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-neon/10 border border-neon/30 inline-block">
                    LIVE PORTFOLIO DIRECTORY
                  </span>
                </div>
                <h3 className="font-grotesk text-2xl sm:text-3xl text-cream font-bold mt-2">
                  Live <span className="text-neon">Projects</span> & Repositories
                </h3>
                <p className="font-mono text-xs text-cream/60 mt-1">
                  Direct access to deployed applications, AI workflows, and hardware projects.
                </p>
              </div>

              <button
                onClick={() => setIsProjectsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-neon hover:text-[#010828] text-white flex items-center justify-center font-mono text-sm transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/40">
              {liveProjectsData.map((project) => (
                <div
                  key={project.id}
                  className="liquid-glass rounded-2xl p-5 border border-white/10 hover:border-neon/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-[10px] text-neon uppercase tracking-wider bg-neon/10 px-2 py-0.5 rounded border border-neon/20">
                        {project.category}
                      </span>
                    </div>

                    <h4 className="font-grotesk text-lg text-white font-bold">{project.title}</h4>
                    <p className="font-mono text-[11px] text-cream/70 mt-0.5">{project.tagline}</p>
                    <p className="font-mono text-xs text-cream/50 mt-2 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cream/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 rounded-xl bg-neon text-[#010828] font-grotesk text-xs uppercase font-extrabold flex items-center justify-center gap-1.5 hover:scale-105 transition-transform"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-grotesk text-xs uppercase font-bold flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
                      >
                        <Code2 size={14} /> Source Code
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

export default App;
