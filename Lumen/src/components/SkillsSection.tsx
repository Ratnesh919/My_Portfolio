import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: "Programming",
    skills: ["C", "C++", "Python"]
  },
  {
    title: "Web Dev",
    skills: ["HTML", "CSS"]
  },
  {
    title: "UI Design",
    skills: ["Figma"]
  },
  {
    title: "Software & Tools",
    skills: ["Arduino IDE", "MATLAB", "ArcGIS", "Tinkercad", "Verilog", "VS Code", "MS Office Suite", "Canva"]
  },
  {
    title: "Special Interests",
    skills: ["Embedded Systems", "AI", "Machine Learning", "Electric Vehicles", "Digital Electronics"]
  },
  {
    title: "Soft Skills",
    skills: ["Problem-solving", "Fast learner", "Dedicated", "Disciplined", "Adaptable"]
  }
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="bg-black py-28 md:py-40 px-6 overflow-hidden flex justify-center relative">
      <div className="max-w-6xl w-full relative z-10" ref={ref}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
           transition={{ duration: 0.7 }}
           className="flex items-center justify-between mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-serif">Skills & Expertise</h2>
          <span className="text-white/40 text-sm hidden md:block">Technical Proficiency</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="liquid-glass rounded-3xl p-8 group border border-white/5 hover:border-white/10 transition-colors"
            >
              <h3 className="text-white text-xl md:text-2xl mb-6 tracking-tight font-serif">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="text-white/70 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
