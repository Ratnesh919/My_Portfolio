import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'loader' | 'bubbles' | 'done'>('loader');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Processing Asset...');
  const [isLoaderHidden, setIsLoaderHidden] = useState(false);
  const [isBubbleHidden, setIsBubbleHidden] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('raya_bubble_done')) {
      setPhase('done');
      return;
    }

    // Progress bar simulation matching original site loader
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaderHidden(true);
            setTimeout(() => setPhase('bubbles'), 600);
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 12) + 6;
        if (next > 30 && next < 60) setStatusText("Loading Character Engine...");
        else if (next >= 60 && next < 90) setStatusText("Decrypting VRM Animations...");
        else if (next >= 90) setStatusText("Processing Asset...");

        return Math.min(next, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  // Bubble Screen mechanics
  useEffect(() => {
    if (phase !== 'bubbles') return;

    const container = document.getElementById('bubble-container-el');
    if (!container) return;

    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const spawnMs = isMobile ? 1400 : 650;

    const spawnInterval = setInterval(() => {
      if (!document.getElementById('bubble-container-el')) {
        clearInterval(spawnInterval);
        return;
      }

      const b = document.createElement('div');
      b.className = 'bubble-item-el';
      const size = 35 + Math.random() * 75;
      b.style.cssText = `width:${size}px;height:${size}px;left:${5 + Math.random() * 85}vw;animation-duration:${(isMobile ? 8 : 4.5) + Math.random() * 4}s;`;

      b.addEventListener('pointerdown', (e) => {
        clearInterval(spawnInterval);
        document.querySelectorAll('.bubble-item-el').forEach((x: any) => (x.style.opacity = '0'));

        // Crack + mist burst particle effect
        const cx = e.clientX;
        const cy = e.clientY;
        const r = b.getBoundingClientRect().width * 0.5;

        for (let i = 0; i < 4; i++) {
          const ang = (i / 4) * Math.PI;
          const len = r * (1.1 + Math.random() * 0.4);
          const l = document.createElement('div');
          l.className = 'bubble-crack-line-el';
          l.style.cssText = `left:${cx}px;top:${cy}px;width:${len * 2}px;height:${1 + Math.random()}px;margin-left:${-len}px;margin-top:-0.5px;background:linear-gradient(90deg,transparent,rgba(200,235,255,0.9) 30%,#fff 50%,rgba(200,235,255,0.9) 70%,transparent);transform:rotate(${ang}rad) scaleX(0);animation-delay:${i * 0.03}s;`;
          document.body.appendChild(l);
          setTimeout(() => l.remove(), 500);
        }

        for (let i = 0; i < 6; i++) {
          const ang = (i / 6) * 2 * Math.PI + Math.random() * 0.4;
          const dist = r * (0.5 + Math.random() * 0.8);
          const sz = 2 + Math.random() * 3;
          const m = document.createElement('div');
          m.className = 'bubble-mist-dot-el';
          m.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;margin-left:${-sz / 2}px;margin-top:${-sz / 2}px;`;
          document.body.appendChild(m);
          requestAnimationFrame(() => {
            m.style.transform = `translate(${Math.cos(ang) * dist}px,${Math.sin(ang) * dist}px) scale(0)`;
          });
          setTimeout(() => m.remove(), 550);
        }

        // Fade out overlay after burst
        setTimeout(() => {
          setIsBubbleHidden(true);
          sessionStorage.setItem('raya_bubble_done', '1');
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 400);
        }, 280);
      });

      container.appendChild(b);
      setTimeout(() => {
        if (b.parentNode) b.remove();
      }, isMobile ? 15000 : 8500);
    }, spawnMs);

    return () => clearInterval(spawnInterval);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <>
      {/* ═══ Phase 1: Site Global Loading Screen (Matching Original Screenshot) ═══ */}
      {phase === 'loader' && (
        <div
          className={`fixed inset-0 z-[9999] bg-[#080808] flex items-center justify-center transition-all duration-700 select-none ${
            isLoaderHidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Radial Center Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,65,108,0.18)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative z-10 w-[85%] max-w-[500px] flex flex-col items-center gap-5 text-center">
            {/* Glowing Lightning Bolt Logo */}
            <div className="animate-pulse flex items-center justify-center">
              <Zap size={44} className="text-[#ff416c] fill-[#ff416c]/40 drop-shadow-[0_0_15px_#ff416c]" />
            </div>

            {/* Glowing Title */}
            <h1 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-[0.18em] uppercase drop-shadow-[0_0_18px_rgba(255,65,108,0.85)]">
              SYSTEM INITIALIZING
            </h1>

            {/* Progressive Bar (Red-Pink Gradient) */}
            <div className="w-full h-[6px] bg-white/[0.06] border border-white/10 rounded-full overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)] relative">
              <div
                className="h-full bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] shadow-[0_0_15px_#ff416c] transition-all duration-100 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Footer Status & Percentage */}
            <div className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider text-slate-400 font-mono">
              <span className="text-slate-300">{statusText}</span>
              <span className="text-[#ff416c] font-bold">{progress}%</span>
            </div>

            {/* Hint */}
            <p className="text-[11px] text-[#ff416c]/70 font-mono mt-2 tracking-wide">
              Switch to desktop or rotate your phone for better experience
            </p>
          </div>
        </div>
      )}

      {/* ═══ Phase 2: Bubble Entry Screen ("Tap a Bubble to Enter") ═══ */}
      {phase === 'bubbles' && (
        <div
          id="bubble-screen"
          className={`fixed inset-0 z-[9998] bg-[#080808]/95 backdrop-blur-[12px] flex flex-col items-center justify-center transition-all duration-700 select-none ${
            isBubbleHidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-wide text-center drop-shadow-[0_0_25px_rgba(255,65,108,0.85)] pointer-events-none animate-pulse">
            Tap a Bubble to Enter
          </div>
          <div id="bubble-container-el" className="absolute inset-0 overflow-hidden pointer-events-none" />

          <style>{`
            .bubble-item-el {
              position: absolute;
              bottom: -100px;
              border-radius: 50%;
              background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 65, 108, 0.25) 60%, rgba(79, 172, 254, 0.3) 100%);
              border: 1px solid rgba(255, 255, 255, 0.4);
              box-shadow: 0 0 20px rgba(255, 65, 108, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3);
              animation: floatBubbleUp linear infinite;
              cursor: pointer;
              pointer-events: auto !important;
              transition: transform 0.2s ease, opacity 0.3s ease;
            }
            .bubble-item-el:hover {
              transform: scale(1.15);
              box-shadow: 0 0 30px rgba(255, 65, 108, 0.9), inset 0 0 20px #fff;
            }
            @keyframes floatBubbleUp {
              0% { transform: translateY(0) rotate(0deg); opacity: 0; }
              10% { opacity: 0.9; }
              90% { opacity: 0.9; }
              100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
            }
            .bubble-crack-line-el {
              position: fixed;
              pointer-events: none;
              z-index: 10000;
              animation: crackAnim 0.45s ease-out forwards;
            }
            @keyframes crackAnim {
              0% { transform: scaleX(0); opacity: 1; }
              100% { transform: scaleX(1); opacity: 0; }
            }
            .bubble-mist-dot-el {
              position: fixed;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.9);
              box-shadow: 0 0 8px #ff416c;
              pointer-events: none;
              z-index: 10000;
              transition: transform 0.5s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.5s ease;
            }
          `}</style>
        </div>
      )}
    </>
  );
};
