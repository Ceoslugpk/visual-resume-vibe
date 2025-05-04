
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const HeroSection: React.FC = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add floating animation after component mounts
    if (profileRef.current) {
      profileRef.current.classList.add('animate-float');
    }
    
    // Animate gradient text
    if (titleRef.current) {
      const animateGradient = () => {
        let hue = 0;
        
        const interval = setInterval(() => {
          hue = (hue + 1) % 360;
          if (titleRef.current) {
            titleRef.current.style.background = `linear-gradient(135deg, hsl(${hue}, 80%, 60%), hsl(${(hue + 60) % 360}, 80%, 60%))`;
            titleRef.current.style.backgroundClip = 'text';
            titleRef.current.style.webkitBackgroundClip = 'text';
          }
        }, 100);
        
        return () => clearInterval(interval);
      };
      
      const cleanup = animateGradient();
      return cleanup;
    }

    // Add parallax effect
    if (containerRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const elements = containerRef.current?.querySelectorAll('.parallax');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        elements?.forEach(elem => {
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
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] animate-pulse parallax" data-speed="0.03"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-secondary/20 dark:bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Futuristic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvc3ZnPg==')] pointer-events-none dark:opacity-50 opacity-20"></div>
      
      <div ref={containerRef} className="container mx-auto px-4 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="w-full lg:w-1/2 space-y-6 order-2 lg:order-1">
          <p className="text-base md:text-lg font-medium text-primary animate-fade-in opacity-0 parallax" data-speed="0.05" style={{animationFillMode: 'forwards'}}>
            👋 Hello, nice to meet you
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-delay-1 opacity-0 parallax" data-speed="0.02" style={{animationFillMode: 'forwards'}}>
            I'm <span ref={titleRef} className="text-transparent relative">
              John Doe
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary to-secondary/0 opacity-80 dark:opacity-90"></span>
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground/80 animate-fade-in-delay-2 opacity-0 parallax" data-speed="0.04" style={{animationFillMode: 'forwards'}}>
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
              {/* Button glow effect */}
              <span className="absolute -inset-8 -z-10 hidden dark:block rounded-full blur-xl bg-secondary/20 group-hover:bg-secondary/30 transition-all duration-500"></span>
            </Button>
            <Button size="lg" variant="outline" asChild className="backdrop-blur-sm dark:bg-background/30 dark:border-white/10 relative group">
              <a href="#contact">
                <span className="relative z-10">Contact Me</span>
                {/* Button glow effect */}
                <span className="absolute -inset-8 -z-10 hidden dark:block rounded-full blur-xl bg-secondary/10 group-hover:bg-secondary/20 transition-all duration-500"></span>
              </a>
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center parallax" data-speed="0.06">
          <div 
            ref={profileRef} 
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl opacity-0 animate-scale"
            style={{animationFillMode: 'forwards'}}
          >
            <Avatar className="w-full h-full">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1800&auto=format&fit=crop" alt="John Doe" className="object-cover w-full h-full" />
              <AvatarFallback className="w-full h-full bg-gradient-to-br from-primary to-secondary text-white text-8xl font-bold flex items-center justify-center">
                JD
              </AvatarFallback>
            </Avatar>
            
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin-slow pointer-events-none" style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              animationDuration: '8s'
            }}></div>
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/30 to-secondary/0 animate-glow"></div>
            
            {/* Futuristic elements */}
            <div className="absolute top-5 right-5 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-3 h-3 bg-secondary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pb-8 animate-fade-in-delay-4 opacity-0" style={{animationFillMode: 'forwards'}}>
        <a 
          href="#about" 
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors duration-300 group"
        >
          <span className="mb-2 relative">
            Scroll Down
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </span>
          <ArrowDown className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
