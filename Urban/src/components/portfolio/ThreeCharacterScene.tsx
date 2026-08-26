import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Code2, Cpu } from 'lucide-react';

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

      // Normalize mouse coordinates (-1 to 1)
      const mouseX = (e.clientX - centerX) / (window.innerWidth / 2);
      const mouseY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Smooth tilt limits
      setRotate({
        x: -mouseY * 14,
        y: mouseX * 16
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
      className="relative w-full max-w-[460px] h-[400px] sm:h-[460px] md:h-[500px] flex items-center justify-center select-none perspective-[1200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onInteraction}
    >
      {/* ═══ 3D Tilt Wrapper Container ═══ */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out preserve-3d"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Ambient Circular Depth Portal (Backdrop) */}
        <div 
          className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-tr from-[#160b29] via-[#24133f] to-[#120822] border-2 border-purple-500/25 shadow-[0_0_90px_rgba(168,85,247,0.25),inset_0_0_40px_rgba(147,51,234,0.3)] flex items-center justify-center overflow-hidden"
          style={{ transform: 'translateZ(-30px)' }}
        >
          {/* Internal Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.3),transparent_70%)]" />
          <div className="absolute inset-4 rounded-full border border-purple-500/15" />
          <div className="absolute inset-12 rounded-full border border-purple-500/10" />
        </div>

        {/* ═══ High-Res 3D Avatar Image ═══ */}
        <div 
          className="relative z-10 w-[290px] sm:w-[350px] md:w-[390px] flex items-center justify-center pointer-events-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
          style={{ transform: 'translateZ(30px)' }}
        >
          <img
            src="/assets/hero-avatar.png"
            onError={(e) => {
              // Fallback to relative path if hosted in subfolder
              (e.target as HTMLImageElement).src = './assets/hero-avatar.png';
            }}
            alt="Ratnesh Kumar Singh 3D Avatar"
            className="w-full h-auto object-contain rounded-3xl"
          />
        </div>

        {/* ═══ Floating 3D Extruded Tech Badges (Matching Reference Layout) ═══ */}
        
        {/* Top-Right: </> Code Widget */}
        <div 
          className="absolute top-6 right-2 sm:top-10 sm:right-4 z-20 transition-transform duration-300"
          style={{ transform: `translateZ(70px) translateX(${rotate.y * 0.8}px) translateY(${rotate.x * 0.8}px)` }}
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
          className="absolute top-1/2 -translate-y-1/2 -right-1 sm:right-2 z-20 transition-transform duration-300"
          style={{ transform: `translateZ(60px) translateX(${rotate.y * 0.6}px) translateY(${rotate.x * 0.6}px)` }}
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

        {/* Bottom-Right: Sliders / Hardware Control Widget */}
        <div 
          className="absolute bottom-6 right-2 sm:bottom-10 sm:right-4 z-20 transition-transform duration-300"
          style={{ transform: `translateZ(75px) translateX(${rotate.y * 0.9}px) translateY(${rotate.x * 0.9}px)` }}
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
          className="absolute -bottom-2 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#160c26]/90 border border-purple-500/30 backdrop-blur-md text-[11px] text-purple-300 font-mono shadow-lg"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive 3D Focus</span>
        </div>
      </div>
    </div>
  );
};
