import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="bg-black py-28 md:py-40 px-6 overflow-hidden flex justify-center relative">
      <div className="max-w-6xl w-full relative z-10" ref={ref}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
           transition={{ duration: 0.7 }}
           className="flex items-center justify-between mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-serif">Get in Touch</h2>
          <span className="text-white/40 text-sm hidden md:block">Let's Connect</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="liquid-glass rounded-3xl p-8 border border-white/5"
          >
            <h3 className="text-white text-xl md:text-2xl mb-8 tracking-tight font-serif font-bold uppercase">Contact Info</h3>
            
            <div className="flex flex-wrap gap-6">
              <a href="mailto:kumarsinghratnesh3@gmail.com" className="group text-white/60 hover:text-white transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                  <Mail size={28} />
                </div>
              </a>
              
              <a href="https://www.facebook.com/share/1De11Vypsn/" target="_blank" rel="noopener noreferrer" className="group text-white/60 hover:text-white transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0 group-hover:scale-110 group-hover:bg-[#1877F2]/20 group-hover:text-[#1877F2] group-hover:border-[#1877F2]/50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </div>
              </a>
              
              <a href="https://www.instagram.com/ratnesh_10_/" target="_blank" rel="noopener noreferrer" className="group text-white/60 hover:text-white transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0 group-hover:scale-110 group-hover:bg-[#E4405F]/20 group-hover:text-[#E4405F] group-hover:border-[#E4405F]/50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/ratneshkumarsingh" target="_blank" rel="noopener noreferrer" className="group text-white/60 hover:text-white transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0 group-hover:scale-110 group-hover:bg-[#0A66C2]/20 group-hover:text-[#0A66C2] group-hover:border-[#0A66C2]/50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="liquid-glass rounded-3xl p-8 border border-white/5 flex flex-col justify-center text-center items-center"
          >
            <h3 className="text-white text-3xl md:text-4xl mb-4 tracking-tight font-serif italic">Let's build something great.</h3>
            <p className="text-white/40 text-sm md:text-base mb-8 max-w-sm">Available for new opportunities and collaborations. Feel free to reach out anytime.</p>
            <a href="mailto:kumarsinghratnesh3@gmail.com" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Send an Email
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
