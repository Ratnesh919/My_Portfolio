import React, { useState, useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';
import TactileButton from '@/components/ui/tactile-button';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress]     = useState(0);
  const [statusText, setStatusText] = useState('Initializing 3D engine...');
  const [isReady, setIsReady]       = useState(false);
  const [isDone, setIsDone]         = useState(false);
  const [isExiting, setIsExiting]   = useState(false);
  const isCompletedRef              = useRef(false);

  /* ── VRM progress hook ─────────────────────────────────────────── */
  useEffect(() => {
    // Already visited this session → skip intro instantly
    if (sessionStorage.getItem('raya_bubble_done')) {
      setIsDone(true);
      onComplete();
      return;
    }

    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setStatusText('Click to enter →');
      // Short delay so the user sees the button hit 100% before it unlocks
      setTimeout(() => setIsReady(true), 400);
    };

    // VRM may have already loaded before React mounted
    if ((window as any)._vrmIsReady) { finish(); return; }

    // Live download progress from vrm-loader.js
    (window as any).onVRMLoadProgress = (pct: number, customStatus?: string) => {
      setProgress((prev) => Math.max(prev, Math.min(pct, 100)));
      if (customStatus) {
        setStatusText(customStatus);
      } else {
        if (pct < 25)      setStatusText('Loading 3D character...');
        else if (pct < 60) setStatusText('Downloading textures & materials...');
        else if (pct < 90) setStatusText('Retargeting animations...');
        else               setStatusText('Almost ready...');
      }
      if (pct >= 100) finish();
    };

    (window as any).onVRMReady = finish;

    // 12-second safety net in case WebGL or network stalls
    const fallback = setTimeout(finish, 12000);

    return () => {
      clearTimeout(fallback);
      delete (window as any).onVRMLoadProgress;
      delete (window as any).onVRMReady;
    };
  }, [onComplete]);

  /* ── Entry sequence ────────────────────────────────────────────── */
  const handleEnter = () => {
    if (!isReady || isCompletedRef.current) return;
    isCompletedRef.current = true;

    setIsExiting(true);
    sessionStorage.setItem('raya_bubble_done', '1');

    setTimeout(() => {
      setIsDone(true);
      onComplete();

      // Activate 3D avatar canvas & Raya chatbot
      if ((window as any).activateAvatarAndChatbot) (window as any).activateAvatarAndChatbot();

      // Unlock autonomous speech synthesis
      if ((window as any).chatBot) (window as any).chatBot._userHasGestured = true;
      try {
        const primer = new SpeechSynthesisUtterance('');
        primer.volume = 0;
        window.speechSynthesis.speak(primer);
      } catch (_) {}

      // Wave animation + Raya greeting
      if ((window as any).playWaveAnimation) (window as any).playWaveAnimation();

      // Legacy listeners
      if ((window as any).onBubblePopped) (window as any).onBubblePopped();
    }, 450);
  };

  if (isDone) return null;

  return (
    <div
      id="master-intro-overlay"
      style={{ zIndex: 2147483647 }}
      className={`fixed inset-0 bg-[#07050d] flex items-center justify-center transition-all duration-500 select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient radial glow — shifts from red-ish → cyan as loading completes */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: isReady
            ? `radial-gradient(ellipse 70% 55% at 50% 50%, rgba(6,182,212,0.18) 0%, transparent 65%)`
            : `radial-gradient(ellipse 60% 45% at 50% 50%, rgba(255,65,108,0.14) 0%, transparent 65%)`,
        }}
      />

      {/* ── Single unified card ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6 w-full max-w-sm">

        {/* Logo / icon */}
        <div className={`flex items-center justify-center transition-all duration-700 ${isReady ? 'scale-90 opacity-60' : 'animate-pulse'}`}>
          <Zap
            size={40}
            className={`drop-shadow-[0_0_16px_currentColor] transition-colors duration-700 ${
              isReady ? 'text-cyan-400 fill-cyan-400/30' : 'text-[#ff416c] fill-[#ff416c]/30'
            }`}
          />
        </div>

        {/* Name */}
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-[0.14em] uppercase drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]">
          RATNESH SINGH
        </h1>

        {/* ── The button IS the loading indicator ── */}
        <div className="w-full flex flex-col items-center gap-3">
          <TactileButton
            progress={progress}
            isReady={isReady}
            label="ENTER PORTFOLIO"
            onClick={handleEnter}
            className="w-[280px] h-[76px] sm:w-[320px] sm:h-[82px]"
          />

          {/* Status text sits below the button */}
          <p
            className={`text-xs font-mono tracking-wider transition-colors duration-500 ${
              isReady ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            {statusText}
          </p>
        </div>

        {/* Footer hint — only shown once loading completes */}
        {isReady && (
          <p className="text-[11px] text-slate-500 font-mono animate-in fade-in duration-700">
            Activates spatial audio &amp; 3D companion
          </p>
        )}
      </div>
    </div>
  );
};
