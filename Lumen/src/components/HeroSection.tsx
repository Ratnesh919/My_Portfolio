import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen overflow-hidden relative flex flex-col w-full h-full">
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        className="absolute inset-0 w-full h-full object-cover object-center sm:object-bottom"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Stronger overlay on mobile for text readability, lighter on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40 sm:from-black/60 sm:via-black/20 sm:to-black/30 pointer-events-none z-0" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-12 text-center w-full h-full pointer-events-none">
        {/* Responsive heading: small on mobile, huge on desktop */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight font-serif leading-tight">
          Engineer then <em className="italic">Innovate</em>.
        </h1>

        <div className="mt-6 sm:mt-8 mb-5 sm:mb-6 max-w-xs sm:max-w-xl w-full mx-auto pointer-events-auto">
          <div className="liquid-glass rounded-full pl-4 sm:pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="kumarsinghratnesh3@gmail.com"
              className="bg-transparent border-none outline-none text-white placeholder:text-white/40 flex-1 min-w-0 text-sm sm:text-base"
              readOnly
            />
            <a href="mailto:kumarsinghratnesh3@gmail.com" className="bg-white rounded-full p-2 sm:p-3 text-black hover:bg-gray-200 transition-colors shrink-0">
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <p className="text-white/90 text-xs sm:text-sm leading-relaxed px-4 max-w-xs sm:max-w-lg mx-auto">
          Electronics and Communication Engineering student passionate about developing innovative solutions in smart and software-driven technology.
        </p>

        <a href="#projects" className="mt-6 sm:mt-8 liquid-glass rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors pointer-events-auto inline-block">
          Explore My Work
        </a>
      </div>
    </section>
  );
}

