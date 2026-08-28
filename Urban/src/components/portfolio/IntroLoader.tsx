import React, { useState, useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'loader' | 'bubbles' | 'done'>('loader');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Loading...');
  const [isBubbleHidden, setIsBubbleHidden] = useState(false);
  const isCompletedRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('raya_bubble_done')) {
      setPhase('done');
      onComplete();
      return;
    }

    let isFinished = false;

    const finishLoading = () => {
      if (isFinished) return;
      isFinished = true;
      setProgress(100);
      setStatusText('Ready! Tap to enter...');
      setTimeout(() => {
        setPhase('bubbles');
      }, 400);
    };

    // If VRM already finished loading before IntroLoader mounted
    if ((window as any)._vrmIsReady) {
      finishLoading();
      return;
    }

    // Hook VRM live download progress
    (window as any).onVRMLoadProgress = (pct: number, customStatus?: string) => {
      setProgress((prev) => Math.max(prev, Math.min(pct, 100)));
      if (customStatus) {
        setStatusText(customStatus);
      } else {
        if (pct < 30) setStatusText('Loading 3D character...');
        else if (pct < 75) setStatusText('Downloading textures & materials...');
        else if (pct < 95) setStatusText('Retargeting animations...');
        else setStatusText('Ready! Tap to enter...');
      }
      if (pct >= 100) {
        finishLoading();
      }
    };

    (window as any).onVRMReady = () => {
      finishLoading();
    };

    // 20-second fallback timeout in case WebGL or network completely fails
    const fallbackTimer = setTimeout(() => {
      finishLoading();
    }, 20000);

    return () => {
      clearTimeout(fallbackTimer);
      delete (window as any).onVRMLoadProgress;
      delete (window as any).onVRMReady;
    };
  }, [onComplete]);

  // ── Soap Bubble Spawn System ──────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'bubbles') return;

    const container = document.getElementById('soap-bubble-container');
    if (!container) return;

    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const spawnMs = isMobile ? 700 : 450;

    const handlePop = (cx: number, cy: number, radius: number) => {
      if (isCompletedRef.current) return;
      isCompletedRef.current = true;

      // Fade all bubbles out
      document.querySelectorAll('.soap-bubble-outer').forEach((el: any) => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.2s';
      });

      // Burst crack lines
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI;
        const len = radius * (1.2 + Math.random() * 0.5);
        const l = document.createElement('div');
        l.className = 'soap-crack-line';
        l.style.cssText = `
          position: fixed;
          left: ${cx}px; top: ${cy}px;
          width: ${len * 2}px; height: 2px;
          margin-left: ${-len}px; margin-top: -1px;
          background: linear-gradient(90deg, transparent, rgba(255,180,220,0.9) 30%, #fff 50%, rgba(180,230,255,0.9) 70%, transparent);
          transform: rotate(${ang}rad) scaleX(0);
          animation: soapCrackAnim 0.35s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
          animation-delay: ${i * 0.02}s;
          pointer-events: none;
          z-index: 2147483647;
        `;
        document.body.appendChild(l);
        setTimeout(() => l.remove(), 400);
      }

      // Mist particles
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * 2 * Math.PI + Math.random() * 0.4;
        const dist = radius * (0.8 + Math.random() * 0.9);
        const sz = 3 + Math.random() * 4;
        const m = document.createElement('div');
        m.className = 'soap-mist-dot';
        m.style.cssText = `
          position: fixed;
          left: ${cx}px; top: ${cy}px;
          width: ${sz}px; height: ${sz}px;
          margin-left: ${-sz / 2}px; margin-top: ${-sz / 2}px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 30%, rgba(180,230,255,0.9) 70%, transparent 100%);
          box-shadow: 0 0 10px #ff416c, 0 0 6px #38bdf8;
          pointer-events: none;
          z-index: 2147483647;
          transition: transform 0.45s cubic-bezier(0.1, 0.85, 0.2, 1), opacity 0.45s ease;
        `;
        document.body.appendChild(m);
        requestAnimationFrame(() => {
          m.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px) scale(0)`;
          m.style.opacity = '0';
        });
        setTimeout(() => m.remove(), 500);
      }

      // Unveil portfolio & start Raya
      setTimeout(() => {
        setIsBubbleHidden(true);
        sessionStorage.setItem('raya_bubble_done', '1');
        setTimeout(() => {
          setPhase('done');
          onComplete();
          if ((window as any).activateAvatarAndChatbot) (window as any).activateAvatarAndChatbot();
          if ((window as any).onBubblePopped) (window as any).onBubblePopped();
          if ((window as any).chatBot) (window as any).chatBot._userHasGestured = true;
        }, 350);
      }, 200);
    };

    const spawnBubble = (initialBottom?: number) => {
      const outerEl = document.getElementById('soap-bubble-container');
      if (!outerEl || isCompletedRef.current) return;

      const size = 65 + Math.random() * 85; // 65px - 150px
      const leftPct = 5 + Math.random() * 88; // 5% - 93%
      const dur = (isMobile ? 7.0 : 5.0) + Math.random() * 3.0;
      const wobDur = 3.5 + Math.random() * 2.5;

      const outer = document.createElement('div');
      outer.className = 'soap-bubble-outer';
      outer.style.cssText = `
        position: absolute;
        left: ${leftPct}vw;
        bottom: ${initialBottom !== undefined ? initialBottom : -140}px;
        width: ${size}px;
        height: ${size}px;
        animation: floatSoapBubble ${dur}s linear forwards;
        pointer-events: none;
        z-index: 30;
      `;

      const inner = document.createElement('div');
      inner.className = 'soap-bubble-inner';
      inner.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: 50%;
        animation: bubbleWobble ${wobDur}s ease-in-out infinite alternate;
        cursor: pointer;
        pointer-events: auto !important;
      `;

      const onPointerDown = (e: PointerEvent | MouseEvent | TouchEvent) => {
        e.stopPropagation();
        const rect = inner.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        handlePop(cx, cy, rect.width / 2);
      };

      inner.addEventListener('pointerdown', onPointerDown as any);
      inner.addEventListener('click', onPointerDown as any);

      outer.appendChild(inner);
      outerEl.appendChild(outer);

      // Clean up after float animation completes
      setTimeout(() => {
        if (outer.parentNode) outer.remove();
      }, dur * 1000 + 200);
    };

    // Pre-seed 8 bubbles across different vertical heights so the screen has bubbles instantly
    const initialHeights = [80, 220, 360, 500, 150, 290, 430, 570];
    initialHeights.forEach((h, idx) => {
      setTimeout(() => spawnBubble(h), idx * 30);
    });

    // Continuously spawn fresh bubbles floating from bottom
    const spawnInterval = setInterval(() => {
      spawnBubble();
    }, spawnMs);

    return () => clearInterval(spawnInterval);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      id="master-intro-overlay"
      style={{ zIndex: 2147483647 }}
      className={`fixed inset-0 bg-[#07050d] flex items-center justify-center transition-opacity duration-700 select-none ${
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
          className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-500 overflow-hidden cursor-pointer"
          onClick={(e) => {
            // Background fallback click if user clicks between bubbles
            if (!isCompletedRef.current) {
              const cx = e.clientX || window.innerWidth / 2;
              const cy = e.clientY || window.innerHeight / 2;
              const firstInner = document.querySelector('.soap-bubble-inner') as HTMLElement;
              if (firstInner) {
                firstInner.dispatchEvent(new PointerEvent('pointerdown', { clientX: cx, clientY: cy }));
              }
            }
          }}
        >
          {/* Glowing Ambient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,0.18)_0%,rgba(255,65,108,0.12)_40%,transparent_75%)] pointer-events-none" />

          {/* Center Call to Action */}
          <div className="relative z-10 text-3xl sm:text-5xl font-black text-white font-sans tracking-wide text-center drop-shadow-[0_0_25px_rgba(255,65,108,0.9)] pointer-events-none animate-pulse">
            Tap a Bubble to Enter
          </div>
          <p className="relative z-10 text-xs sm:text-sm text-purple-300 font-mono mt-3 opacity-80 pointer-events-none">
            Pop any soap bubble to start the experience
          </p>

          {/* Bubble container — full screen, bubbles float across entire viewport */}
          <div
            id="soap-bubble-container"
            className="absolute inset-0 overflow-hidden"
            style={{ pointerEvents: 'none' }}
          />

          {/* Self-contained CSS rules guarantee instant, high-contrast iridescent soap bubbles */}
          <style>{`
            .soap-bubble-outer {
              will-change: transform, opacity;
            }

            .soap-bubble-inner {
              background: 
                radial-gradient(circle at 70% 80%, rgba(255, 120, 180, 0.35) 0%, transparent 45%),
                radial-gradient(circle at 25% 25%, rgba(130, 240, 255, 0.45) 0%, transparent 40%),
                radial-gradient(circle at 80% 30%, rgba(255, 230, 120, 0.3) 0%, transparent 35%),
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(160, 210, 255, 0.18) 65%, rgba(255, 130, 200, 0.38) 95%, rgba(255, 255, 255, 0.55) 100%);
              border: 1.5px solid rgba(255, 255, 255, 0.85);
              box-shadow: 
                inset 4px 4px 10px rgba(255, 255, 255, 0.9),
                inset -4px -4px 12px rgba(120, 220, 255, 0.65),
                inset 0 0 18px rgba(255, 100, 180, 0.45),
                0 0 22px rgba(168, 85, 247, 0.4),
                0 0 35px rgba(255, 65, 108, 0.3);
              backdrop-filter: blur(1px);
              -webkit-backdrop-filter: blur(1px);
              transition: transform 0.15s ease, box-shadow 0.15s ease;
            }

            .soap-bubble-inner::before {
              content: '';
              position: absolute;
              top: 10%;
              left: 14%;
              width: 38%;
              height: 24%;
              border-radius: 50% 50% 40% 40% / 60% 60% 30% 30%;
              background: radial-gradient(ellipse at 40% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 45%, transparent 80%);
              transform: rotate(-35deg);
              filter: blur(0.5px);
              pointer-events: none;
            }

            .soap-bubble-inner::after {
              content: '';
              position: absolute;
              bottom: 12%;
              right: 15%;
              width: 22%;
              height: 16%;
              border-radius: 50%;
              background: radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.85) 0%, rgba(160, 230, 255, 0.45) 50%, transparent 80%);
              transform: rotate(20deg);
              filter: blur(0.7px);
              pointer-events: none;
            }

            .soap-bubble-inner:hover {
              transform: scale(1.12);
              box-shadow: 
                inset 5px 5px 15px rgba(255, 255, 255, 1),
                inset -5px -5px 15px rgba(120, 240, 255, 0.8),
                0 0 30px rgba(236, 72, 153, 0.8),
                0 0 50px rgba(168, 85, 247, 0.6);
            }

            @keyframes floatSoapBubble {
              0% {
                transform: translateY(0);
                opacity: 0;
              }
              6% {
                opacity: 0.95;
              }
              94% {
                opacity: 0.95;
              }
              100% {
                transform: translateY(-130vh);
                opacity: 0;
              }
            }

            @keyframes bubbleWobble {
              0% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; transform: scale(1, 1); }
              33% { border-radius: 48% 52% 51% 49% / 52% 48% 52% 48%; transform: scale(1.03, 0.97); }
              66% { border-radius: 52% 48% 49% 51% / 48% 52% 48% 52%; transform: scale(0.97, 1.03); }
              100% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; transform: scale(1.02, 0.98); }
            }

            @keyframes soapCrackAnim {
              0% { transform: scaleX(0); opacity: 1; }
              100% { transform: scaleX(1); opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};
