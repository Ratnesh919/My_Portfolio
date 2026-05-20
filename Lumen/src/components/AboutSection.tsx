import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      
      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white/40 text-sm tracking-widest uppercase mb-6 block">About Me</span>
        </motion.div>

        <div className="flex flex-col gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.2] tracking-tight font-serif max-w-4xl"
          >
            I am a motivated <span className="italic text-white/80">Electronics and Communication Engineering</span> student.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/60 text-lg leading-relaxed"
          >
            <p>
              My foundation lies deeply in <span className="text-white">programming</span>, <span className="text-white">embedded systems</span>, and <span className="text-white">artificial intelligence</span>. I strive to bridge the gap between hardware and software to build meaningful experiences.
            </p>
            <p>
              I am passionate about creating <span className="text-white">innovative solutions</span> in smart technology. Always learning, experimenting, and eager to tackle new challenges in the tech ecosystem.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
