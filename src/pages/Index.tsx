
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import SkillsShowcase from '../components/SkillsShowcase';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';

const Index = () => {
  useEffect(() => {
    document.title = 'John Doe | Developer & Cybersecurity Expert';
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }

    // Add cybersecurity-themed background to body in dark mode
    const updateBackground = () => {
      const isDark = document.documentElement.classList.contains('dark');
      document.body.classList.toggle('gradient-background', isDark);
      document.body.classList.toggle('cyber-grid', isDark);
      document.body.classList.toggle('scan-lines', isDark);
    };

    updateBackground();
    
    // Setup cybersecurity-themed cursor effect in dark mode
    const setupCursorEffect = () => {
      if (document.documentElement.classList.contains('dark')) {
        const cursorTrailer = document.createElement('div');
        cursorTrailer.className = 'pointer-events-none fixed w-6 h-6 rounded-full bg-primary/20 z-50 opacity-0 transition-opacity duration-300 backdrop-blur-sm';
        document.body.appendChild(cursorTrailer);
        
        // Add digital code ring around cursor
        const cursorRing = document.createElement('div');
        cursorRing.className = 'pointer-events-none fixed w-16 h-16 border border-primary/20 rounded-full z-40 opacity-0 transition-all duration-500';
        document.body.appendChild(cursorRing);
        
        const updateCursorPosition = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          
          setTimeout(() => {
            cursorTrailer.style.transform = `translate(${clientX - 12}px, ${clientY - 12}px)`;
            cursorTrailer.style.opacity = '1';
            
            cursorRing.style.transform = `translate(${clientX - 32}px, ${clientY - 32}px)`;
            cursorRing.style.opacity = '0.6';
          }, 100);
        };
        
        document.addEventListener('mousemove', updateCursorPosition);
        
        return () => {
          document.removeEventListener('mousemove', updateCursorPosition);
          if (cursorTrailer.parentNode) {
            cursorTrailer.parentNode.removeChild(cursorTrailer);
            cursorRing.parentNode.removeChild(cursorRing);
          }
        };
      }
    };
    
    const cleanupCursor = setupCursorEffect();
    
    // Observer for animations with code-like reveal effect
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              
              // Add code-typing animation to headings in dark mode
              if (document.documentElement.classList.contains('dark') && 
                  entry.target.querySelectorAll('h2, h3').length > 0) {
                entry.target.querySelectorAll('h2, h3').forEach(heading => {
                  heading.classList.add('code-reveal');
                });
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll(".section").forEach((section) => {
        observer.observe(section);
      });
      
      // Add hacking-style parallax effect for dark mode
      if (document.documentElement.classList.contains('dark')) {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        const handleMouseMove = (e: MouseEvent) => {
          const x = e.clientX / window.innerWidth;
          const y = e.clientY / window.innerHeight;
          
          parallaxElements.forEach((elem) => {
            const el = elem as HTMLElement;
            const speed = parseFloat(el.getAttribute('data-speed') || '0.05');
            const moveX = (x - 0.5) * speed * 60;
            const moveY = (y - 0.5) * speed * 60;
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
          });
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
      }
      
      // Add digital rain effect in dark mode
      if (document.documentElement.classList.contains('dark')) {
        const createDigitalRain = () => {
          const rain = document.createElement('div');
          rain.className = 'fixed inset-0 pointer-events-none z-0 opacity-10';
          rain.id = 'digital-rain';
          document.body.appendChild(rain);
          
          // This would be implemented in CSS, see below for the addition
        };
        
        createDigitalRain();
      }
    };

    // Initialize after a small delay to ensure DOM is ready
    setTimeout(observeElements, 100);
    
    // Cleanup event listeners when component unmounts
    return () => {
      if (cleanupCursor) cleanupCursor();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Cybersecurity-themed cursor effect (only shows in dark mode) */}
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsShowcase />
      <ExperienceSection />
      <ProjectsSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
