import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Smartphone, 
  Cpu, 
  Radio, 
  Palette,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0: return <Code2 size={20} />;
      case 1: return <Smartphone size={20} />;
      case 2: return <Cpu size={20} />;
      case 3: return <Radio size={20} />;
      case 4: return <Palette size={20} />;
      default: return <Zap size={20} />;
    }
  };

  return (
    <section id="skills" className="w-full py-8 flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Sparkles size={14} />
          <span>Technical Expertise Matrix</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          5 Core Engineering Pillars
        </h2>
      </div>

      {/* Pillar Tabs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {PORTFOLIO_DATA.skillCategories.map((pillar, idx) => {
          const isActive = activePillar === idx;
          return (
            <button
              key={pillar.title}
              onClick={() => setActivePillar(idx)}
              className={`p-3 rounded-2xl flex flex-col items-start gap-2 text-left transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-b from-purple-900/60 to-purple-950/40 border border-purple-400/50 shadow-[0_4px_20px_rgba(168,85,247,0.3)] text-white'
                  : 'bg-[#150f22] border border-purple-500/15 hover:border-purple-500/35 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-2 rounded-xl border ${
                isActive 
                  ? 'bg-purple-600 text-white border-purple-400' 
                  : 'bg-purple-950/40 text-purple-400 border-purple-500/20'
              }`}>
                {getPillarIcon(idx)}
              </div>
              <span className="text-xs font-bold leading-snug line-clamp-2">
                {pillar.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Details Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 pb-4 border-b border-purple-500/15">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-purple-400">{getPillarIcon(activePillar)}</span>
              <span>{PORTFOLIO_DATA.skillCategories[activePillar].title}</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              {PORTFOLIO_DATA.skillCategories[activePillar].description}
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 self-start md:self-auto">
            Pillar {activePillar + 1} of 5
          </span>
        </div>

        {/* Skill Bars & Chips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PORTFOLIO_DATA.skillCategories[activePillar].skills.map((skill) => (
            <div
              key={skill.name}
              className={`p-3.5 rounded-xl border transition-all ${
                skill.highlight
                  ? 'bg-[#1e1333]/90 border-purple-500/40 shadow-[0_4px_16px_rgba(168,85,247,0.15)]'
                  : 'bg-[#130d20] border-purple-500/15'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                <span className="flex items-center gap-2">
                  {skill.highlight && <Zap size={13} className="text-purple-400 fill-purple-400" />}
                  {skill.name}
                </span>
                <span className="font-mono text-purple-300">{skill.level}%</span>
              </div>

              {/* Progress Bar with 3D gradient */}
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all duration-700 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
