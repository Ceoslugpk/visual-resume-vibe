
import React, { useRef, useEffect } from 'react';
import { Code, Shield, Database, Terminal, Server, Lock } from 'lucide-react';

interface SkillCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  darkColor: string;
}

const SkillsShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const skills: SkillCard[] = [
    {
      icon: <Code size={32} />,
      title: "Frontend Development",
      description: "Building secure and responsive interfaces with React, TypeScript, and modern security practices.",
      color: "from-blue-500 to-violet-500",
      darkColor: "from-cyber-blue to-cyber-purple"
    },
    {
      icon: <Shield size={32} />,
      title: "Cybersecurity",
      description: "Implementing advanced security measures to protect applications from modern threats and vulnerabilities.",
      color: "from-green-500 to-teal-500",
      darkColor: "from-cyber-green to-cyan-500"
    },
    {
      icon: <Database size={32} />,
      title: "Backend Development",
      description: "Creating secure server-side applications with Node.js, hardened APIs, and encrypted database integration.",
      color: "from-purple-500 to-pink-500",
      darkColor: "from-purple-600 to-cyber-purple"
    },
    {
      icon: <Terminal size={32} />,
      title: "Security Testing",
      description: "Performing penetration testing, vulnerability assessments, and implementing security best practices.",
      color: "from-orange-500 to-red-500",
      darkColor: "from-amber-500 to-cyber-red"
    },
    {
      icon: <Server size={32} />,
      title: "Infrastructure Security",
      description: "Securing cloud infrastructure, implementing zero-trust architectures, and monitoring for threats.",
      color: "from-cyan-500 to-blue-500",
      darkColor: "from-blue-600 to-cyber-blue"
    },
    {
      icon: <Lock size={32} />,
      title: "Identity & Access",
      description: "Building secure authentication systems, implementing OAuth, and managing user permissions.",
      color: "from-amber-500 to-orange-500",
      darkColor: "from-yellow-500 to-cyber-red/80"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-20 lg:py-32 relative overflow-hidden section"
    >
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      
      {/* Binary background for cybersecurity theme (dark mode only) */}
      <div className="hidden dark:block absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 code-font text-[0.5rem] leading-tight opacity-30">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i}>
              {Array.from({ length: 120 }).map((_, j) => (
                <span key={j} className="inline-block">
                  {Math.random() > 0.5 ? '1' : '0'}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized skills in web development and cybersecurity to build secure, modern applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="glass-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border dark:border-primary/20 section group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`p-8 flex flex-col items-center text-center h-full relative overflow-hidden`}>
                {/* Digital scan line effect for dark mode */}
                <div className="hidden dark:block absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan"></div>
                </div>
                
                {/* Skill icon */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} dark:bg-gradient-to-br dark:${skill.darkColor} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300 relative`}>
                  {skill.icon}
                  
                  {/* Pulse effect in dark mode */}
                  <div className="hidden dark:block absolute inset-0 rounded-full animate-pulse-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Title with code decoration in dark mode */}
                <h3 className="text-xl font-semibold mb-4 relative">
                  {skill.title}
                  <span className="hidden dark:inline-block absolute -left-4 text-primary/50 code-font">
                    &gt;
                  </span>
                </h3>
                
                <p className="text-muted-foreground">{skill.description}</p>
                
                {/* Circuit board pattern overlay in dark mode */}
                <div className="hidden dark:block absolute bottom-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary">
                    <path d="M10,10 L90,10 M90,10 L90,90 M90,90 L10,90 M10,90 L10,10" stroke="currentColor" strokeWidth="1" />
                    <path d="M30,10 L30,30 M30,30 L50,30 M50,30 L50,50 M50,50 L70,50 M70,50 L70,70 M70,70 L90,70" stroke="currentColor" strokeWidth="1" />
                    <circle cx="30" cy="30" r="3" fill="currentColor" />
                    <circle cx="50" cy="50" r="3" fill="currentColor" />
                    <circle cx="70" cy="70" r="3" fill="currentColor" />
                  </svg>
                </div>
                
                {/* Animated underline */}
                <div className="w-full h-1 mt-6 bg-gradient-to-r from-transparent via-primary/50 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent animate-glow"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
