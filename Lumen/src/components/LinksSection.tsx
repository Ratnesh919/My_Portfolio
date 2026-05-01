import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PenTool, Globe, ExternalLink } from 'lucide-react';

const links = [
  {
    title: "Figma Designs",
    description: "Explore my UI/UX designs and prototyping work.",
    url: "https://tinywebs.site/6AsQaP",
    icon: <PenTool size={24} className="text-white/80" />
  },
  {
    title: "Web Development",
    description: "Check out my web projects and front-end development experiments.",
    url: "https://tinywebs.site/mboHXS",
    icon: <Globe size={24} className="text-white/80" />
  }
];

export default function LinksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="links" className="bg-black py-28 md:py-40 px-6 overflow-hidden flex justify-center relative">
      <div className="max-w-6xl w-full relative z-10" ref={ref}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
           transition={{ duration: 0.7 }}
           className="flex items-center justify-between mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-serif">Key Resources</h2>
          <span className="text-white/40 text-sm hidden md:block">External Links</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link, idx) => (
            <motion.a
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="liquid-glass rounded-3xl p-8 group border border-white/5 hover:border-white/20 transition-all flex flex-col items-start gap-6 cursor-pointer"
            >
              <div className="bg-white/5 rounded-full p-4 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                {link.icon}
              </div>
              <div className="w-full">
                <h3 className="text-white text-xl mb-2 font-medium flex items-center justify-between">
                  {link.title}
                  <ExternalLink size={18} className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{link.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
