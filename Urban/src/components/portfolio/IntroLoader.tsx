import React, { useState, useEffect, useRef } from 'react';
import { Zap, Sparkles, ArrowRight } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing core systems...');
  const [isReady, setIsReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const isEnteringRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('raya_bubble_done')) {
      setIsCompleted(true);
      onComplete();
      if ((window as any).activateAvatarAndChatbot) (window as any).activateAvatarAndChatbot();
      return;
    }

    let isFinished = false;
    const finishLoading = () => {
      if (isFinished) return;
      isFinished = true;
      setProgress(100);
      setStatusText('All Systems Online');
      setIsReady(true);
    };

    // If VRM already finished loading before IntroLoader mounted
    if ((window as any)._vrmIsReady) {
      finishLoading();
      return;
    }

    // Hook VRM live download progress
    (window as any).onVRMLoadProgress = (pct: number, customStatus?: string) => {
      setProgress((prev) => {
        const nextVal = Math.max(prev, Math.min(pct, 100));
        if (nextVal >= 100) {
          finishLoading();
        }
        return nextVal;
      });
      if (customStatus) {
        setStatusText(customStatus);
      } else {
        if (pct < 30) setStatusText('Loading 3D character...');
        else if (pct < 75) setStatusText('Downloading textures & materials...');
        else if (pct < 95) setStatusText('Retargeting animations & bones...');
        else setStatusText('All Systems Online');
      }
    };

    (window as any).onVRMReady = () => {
      finishLoading();
    };

    // 40-second fallback in case network stalls
    const fallbackTimer = setTimeout(() => {
      finishLoading();
    }, 40000);

    return () => {
      clearTimeout(fallbackTimer);
      delete (window as any).onVRMLoadProgress;
      delete (window as any).onVRMReady;
    };
  }, [onComplete]);

  const handleEnterExperience = () => {
    if (isEnteringRef.current) return;
    isEnteringRef.current = true;

    // Browser audio speech primer on user gesture
    try {
      const primer = new SpeechSynthesisUtterance('');
      primer.volume = 0;
      window.speechSynthesis.speak(primer);
    } catch (e) {}

    // Begin cinematic smooth fade out
    setIsFadingOut(true);
    sessionStorage.setItem('raya_bubble_done', '1');

    setTimeout(() => {
      setIsCompleted(true);
      onComplete();
      if ((window as any).activateAvatarAndChatbot) (window as any).activateAvatarAndChatbot();
      if ((window as any).chatBot) (window as any).chatBot._userHasGestured = true;
      if (typeof (window as any).onBubblePopped === 'function') {
        (window as any).onBubblePopped();
      }
    }, 600);
  };

  if (isCompleted) return null;

  return (
    <div
      id="master-intro-overlay"
      style={{ zIndex: 2147483647 }}
      className={`fixed inset-0 bg-[#07050d] flex items-center justify-center transition-all duration-700 select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic ambient radial backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,65,108,0.22)_0%,rgba(168,85,247,0.14)_35%,transparent_70%)]" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-[90%] max-w-[520px] flex flex-col items-center gap-6 text-center px-4">
        {/* Glowing Icon & Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff416c] to-[#38bdf8] rounded-2xl blur-xl opacity-60 animate-pulse" />
            <div className="relative w-16 h-16 rounded-2xl bg-[#120a22]/90 border border-purple-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(255,65,108,0.5)]">
              <Zap size={34} className="text-[#ff416c] fill-[#ff416c]/40 drop-shadow-[0_0_12px_#ff416c]" />
            </div>
          </div>

          <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.14em] uppercase drop-shadow-[0_0_24px_rgba(255,65,108,0.85)] mt-1">
            RATNESH SINGH
          </h1>
          <p className="text-xs sm:text-sm font-mono text-purple-300 tracking-wider">
            Interactive 3D Portfolio &bull; AI Companion System
          </p>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-full flex flex-col gap-3">
          <div className="w-full h-[7px] bg-white/[0.07] border border-white/10 rounded-full overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)] relative">
            <div
              className="h-full bg-gradient-to-r from-[#ff416c] via-[#a855f7] to-[#38bdf8] shadow-[0_0_20px_#ff416c] transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider font-mono">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isReady ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse' : 'bg-[#ff416c] shadow-[0_0_8px_#ff416c]'}`} />
              <span className="text-slate-300">{statusText}</span>
            </div>
            <span className="text-[#ff416c] font-bold">{progress}%</span>
          </div>
        </div>

        {/* ═══ Elite Cyber CTA Button (Visible when 100% loaded) ═══ */}
        {isReady ? (
          <div className="w-full pt-3 animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center gap-3">
            <button
              onClick={handleEnterExperience}
              className="group relative w-full sm:w-auto min-w-[280px] p-[2px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,65,108,0.45),0_0_20px_rgba(56,189,248,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              {/* Animated gradient neon border */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff416c] via-[#a855f7] to-[#38bdf8]" />
              
              {/* Inner button glass body */}
              <div className="relative px-8 py-4 bg-[#0e071e]/95 backdrop-blur-xl rounded-[14px] flex items-center justify-center gap-3 text-white transition-colors duration-300 group-hover:bg-[#160d2b]/95">
                <Sparkles size={20} className="text-[#ff416c] group-hover:text-purple-300 transition-colors animate-pulse" />
                <span className="font-sans font-bold text-sm sm:text-base tracking-[0.08em] uppercase drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
                  Enter Experience
                </span>
                <ArrowRight size={20} className="text-[#38bdf8] group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </button>
            <span className="text-[11px] font-mono text-purple-400/80 tracking-wide">
              Click to launch interactive 3D workspace & audio
            </span>
          </div>
        ) : (
          <div className="w-full pt-2">
            <p className="text-[11px] text-slate-400/70 font-mono tracking-wide">
              Optimizing WebGL shaders & streaming animations...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
