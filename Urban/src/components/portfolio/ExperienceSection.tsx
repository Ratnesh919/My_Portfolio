import React from 'react';
import { 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Radio, 
  Cpu, 
  ShieldCheck, 
  Building2,
  Calendar
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const ExperienceSection: React.FC = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Education': return <GraduationCap size={16} className="text-purple-400" />;
      case 'Industrial Visit': return <Building2 size={16} className="text-sky-400" />;
      case 'Workshop': return <Radio size={16} className="text-amber-400" />;
      case 'Training': return <Cpu size={16} className="text-emerald-400" />;
      default: return <Briefcase size={16} className="text-purple-400" />;
    }
  };

  return (
    <section id="experience" className="w-full py-8 flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Sparkles size={14} />
          <span>Academic & Industry Journey</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Experience & Training
        </h2>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 border-l border-purple-500/20 space-y-6">
        {PORTFOLIO_DATA.experiences.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#1e1430] border-2 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform" />

            {/* Experience Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 hover:border-purple-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30">
                    {getTypeIcon(exp.type)}
                  </div>
                  <span className="text-sm md:text-base font-bold text-white">
                    {exp.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300">
                    {exp.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar size={12} />
                    {exp.period}
                  </span>
                </div>
              </div>

              <div className="text-xs font-medium text-purple-300/90 mb-2">
                {exp.institution}
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
