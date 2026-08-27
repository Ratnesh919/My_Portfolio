import React from 'react';
import { 
  Home, 
  User, 
  Code2, 
  FolderGit2, 
  Briefcase, 
  Award,
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  Instagram,
  Facebook,
  Bot,
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onToggleRaya?: () => void;
  onOpenAvatarStudio?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onNavigate,
  onToggleRaya,
  onOpenAvatarStudio 
}) => {
  // Ordered strictly according to the right-side section hierarchy
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <aside className="w-full lg:w-72 lg:h-screen lg:fixed lg:left-0 lg:top-0 shrink-0 flex flex-col justify-between p-4 lg:p-6 bg-[#0c0816]/95 backdrop-blur-2xl border-b lg:border-b-0 lg:border-r border-purple-500/15 select-none z-30 overflow-y-auto scrollbar-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {/* Top Brand / 3D Logo */}
      <div className="flex items-center justify-between lg:justify-start lg:flex-col lg:items-start gap-4">
        <div 
          onClick={() => onNavigate('home')}
          className="group cursor-pointer flex items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-102"
        >
          {/* 3D Extruded Purple Logo Tile */}
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-b from-[#7e22ce] via-[#6b21a8] to-[#3b0764] p-0.5 shadow-[0_10px_25px_rgba(147,51,234,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95 flex items-center justify-center">
            <div className="w-full h-full rounded-[14px] bg-[#1a0f2e] flex items-center justify-center border border-purple-400/30">
              <span className="font-black text-2xl bg-gradient-to-b from-white via-purple-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(168,85,247,0.8)]">
                R
              </span>
            </div>
          </div>
          
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">Ratnesh Singh</h1>
            <p className="text-[11px] font-mono text-purple-400">ECE &bull; Full-Stack &bull; Hardware</p>
          </div>
        </div>

        {/* Change Avatar Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAvatarStudio}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-900/60 to-purple-950/40 border border-purple-500/35 hover:border-purple-400 text-purple-200 text-xs font-mono transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 shadow-md"
            title="Open Avatar Studio & Character Switcher"
          >
            <Layers size={13} className="text-purple-400" />
            <span>Avatar Studio</span>
          </button>
        </div>
      </div>

      {/* Navigation Items (Ultra-Smooth Fluid Transitions & Serial Order) */}
      <nav className="my-4 lg:my-6 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-purple-900/60 via-[#1e1338] to-purple-950/30 text-white border border-purple-500/40 shadow-[0_4px_18px_rgba(147,51,234,0.25)] font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.05]'
              }`}
            >
              {/* Active Left Indicator Pill with Smooth Fade & Glow */}
              <span
                className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-b from-purple-400 to-fuchsia-400 shadow-[0_0_12px_#a855f7] opacity-100'
                    : 'opacity-0'
                }`}
              />
              <Icon 
                size={18} 
                className={`transition-all duration-300 ${
                  isActive ? 'text-purple-300 drop-shadow-[0_0_8px_#a855f7] scale-105' : 'text-slate-400 group-hover:text-purple-300'
                }`} 
              />
              <span className="transition-colors duration-200">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer: Social Links & Raya Trigger */}
      <div className="pt-4 border-t border-purple-500/10 flex flex-col gap-3">
        {/* Raya Virtual Guide Quick Trigger */}
        <button
          onClick={onToggleRaya}
          className="w-full group flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#180e2b] to-slate-900/70 border border-purple-500/25 hover:border-purple-400/50 transition-all duration-300 ease-out shadow-[0_4px_16px_rgba(0,0,0,0.5)] active:scale-98"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center border border-purple-400/30">
              <Bot size={16} className="text-purple-300 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-purple-200">Meet Raya</div>
              <div className="text-[10px] text-purple-400 font-mono">Virtual Guide & Music</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>

        {/* Social Icons */}
        <div className="flex items-center justify-between px-1 text-slate-400 pt-1">
          <a 
            href={PORTFOLIO_DATA.github} 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-purple-300 hover:scale-115 transition-all duration-300 p-1"
            title="GitHub Profile"
          >
            <Github size={17} />
          </a>
          <a 
            href={PORTFOLIO_DATA.linkedin} 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-purple-300 hover:scale-115 transition-all duration-300 p-1"
            title="LinkedIn Profile"
          >
            <Linkedin size={17} />
          </a>
          <a 
            href={(PORTFOLIO_DATA as any).instagram} 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-purple-300 hover:scale-115 transition-all duration-300 p-1"
            title="Instagram Profile"
          >
            <Instagram size={17} />
          </a>
          <a 
            href={(PORTFOLIO_DATA as any).facebook} 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-purple-300 hover:scale-115 transition-all duration-300 p-1"
            title="Facebook Profile"
          >
            <Facebook size={17} />
          </a>
          <a 
            href={`mailto:${PORTFOLIO_DATA.email}`}
            className="hover:text-purple-300 hover:scale-115 transition-all duration-300 p-1"
            title="Direct Email"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
    </aside>
  );
};
