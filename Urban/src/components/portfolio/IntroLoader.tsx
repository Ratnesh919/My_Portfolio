import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, ArrowRight } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  label: string;
  color: string;
  popped: boolean;
}

const INITIAL_BUBBLES: Bubble[] = [
  { id: 1, x: 20, y: 35, size: 75, speed: 1.2, label: "Audio DSP", color: "#a855f7", popped: false },
  { id: 2, x: 75, y: 25, size: 85, speed: 1.0, label: "MediaCodec", color: "#6366f1", popped: false },
  { id: 3, x: 45, y: 55, size: 90, speed: 1.4, label: "AI Agents", color: "#ec4899", popped: false },
  { id: 4, x: 15, y: 70, size: 70, speed: 0.9, label: "HFSS RF", color: "#8b5cf6", popped: false },
  { id: 5, x: 80, y: 65, size: 80, speed: 1.1, label: "Three.js", color: "#38bdf8", popped: false },
  { id: 6, x: 50, y: 20, size: 65, speed: 1.3, label: "Raya AI", color: "#c084fc", popped: false },
  { id: 7, x: 30, y: 80, size: 75, speed: 1.0, label: "SyncPulse", color: "#f472b6", popped: false },
  { id: 8, x: 68, y: 45, size: 70, speed: 1.2, label: "MAKAUT", color: "#818cf8", popped: false }
];

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'loading' | 'bubbles' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Raya AI System...");
  const [bubbles, setBubbles] = useState<Bubble[]>(INITIAL_BUBBLES);
  const [poppedCount, setPoppedCount] = useState(0);
  const [isUnveiling, setIsUnveiling] = useState(false);

  // Check if user already saw intro this session
  useEffect(() => {
    const alreadyDone = sessionStorage.getItem('raya_bubble_done');
    if (alreadyDone) {
      setPhase('done');
      onComplete();
      return;
    }

    // Phase 1: Simulate loading progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('bubbles'), 400);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 15) + 8;
        if (next > 30 && next < 60) setStatusText("Loading 3D Spatial Audio & Assets...");
        else if (next >= 60 && next < 90) setStatusText("Decrypting VRM Character Matrix...");
        else if (next >= 90) setStatusText("Interface Calibrated — Ready!");

        return Math.min(next, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Handle Bubble Pop
  const handlePopBubble = (id: number) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    const newCount = poppedCount + 1;
    setPoppedCount(newCount);

    // After 3 bubbles popped, finish automatically
    if (newCount >= 3) {
      finishIntro();
    }
  };

  const finishIntro = () => {
    setIsUnveiling(true);
    sessionStorage.setItem('raya_bubble_done', 'true');
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 600);
  };

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center select-none transition-opacity duration-700 ${
        isUnveiling ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } bg-[#06040a]`}
    >
      {/* Background Ambient Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/25 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/25 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(#a855f7_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-15" />
      </div>

      {/* ═══ PHASE 1: Loading Progress Bar ═══ */}
      {phase === 'loading' && (
        <div className="relative z-10 flex flex-col items-center gap-6 p-8 max-w-md w-full text-center animate-in fade-in zoom-in-95 duration-300">
          {/* Glowing 3D Logo */}
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-b from-purple-600 via-purple-700 to-indigo-900 p-0.5 shadow-[0_0_40px_rgba(168,85,247,0.5)] flex items-center justify-center animate-bounce">
            <div className="w-full h-full rounded-[22px] bg-[#120822] flex items-center justify-center border border-purple-400/40">
              <span className="font-black text-4xl bg-gradient-to-b from-white via-purple-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(168,85,247,0.9)]">
                R
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase">
              Ratnesh Kumar Singh
            </h2>
            <p className="text-xs font-mono text-purple-400 mt-1">
              3D Engineering Portfolio &bull; ECE '26
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <div className="w-full h-2 rounded-full bg-purple-950/80 border border-purple-500/30 overflow-hidden relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-400 rounded-full transition-all duration-200 shadow-[0_0_12px_#a855f7]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-purple-300">
                <Sparkles size={11} className="animate-spin text-purple-400" />
                {statusText}
              </span>
              <span className="font-bold text-white">{progress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PHASE 2: Interactive Bubble Overlay ("Pop the Bubbles") ═══ */}
      {phase === 'bubbles' && (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-6 sm:p-10 animate-in fade-in duration-400">
          {/* Top Title Banner */}
          <div className="text-center mt-6 sm:mt-10 space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono shadow-md backdrop-blur-md">
              <Bot size={14} className="text-purple-400 animate-pulse" />
              <span>Raya AI Interface Ready</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(168,85,247,0.4)]">
              Pop the Bubbles to Enter!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Tap floating neural nodes to unveil Ratnesh's 3D Engineering Portfolio ({poppedCount}/3 popped)
            </p>
          </div>

          {/* Floating Interactive Bubbles Field */}
          <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] my-auto">
            {bubbles.map((bubble) => {
              if (bubble.popped) return null;

              return (
                <button
                  key={bubble.id}
                  onClick={() => handlePopBubble(bubble.id)}
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    animationDuration: `${3.5 / bubble.speed}s`
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-transform duration-200 hover:scale-115 active:scale-90 animate-bounce shadow-[0_0_25px_rgba(168,85,247,0.35),inset_0_0_15px_rgba(255,255,255,0.2)] border border-purple-400/40 bg-gradient-to-tr from-[#251342]/90 via-[#3d1a6e]/70 to-[#1b0d32]/90 backdrop-blur-md group"
                >
                  <Sparkles size={12} className="text-purple-300 mb-0.5 group-hover:rotate-45 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-bold text-white font-mono leading-tight drop-shadow-md">
                    {bubble.label}
                  </span>
                  <span className="text-[8px] text-purple-300/80 font-mono">TAP</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Direct Skip Action */}
          <div className="mb-6 sm:mb-10 flex flex-col items-center gap-2">
            <button
              onClick={finishIntro}
              className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all hover:scale-105 active:scale-95"
            >
              <span>Enter Portfolio</span>
              <ArrowRight size={16} />
            </button>
            <span className="text-[11px] text-slate-500 font-mono">Or tap 3 bubbles above</span>
          </div>
        </div>
      )}
    </div>
  );
};
