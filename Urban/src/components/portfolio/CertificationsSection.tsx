import React from 'react';
import { 
  Sparkles, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { PORTFOLIO_DATA, CertificateItem } from '@/lib/portfolioData';

interface CertificationsSectionProps {
  onSelectCert?: (cert: CertificateItem) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onSelectCert }) => {
  return (
    <section id="certifications" className="w-full py-8 flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Sparkles size={14} />
          <span>Verified Credentials</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Licenses & Certifications
        </h2>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PORTFOLIO_DATA.certifications.map((cert) => (
          <div
            key={cert.id}
            onClick={() => onSelectCert?.(cert)}
            className="group p-5 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 hover:border-purple-400/50 shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                    <Award size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-purple-400 font-semibold uppercase">
                      {cert.category}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white group-hover:text-purple-200 transition-colors leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-800/60 text-purple-300 hover:text-white border border-purple-500/30 transition-all shrink-0"
                  title="Verify on Udemy"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                <span>{cert.issuer}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {cert.date}
                </span>
              </div>

              {/* Skills covered */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#201533] text-purple-200 border border-purple-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Verification Footer */}
            <div className="pt-3 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 truncate max-w-[200px]">
                ID: {cert.certId}
              </span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck size={13} /> Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
