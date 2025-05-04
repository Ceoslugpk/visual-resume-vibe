
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add floating animation after component mounts
    if (profileRef.current) {
      profileRef.current.classList.add('animate-float');
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20">
      <div className="container mx-auto px-4 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6 order-2 lg:order-1">
          <p className="text-base md:text-lg font-medium text-primary animate-fade-in opacity-0" style={{animationFillMode: 'forwards'}}>
            👋 Hello, nice to meet you
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-delay-1 opacity-0" style={{animationFillMode: 'forwards'}}>
            I'm <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">John Doe</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground/80 animate-fade-in-delay-2 opacity-0" style={{animationFillMode: 'forwards'}}>
            Full Stack Developer & UI/UX Designer
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl animate-fade-in-delay-3 opacity-0" style={{animationFillMode: 'forwards'}}>
            I create beautiful, functional, and accessible web experiences
            with a focus on animation and interactivity.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-delay-4 opacity-0" style={{animationFillMode: 'forwards'}}>
            <Button size="lg" className="relative overflow-hidden group">
              <span className="relative z-10">Download CV</span>
              <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
          <div 
            ref={profileRef} 
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl opacity-0 animate-scale"
            style={{animationFillMode: 'forwards'}}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-8xl font-bold">
              JD
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pb-8 animate-fade-in-delay-4 opacity-0" style={{animationFillMode: 'forwards'}}>
        <a 
          href="#about" 
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <span className="mb-2">Scroll Down</span>
          <ArrowDown className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
