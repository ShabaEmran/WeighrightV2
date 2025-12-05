
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  onNavigate: (page: 'landing' | 'login') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColorClass = isScrolled ? 'text-voy-dark' : 'text-white';
  const logoColorClass = isScrolled ? 'text-voy-dark' : 'text-white';

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center relative">
            
            {/* Left: Hamburger & Menu Text */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className={`p-1 hover:opacity-70 transition-opacity ${textColorClass}`}
              >
                <Menu strokeWidth={1.5} size={28} />
              </button>
              <span className={`hidden md:block text-sm font-medium tracking-wide ${textColorClass}`}>
                What we treat
              </span>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 cursor-pointer" onClick={() => onNavigate('landing')}>
              <span className={`text-4xl font-serif font-medium tracking-tight transition-colors duration-300 ${logoColorClass}`}>
                Weighright
              </span>
            </div>

            {/* Right: Login & CTA */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('login')}
                className={`hidden md:block px-6 py-2.5 rounded-full border border-current text-sm font-medium transition-all hover:opacity-80 ${textColorClass}`}
              >
                Log in
              </button>
              <a href="#pricing" className={`block md:hidden text-sm font-medium ${textColorClass}`}>
                Join
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-voy-cream transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
             <span className="text-2xl font-serif text-voy-dark">Weighright</span>
             <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-voy-dark">
                <X size={28} strokeWidth={1.5} />
             </button>
          </div>
          
          <div className="flex flex-col gap-6 text-3xl font-serif text-voy-dark">
            <a href="#treatments" onClick={() => setMobileMenuOpen(false)}>Weight Loss</a>
            <a href="#impact" onClick={() => setMobileMenuOpen(false)}>Outcomes</a>
            <a href="#stories" onClick={() => setMobileMenuOpen(false)}>Stories</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          </div>

          <div className="mt-auto space-y-4">
            <Button fullWidth variant="primary">Get Started</Button>
            <Button fullWidth variant="outline" onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }}>Log in</Button>
          </div>
        </div>
      </div>
    </>
  );
};
