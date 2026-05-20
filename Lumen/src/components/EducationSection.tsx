import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const education = [
  {
    degree: "Bachelor in Technology",
    institution: "Swami Vivekananda Institute of Science & Technology",
    year: "2026",
    specialization: "Electronics And Communication Engineering",
    details: "M.A.K.A.U.T. (W.B.U.T.)"
  },
  {
    degree: "12th Standard",
    institution: "P.B.S College",
    year: "2020",
    specialization: "Science (P.C.M.)",
    details: "B.S.E.B"
  },
  {
    degree: "10th Standard",
    institution: "Vidyanjali High school (H.S.)",
    year: "2018",
    specialization: "Science",
    details: "I.G.C.S.E"
  }
];

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="bg-black py-28 md:py-40 px-6 overflow-hidden flex justify-center relative">
      <div className="max-w-6xl w-full relative z-10" ref={ref}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
           transition={{ duration: 0.7 }}
           className="flex items-center justify-between mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-serif">Education</h2>
          <span className="text-white/40 text-sm hidden md:block">Academic Journey</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="liquid-glass rounded-3xl p-8 group border border-white/5 hover:border-white/10 transition-colors"
            >
              <span className="text-white/40 text-sm font-medium mb-4 block">{item.year}</span>
              <h3 className="text-white text-xl md:text-2xl mb-2 tracking-tight font-serif">{item.degree}</h3>
              <p className="text-white/70 text-base mb-4">{item.institution}</p>
              <div className="w-full h-px bg-white/10 mb-4" />
              <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">{item.specialization}</p>
              <p className="text-white/20 text-xs mt-2">{item.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
