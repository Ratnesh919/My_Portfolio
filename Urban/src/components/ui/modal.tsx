import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProjectItem, CertificateItem } from '@/lib/portfolioData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectItem | null;
  certificate?: CertificateItem | null;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  project,
  certificate
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

  if (!isOpen || (!project && !certificate)) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#1c132e] to-[#0f091a] border border-purple-500/30 p-6 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(168,85,247,0.2)] z-10 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-950/60 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-500/25 transition-all"
        >
          <X size={18} />
        </button>

        {/* --- Project Modal Content --- */}
        {project && (
          <div className="flex flex-col gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-[11px] font-mono text-purple-300 mb-2">
                <Sparkles size={13} />
                <span>{project.badge}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                {project.title}
              </h2>
              <p className="text-sm font-semibold text-purple-300 mt-1">
                {project.subtitle}
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {project.desc}
            </p>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#130b20] border border-purple-500/20">
                <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-2.5">
                  Key Technical Achievements
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#201435] text-purple-200 border border-purple-500/25 text-xs font-mono font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-4 border-t border-purple-500/15 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition-all"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#180e29] hover:bg-[#251540] text-slate-200 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all"
                >
                  <Github size={14} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* --- Certificate Modal Content --- */}
        {certificate && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-[11px] font-mono text-purple-400 uppercase font-semibold">
                {certificate.category}
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                {certificate.title}
              </h2>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Issued by {certificate.issuer} &bull; {certificate.date}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#130b20] border border-purple-500/20 font-mono text-xs text-slate-300">
              <div className="text-slate-400 mb-1">Credential ID:</div>
              <div className="text-purple-300 font-bold break-all">{certificate.certId}</div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Verified Competencies</h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#201435] text-purple-200 border border-purple-500/25 text-xs font-mono font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-purple-500/15">
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition-all"
              >
                <span>Verify Credential on Udemy</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
