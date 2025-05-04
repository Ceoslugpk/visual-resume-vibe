
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
    document.title = 'John Doe | Developer & Designer';
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }

    // Add gradient background to body in dark mode
    const updateBackground = () => {
      const isDark = document.documentElement.classList.contains('dark');
      document.body.classList.toggle('gradient-background', isDark);
      document.body.classList.toggle('futuristic-grid', isDark);
      document.body.classList.toggle('scan-lines', isDark);
    };

    updateBackground();
    
    // Setup cursor trailer effect in dark mode
    const setupCursorEffect = () => {
      if (document.documentElement.classList.contains('dark')) {
        const cursorTrailer = document.createElement('div');
        cursorTrailer.className = 'pointer-events-none fixed w-6 h-6 rounded-full bg-primary/20 z-50 opacity-0 transition-opacity duration-300 backdrop-blur-sm';
        document.body.appendChild(cursorTrailer);
        
        const updateCursorPosition = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          
          setTimeout(() => {
            cursorTrailer.style.transform = `translate(${clientX - 12}px, ${clientY - 12}px)`;
            cursorTrailer.style.opacity = '1';
          }, 100);
        };
        
        document.addEventListener('mousemove', updateCursorPosition);
        
        return () => {
          document.removeEventListener('mousemove', updateCursorPosition);
          if (cursorTrailer.parentNode) {
            cursorTrailer.parentNode.removeChild(cursorTrailer);
          }
        };
      }
    };
    
    const cleanupCursor = setupCursorEffect();
    
    // Observer for animations
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll(".section").forEach((section) => {
        observer.observe(section);
      });
      
      // Add parallax effect for dark mode
      if (document.documentElement.classList.contains('dark')) {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        const handleMouseMove = (e: MouseEvent) => {
          const x = e.clientX / window.innerWidth;
          const y = e.clientY / window.innerHeight;
          
          parallaxElements.forEach((elem) => {
            const el = elem as HTMLElement;
            const speed = parseFloat(el.getAttribute('data-speed') || '0.05');
            const moveX = (x - 0.5) * speed * 50;
            const moveY = (y - 0.5) * speed * 50;
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
          });
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
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
      {/* Futuristic cursor effect (only shows in dark mode) */}
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
