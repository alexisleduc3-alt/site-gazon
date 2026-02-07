import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface NavBarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md shadow-md py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
          {/* Custom SVG Logo matching the Altea Hexagon Brand */}
          <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 drop-shadow-md">
            <defs>
              <pattern id="stripes-nav" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect x="0" y="0" width="10" height="20" fill="#4ADE80" /> {/* Light Green */}
                <rect x="10" y="0" width="10" height="20" fill="#166534" /> {/* Dark Green */}
              </pattern>
            </defs>
            {/* Hexagon Background with Stripes */}
            <path d="M50 2L91.569 26V74L50 98L8.43076 74V26L50 2Z" fill="url(#stripes-nav)" stroke="#166534" strokeWidth="2"/>
            {/* The 'A' Shape */}
            <path d="M50 22L78 82H64L50 52L36 82H22L50 22Z" fill="white"/>
          </svg>
          
          <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
            ALTEA
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Tarifs', 'Promos', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase() === 'tarifs' ? 'pricing' : item.toLowerCase() === 'promos' ? 'promos' : 'footer')}
              className={`text-sm font-medium hover:text-altea-green transition-colors ${
                isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-gray-200'
              }`}
            >
              {item}
            </button>
          ))}
          
          <button 
            onClick={() => scrollToSection('booking')}
            className="bg-altea-green hover:bg-altea-greenDark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-altea-green/30"
          >
            Réserver
          </button>

          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isScrolled 
                ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white' 
                : 'hover:bg-white/10 text-white'
            }`}
            aria-label="Changer le thème"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}
          >
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 ${isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#1A1A1A] border-t dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6 md:hidden">
          {['Tarifs', 'Promos', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase() === 'tarifs' ? 'pricing' : item.toLowerCase() === 'promos' ? 'promos' : 'footer')}
              className="text-left text-lg font-medium text-gray-900 dark:text-white"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('booking')}
            className="bg-altea-green text-white py-3 rounded-lg font-bold text-center"
          >
            Réserver maintenant
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
