import './tailwind.css';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Code2, Cpu, Wrench, Gamepad2, Layers, ExternalLink, FileText, Sparkles, ChevronRight } from 'lucide-react';

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
          <div className="flex h-full items-center justify-between px-8 md:justify-center md:gap-14 text-sm font-semibold tracking-widest text-[#4b5563]">
            {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#5438dc] hover:scale-105 transition-all duration-300 hidden md:block">
                {item}
              </a>
            ))}
            {/* Mobile menu fallback */}
            <span className="md:hidden tracking-widest text-[#1f2937]">MENU</span>
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
          {/* STITCH HERO IMAGE - Set to w-full h-auto to completely avoid cropping */}
          <img 
            src="/stitch-screen2.png" 
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
            <motion.p variants={fadeIn} className="text-lg lg:text-xl text-[#4b5563] leading-relaxed mb-10 max-w-xl font-medium">
              Motivated Electronics and Communication Engineering student with a strong foundation in programming, embedded systems, and AI. Passionate about developing innovative solutions in smart and software-driven technology.
            </motion.p>

            {/* Contact Card */}
            <motion.div variants={fadeIn} className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_50px_rgba(84,56,220,0.08)] transition-all duration-300 flex flex-col gap-6">
              
              <div className="flex gap-4">
                <a href="mailto:kumarsinghratnesh3@gmail.com" className="w-12 h-12 rounded-full bg-[#f4f5f8] flex items-center justify-center text-[#5438dc] hover:bg-[#5438dc] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
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
              <h3 className="text-2xl font-extrabold mb-6 text-[#2563eb]">Certificates & Training</h3>
              <ul className="space-y-4 text-[#4b5563] font-medium relative z-10">
                {['Python course (1 month)', 'C language course (1 month)', 'EV Service Technician (1 month)', 'GIS training (2 weeks)'].map((cert, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <ChevronRight size={18} className="text-[#2563eb]" /> {cert}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

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

        {/* Skills & Projects Grid */}
        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          <motion.div variants={fadeIn} className="rounded-[40px] border border-black/5 bg-white p-10 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <h3 className="text-3xl font-extrabold mb-8 text-[#111827] flex items-center gap-3"><Code2 className="text-[#2563eb]"/> Skills & Tools</h3>
            <div className="space-y-7">
              <div>
                <p className="text-[#6b7280] text-sm font-bold tracking-wider uppercase mb-2">Programming</p>
                <p className="text-lg font-bold text-[#1f2937]">C, C++, Python, HTML, CSS</p>
              </div>
              <div>
                <p className="text-[#6b7280] text-sm font-bold tracking-wider uppercase mb-2">UI/UX Design</p>
                <p className="text-lg font-bold text-[#1f2937]">Figma</p>
              </div>
              <div>
                <p className="text-[#6b7280] text-sm font-bold tracking-wider uppercase mb-2">Software</p>
                <p className="text-lg font-bold text-[#1f2937] leading-relaxed">Arduino IDE, MATLAB, ArcGIS, Tinkercad, Verilog, VS Code, MS Office, Canva</p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <a href="https://tinywebs.site/mboHXS" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:bg-[#2563eb] hover:text-white bg-[#2563eb]/10 px-5 py-2.5 rounded-full border border-[#2563eb]/20 transition-all shadow-sm">
                  Web Demo 1 <ExternalLink size={16}/>
                </a>
                <a href="https://tinywebs.site/6AsQaP" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:bg-[#2563eb] hover:text-white bg-[#2563eb]/10 px-5 py-2.5 rounded-full border border-[#2563eb]/20 transition-all shadow-sm">
                  Web Demo 2 <ExternalLink size={16}/>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="rounded-[40px] border border-black/5 bg-gradient-to-br from-white to-[#f4f5f8] p-10 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <h3 className="text-3xl font-extrabold mb-8 text-[#111827] flex items-center gap-3"><Cpu className="text-[#5438dc]"/> Projects & Activities</h3>
            <ul className="space-y-4">
              {[
                'Smart Parking System (Arduino + ultrasonic sensors)',
                'Text Humanizer using Python',
                'Simple AI Assistant with APIs',
                'HAM Radio workshop (4 Mar 2025)',
                'BSNL industrial visit (24 Apr 2025)',
                'Cyber Awareness workshop (8 Aug 2025)'
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
    </div>
  );
}
