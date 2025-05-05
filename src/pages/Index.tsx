
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
    
    // Setup terminal-themed cursor effect in dark mode
    const setupCursorEffect = () => {
      if (document.documentElement.classList.contains('dark')) {
        const cursorTrailer = document.createElement('div');
        cursorTrailer.className = 'pointer-events-none fixed w-4 h-4 bg-red-500/40 z-50 opacity-0 transition-opacity duration-300';
        document.body.appendChild(cursorTrailer);
        
        // Add terminal-style blinking cursor
        const terminalCursor = document.createElement('div');
        terminalCursor.className = 'pointer-events-none fixed w-2 h-5 bg-red-500 z-40 animate-blink opacity-0 transition-opacity duration-300';
        document.body.appendChild(terminalCursor);
        
        const updateCursorPosition = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          
          setTimeout(() => {
            cursorTrailer.style.transform = `translate(${clientX - 8}px, ${clientY - 8}px)`;
            cursorTrailer.style.opacity = '1';
            
            terminalCursor.style.transform = `translate(${clientX}px, ${clientY - 10}px)`;
            terminalCursor.style.opacity = '0.6';
          }, 50);
        };
        
        document.addEventListener('mousemove', updateCursorPosition);
        
        return () => {
          document.removeEventListener('mousemove', updateCursorPosition);
          if (cursorTrailer.parentNode) {
            cursorTrailer.parentNode.removeChild(cursorTrailer);
            terminalCursor.parentNode.removeChild(terminalCursor);
          }
        };
      }
    };
    
    const cleanupCursor = setupCursorEffect();
    
    // Observer for animations with terminal-like reveal effect
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
      
      // Add digital rain effect in dark mode
      if (document.documentElement.classList.contains('dark')) {
        const createDigitalRain = () => {
          const rain = document.createElement('div');
          rain.className = 'fixed inset-0 pointer-events-none z-0 opacity-5';
          rain.id = 'digital-rain';
          
          let html = '';
          for (let i = 0; i < 25; i++) {
            let line = '';
            for (let j = 0; j < 40; j++) {
              line += Math.random() > 0.5 ? '1' : '0';
            }
            html += `<div>${line}</div>`;
          }
          rain.innerHTML = html;
          document.body.appendChild(rain);
          
          // Add subtle pentagram background
          const pentagrams = document.createElement('div');
          pentagrams.className = 'fixed inset-0 pointer-events-none z-0 pentagram-overlay';
          document.body.appendChild(pentagrams);
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
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden dark:bg-black">
      {/* Terminal-themed cursor effect (only shows in dark mode) */}
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
