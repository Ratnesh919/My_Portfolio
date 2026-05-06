import { ChevronRight } from 'lucide-react';

function App() {
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

            {/* Empty div to balance flex space on mobile, or just standard flex between */}
            <div className="w-[100px] lg:hidden"></div>
            
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
            </div>

            {/* Mobile Socials Removed */}
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
            <p className="font-mono text-[14px] lg:text-[16px] uppercase max-w-[266px] leading-relaxed text-cream mt-8 lg:mt-0">
              MOTIVATED ECE STUDENT WITH A SOLID FOUNDATION IN PROGRAMMING, EMBEDDED SYSTEMS, AND AI. PASSIONATE ABOUT DEVELOPING INNOVATIVE SOLUTIONS.
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
              <h3 className="font-grotesk text-[20px] text-neon mb-4">PROGRAMMING & WEB</h3>
              <div className="font-mono text-[14px] uppercase text-cream leading-relaxed flex flex-col gap-2">
                <span>C, C++</span>
                <span>PYTHON</span>
                <span>HTML, CSS</span>
                <span>FIGMA (UI DESIGN)</span>
              </div>
            </div>

            <div className="liquid-glass rounded-[32px] p-[32px] hover:bg-white/10 transition duration-300">
              <h3 className="font-grotesk text-[20px] text-neon mb-4">SOFTWARE & TOOLS</h3>
              <div className="font-mono text-[14px] uppercase text-cream leading-relaxed flex flex-wrap gap-x-4 gap-y-2">
                <span>ARDUINO IDE</span> <span>MATLAB</span> <span>ARCGIS</span>
                <span>TINKERCAD</span> <span>VERILOG</span> <span>VS CODE</span>
                <span>MS OFFICE</span> <span>CANVA</span>
              </div>
            </div>

            <div className="liquid-glass rounded-[32px] p-[32px] hover:bg-white/10 transition duration-300">
              <h3 className="font-grotesk text-[20px] text-neon mb-4">SPECIAL INTERESTS</h3>
              <div className="font-mono text-[14px] uppercase text-cream leading-relaxed flex flex-col gap-2">
                <span>EMBEDDED SYSTEMS</span>
                <span>AI & MACHINE LEARNING</span>
                <span>ELECTRIC VEHICLES</span>
                <span>DIGITAL ELECTRONICS</span>
              </div>
            </div>
            
            <div className="liquid-glass rounded-[32px] p-[32px] hover:bg-white/10 transition duration-300 md:col-span-2 lg:col-span-3">
               <h3 className="font-grotesk text-[20px] text-neon mb-4">PROFESSIONAL ATTRIBUTES</h3>
               <div className="font-mono text-[14px] uppercase text-cream leading-relaxed grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 <span className="p-4 bg-white/5 rounded-xl border border-white/10 text-center flex items-center justify-center">STRONG PROBLEM-SOLVING</span>
                 <span className="p-4 bg-white/5 rounded-xl border border-white/10 text-center flex items-center justify-center">FAST LEARNER</span>
                 <span className="p-4 bg-white/5 rounded-xl border border-white/10 text-center flex items-center justify-center">HIGHLY DEDICATED</span>
                 <span className="p-4 bg-white/5 rounded-xl border border-white/10 text-center flex items-center justify-center">ADAPTABLE</span>
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
            
            <button className="group relative flex flex-col items-end hover:opacity-80 transition-opacity">
              <div className="flex items-baseline gap-3 md:gap-4">
                <span className="font-grotesk text-[32px] sm:text-[48px] lg:text-[60px] uppercase leading-none">SEE</span>
                <div className="flex flex-col items-start leading-none gap-1 sm:gap-2">
                  <span className="font-grotesk text-[20px] sm:text-[28px] lg:text-[36px] uppercase block tracking-wide">ALL</span>
                  <span className="font-grotesk text-[20px] sm:text-[28px] lg:text-[36px] uppercase block tracking-wide">PROJECTS</span>
                </div>
              </div>
              <div className="w-full bg-neon h-[6px] md:h-[10px] mt-2 group-hover:scale-y-110 transition-transform origin-top"></div>
            </button>
          </div>

          {/* NFT Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition duration-300">
              <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden bg-black/50">
                <video 
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="mt-[18px] liquid-glass rounded-[20px] px-5 py-4 flex justify-between items-center bg-white/5">
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-cream/70 uppercase tracking-wider">PROJECT:</span>
                  <span className="font-grotesk text-[16px] mt-1 track-widest">SMART PARKING</span>
                </div>
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform cursor-pointer">
                  <ChevronRight className="text-white w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition duration-300">
              <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden bg-black/50">
                <video 
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="mt-[18px] liquid-glass rounded-[20px] px-5 py-4 flex justify-between items-center bg-white/5">
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-cream/70 uppercase tracking-wider">PROJECT:</span>
                  <span className="font-grotesk text-[16px] mt-1 track-widest">TEXT HUMANIZER</span>
                </div>
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform cursor-pointer">
                  <ChevronRight className="text-white w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition duration-300">
              <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden bg-black/50">
                <video 
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="mt-[18px] liquid-glass rounded-[20px] px-5 py-4 flex justify-between items-center bg-white/5">
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-cream/70 uppercase tracking-wider">PROJECT:</span>
                  <span className="font-grotesk text-[16px] mt-1 track-widest">AI ASSISTANT</span>
                </div>
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform cursor-pointer">
                  <ChevronRight className="text-white w-6 h-6" />
                </button>
              </div>
            </div>

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
    </div>
  );
}

export default App;
