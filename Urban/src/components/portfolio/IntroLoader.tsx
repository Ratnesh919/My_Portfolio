import React, { useState, useEffect, useRef } from 'react';
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
  const isCompletedRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('raya_bubble_done')) {
      setPhase('done');
      onComplete();
      return;
    }

    // Realistic progressive loading bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaderHidden(true);
            setTimeout(() => setPhase('bubbles'), 400);
          }, 250);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 12) + 8;
        if (next > 20 && next < 50) setStatusText("Setting up 3D environment...");
        else if (next >= 50 && next < 80) setStatusText("Preparing interactive audio & guide...");
        else if (next >= 80) setStatusText("Welcome! Getting things ready...");

        return Math.min(next, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Transparent Soap Bubbles System
  useEffect(() => {
    if (phase !== 'bubbles') return;

    const container = document.getElementById('soap-bubble-container');
    if (!container) return;

    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const spawnMs = isMobile ? 1000 : 500;

    const spawnInterval = setInterval(() => {
      if (!document.getElementById('soap-bubble-container')) {
        clearInterval(spawnInterval);
        return;
      }

      const b = document.createElement('div');
      b.className = 'soap-bubble';
      const size = 48 + Math.random() * 80;
      const leftPos = 5 + Math.random() * 90;
      const duration = (isMobile ? 7.0 : 4.2) + Math.random() * 3.0;

      b.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${leftPos}vw;
        animation-duration: ${duration}s;
      `;

      b.addEventListener('pointerdown', (e) => {
        if (isCompletedRef.current) return;
        isCompletedRef.current = true;
        clearInterval(spawnInterval);

        // Hide all bubbles
        document.querySelectorAll('.soap-bubble').forEach((el: any) => {
          el.style.opacity = '0';
          el.style.transform = 'scale(1.25)';
        });

        // Bubble burst particles & crack lines
        const cx = e.clientX;
        const cy = e.clientY;
        const r = b.getBoundingClientRect().width * 0.5;

        for (let i = 0; i < 6; i++) {
          const ang = (i / 6) * Math.PI;
          const len = r * (1.2 + Math.random() * 0.4);
          const l = document.createElement('div');
          l.className = 'soap-crack-line';
          l.style.cssText = `
            left: ${cx}px;
            top: ${cy}px;
            width: ${len * 2}px;
            height: ${1.5 + Math.random()}px;
            margin-left: ${-len}px;
            margin-top: -0.75px;
            background: linear-gradient(90deg, transparent, rgba(255, 180, 220, 0.9) 30%, #fff 50%, rgba(180, 230, 255, 0.9) 70%, transparent);
            transform: rotate(${ang}rad) scaleX(0);
            animation-delay: ${i * 0.02}s;
          `;
          document.body.appendChild(l);
          setTimeout(() => l.remove(), 450);
        }

        for (let i = 0; i < 10; i++) {
          const ang = (i / 10) * 2 * Math.PI + Math.random() * 0.4;
          const dist = r * (0.6 + Math.random() * 0.8);
          const sz = 2.5 + Math.random() * 3.5;
          const m = document.createElement('div');
          m.className = 'soap-mist-dot';
          m.style.cssText = `
            left: ${cx}px;
            top: ${cy}px;
            width: ${sz}px;
            height: ${sz}px;
            margin-left: ${-sz / 2}px;
            margin-top: ${-sz / 2}px;
          `;
          document.body.appendChild(m);
          requestAnimationFrame(() => {
            m.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px) scale(0)`;
          });
          setTimeout(() => m.remove(), 500);
        }

        // Fade out overlay completely and unveil portfolio
        setTimeout(() => {
          setIsBubbleHidden(true);
          sessionStorage.setItem('raya_bubble_done', '1');
          setTimeout(() => {
            setPhase('done');
            onComplete();
            if ((window as any).activateAvatarAndChatbot) {
              (window as any).activateAvatarAndChatbot();
            }
            if ((window as any).chatBot) {
              (window as any).chatBot._userHasGestured = true;
            }
          }, 400);
        }, 220);
      });

      container.appendChild(b);
      setTimeout(() => {
        if (b.parentNode) b.remove();
      }, isMobile ? 12000 : 8000);
    }, spawnMs);

    return () => clearInterval(spawnInterval);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      id="master-intro-overlay"
      className={`fixed inset-0 z-[9999999] bg-[#07050d] flex items-center justify-center transition-opacity duration-700 select-none ${
        isBubbleHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ═══ Phase 1: Progressive Loading Screen ═══ */}
      {phase === 'loader' && (
        <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-300">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,65,108,0.22)_0%,transparent_65%)] pointer-events-none" />

          <div className="relative z-10 w-[85%] max-w-[500px] flex flex-col items-center gap-5 text-center">
            {/* Pulsing Lightning Bolt Icon */}
            <div className="animate-pulse flex items-center justify-center">
              <Zap size={46} className="text-[#ff416c] fill-[#ff416c]/40 drop-shadow-[0_0_18px_#ff416c]" />
            </div>

            {/* Glowing Title */}
            <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.14em] uppercase drop-shadow-[0_0_22px_rgba(255,65,108,0.9)]">
              RATNESH SINGH
            </h1>

            {/* Red to Blue Gradient Progressive Bar */}
            <div className="w-full h-[6px] bg-white/[0.07] border border-white/10 rounded-full overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)] relative">
              <div
                className="h-full bg-gradient-to-r from-[#ff416c] via-[#ff4b2b] to-[#38bdf8] shadow-[0_0_16px_#ff416c] transition-all duration-100 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status Footer */}
            <div className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider text-slate-400 font-mono">
              <span className="text-slate-300">{statusText}</span>
              <span className="text-[#ff416c] font-bold">{progress}%</span>
            </div>

            <p className="text-[11px] text-[#ff416c]/80 font-mono mt-1 tracking-wide">
              Tap a bubble on the next screen to enter
            </p>
          </div>
        </div>
      )}

      {/* ═══ Phase 2: Tap a Bubble to Enter (Soap Bubbles Floating) ═══ */}
      {phase === 'bubbles' && (
        <div
          id="bubble-screen"
          className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-500"
        >
          {/* Glowing Ambient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,0.15)_0%,rgba(255,65,108,0.12)_40%,transparent_75%)] pointer-events-none" />

          <div className="relative z-10 text-3xl sm:text-5xl font-black text-white font-sans tracking-wide text-center drop-shadow-[0_0_25px_rgba(255,65,108,0.9)] pointer-events-none animate-pulse">
            Tap a Bubble to Enter
          </div>
          <p className="relative z-10 text-xs sm:text-sm text-purple-300 font-mono mt-3 opacity-80 pointer-events-none">
            Pop any soap bubble to start the experience
          </p>

          <div id="soap-bubble-container" className="absolute inset-0 overflow-hidden pointer-events-none" />

          <style>{`
            /* Realistic Transparent Soap Bubble Styling */
            .soap-bubble {
              position: absolute;
              bottom: -120px;
              border-radius: 50%;
              /* Iridescent transparent soap sheen */
              background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 35%, rgba(180, 220, 255, 0.12) 65%, rgba(255, 120, 180, 0.2) 100%);
              border: 1.5px solid rgba(255, 255, 255, 0.55);
              box-shadow: 
                inset 3px 3px 8px rgba(255, 255, 255, 0.6),
                inset -3px -3px 8px rgba(180, 230, 255, 0.35),
                inset 0 0 12px rgba(255, 105, 180, 0.25),
                0 0 18px rgba(255, 65, 108, 0.35);
              animation: floatSoapBubble linear infinite;
              cursor: pointer;
              pointer-events: auto !important;
              transition: transform 0.2s ease, opacity 0.25s ease;
              backdrop-filter: blur(1.5px);
            }
            .soap-bubble::before {
              content: '';
              position: absolute;
              top: 15%;
              left: 20%;
              width: 25%;
              height: 18%;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.75);
              transform: rotate(-30deg);
              filter: blur(0.5px);
            }
            .soap-bubble::after {
              content: '';
              position: absolute;
              bottom: 18%;
              right: 22%;
              width: 12%;
              height: 10%;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.4);
            }
            .soap-bubble:hover {
              transform: scale(1.18);
              box-shadow: 
                inset 4px 4px 12px rgba(255, 255, 255, 0.8),
                0 0 28px rgba(255, 65, 108, 0.7);
            }
            @keyframes floatSoapBubble {
              0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
              }
              12% {
                opacity: 0.95;
              }
              88% {
                opacity: 0.95;
              }
              100% {
                transform: translateY(-120vh) rotate(180deg);
                opacity: 0;
              }
            }
            .soap-crack-line {
              position: fixed;
              pointer-events: none;
              z-index: 1000000;
              animation: soapCrackAnim 0.4s ease-out forwards;
            }
            @keyframes soapCrackAnim {
              0% { transform: scaleX(0); opacity: 1; }
              100% { transform: scaleX(1); opacity: 0; }
            }
            .soap-mist-dot {
              position: fixed;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.95);
              box-shadow: 0 0 10px #ff416c, 0 0 4px #fff;
              pointer-events: none;
              z-index: 1000000;
              transition: transform 0.45s cubic-bezier(0.1, 0.85, 0.2, 1), opacity 0.45s ease;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};
