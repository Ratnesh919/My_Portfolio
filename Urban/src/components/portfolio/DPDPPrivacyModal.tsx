import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  FileText, 
  UserCheck, 
  Database, 
  Mail, 
  ExternalLink,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface DPDPPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DPDPPrivacyModal: React.FC<DPDPPrivacyModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleResetConsent = () => {
    localStorage.removeItem('dpdp_consent_accepted');
    sessionStorage.removeItem('dpdp_consent_dismissed');
    alert('Privacy consent status has been reset. You will be prompted on next page refresh.');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dpdp-modal-title"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#1b122c] via-[#120a20] to-[#0a0612] border border-purple-500/35 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(168,85,247,0.25)] z-10 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-950/60 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-500/25 transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col gap-2 border-b border-purple-500/20 pb-5 mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 font-mono text-xs tracking-wider w-fit">
            <ShieldCheck size={14} />
            <span>STATUTORY PRIVACY NOTICE &bull; INDIA DPDP ACT, 2023</span>
          </div>
          <h2 id="dpdp-modal-title" className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide">
            Data Privacy &amp; Protection Governance
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Itemized notice under Section 5 and Section 6 of the <strong>Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)</strong> enacted by the Parliament of India.
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* 1. Data Fiduciary Identity */}
          <div className="p-4 rounded-2xl bg-[#160d26]/80 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold mb-1">
                Data Fiduciary &amp; Grievance Officer
              </div>
              <div className="font-bold text-white text-sm sm:text-base">Ratnesh Kumar Singh</div>
              <div className="text-xs text-slate-400">Electronics &amp; Communication Engineer &bull; Kolkata, West Bengal, India</div>
            </div>
            <a
              href="mailto:kumarsinghratnesh3@gmail.com"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-xs font-mono text-purple-200 transition-colors w-fit"
            >
              <Mail size={13} />
              <span>kumarsinghratnesh3@gmail.com</span>
            </a>
          </div>

          {/* 2. Itemized Collection & Specific Purpose (Section 5) */}
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Database size={16} className="text-cyan-400" />
              <span>1. Itemized Data Collection &amp; Processing Purposes (Section 5)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
              <div className="p-3.5 rounded-xl bg-[#130a20] border border-white/5 space-y-1.5">
                <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-cyan-400" />
                  <span>Technical Telemetry &amp; Security</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  <strong>Collected:</strong> Visitor IP address, user-agent string, approximate geolocation (City/Country level from headers), and session storage flags.
                </p>
                <p className="text-[11px] text-slate-400 leading-normal">
                  <strong>Purpose:</strong> DDOS mitigation, API rate limiting, and synchronizing 3D avatar viewport and Web Speech API state.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#130a20] border border-white/5 space-y-1.5">
                <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-purple-400" />
                  <span>Interactive Inquiries &amp; Raya AI</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  <strong>Collected:</strong> Voluntarily provided name, email address, inquiry messages, or chat prompts sent to Raya AI Companion.
                </p>
                <p className="text-[11px] text-slate-400 leading-normal">
                  <strong>Purpose:</strong> Real-time conversational intelligence, song queuing, and forwarding hiring/collaboration inquiries directly to Ratnesh.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Sub-Processors & Data Sharing (Strictly Zero Advertising) */}
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <Lock size={16} className="text-purple-400" />
              <span>2. Third-Party Sub-Processors &amp; Zero Resale Guarantee</span>
            </h3>
            <p className="text-xs text-slate-300 mb-2">
              Your data is processed strictly through enterprise-grade infrastructure to operate the portfolio. <strong>Your personal data is never sold, leased, rented, or shared with advertising brokers or commercial data vendors.</strong>
            </p>
            <div className="p-3 rounded-xl bg-[#130a20] border border-white/5 text-[11px] font-mono text-slate-400 space-y-1">
              <div>&bull; <strong>Vercel &amp; Render:</strong> Serverless cloud hosting &amp; Edge routing.</div>
              <div>&bull; <strong>Supabase Inc:</strong> TLS 1.3 encrypted PostgreSQL database for visitor message persistence.</div>
              <div>&bull; <strong>Groq &amp; Google Cloud Vertex:</strong> Low-latency LLM inference for Raya conversation replies.</div>
              <div>&bull; <strong>Telegram / Discord Webhooks:</strong> Private admin push notification when an inquiry is received.</div>
            </div>
          </div>

          {/* 4. Data Principal Rights under DPDP Act (Sections 11 - 14) */}
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <UserCheck size={16} className="text-cyan-400" />
              <span>3. Your Statutory Rights as Data Principal (Sections 11–14)</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Right to Access (Section 11):</strong> You may request a full summary of personal data and processing activities associated with your session or email.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Right to Correction &amp; Erasure (Section 12):</strong> You hold the absolute "Right to be Forgotten". You may request permanent deletion of your IP history, submitted messages, or Raya conversations at any time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Right of Grievance Redressal (Section 13):</strong> Any privacy inquiry or erasure demand sent to <a href="mailto:kumarsinghratnesh3@gmail.com" className="text-cyan-300 underline">kumarsinghratnesh3@gmail.com</a> will be acknowledged and fulfilled within 72 hours.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleResetConsent}
            className="flex items-center gap-1.5 text-xs text-rose-400/80 hover:text-rose-300 font-mono transition-colors"
            title="Reset and clear saved consent token"
          >
            <Trash2 size={13} />
            <span>Reset My Consent Preference</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-95"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
