import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { projectsData } from '../data/projectsData';

interface ServicesSectionProps {
  onOpenProjects?: () => void;
}

export default function ServicesSection({ onOpenProjects }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="bg-black py-28 md:py-40 px-6 overflow-hidden flex justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="max-w-6xl w-full relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles size={12} />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-white tracking-tight font-serif">Featured Projects</h2>
          </div>

          <button
            onClick={onOpenProjects}
            className="liquid-glass rounded-full px-6 py-3 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white/15 transition-all border border-white/20 flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Sparkles size={14} /> Explore All Projects ↗
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projectsData.slice(0, 6).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="liquid-glass rounded-3xl overflow-hidden group border border-white/5 hover:border-white/20 transition-all p-8 md:p-10 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="uppercase tracking-widest text-white/40 text-xs font-mono">{project.category}</span>
                  <div 
                    onClick={onOpenProjects}
                    className="liquid-glass rounded-full p-2.5 text-white group-hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <h3 className="text-white text-2xl md:text-3xl mb-2 tracking-tight font-serif">{project.title}</h3>
                <p className="text-white/70 text-xs font-mono mb-3">{project.tagline}</p>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.tech.slice(0, 4).map((t, i) => (
                    <span key={i} className="text-[10px] font-mono text-white/60 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex gap-2">
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
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={onOpenProjects}
            className="liquid-glass rounded-full px-10 py-4 text-white text-sm font-semibold uppercase tracking-widest hover:bg-white/15 transition-all border border-white/25 shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles size={16} /> Open Full Live Project Directory
          </button>
        </div>
      </div>
    </section>
  );
}
