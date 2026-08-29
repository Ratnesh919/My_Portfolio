import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/portfolio/Sidebar';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { ExperienceSection } from '@/components/portfolio/ExperienceSection';
import { CertificationsSection } from '@/components/portfolio/CertificationsSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { AvatarStudioModal, AVATAR_CHARACTERS } from '@/components/portfolio/AvatarStudioModal';
import { IntroLoader } from '@/components/portfolio/IntroLoader';
import { Modal } from '@/components/ui/modal';
import { ProjectItem, CertificateItem, PORTFOLIO_DATA } from '@/lib/portfolioData';
import { ChevronUp } from 'lucide-react';

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
  
  // Track whether bubble intro has been completed
  const [introDone, setIntroDone] = useState<boolean>(() => {
    return !!sessionStorage.getItem('raya_bubble_done');
  });

  // Raya Speech Bubble text (exact user requested intro)
  const [rayaBubbleText, setRayaBubbleText] = useState<string>(
    "Welcome! It's nice to have you back. How can I help you?"
  );
  const introSpokenRef = useRef(false);

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
  // Strictly serial order matching right-side page flow
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
  };

  const handleIntroComplete = () => {
    setIntroDone(true);
    sessionStorage.setItem('raya_bubble_done', '1');

    if (introSpokenRef.current) return;
    introSpokenRef.current = true;

    // Trigger wave animation and Raya intro voice simultaneously
    const triggerIntro = () => {
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}

      if ((window as any).playWaveAnimation) {
        (window as any).playWaveAnimation();
      }
      if ((window as any).introduceRaya) {
        (window as any).introduceRaya();
      } else if ((window as any).chatBot && typeof (window as any).chatBot.introduceHerself === 'function') {
        (window as any).chatBot.introduceHerself();
      }
    };

    setTimeout(triggerIntro, 350);
  };

  return (
    <div className="min-h-screen w-full bg-[#07050d] text-slate-100 flex flex-col lg:flex-row m-0 p-0 overflow-x-hidden font-sans antialiased selection:bg-purple-600 selection:text-white">
      {/* ═══ Phase 1 & 2 Intro Loader & Soap Bubble Screen ═══ */}
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
          {/* 1. Hero Section */}
          <HeroSection
            onNavigate={handleNavigate}
            onOpenProjects={() => handleNavigate('projects')}
          />

          {/* 2. Featured Projects Section */}
          <ProjectsSection
            onSelectProject={(project) => setSelectedProject(project)}
          />

          {/* 3. About Section */}
          <AboutSection />

          {/* 4. Skills 5 Pillars Section */}
          <SkillsSection />

          {/* 5. Experience & Academics Section */}
          <ExperienceSection />

          {/* 6. Certifications Section */}
          <CertificationsSection
            onSelectCert={(cert) => setSelectedCert(cert)}
          />

          {/* 7. Contact Section */}
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

      {/* Back To Top Floating Action */}
      {showBackToTop && (
        <button
          onClick={() => handleNavigate('home')}
          className="fixed bottom-28 left-80 z-30 p-3 rounded-full bg-[#160d26]/90 hover:bg-purple-900/70 text-purple-300 hover:text-white border border-purple-500/35 shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all active:scale-95 hover:scale-105"
          title="Scroll to Top"
        >
          <ChevronUp size={18} />
        </button>
      )}


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
