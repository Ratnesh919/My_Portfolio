import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6 pointer-events-none">
      {/* Main navbar pill */}
      <nav className="liquid-glass rounded-full max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between pointer-events-auto shadow-2xl">
        {/* Logo / Name */}
        <div className="flex items-center gap-2">
          <Globe size={22} className="text-white shrink-0" />
          <span className="text-white font-semibold text-base sm:text-lg hidden xs:block">Ratnesh Kumar Singh</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 lg:gap-8">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#contact" className="text-white text-sm font-medium hover:text-white/80 transition-colors">
            Contact
          </a>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden text-white p-1 hover:text-white/80 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 max-w-5xl mx-auto">
          <div className="liquid-glass rounded-3xl px-6 py-5 flex flex-col gap-4 shadow-2xl">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-white text-base font-medium transition-colors border-b border-white/10 pb-3 last:border-0 last:pb-0"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-1">
              <a href="#contact" onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
