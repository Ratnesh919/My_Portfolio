
import './tailwind.css';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, GraduationCap, Code2, Cpu, Wrench, 
  Sparkles, ChevronRight, Linkedin, Instagram, Facebook,
  Layers, MousePointer2 
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Portfolio() {
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
            className="w-full max-w-[850px] rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl ring-1 ring-white/5"
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

              <button className="md:hidden text-white/50 hover:text-white transition-colors">
                <span className="text-[10px] font-black tracking-widest leading-none">MENU</span>
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
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">Digital Alchemist & Builder</span>
            </div>
            
            <h1 className="relative mb-12 mt-8">
              <div className="text-4xl md:text-[70px] lg:text-[90px] font-black leading-tight tracking-[0.1em] text-white/5 select-none absolute left-1/2 -translate-x-1/2 -top-3/4 whitespace-nowrap opacity-20 pointer-events-none" style={{ fontFamily: '"Abraham Outline", sans-serif' }}>
                 RATNESH SINGH
              </div>
              <div className="text-5xl md:text-[80px] lg:text-[100px] font-black leading-[1.8] tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 relative z-10 py-12" style={{ fontFamily: '"Next Ups", sans-serif' }}>
                RATNESH SINGH
              </div>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto font-medium tracking-tight mb-12"
            >
              Blending <span className="text-white">Electronics</span> with <span className="text-[#ff00ff]">AI</span> to create 
              the next generation of software-driven hardware experiences.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => scrollTo('projects')}
                className="px-8 py-4 bg-white text-black font-black text-sm tracking-widest rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                VIEW PROJECTS
              </button>
              <button 
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-black text-sm tracking-widest rounded-full hover:bg-white/5 transition-all active:scale-95 backdrop-blur-md"
              >
                GET IN TOUCH
              </button>
            </div>
          </motion.div>



          {/* Social Links Side Bar */}
          <div className="hidden lg:flex fixed left-10 bottom-10 flex-col gap-6 z-40">
            <a href="#" className="text-white/30 hover:text-[#ff00ff] transition-all hover:scale-125">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white/30 hover:text-[#ff00ff] transition-all hover:scale-125">
              <Linkedin size={20} />
            </a>
            <a href="https://www.facebook.com/share/1De11Vypsn/" target="_blank" rel="noreferrer" className="text-white/30 hover:text-[#ff00ff] transition-all hover:scale-125">
              <Facebook size={20} />
            </a>
            <div className="w-[1px] h-20 bg-white/10 mx-auto" />
          </div>
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
                <span className="text-[#ff00ff] font-black tracking-[.4em] uppercase text-[10px]">01 / THE BUILDER</span>
                <div className="h-[1px] w-20 bg-[#ff00ff]/30" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-[0.2em] py-6 flex flex-col gap-6 md:gap-10 leading-[1.8]" style={{ fontFamily: '"Next Ups", sans-serif' }}>
                 <span>CRAFTING</span>
                 <span>THE</span>
                 <span>FUTURE.</span>
              </h2>
              <p className="text-xl text-white/50 leading-relaxed font-medium mb-10 max-w-xl">
                Electronics engineer by day, experimental builder by night. I specialize in merging raw hardware potential with sophisticated AI algorithms. My goal is to build tools that feel as natural as they are powerful.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Location", value: "Kolkata, India", icon: MapPin },
                  { label: "Education", value: "B.Tech ECE '26", icon: GraduationCap },
                  { label: "Languages", value: "Eng, Hin, Ben", icon: Layers },
                  { label: "Email", value: "kumarsinghratnesh3@gmail.com", icon: Mail },
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
                  CORE FOCUS
                </h3>
                <div className="grid grid-cols-1 gap-8 relative z-10">
                  {[
                    { title: "Embedded Intelligence", desc: "Developing low-latency AI models for microcontrollers and edge devices.", icon: Cpu },
                    { title: "Visual Storytelling", desc: "Crafting immersive digital interfaces through modern web technologies.", icon: Code2 },
                    { title: "Hardware Prototypes", desc: "From theoretical designs to functional hardware via Arduino and MATLAB.", icon: Wrench },
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
                OPEN TO WORK
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
                    { year: "2022 - 2026", inst: "Swami Vivekananda Institute", degree: "B.Tech in ECE", detail: "Focusing on digital signal processing and embedded AI." },
                    { year: "2018 - 2020", inst: "P.B.S College", degree: "Higher Secondary", detail: "Science Stream (PCM) - Foundation of mathematics & physics." },
                    { year: "2016 - 2018", inst: "Vidyanjali High School", degree: "Secondary Schooling", detail: "IGCSE Board - Early technological exposure." },
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
                     {["C", "C++", "Python", "Verilog", "MATLAB", "Arduino", "Tinkercad", "Figma", "React", "Node.js", "Tailwind"].map((skill, i) => (
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
                   <h4 className="text-xs font-black text-white/30 tracking-[.4em] mb-6 uppercase">Certifications</h4>
                   <ul className="space-y-4">
                     {["Python Advanced Training", "Electric Vehicle Service Tech", "GIS Training Specialist", "Cyber Awareness Lead"].map((cert, i) => (
                       <li key={i} className="flex items-center gap-3 text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                         <ChevronRight size={14} className="text-[#00ffff]" /> {cert}
                       </li>
                     ))}
                   </ul>
                </motion.div>
             </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="py-20 mb-20 scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
            <div>
              <span className="text-[#ff00ff] font-black tracking-[.4em] text-[10px] uppercase block mb-6">03 / Selected Works</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-[0.2em] leading-[1.8] py-6" style={{ fontFamily: '"Next Ups", sans-serif' }}>
                 LAB PROJECTS.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Smart Parking AI", 
                type: "IoT / ARDUINO", 
                desc: "Real-time occupancy tracking using ultrasonic sensors and custom AI feedback loop for optimal traffic flow.",
                tags: ["Arduino", "Sensors", "Automation"],
                accent: "#ff00ff"
              },
              { 
                title: "Assister Pro AI", 
                type: "SOFTWARE / API", 
                desc: "A headless AI assistant integrated with multi-model APIs for specialized electronic engineering tasks.",
                tags: ["Python", "OpenAI", "React"],
                accent: "#00ffff"
              },
            ].map((proj, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-[40px] border border-white/10 bg-white/5 hover:border-white/20 transition-all h-[400px] flex flex-col relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <MousePointer2 size={120} />
                 </div>
                 <div 
                   className="w-12 h-1 bg-white mb-8" 
                   style={{ backgroundColor: proj.accent }}
                 />
                 <span className="text-[10px] font-black text-white/30 tracking-[.3em] mb-2">{proj.type}</span>
                 <h3 className="text-3xl font-black text-white mb-6 leading-tight tracking-tight group-hover:text-[#ff00ff] transition-colors">
                    {proj.title}
                 </h3>
                 <p className="text-sm text-white/40 leading-relaxed font-medium mb-auto">
                    {proj.desc}
                 </p>
                 <div className="flex flex-wrap gap-2 mt-8">
                   {proj.tags.map((tag, j) => (
                     <span key={j} className="text-[10px] font-bold text-white/30 px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest whitespace-nowrap">
                       {tag}
                     </span>
                   ))}
                 </div>
              </motion.div>
            ))}
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
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-[0.25em] mb-12 py-10 flex flex-col gap-6 md:gap-10 leading-[1.8]" style={{ fontFamily: '"Abraham Outline", sans-serif' }}>
                   <span>READY</span>
                   <span>TO</span>
                   <span>BUILD?</span>
                </h2>
                
                <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 font-medium">
                   Currently open to collaborations and full-time opportunities. Drop a ping if you want to create something truly unique.
                </p>

                <div className="flex flex-col items-center gap-8">
                  <a 
                    href="mailto:kumarsinghratnesh3@gmail.com"
                    className="text-2xl md:text-4xl font-black text-white hover:text-[#ff00ff] transition-colors tracking-tighter"
                  >
                    kumarsinghratnesh3@gmail.com
                  </a>
                  
                  <div className="flex gap-8">
                    <a href="#" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white transition-all hover:scale-110">
                      <Instagram size={24} />
                    </a>
                    <a href="#" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white transition-all hover:scale-110">
                      <Linkedin size={24} />
                    </a>
                    <a href="https://www.facebook.com/share/1De11Vypsn/" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white transition-all hover:scale-110">
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


    </div>
  );
}
