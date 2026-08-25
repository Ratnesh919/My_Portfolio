import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { projectsData } from '../data/projectsData';

interface ExploreProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExploreProjectsModal({ isOpen, onClose }: ExploreProjectsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative liquid-glass rounded-[32px] max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] bg-[#0a0a0a]/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/80 text-[10px] font-mono uppercase tracking-widest mb-3">
                  <Sparkles size={12} />
                  <span>Production Apps &amp; Repositories</span>
                </div>
                <h3 className="text-2xl sm:text-4xl text-white font-serif tracking-tight">
                  Explore My <em className="italic">Work</em>
                </h3>
                <p className="text-xs sm:text-sm text-white/50 mt-1 max-w-lg">
                  Direct access to deployed applications, AI automation pipelines, Android media engines, and RF antenna simulations.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full liquid-glass hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Project Grid */}
            <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-black/40">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="liquid-glass rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    <h4 className="text-xl text-white font-serif font-bold tracking-tight">{project.title}</h4>
                    <p className="text-xs text-white/70 font-mono mt-1">{project.tagline}</p>
                    <p className="text-xs text-white/50 mt-2.5 leading-relaxed font-sans">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono text-white/70 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
                      >
                        <Code2 size={14} /> Source
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
