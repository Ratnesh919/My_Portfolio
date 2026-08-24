import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  instructor: string;
  date: string;
  certId: string;
  image: string;
  verifyUrl: string;
}

const verifiedCertificates: Certificate[] = [
  {
    id: "cert-iot",
    title: "Internet of Things (IoT) Online Course",
    issuer: "Udemy",
    instructor: "Makeintern Course, Learntoupgrade Online",
    date: "July 30, 2026",
    certId: "UC-45f867df-23bf-440a-b362-0508bfb8d29f",
    image: "./certificates/cert-iot.jpg",
    verifyUrl: "https://ude.my/UC-45f867df-23bf-440a-b362-0508bfb8d29f",
  },
  {
    id: "cert-prompt-engineering",
    title: "Prompt Engineering for Everyone (Tool-Agnostic)",
    issuer: "Udemy",
    instructor: "Dr. Amar Massoud",
    date: "May 4, 2025",
    certId: "UC-58952f65-94dc-45c4-abd9-aa490de18afc",
    image: "./certificates/cert-prompt-engineering.jpg",
    verifyUrl: "https://ude.my/UC-58952f65-94dc-45c4-abd9-aa490de18afc",
  },
  {
    id: "cert-multi-programming",
    title: "Master Java, Python, C & C++: All-in-One Programming Course",
    issuer: "Udemy",
    instructor: "Knowledge Nest",
    date: "May 5, 2025",
    certId: "UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",
    image: "./certificates/cert-multi-programming.jpg",
    verifyUrl: "https://ude.my/UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",
  },
  {
    id: "cert-cpp",
    title: "The Complete Introduction to C++ Programming",
    issuer: "Udemy",
    instructor: "Yassin Marco MBA",
    date: "July 14, 2025",
    certId: "UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",
    image: "./certificates/cert-cpp.jpg",
    verifyUrl: "https://ude.my/UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",
  },
];

const training = [
  { title: "Electric Vehicle Service Technician", duration: "1 month" },
  { title: "GIS Training Specialist", duration: "2 weeks" },
  { title: "Python Advanced Course", duration: "1 month" },
  { title: "C Language Programming", duration: "1 month" }
];

const extraCurricular = [
  "Innovation and General Awareness in HAM Radio (2025)",
  "Industrial visit on BSNL telecom company (2025)",
  "Cyber Security Awareness workshop (2025)"
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

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
          <span className="text-white/40 text-sm hidden md:block">Verified Credentials & Continuous Learning</span>
        </motion.div>

        {/* 4 Verified Udemy Certificates */}
        <div className="mb-16">
          <h3 className="text-xl md:text-2xl text-white/90 font-serif mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Licenses &amp; Certifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedCertificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: idx * 0.12 }}
                className="liquid-glass rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all flex flex-col group"
              >
                <div
                  className="relative aspect-[4/3] bg-black/60 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-serif uppercase tracking-widest text-white px-3 py-1.5 rounded-full border border-white/40 bg-black/60 backdrop-blur-md">
                      Preview
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-white/90 bg-white/10 px-2.5 py-1 rounded-md border border-white/20 font-mono">
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-white/40">
                      {cert.date}
                    </span>
                  </div>

                  <h4 className="text-base font-serif text-white font-semibold leading-snug mb-2 group-hover:text-white/80 transition-colors">
                    {cert.title}
                  </h4>

                  <p className="text-xs text-white/50 mb-2">
                    By {cert.instructor}
                  </p>

                  <p className="text-[10px] font-mono text-white/30 break-all mb-4 mt-auto">
                    ID: {cert.certId}
                  </p>

                  <div className="flex gap-2 pt-3 border-t border-white/10">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-serif uppercase tracking-wider transition-colors"
                    >
                      View
                    </button>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-white text-black font-serif text-xs uppercase tracking-wider transition-colors flex items-center justify-center font-bold hover:bg-white/90"
                    >
                      Verify ↗
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Training and Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="liquid-glass rounded-3xl p-8 group border border-white/5 hover:border-white/10 transition-colors"
          >
            <h3 className="text-white text-xl md:text-2xl mb-6 tracking-tight font-serif font-bold uppercase">Training &amp; Specialization</h3>
            <ul className="space-y-4">
              {training.map((t, idx) => (
                <li 
                  key={idx}
                  className="text-white/70 text-sm border-l-2 border-white/10 pl-6 py-1 hover:border-white/40 hover:text-white transition-all flex justify-between items-center"
                >
                  <span>{t.title}</span>
                  <span className="text-white/40 text-xs font-mono">{t.duration}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="liquid-glass rounded-3xl p-8 group border border-white/5 hover:border-white/10 transition-colors"
          >
            <h3 className="text-white text-xl md:text-2xl mb-6 tracking-tight font-serif font-bold uppercase">Workshops &amp; Activities</h3>
            <ul className="space-y-4">
              {extraCurricular.map((item, idx) => (
                <li 
                  key={idx}
                  className="text-white/70 text-sm border-l-2 border-white/10 pl-6 py-1 hover:border-white/40 hover:text-white transition-all"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative liquid-glass rounded-[28px] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-white/20 shadow-2xl bg-black/95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center font-serif text-sm transition-colors"
            >
              ✕
            </button>

            <div className="p-6 border-b border-white/10 pr-16">
              <span className="text-[10px] uppercase tracking-widest text-white/90 bg-white/10 px-2.5 py-1 rounded-md border border-white/20 font-mono inline-block mb-2">
                {selectedCert.issuer}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-bold">
                {selectedCert.title}
              </h3>
              <p className="font-mono text-xs text-white/50 mt-1">
                Issued {selectedCert.date} &bull; ID: {selectedCert.certId}
              </p>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-black/80">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[60vh] max-w-full object-contain rounded-xl border border-white/10"
              />
            </div>

            <div className="p-4 sm:p-6 border-t border-white/10 flex justify-between items-center bg-black">
              <span className="text-xs text-white/40 hidden sm:inline font-mono">
                Verified Udemy Credential
              </span>
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-6 rounded-full bg-white text-black font-serif text-xs uppercase tracking-wider font-bold hover:scale-105 transition-transform"
              >
                Verify on Udemy ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
