import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden flex justify-center">
      <div className="max-w-6xl w-full" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24 font-serif"
        >
          Hardware <span className="italic text-white/40">x</span> Software
        </motion.h2>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
          >
            <div className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/5">
              <span className="text-white/40 text-xs tracking-widest uppercase mb-6 block border-b border-white/10 pb-4">Choose your space</span>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed font-serif">
                From C++ and Python automation to smart hardware integration, I operate at the intersection of logical problem-solving and rapid prototyping. I translate technical challenges into functional, real-world solutions.
              </p>
            </div>

            <div className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/5">
              <span className="text-white/40 text-xs tracking-widest uppercase mb-6 block border-b border-white/10 pb-4">Shape the future</span>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed font-serif">
                As a B.Tech student, my process involves learning modern frameworks and experimenting with IoT devices. I believe that an engineer's best work emerges when hands-on experimentation meets solid theoretical knowledge.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
