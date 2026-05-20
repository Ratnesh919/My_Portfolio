import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
      tag: "Software",
      title: "Simple AI Assistant",
      description: "Created an intelligent assistant using Python and API integrations. Implemented features like command understanding, conversational responses, and real-time information retrieval."
    },
    {
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
      tag: "Hardware",
      title: "Smart Parking System",
      description: "Designed a prototype using Arduino and ultrasonic sensors to detect available parking spaces efficiently. Demonstrated bridging hardware with software loops."
    },
    {
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4",
        tag: "Software",
        title: "Text Humanizer",
        description: "Developed a text humanizer using Python for NLP tasks to make machine-generated text more natural and human-like."
    }
  ];

  return (
    <section id="projects" className="bg-black py-28 md:py-40 px-6 overflow-hidden flex justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="max-w-6xl w-full relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-serif">Featured Projects</h2>
          <span className="text-white/40 text-sm hidden md:block">Innovations</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="liquid-glass rounded-3xl overflow-hidden group border border-white/5 hover:border-white/20 transition-all p-8 md:p-10 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="uppercase tracking-widest text-white/40 text-xs font-semibold">{card.tag}</span>
                  <div className="liquid-glass rounded-full p-3 text-white group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <h3 className="text-white text-2xl md:text-3xl mb-4 tracking-tight font-serif">{card.title}</h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
