import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PhilosophySection from '../components/PhilosophySection';
import ServicesSection from '../components/ServicesSection';
import EducationSection from '../components/EducationSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import LinksSection from '../components/LinksSection';
import Navbar from '../components/Navbar';

export default function Index() {
  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-white/20">
      <Navbar />
      <HeroSection />
      <div id="about">
         <AboutSection />
      </div>
      <PhilosophySection />
      <div id="projects">
         <ServicesSection />
      </div>
      <div id="skills">
         <SkillsSection />
      </div>
      <div id="education">
         <EducationSection />
      </div>
      <div id="experience">
         <ExperienceSection />
      </div>
      <LinksSection />
      
      <footer className="bg-black py-10 text-center border-t border-white/10 mt-20">
        <p className="text-white/40 text-sm mb-4 tracking-widest uppercase">Based in Kolkata</p>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Ratnesh Kumar Singh. Built with Innovation & Passion.</p>
        <p className="text-white/40 text-[10px] mt-2">Languages: English, Hindi, Bengali</p>
      </footer>
    </main>
  );
}
