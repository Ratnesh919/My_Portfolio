import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, X } from 'lucide-react';

interface DPDPConsentBannerProps {
  onOpenPrivacyModal: () => void;
  introDone: boolean;
}

export const DPDPConsentBanner: React.FC<DPDPConsentBannerProps> = ({
  onOpenPrivacyModal,
  introDone,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show once user has entered the portfolio and hasn't accepted yet
    if (introDone) {
      const consent = localStorage.getItem('dpdp_consent_accepted');
      if (!consent) {
        // Show after a brief delay so user isn't bombarded immediately upon entry
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [introDone]);

  const handleAccept = () => {
    localStorage.setItem('dpdp_consent_accepted', 'true');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    // Dismiss for current session
    sessionStorage.setItem('dpdp_consent_dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy and Security Consent"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92vw] sm:w-[480px] animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="relative p-4 sm:p-5 rounded-2xl bg-[#0f091a]/95 border border-purple-500/35 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(168,85,247,0.25)] flex flex-col gap-3 text-slate-200 select-none">
        {/* Dismiss Icon */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Dismiss for now"
          aria-label="Dismiss banner"
        >
          <X size={15} />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-2.5 pr-6">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <ShieldCheck size={17} />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
            Privacy and Security Consent
          </span>
        </div>

        {/* Description Body */}
        <p className="text-xs text-slate-300/90 leading-relaxed font-sans">
          This portfolio collects minimal technical telemetry (IP, session state) and messages sent to Raya AI / Contact exclusively for site security, 3D kinematics, and professional correspondence. Your personal data is never sold or shared.
        </p>

        {/* Buttons / Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
          <button
            onClick={onOpenPrivacyModal}
            className="text-xs text-purple-300 hover:text-white font-mono underline underline-offset-4 decoration-purple-500/50 hover:decoration-purple-400 transition-colors flex items-center gap-1"
          >
            <span>Read Notice</span>
            <ArrowRight size={12} />
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all active:scale-95"
            >
              Accept &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
