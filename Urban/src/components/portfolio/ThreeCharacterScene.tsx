import React, { useState, useRef, useEffect } from 'react';

interface ThreeCharacterSceneProps {
  onInteraction?: () => void;
}

export const ThreeCharacterScene: React.FC<ThreeCharacterSceneProps> = ({ onInteraction }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized offset (-1 to 1)
      const mouseX = (e.clientX - centerX) / (window.innerWidth / 2);
      const mouseY = (e.clientY - centerY) / (window.innerHeight / 2);

      setRotate({
        x: -mouseY * 10,
        y: mouseX * 12
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onInteraction}
    >
      {/* 3D Tilt Wrapper */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Ambient Glow Backdrop */}
        <div 
          className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-3xl bg-gradient-to-tr from-[#160b29] via-[#24133f] to-[#120822] border border-purple-500/25 shadow-[0_0_80px_rgba(168,85,247,0.3)] flex items-center justify-center overflow-hidden"
          style={{ transform: 'translateZ(-30px)' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,0.35),transparent_70%)]" />
        </div>

        {/* ═══ Normal Clean Avatar Picture ═══ */}
        <div 
          className="relative z-10 w-[280px] sm:w-[340px] md:w-[380px] h-[300px] sm:h-[360px] md:h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-purple-500/30"
          style={{ transform: 'translateZ(20px)' }}
        >
          <img
            src="/assets/hero-avatar.png"
            onError={(e) => {
              (e.target as HTMLImageElement).src = './assets/hero-avatar.png';
            }}
            alt="Ratnesh Kumar Singh - Avatar"
            className="w-full h-full object-cover object-[center_15%]"
          />
        </div>

        {/* ═══ 3D Floating Extruded Tech Shapes Around Picture ═══ */}
        
        {/* Top-Right: </> Code Widget */}
        <div 
          className="absolute -top-2 right-0 sm:top-2 sm:right-2 z-20 transition-transform duration-200"
          style={{ transform: `translateZ(65px) translateX(${rotate.y * 0.7}px) translateY(${rotate.x * 0.7}px)` }}
        >
          <div className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#241935] via-[#1c122c] to-[#100a1c] border border-purple-500/40 shadow-[0_15px_30px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-pointer hover:border-purple-400 transition-all hover:scale-110 active:scale-95">
            <span className="font-mono text-lg sm:text-xl font-bold text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
              &lt;/&gt;
            </span>
            <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/20 whitespace-nowrap pointer-events-none shadow-lg">
              Full-Stack DSP
            </div>
          </div>
        </div>

        {/* Middle-Right: JS JavaScript Badge */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-2 z-20 transition-transform duration-200"
          style={{ transform: `translateZ(55px) translateX(${rotate.y * 0.5}px) translateY(${rotate.x * 0.5}px)` }}
        >
          <div className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#241935] via-[#1c122c] to-[#100a1c] border border-purple-500/40 shadow-[0_15px_30px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-pointer hover:border-purple-400 transition-all hover:scale-110 active:scale-95">
            <span className="font-sans text-base sm:text-lg font-black text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
              JS
            </span>
            <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/20 whitespace-nowrap pointer-events-none shadow-lg">
              React & TypeScript
            </div>
          </div>
        </div>

        {/* Bottom-Right: Sliders Hardware Control Widget */}
        <div 
          className="absolute -bottom-2 right-0 sm:bottom-2 sm:right-2 z-20 transition-transform duration-200"
          style={{ transform: `translateZ(70px) translateX(${rotate.y * 0.8}px) translateY(${rotate.x * 0.8}px)` }}
        >
          <div className="group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#241935] via-[#1c122c] to-[#100a1c] border border-purple-500/40 shadow-[0_15px_30px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-pointer hover:border-purple-400 transition-all hover:scale-110 active:scale-95 gap-1.5 p-2">
            <div className="w-8 h-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 overflow-hidden relative">
              <div className="w-4 h-full bg-purple-400 rounded-full shadow-[0_0_6px_#a855f7]" />
            </div>
            <div className="w-8 h-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 overflow-hidden relative">
              <div className="w-6 h-full bg-purple-400 rounded-full ml-auto shadow-[0_0_6px_#a855f7]" />
            </div>
            <div className="w-8 h-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 overflow-hidden relative">
              <div className="w-3 h-full bg-purple-400 rounded-full shadow-[0_0_6px_#a855f7]" />
            </div>
            <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/20 whitespace-nowrap pointer-events-none shadow-lg">
              RF & Audio Controls
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div 
          className="absolute -bottom-3 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#160c26]/90 border border-purple-500/30 backdrop-blur-md text-[11px] text-purple-300 font-mono shadow-lg"
          style={{ transform: 'translateZ(35px)' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Avatar</span>
        </div>
      </div>
    </div>
  );
};
