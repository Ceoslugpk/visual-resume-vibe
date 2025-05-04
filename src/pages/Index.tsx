
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
    };

    updateBackground();
    
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
    };

    // Initialize after a small delay to ensure DOM is ready
    setTimeout(observeElements, 100);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
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
