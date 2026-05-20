import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const certificates = [
  { title: "Python Course", period: "one month" },
  { title: "C Language Course", period: "one month" }
];

const training = [
  { title: "Electric Vehicle Service Technician", duration: "1 month" },
  { title: "GIS Training", duration: "2 weeks" }
];

const extraCurricular = [
    "Innovation and General Awareness in HAM Radio (2025)",
    "Industrial visit on BSNL telecom company (2025)",
    "Cyber Security Awareness workshop (2025)"
];

const sectionData = [
  { title: "Certificates", items: certificates.map(c => `${c.title} (${c.period})`) },
  { title: "Training", items: training.map(t => `${t.title} (${t.duration})`) },
  { title: "Activities", items: extraCurricular }
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="bg-black py-28 md:py-40 px-6 overflow-hidden flex justify-center relative">
      <div className="max-w-6xl w-full relative z-10" ref={ref}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
           transition={{ duration: 0.7 }}
           className="flex items-center justify-between mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-serif">Certificates & Experience</h2>
          <span className="text-white/40 text-sm hidden md:block">Continuous Learning</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectionData.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="liquid-glass rounded-3xl p-8 group border border-white/5 hover:border-white/10 transition-colors"
            >
              <h3 className="text-white text-xl md:text-2xl mb-6 tracking-tight font-serif font-bold uppercase">{section.title}</h3>
              <ul className="space-y-4">
                {section.items.map((item, sIdx) => (
                  <li 
                    key={sIdx}
                    className="text-white/60 text-sm border-l-2 border-white/10 pl-6 py-1 hover:border-white/40 hover:text-white transition-all"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
