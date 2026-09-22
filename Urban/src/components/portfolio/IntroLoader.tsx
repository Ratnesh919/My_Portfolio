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

    // 20-second fallback timeout in case WebGL or network takes longer
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
    const spawnMs = isMobile ? 650 : 400;

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
          if ((window as any).chatBot) (window as any).chatBot._userHasGestured = true;
          try {
            const primer = new SpeechSynthesisUtterance('');
            primer.volume = 0;
            window.speechSynthesis.speak(primer);
          } catch (e) {}
          if ((window as any).onBubblePopped) (window as any).onBubblePopped();
        }, 350);
      }, 200);
    };

    const spawnBubble = (initialBottom?: number) => {
      const outerEl = document.getElementById('soap-bubble-container');
      if (!outerEl || isCompletedRef.current) return;

      const size = 60 + Math.random() * 92; // 60–152px
      const leftPct = 4 + Math.random() * 90;
      const dur = (isMobile ? 8.0 : 6.0) + Math.random() * 4.0;
      const wobDur = 3.0 + Math.random() * 3.2;
      const shimmerDelay = Math.random() * 5;

      const outer = document.createElement('div');
      outer.className = 'soap-bubble-outer';
      outer.style.cssText = `
        position: absolute;
        left: ${leftPct}vw;
        bottom: ${initialBottom !== undefined ? initialBottom : -150}px;
        width: ${size}px;
        height: ${size}px;
        --wob-dur: ${wobDur}s;
        --shimmer-delay: -${shimmerDelay}s;
        animation: floatSoapBubble ${dur}s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        pointer-events: none;
        z-index: 30;
      `;

      const inner = document.createElement('div');
      inner.className = 'soap-bubble-inner';
      inner.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: 50%;
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

      setTimeout(() => {
        if (outer.parentNode) outer.remove();
      }, dur * 1000 + 200);
    };

    // Pre-seed 8 bubbles at staggered heights so screen is instantly populated
    const initialHeights = [80, 220, 360, 500, 150, 290, 430, 570];
    initialHeights.forEach((h, idx) => {
      setTimeout(() => spawnBubble(h), idx * 30);
    });

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
      {/* ═══ Phase 1: Progressive Loading ═══ */}
      {phase === 'loader' && (
        <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,65,108,0.22)_0%,transparent_65%)] pointer-events-none" />
          <div className="relative z-10 w-[85%] max-w-[500px] flex flex-col items-center gap-5 text-center">
            <div className="animate-pulse flex items-center justify-center">
              <Zap size={46} className="text-[#ff416c] fill-[#ff416c]/40 drop-shadow-[0_0_18px_#ff416c]" />
            </div>
            <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.14em] uppercase drop-shadow-[0_0_22px_rgba(255,65,108,0.9)]">
              RATNESH SINGH
            </h1>
            <div className="w-full h-[6px] bg-white/[0.07] border border-white/10 rounded-full overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)] relative">
              <div
                className="h-full bg-gradient-to-r from-[#ff416c] via-[#ff4b2b] to-[#38bdf8] shadow-[0_0_16px_#ff416c] transition-all duration-100 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
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

      {/* ═══ Phase 2: Realistic Soap Bubbles ═══ */}
      {phase === 'bubbles' && (
        <div
          id="bubble-screen"
          className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-500 overflow-hidden cursor-pointer"
          onClick={(e) => {
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
          {/* Multi-layer deep-space ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 85% 65% at 50% 42%, rgba(168,85,247,0.20) 0%, transparent 65%),
                radial-gradient(ellipse 55% 38% at 18% 82%, rgba(255,65,108,0.13) 0%, transparent 58%),
                radial-gradient(ellipse 48% 32% at 82% 18%, rgba(56,189,248,0.11) 0%, transparent 52%)
              `
            }}
          />

          {/* CTA text */}
          <div className="relative z-10 text-3xl sm:text-5xl font-black text-white font-sans tracking-wide text-center drop-shadow-[0_0_25px_rgba(255,65,108,0.9)] pointer-events-none animate-pulse">
            Pop a Bubble
          </div>
          <p className="relative z-10 text-xs sm:text-sm text-purple-300 font-mono mt-3 opacity-80 pointer-events-none">
            Pop a bubble to enter the experience
          </p>

          {/* Bubble container */}
          <div id="soap-bubble-container" className="absolute inset-0 overflow-hidden" style={{ pointerEvents: 'none' }} />

          {/* ═══════════════════════════════════════════════════════
              REALISTIC SOAP BUBBLE CSS — v2 Enhanced Glass
          ═══════════════════════════════════════════════════════ */}
          <style>{`
            /* ── Float path: slow rise with lateral sine drift ── */
            @keyframes floatSoapBubble {
              0%   { transform: translateY(0px)      translateX(0px);   opacity: 0; }
              5%   { opacity: 1; }
              22%  { transform: translateY(-28vh)    translateX(22px); }
              44%  { transform: translateY(-56vh)    translateX(-16px); }
              66%  { transform: translateY(-84vh)    translateX(24px); }
              88%  { transform: translateY(-112vh)   translateX(-18px); }
              95%  { opacity: 0.88; }
              100% { transform: translateY(-132vh)   translateX(12px);  opacity: 0; }
            }

            /* ── Organic squish / wobble (per-bubble timing via CSS var) ── */
            @keyframes bubbleWobble {
              0%   { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; transform: scale(1.00, 1.00) rotate(0deg); }
              18%  { border-radius: 49% 51% 52% 48% / 51% 49% 51% 49%; transform: scale(1.04, 0.96) rotate(0.3deg); }
              42%  { border-radius: 53% 47% 46% 54% / 48% 52% 48% 52%; transform: scale(0.96, 1.04) rotate(-0.5deg); }
              68%  { border-radius: 47% 53% 54% 46% / 54% 46% 54% 46%; transform: scale(1.03, 0.97) rotate(0.4deg); }
              100% { border-radius: 51% 49% 49% 51% / 50% 50% 50% 50%; transform: scale(0.98, 1.02) rotate(0deg); }
            }

            /* ── Animated iridescent soap-film hue cycling ── */
            @keyframes iridescentFilm {
              0%   { background-position: 0%   40%; filter: hue-rotate(0deg)   brightness(1.00) saturate(1.2); }
              25%  { background-position: 65%  75%; filter: hue-rotate(95deg)  brightness(1.06) saturate(1.3); }
              50%  { background-position: 100% 35%; filter: hue-rotate(200deg) brightness(1.00) saturate(1.2); }
              75%  { background-position: 38%  80%; filter: hue-rotate(295deg) brightness(1.06) saturate(1.3); }
              100% { background-position: 0%   40%; filter: hue-rotate(360deg) brightness(1.00) saturate(1.2); }
            }

            /* ── Top-left specular breathe ── */
            @keyframes specularPulse {
              0%   { opacity: 0.88; transform: rotate(-35deg) scale(1.00); }
              50%  { opacity: 1.00; transform: rotate(-35deg) scale(1.12); }
              100% { opacity: 0.88; transform: rotate(-35deg) scale(1.00); }
            }

            /* ── Pop crack burst ── */
            @keyframes soapCrackAnim {
              0%   { transform: scaleX(0); opacity: 1; }
              100% { transform: scaleX(1); opacity: 0; }
            }

            /* ════════════════════════════════════
               OUTER wrapper — positioning & timing
            ════════════════════════════════════ */
            .soap-bubble-outer {
              will-change: transform, opacity;
            }

            /* ════════════════════════════════════
               INNER SPHERE — true soap bubble
            ════════════════════════════════════ */
            .soap-bubble-inner {
              background:
                radial-gradient(
                  circle at 38% 36%,
                  transparent                30%,
                  rgba(130, 220, 255, 0.04)  55%,
                  rgba(255,  90, 200, 0.07)  78%,
                  rgba(160, 120, 255, 0.10) 100%
                );
              background-size: 100% 100%;

              animation:
                bubbleWobble var(--wob-dur, 4s) ease-in-out infinite alternate,
                iridescentFilm 7s ease-in-out infinite;
              animation-delay: 0s, var(--shimmer-delay, 0s);

              border: 1.2px solid rgba(255, 255, 255, 0.50);

              box-shadow:
                inset  9px  9px 18px rgba(255, 255, 255, 0.88),
                inset  0px  6px 10px rgba(220, 240, 255, 0.22),
                inset -5px -5px 12px rgba(100, 220, 255, 0.18),
                inset  0    0   1px  rgba(255, 140, 220, 0.50),
                inset  0    0   28px rgba(180, 140, 255, 0.05),
                0  0   6px  rgba(200, 120, 255, 0.22),
                0  0  18px  rgba(168,  85, 247, 0.12),
                0 14px 20px rgba(0, 0, 0, 0.18);

              backdrop-filter: blur(0.3px) brightness(1.02);
              -webkit-backdrop-filter: blur(0.3px) brightness(1.02);

              cursor: pointer;
              transition:
                transform  0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.18s ease;
            }

            .soap-bubble-inner::before {
              content: '';
              position: absolute;
              top: 8%;
              left: 11%;
              width: 42%;
              height: 26%;
              border-radius: 50% 50% 38% 38% / 62% 62% 28% 28%;
              background: radial-gradient(
                ellipse at 36% 28%,
                rgba(255, 255, 255, 1.00)   0%,
                rgba(255, 255, 255, 0.80)  30%,
                rgba(220, 240, 255, 0.38)  62%,
                transparent                85%
              );
              transform: rotate(-35deg);
              filter: blur(0.4px);
              animation: specularPulse 4.5s ease-in-out infinite;
              animation-delay: var(--shimmer-delay, 0s);
              pointer-events: none;
            }

            .soap-bubble-inner::after {
              content: '';
              position: absolute;
              bottom: 11%;
              right: 13%;
              width: 24%;
              height: 14%;
              border-radius: 50%;
              background: radial-gradient(
                circle at 50% 50%,
                rgba(255, 255, 255, 0.90)   0%,
                rgba(200, 240, 255, 0.50)  40%,
                transparent                76%
              );
              transform: rotate(20deg);
              filter: blur(0.6px);
              pointer-events: none;
            }

            .soap-bubble-inner:hover {
              transform: scale(1.12);
              box-shadow:
                inset 10px 10px 20px rgba(255, 255, 255, 0.96),
                inset  0px  7px 12px rgba(220, 245, 255, 0.30),
                inset -6px -6px 14px rgba( 90, 220, 255, 0.28),
                inset  0    0   1px  rgba(255, 120, 220, 0.70),
                inset  0    0   30px rgba(180, 140, 255, 0.07),
                0  0  10px  rgba(200, 120, 255, 0.45),
                0  0  26px  rgba(236,  72, 153, 0.28),
                0  0  50px  rgba(168,  85, 247, 0.22),
                0 18px 24px rgba(0, 0, 0, 0.22);
            }
          `}</style>
        </div>
      )}
    </div>
  );
};
