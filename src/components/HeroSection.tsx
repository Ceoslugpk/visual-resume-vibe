
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Terminal, Skull } from 'lucide-react';
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
    
    // Terminal typing effect for text
    const startTypingAnimation = () => {
      const text = "John Doe";
      const terminalTitle = document.getElementById('terminal-title');
      
      if (terminalTitle) {
        terminalTitle.innerHTML = '';
        terminalTitle.style.opacity = '1';
        
        let i = 0;
        const typeInterval = setInterval(() => {
          if (i < text.length) {
            terminalTitle.innerHTML += text.charAt(i);
            i++;
          } else {
            clearInterval(typeInterval);
            
            // Add blinking cursor after typing
            const cursor = document.createElement('span');
            cursor.className = 'inline-block w-2 h-5 bg-primary dark:bg-red-500 ml-1 animate-blink';
            terminalTitle.appendChild(cursor);
          }
        }, 150);
      }
    };
    
    setTimeout(startTypingAnimation, 500);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden dark:bg-black">
      {/* Terminal-themed Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMCwgMCwgMC4wMykiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2c+PC9zdmc+')] pointer-events-none dark:opacity-20 opacity-5"></div>
      
      {/* Pentagram overlay (subtle) */}
      <div className="hidden dark:block pentagram-overlay"></div>
      
      <div ref={containerRef} className="container mx-auto px-4 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="w-full lg:w-1/2 space-y-6 order-2 lg:order-1">
          <div className="text-base md:text-lg font-medium text-primary dark:text-red-400 animate-fade-in opacity-0 terminal-prompt" style={{animationFillMode: 'forwards'}}>
            $ whoami
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-delay-1 opacity-0" style={{animationFillMode: 'forwards'}}>
            I'm <span id="terminal-title" className="text-black dark:text-red-500 relative opacity-0 dark:devilish-text">
              
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground/80 dark:text-red-300/80 animate-fade-in-delay-2 opacity-0 terminal-prompt" style={{animationFillMode: 'forwards'}}>
            Security Researcher & Developer
          </h2>
          <p className="text-lg text-muted-foreground dark:text-red-400/60 max-w-xl animate-fade-in-delay-3 opacity-0 font-mono" style={{animationFillMode: 'forwards'}}>
            I build secure systems and find vulnerabilities others miss.
            My code is my shield, terminal is my weapon.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-delay-4 opacity-0" style={{animationFillMode: 'forwards'}}>
            <Button size="lg" className="dark:terminal-button dark:border-red-500 dark:text-red-400 relative overflow-hidden group">
              <Skull className="mr-2 h-4 w-4" />
              <span className="relative z-10">Download CV</span>
              <span className="absolute inset-0 bg-white dark:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            <Button size="lg" variant="outline" asChild className="backdrop-blur-sm dark:bg-black/30 dark:border-red-500/40 dark:text-red-400 relative group">
              <a href="#contact">
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-primary/5 dark:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
          <div 
            ref={profileRef} 
            className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden border-4 border-black/10 dark:border-red-500/30 shadow-xl opacity-0 animate-scale bg-white dark:bg-black"
            style={{animationFillMode: 'forwards'}}
          >
            <Avatar className="w-full h-full rounded-none">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1800&auto=format&fit=crop" alt="John Doe" className="object-cover w-full h-full grayscale" />
              <AvatarFallback className="w-full h-full bg-black dark:bg-black text-white dark:text-red-400 text-8xl font-bold flex items-center justify-center rounded-none">
                JD
              </AvatarFallback>
            </Avatar>
            
            {/* Terminal-styled border effect */}
            <div className="absolute inset-0 border-4 border-transparent animate-pulse pointer-events-none opacity-0 dark:opacity-100" style={{ 
              border: '1px solid rgba(255, 0, 0, 0.3)',
              boxShadow: '0 0 10px rgba(255, 0, 0, 0.2), inset 0 0 5px rgba(255, 0, 0, 0.2)',
              animationDuration: '3s'
            }}></div>
            
            {/* Scan line animation */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 dark:via-red-500/10 to-transparent animate-scan"></div>
            
            {/* Terminal status indicators */}
            <div className="absolute top-3 right-3 flex space-x-2">
              <div className="w-3 h-3 bg-primary dark:bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-white dark:bg-red-500/50 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pb-8 animate-fade-in-delay-4 opacity-0" style={{animationFillMode: 'forwards'}}>
        <a 
          href="#about" 
          className="flex flex-col items-center text-muted-foreground dark:text-red-400/60 hover:text-primary dark:hover:text-red-400 transition-colors duration-300 group"
        >
          <span className="mb-2 relative terminal-prompt">
            scroll_down
          </span>
          <ArrowDown className="animate-bounce dark:text-red-400" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
