import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Instagram,
  Facebook,
  MessageSquare
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate send or mailto trigger
    window.location.href = `mailto:${PORTFOLIO_DATA.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="w-full py-8 flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Sparkles size={14} />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Let's Build Something Exceptional
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Direct Info & Quick Copy (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail size={18} className="text-purple-400" />
              <span>Contact Coordinates</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Available for full-time engineering opportunities, real-time web consulting, Android MediaCodec projects, and workflow automation.
            </p>

            {/* Email Copy Card */}
            <div className="p-3.5 rounded-xl bg-[#140e21] border border-purple-500/20 flex items-center justify-between gap-3">
              <div className="truncate">
                <div className="text-[10px] font-mono text-purple-400 uppercase">Direct Email</div>
                <div className="text-xs md:text-sm font-bold text-white font-mono truncate">
                  {PORTFOLIO_DATA.email}
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-purple-950/60 hover:bg-purple-850 text-purple-300 hover:text-white border border-purple-500/30 transition-all shrink-0 active:scale-95"
                title="Copy Email to Clipboard"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Location Pill */}
            <div className="flex items-center gap-2.5 text-xs text-slate-300 p-3 rounded-xl bg-[#140e21] border border-purple-500/20">
              <MapPin size={16} className="text-purple-400 shrink-0" />
              <span>{PORTFOLIO_DATA.location} (Open to Relocation & Remote)</span>
            </div>
          </div>

          {/* Social Badges */}
          <div>
            <div className="text-xs font-mono uppercase text-purple-400 mb-3">Connect Online</div>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={PORTFOLIO_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#160f24] border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all"
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href={PORTFOLIO_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#160f24] border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href={(PORTFOLIO_DATA as any).instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#160f24] border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all"
              >
                <Instagram size={15} /> Instagram
              </a>
              <a
                href={(PORTFOLIO_DATA as any).facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#160f24] border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all"
              >
                <Facebook size={15} /> Facebook
              </a>
              <a
                href={PORTFOLIO_DATA.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#160f24] border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400 text-xs font-mono transition-all"
              >
                <Twitter size={15} /> Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form (lg:col-span-7) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-gradient-to-b from-[#181126] to-[#0e0a17] border border-purple-500/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <MessageSquare size={18} className="text-purple-400" />
              <span>Send a Direct Message</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#120b1d] border border-purple-500/20 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#120b1d] border border-purple-500/20 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Subject</label>
              <input
                type="text"
                placeholder="Full-Time Opportunity / Engineering Project"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#120b1d] border border-purple-500/20 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Hi Ratnesh, let's discuss..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#120b1d] border border-purple-500/20 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_16px_rgba(147,51,234,0.4)] transition-all active:scale-98"
            >
              <span>{formSubmitted ? 'Message Dispatched!' : 'Send Message'}</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
