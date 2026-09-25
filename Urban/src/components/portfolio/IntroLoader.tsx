import React, { useState, useEffect, useRef } from 'react';
import { Zap, Sparkles, ChevronRight } from 'lucide-react';
import TactileButton from '@/components/ui/tactile-button';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'loader' | 'ready' | 'done'>('loader');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Loading...');
  const [isExiting, setIsExiting] = useState(false);
  const isCompletedRef = useRef(false);

  useEffect(() => {
    // If user already entered previously in this session, skip intro immediately
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
      setStatusText('Ready! Click below to enter...');
      setTimeout(() => {
        setPhase('ready');
      }, 350);
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
        if (pct < 30) setStatusText('Loading 3D character engine...');
        else if (pct < 75) setStatusText('Downloading textures & materials...');
        else if (pct < 95) setStatusText('Retargeting kinematics & speech...');
        else setStatusText('Ready! Click to enter...');
      }
      if (pct >= 100) {
        finishLoading();
      }
    };

    (window as any).onVRMReady = () => {
      finishLoading();
    };

    // Fallback safety timeout (12s)
    const fallbackTimer = setTimeout(() => {
      finishLoading();
    }, 12000);

    return () => {
      clearTimeout(fallbackTimer);
      delete (window as any).onVRMLoadProgress;
      delete (window as any).onVRMReady;
    };
  }, [onComplete]);

  // Complete sequence & unlock companion systems
  const handleEnter = () => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;

    // Start fade-out animation
    setIsExiting(true);
    sessionStorage.setItem('raya_bubble_done', '1');

    setTimeout(() => {
      setPhase('done');
      onComplete();

      // 1. Activate 3D avatar & Raya chatbot canvas
      if ((window as any).activateAvatarAndChatbot) {
        (window as any).activateAvatarAndChatbot();
      }

      // 2. Mark chatbot user gesture flag to allow autonomous voice
      if ((window as any).chatBot) {
        (window as any).chatBot._userHasGestured = true;
      }

      // 3. Primer for Web Speech API to unlock browser audio restrictions
      try {
        const primer = new SpeechSynthesisUtterance('');
        primer.volume = 0;
        window.speechSynthesis.speak(primer);
      } catch (e) {
        console.warn('Speech synthesis primer failed:', e);
      }

      // 4. Trigger wave kinematics & greeting voice
      if ((window as any).playWaveAnimation) {
        (window as any).playWaveAnimation();
      }

      // 5. Backwards-compatible hook for legacy listeners
      if ((window as any).onBubblePopped) {
        (window as any).onBubblePopped();
      }
    }, 450);
  };

  if (phase === 'done') return null;

  return (
    <div
      id="master-intro-overlay"
      style={{ zIndex: 2147483647 }}
      className={`fixed inset-0 bg-[#07050d] flex items-center justify-center transition-all duration-500 select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ═══ Phase 1: Progressive Loading Screen ═══ */}
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
                className="h-full bg-gradient-to-r from-[#ff416c] via-[#ff4b2b] to-[#38bdf8] shadow-[0_0_16px_#ff416c] transition-all duration-150 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider text-slate-400 font-mono">
              <span className="text-slate-300">{statusText}</span>
              <span className="text-[#ff416c] font-bold">{progress}%</span>
            </div>
            <p className="text-[11px] text-[#ff416c]/80 font-mono mt-1 tracking-wide">
              Initializing 3D character & interactive systems...
            </p>
          </div>
        </div>
      )}

      {/* ═══ Phase 2: Enter Portfolio with Tactile Button ═══ */}
      {phase === 'ready' && (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 animate-in fade-in zoom-in-95 duration-500">
          {/* Ambient Cybernetic Lighting */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 70% 50% at 50% 50%, rgba(56,189,248,0.12) 0%, transparent 65%),
                radial-gradient(circle 350px at 50% 45%, rgba(255,65,108,0.15) 0%, transparent 70%),
                radial-gradient(ellipse 90% 70% at 50% 100%, rgba(168,85,247,0.1) 0%, transparent 60%)
              `,
            }}
          />

          {/* Futuristic Card Presentation */}
          <div className="relative z-20 flex flex-col items-center max-w-lg w-full text-center p-6 sm:p-8 rounded-3xl bg-[#0b0c16]/70 border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(255,65,108,0.15)]">
            {/* Status indicator badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-5 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              SYSTEM READY &bull; 3D ENGINE LOADED
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] mb-2">
              Ratnesh Singh
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light mb-8 max-w-sm">
              Portfolio &amp; Interactive 3D AI Companion
            </p>

            {/* Fluidic Tactile Button Container */}
            <div className="relative w-full flex flex-col items-center justify-center my-2">
              <div className="w-[280px] h-[90px] sm:w-[320px] sm:h-[95px] relative rounded-[22px] overflow-hidden p-[1px] bg-gradient-to-r from-cyan-500/40 via-[#ff416c]/40 to-cyan-500/40 shadow-[0_10px_35px_rgba(6,182,212,0.3)] transition-transform hover:scale-105 active:scale-95">
                <TactileButton
                  mode="dark"
                  label="ENTER PORTFOLIO"
                  onClick={handleEnter}
                  className="w-full h-full rounded-[21px]"
                />
              </div>

              {/* Direct fallback click anchor for accessibility & instant trigger */}
              <button
                type="button"
                onClick={handleEnter}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400/80 hover:text-cyan-300 transition-colors uppercase tracking-wider cursor-pointer"
              >
                <span>Click here or button above</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Micro instruction footer */}
            <p className="text-[11px] text-slate-400 font-mono mt-4 flex items-center gap-1.5 opacity-75">
              <Sparkles size={12} className="text-cyan-400" />
              Initializes spatial audio &amp; interactive VRM avatar
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
