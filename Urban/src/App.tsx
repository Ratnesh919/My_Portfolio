import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/portfolio/Sidebar';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ExperienceSection } from '@/components/portfolio/ExperienceSection';
import { CertificationsSection } from '@/components/portfolio/CertificationsSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { RayaAICompanion } from '@/components/portfolio/RayaAICompanion';
import { Modal } from '@/components/ui/modal';
import { ProjectItem, CertificateItem, PORTFOLIO_DATA } from '@/lib/portfolioData';
import { Bot, Sparkles, ChevronUp } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isRayaOpen, setIsRayaOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 400);

      const sections = ['home', 'projects', 'about', 'skills', 'experience', 'certifications', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#07050d] text-slate-100 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 font-sans antialiased selection:bg-purple-600 selection:text-white">
      {/* Background Ambient Cyber Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-900/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-fuchsia-900/15 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#a855f7_0.7px,transparent_0.7px)] [background-size:24px_24px] opacity-10" />
      </div>

      {/* ═══ Main Portfolio Hardware Chassis / Frame (Matching Reference Image) ═══ */}
      <div className="relative z-10 w-full max-w-7xl rounded-3xl md:rounded-[36px] bg-[#0c0816]/95 border border-purple-500/20 shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(147,51,234,0.15),inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Floating Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onToggleRaya={() => setIsRayaOpen(!isRayaOpen)}
        />

        {/* Right Scrollable Main Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-950/60 scrollbar-track-transparent">
          {/* Hero Section */}
          <HeroSection
            onNavigate={handleNavigate}
            onOpenProjects={() => handleNavigate('projects')}
          />

          {/* Featured Projects Section */}
          <ProjectsSection
            onSelectProject={(project) => setSelectedProject(project)}
          />

          {/* About Section */}
          <AboutSection />

          {/* Skills 5 Pillars Section */}
          <SkillsSection />

          {/* Experience & Academics Section */}
          <ExperienceSection />

          {/* Certifications Section */}
          <CertificationsSection
            onSelectCert={(cert) => setSelectedCert(cert)}
          />

          {/* Contact Section */}
          <ContactSection />

          {/* Portfolio Footer */}
          <footer className="w-full py-8 mt-8 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]" />
              <span>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name} &bull; Designed & Built with Next-Gen 3D & AI</span>
            </div>
            <div>
              <span>Kolkata, India &bull; All Rights Reserved</span>
            </div>
          </footer>
        </main>
      </div>

      {/* ═══ Floating Raya AI Companion Trigger (Bottom Right) ═══ */}
      <button
        onClick={() => setIsRayaOpen(true)}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs md:text-sm shadow-[0_8px_30px_rgba(147,51,234,0.5),0_0_15px_rgba(168,85,247,0.3)] border border-purple-300/40 transition-all duration-300 transform hover:scale-105 active:scale-95 select-none"
      >
        <div className="relative">
          <Bot size={18} className="animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <span className="hidden sm:inline">Ask Raya AI</span>
      </button>

      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={() => handleNavigate('home')}
          className="fixed bottom-20 right-6 z-40 p-2.5 rounded-full bg-[#170f26]/90 hover:bg-purple-900/60 text-purple-300 hover:text-white border border-purple-500/30 shadow-lg backdrop-blur-md transition-all active:scale-95"
          title="Scroll to Top"
        >
          <ChevronUp size={18} />
        </button>
      )}

      {/* Raya AI Companion Modal */}
      <RayaAICompanion
        isOpen={isRayaOpen}
        onClose={() => setIsRayaOpen(false)}
      />

      {/* Universal Detail Modal (for Projects & Certifications) */}
      <Modal
        isOpen={!!selectedProject || !!selectedCert}
        onClose={() => {
          setSelectedProject(null);
          setSelectedCert(null);
        }}
        project={selectedProject}
        certificate={selectedCert}
      />
    </div>
  );
};

export default App;
