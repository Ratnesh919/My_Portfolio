import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  Code2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '@/lib/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Android', 'AI & Automation', '3D Graphics', 'Hardware & IoT'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="w-full py-8 flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Sparkles size={14} />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'bg-[#181126] text-slate-400 hover:text-slate-200 border border-purple-500/15 hover:border-purple-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ 3-Column Project Grid (Directly Matching Reference Image Bottom Row) ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 hover:border-purple-500/50 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_32px_rgba(147,51,234,0.2)] transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
          >
            {/* Ambient Corner Glow on Hover */}
            <div 
              className="absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-2xl pointer-events-none"
              style={{ backgroundColor: project.accent }}
            />

            <div>
              {/* Project Preview Card Top Header (Mock UI window header) */}
              <div className="w-full h-32 md:h-36 rounded-xl bg-gradient-to-tr from-[#120c1e] via-[#1a112c] to-[#25173f] border border-purple-500/15 p-3 flex flex-col justify-between relative overflow-hidden mb-3.5">
                {/* Mock UI window top bar */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="w-2 h-2 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300">
                    {project.badge}
                  </span>
                </div>

                {/* Center Stylized Graphic / Wave / Code snippet */}
                <div className="flex items-center justify-center my-auto z-10">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${project.accent}20`,
                        borderColor: `${project.accent}40`,
                        color: project.accent 
                      }}
                    >
                      {project.category === 'Android' ? <Cpu size={20} /> : <Code2 size={20} />}
                    </div>
                    <span className="text-xs font-bold text-slate-200 mt-1">{project.title}</span>
                  </div>
                </div>

                {/* Subtitle bottom banner */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono z-10">
                  <span>{project.category}</span>
                  <span className="text-purple-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Inspect <ChevronRight size={12} />
                  </span>
                </div>

                {/* Subtle Grid pattern overlay */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:12px_12px]" />
              </div>

              {/* Title & Tagline */}
              <div className="mb-2">
                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-purple-200 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-normal leading-relaxed">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Bottom Footer: Tech Stack Pills & Action Links */}
            <div className="pt-3 border-t border-purple-500/10 flex items-center justify-between gap-2 mt-2">
              <span className="text-[11px] font-mono text-purple-300/80 truncate">
                {project.techStack}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-purple-900/40 text-slate-300 hover:text-white border border-purple-500/15 transition-all"
                    title="View GitHub Repository"
                  >
                    <Github size={14} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 hover:text-white border border-purple-500/30 transition-all"
                    title="Open Live Deployment"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
