import React from 'react';
import { 
  User, 
  Sparkles, 
  Heart, 
  Target, 
  Lightbulb, 
  MapPin, 
  Languages, 
  GraduationCap, 
  Terminal,
  CheckCircle2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-8 flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider">
        <Sparkles size={14} />
        <span>About The Creator</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight -mt-4">
        Engineering Philosophy & Background
      </h2>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Core Bio & Pillars (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0f0a18] border border-purple-500/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Terminal size={18} className="text-purple-400" />
              <span>Who I Am</span>
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
              I am a final-year <span className="text-purple-300 font-semibold">Electronics and Communication Engineering</span> student at MAKAUT (Swami Vivekananda Institute of Science & Technology), graduating in 2026. 
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
              My engineering focus lies at the intersection of <span className="text-purple-300 font-semibold">Real-Time Web Systems</span>, <span className="text-purple-300 font-semibold">Native Android Media Pipelines</span>, <span className="text-purple-300 font-semibold">Automated Workflow Pipelines</span>, and <span className="text-purple-300 font-semibold">RF Antenna Simulation</span>.
            </p>

            {/* Quick Highlights Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                <span>Logic-driven problem solver</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                <span>Sub-millisecond DSP synchronization</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                <span>Native Android MediaCodec low latency</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                <span>Ansys HFSS RF antenna optimization</span>
              </div>
            </div>
          </div>

          {/* Core Values / Work Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#160f24] border border-purple-500/20 shadow-md">
              <div className="flex items-center gap-2 text-purple-400 text-sm font-bold mb-2">
                <Target size={16} />
                <span>Work Philosophy</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Keep improving yourself" — I break complex engineering challenges into atomic first-principles components and build resilient, testable solutions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#160f24] border border-purple-500/20 shadow-md">
              <div className="flex items-center gap-2 text-purple-400 text-sm font-bold mb-2">
                <Heart size={16} />
                <span>Core Values</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Truth, honesty, kindness, and staying true to one's commitments. Committed to creating software and hardware that makes a genuine human impact.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Profile Cards & Demographics (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3.5">
            <h4 className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
              Profile Summary
            </h4>

            <div className="flex items-center justify-between py-2 border-b border-purple-500/10 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <MapPin size={14} className="text-purple-400" /> Location
              </span>
              <span className="text-white font-medium">{PORTFOLIO_DATA.location}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-purple-500/10 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <GraduationCap size={14} className="text-purple-400" /> Degree
              </span>
              <span className="text-white font-medium">B.Tech ECE (2022-2026)</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-purple-500/10 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Languages size={14} className="text-purple-400" /> Languages
              </span>
              <span className="text-white font-medium">English, Hindi, Bengali</span>
            </div>

            <div className="flex items-center justify-between py-2 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Lightbulb size={14} className="text-purple-400" /> Interests
              </span>
              <span className="text-purple-300 font-medium">Autonomous Systems, 3D WebGL, Audio DSP, Art</span>
            </div>
          </div>

          {/* Education Timeline mini card */}
          <div className="p-5 rounded-2xl bg-[#140e21] border border-purple-500/20 shadow-md">
            <h4 className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider mb-3">
              Academic Milestones
            </h4>
            <div className="space-y-3">
              <div className="relative pl-4 border-l-2 border-purple-500/50">
                <div className="text-xs font-bold text-white">B.Tech in ECE &bull; 2022 - 2026</div>
                <div className="text-[11px] text-slate-400">Swami Vivekananda Institute (MAKAUT)</div>
              </div>
              <div className="relative pl-4 border-l-2 border-purple-500/30">
                <div className="text-xs font-bold text-slate-200">Higher Secondary (12th) &bull; 2020</div>
                <div className="text-[11px] text-slate-400">P.B.S College (Physics, Chemistry, Math)</div>
              </div>
              <div className="relative pl-4 border-l-2 border-purple-500/20">
                <div className="text-xs font-bold text-slate-300">Secondary (10th) &bull; 2018</div>
                <div className="text-[11px] text-slate-400">Vidyanjali High School (I.G.C.S.E)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
