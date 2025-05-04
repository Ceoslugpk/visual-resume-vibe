
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-background/90 backdrop-blur-sm shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in"
        >
          Portfolio
        </a>
        
        {/* Desktop navigation */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, index) => (
            <li key={link.name} className={`animate-fade-in-delay-${index + 1} opacity-0`} style={{animationFillMode: 'forwards'}}>
              <a 
                href={link.href}
                className="text-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="animate-fade-in-delay-4 opacity-0" style={{animationFillMode: 'forwards'}}>
            <ThemeToggle />
          </li>
        </ul>
        
        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" onClick={toggleMenu} className="text-foreground">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t animate-fade-in" style={{animationFillMode: 'forwards'}}>
          <ul className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link, index) => (
              <li key={link.name} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards'}}>
                <a 
                  href={link.href}
                  className="block text-foreground hover:text-primary transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
