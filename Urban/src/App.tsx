import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/portfolio/Sidebar';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ExperienceSection } from '@/components/portfolio/ExperienceSection';
import { CertificationsSection } from '@/components/portfolio/CertificationsSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { RayaAICompanion } from '@/components/portfolio/RayaAICompanion';
import { ChatbotBar } from '@/components/portfolio/ChatbotBar';
import { AvatarStudioModal, AVATAR_CHARACTERS } from '@/components/portfolio/AvatarStudioModal';
import { IntroLoader } from '@/components/portfolio/IntroLoader';
import { VRMCharacterEngine } from '@/components/portfolio/VRMCharacterEngine';
import { Modal } from '@/components/ui/modal';
import { ProjectItem, CertificateItem, PORTFOLIO_DATA } from '@/lib/portfolioData';
import { Bot, Sparkles, ChevronUp, Layers, X } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isRayaOpen, setIsRayaOpen] = useState<boolean>(false);
  const [isAvatarStudioOpen, setIsAvatarStudioOpen] = useState<boolean>(false);
  const [currentAvatar, setCurrentAvatar] = useState<string>('changli');
  const [currentAvatarFile, setCurrentAvatarFile] = useState<string>('./Wuwa/changli(fixed).vrm');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [pendingChatMessage, setPendingChatMessage] = useState<string | null>(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState<boolean>(true);

  // Smooth Navigation Trigger
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Switch Avatar File
  const handleSelectAvatar = (charId: string) => {
    setCurrentAvatar(charId);
    const found = AVATAR_CHARACTERS.find((c) => c.id === charId);
    if (found) {
      setCurrentAvatarFile(found.file);
    }
  };

  // Expose global character switch
  useEffect(() => {
    (window as any).setVRMCharacter = (filePath: string) => {
      setCurrentAvatarFile(filePath);
    };
  }, []);

  // ═══ Real-Time Scroll Spy via IntersectionObserver ═══
  useEffect(() => {
    const sectionIds = ['home', 'projects', 'about', 'skills', 'experience', 'certifications', 'contact'];

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const mostVisible = visibleEntries[0];
        if (mostVisible.target.id) {
          setActiveSection(mostVisible.target.id);
        }
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSendMessageFromBar = (msg: string) => {
    setPendingChatMessage(msg);
    setIsRayaOpen(true);
  };

  const handleIntroComplete = () => {
    // Wave animation and Raya introduction
    if ((window as any).playWaveAnimation) {
      (window as any).playWaveAnimation();
    }
    if ((window as any).introduceRaya) {
      setTimeout(() => {
        (window as any).introduceRaya();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07050d] text-slate-100 flex flex-col lg:flex-row m-0 p-0 overflow-x-hidden font-sans antialiased selection:bg-purple-600 selection:text-white">
      {/* ═══ Phase 1 & 2 Intro Loader & Bubble Pop Screen ═══ */}
      <IntroLoader onComplete={handleIntroComplete} />

      {/* Background Ambient Glows & Cyber Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-indigo-900/15 rounded-full blur-[160px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#a855f7_0.8px,transparent_0.8px)] [background-size:32px_32px] opacity-10" />
      </div>

      {/* ═══ Left Fixed Navigation Sidebar (Always Pinned) ═══ */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onToggleRaya={() => setIsRayaOpen(!isRayaOpen)}
        onOpenAvatarStudio={() => setIsAvatarStudioOpen(true)}
      />

      {/* ═══ Right Scrolling Content Container (Offset by lg:ml-72) ═══ */}
      <div className="lg:ml-72 flex-1 w-full min-h-screen relative z-10 flex flex-col justify-between overflow-y-visible">
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 lg:py-10 space-y-12">
          {/* Welcome Intro Toast Banner */}
          {showWelcomeBanner && (
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#180e2b] to-slate-900/80 border border-purple-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-900/60 flex items-center justify-center border border-purple-400/30 shrink-0">
                  <Bot size={18} className="text-purple-300 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <span>Welcome to Ratnesh's 3D Engineering Portfolio!</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      Raya AI Active
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                    Explore real-time Web Audio DSP (±5ms), Android MediaCodec transcoders, AI agents, and 14 custom 3D Resonator avatars.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsAvatarStudioOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 text-purple-200 text-xs font-mono border border-purple-500/30 transition-all"
                >
                  <Layers size={13} />
                  <span>Avatar Studio</span>
                </button>
                <button
                  onClick={() => setShowWelcomeBanner(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  title="Dismiss"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

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
        </main>

        {/* Global Footer */}
        <footer className="w-full border-t border-purple-500/15 bg-[#090612]/90 backdrop-blur-md px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
            <span>
              &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name} &bull; Next-Gen 3D Neomorphic Portfolio
            </span>
          </div>
          <div>
            <span>Kolkata, India &bull; MAKAUT ECE Graduate '26</span>
          </div>
        </footer>
      </div>

      {/* ═══ 3D VRM Resonator Character Engine ═══ */}
      <VRMCharacterEngine
        currentAvatarFile={currentAvatarFile}
      />

      {/* ═══ Floating Interactive Chatbot Bottom Bar ═══ */}
      <ChatbotBar
        onSendMessage={handleSendMessageFromBar}
        onOpenFullChat={() => setIsRayaOpen(true)}
        onOpenAvatarStudio={() => setIsAvatarStudioOpen(true)}
        isOpen={isRayaOpen}
      />

      {/* Back To Top Floating Action */}
      {showBackToTop && (
        <button
          onClick={() => handleNavigate('home')}
          className="fixed bottom-20 right-6 z-30 p-3 rounded-full bg-[#160d26]/90 hover:bg-purple-900/70 text-purple-300 hover:text-white border border-purple-500/35 shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all active:scale-95 hover:scale-105"
          title="Scroll to Top"
        >
          <ChevronUp size={18} />
        </button>
      )}

      {/* Raya AI Companion Modal */}
      <RayaAICompanion
        isOpen={isRayaOpen}
        onClose={() => setIsRayaOpen(false)}
        onOpenAvatarStudio={() => {
          setIsRayaOpen(false);
          setIsAvatarStudioOpen(true);
        }}
        onScrollToSection={handleNavigate}
        onChangeAvatar={handleSelectAvatar}
        externalMessage={pendingChatMessage}
        onClearExternalMessage={() => setPendingChatMessage(null)}
      />

      {/* 14-Character 3D Avatar Studio Modal */}
      <AvatarStudioModal
        isOpen={isAvatarStudioOpen}
        onClose={() => setIsAvatarStudioOpen(false)}
        currentAvatar={currentAvatar}
        onSelectAvatar={handleSelectAvatar}
      />

      {/* Universal Detail Modal (Projects & Verified Certifications) */}
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
