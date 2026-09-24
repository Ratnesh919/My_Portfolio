import React from 'react';
import { Download, FileText, Sparkles, FolderGit2, GraduationCap, Radio, Award, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { ThreeCharacterScene } from '@/components/portfolio/ThreeCharacterScene';
import PulsatingBorder from '@/components/originkit/ui/pulsating-border-custom-style';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenProjects }) => {
  return (
    <section id="home" className="relative w-full pt-4 pb-8 flex flex-col gap-8">
      {/* ═══ Main 2-Column Hero Area (Matching Reference Layout) ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Typography & Action Buttons (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-5">
          {/* Greeting Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e152d]/90 border border-purple-500/30 text-purple-300 text-xs md:text-sm font-medium shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-md">
            <span>Hello, I'm</span>
            <span className="text-base">👋</span>
          </div>

          {/* 3D Extruded Metallic Name */}
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.08] select-none">
              <span className="block drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-slate-100">
                Ratnesh
              </span>
              <span className="block bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_6px_20px_rgba(168,85,247,0.4)]">
                Kumar Singh
              </span>
            </h1>
          </div>

          {/* Subtitle / Focus Track */}
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              {PORTFOLIO_DATA.role}
            </h2>
          </div>

          {/* Bio / Value Proposition */}
          <p className="text-slate-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
            {PORTFOLIO_DATA.tagline}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Liquid Metal Button with Pulsating Neon Glow */}
            <div className="relative group cursor-pointer" onClick={onOpenProjects}>
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 opacity-60 group-hover:opacity-100 blur-sm transition-opacity" />
              <LiquidMetalButton label="View My Work" />
            </div>

            {/* Prominent High-Craft Download Resume Button with Moving Outline Glow */}
            <div className="moving-outline-glow-container group cursor-pointer">
              <a
                href="./Resume.pdf"
                download="Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="moving-outline-glow-inner active:scale-95 transition-transform"
                title="Download Ratnesh Kumar Singh's Official Resume"
              >
                <FileText size={17} className="text-[#ff416c] group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,65,108,0.6)]" />
                <span className="text-sm font-bold bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
                  Download Resume
                </span>
                <Download size={15} className="text-purple-400 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* One-Click Recruiter Quick Tour Button */}
            <button
              onClick={() => {
                if (typeof (window as any).startRecruiterQuickTour === 'function') {
                  (window as any).startRecruiterQuickTour();
                } else if ((window as any).chatBot && typeof (window as any).chatBot.startRecruiterQuickTour === 'function') {
                  (window as any).chatBot.startRecruiterQuickTour();
                }
              }}
              className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-950/80 via-[#180f2d] to-indigo-950/80 hover:from-purple-900/90 hover:to-indigo-900/90 border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white transition-all text-sm font-semibold shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] active:scale-95 group backdrop-blur-md"
              title="Launch instant audio walkthrough with Raya AI"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              </span>
              <Sparkles size={16} className="text-purple-400 group-hover:rotate-12 transition-transform drop-shadow-[0_0_8px_#a855f7]" />
              <span className="tracking-wide">Recruiter Quick Tour</span>
            </button>

            {/* Quick Explore About Button */}
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-purple-300/80 hover:text-purple-200 text-sm font-medium hover:bg-purple-950/30 transition-colors"
            >
              <span>About Me</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive 3D Character Viewport (lg:col-span-5) */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <ThreeCharacterScene onInteraction={onOpenProjects} />
        </div>
      </div>

      {/* ═══ 4-Card Quick Stats Bar (Matching Reference Image Below Hero) ═══ */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-gradient-to-r from-[#171026]/90 via-[#130d20]/80 to-[#171026]/90 border border-purple-500/20 shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Stat 1: Fresher / B.Tech */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
            <GraduationCap size={20} />
          </div>
          <div>
            <div className="text-lg md:text-xl font-bold text-white font-mono leading-tight">2026 Grad</div>
            <div className="text-[11px] text-slate-400 font-medium">B.Tech ECE (MAKAUT)</div>
          </div>
        </div>

        {/* Stat 2: Projects Completed */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
            <FolderGit2 size={20} />
          </div>
          <div>
            <div className="text-lg md:text-xl font-bold text-white font-mono leading-tight">10+ Built</div>
            <div className="text-[11px] text-slate-400 font-medium">Full-Stack & Mobile</div>
          </div>
        </div>

        {/* Stat 3: DSP Precision */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
            <Radio size={20} />
          </div>
          <div>
            <div className="text-lg md:text-xl font-bold text-white font-mono leading-tight">±5ms Sync</div>
            <div className="text-[11px] text-slate-400 font-medium">Real-Time DSP Engine</div>
          </div>
        </div>

        {/* Stat 4: Verified Certifications */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
            <Award size={20} />
          </div>
          <div>
            <div className="text-lg md:text-xl font-bold text-white font-mono leading-tight">4+ Verified</div>
            <div className="text-[11px] text-slate-400 font-medium">Udemy & Industry</div>
          </div>
        </div>
      </div>
    </section>
  );
};
