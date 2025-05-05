
import React, { useRef, useEffect } from 'react';
import { Code, Flame, Database, Terminal, Server, Skull } from 'lucide-react';

interface SkillCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SkillsShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const skills: SkillCard[] = [
    {
      icon: <Terminal size={32} />,
      title: "Penetration Testing",
      description: "Identifying vulnerabilities in systems and networks using advanced terminal-based tools and techniques.",
    },
    {
      icon: <Skull size={32} />,
      title: "Security Hardening",
      description: "Implementing robust security measures to protect systems from unauthorized access and cyber threats.",
    },
    {
      icon: <Code size={32} />,
      title: "Secure Coding",
      description: "Developing applications with security in mind, following best practices to prevent common vulnerabilities.",
    },
    {
      icon: <Database size={32} />,
      title: "Database Security",
      description: "Protecting sensitive data through encryption, access controls, and secure database configuration.",
    },
    {
      icon: <Server size={32} />,
      title: "Network Security",
      description: "Designing and implementing secure network architectures with advanced monitoring capabilities.",
    },
    {
      icon: <Flame size={32} />,
      title: "Security Auditing",
      description: "Conducting thorough security assessments and compliance audits to ensure robust protection.",
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
      className="py-20 lg:py-32 relative overflow-hidden section dark:bg-black/80"
    >
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      
      {/* Pentagram overlay for subtle devilish effect */}
      <div className="hidden dark:block pentagram-overlay"></div>
      
      {/* Binary background for terminal theme (dark mode only) */}
      <div className="hidden dark:block absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 code-font text-[0.5rem] leading-tight opacity-30 text-red-500">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-red-400 terminal-prompt devilish-text">
            Security Expertise
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-primary to-white dark:from-red-700 dark:to-red-400 mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto dark:text-red-300/80">
            Specialized cybersecurity skills to protect systems and data from emerging threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="dark:terminal-card rounded-md overflow-hidden shadow-lg transition-all duration-300 border border-white/10 dark:border-red-500/20 section group hover:border-primary/50 dark:hover:border-red-500/40"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8 flex flex-col items-center text-center h-full relative overflow-hidden">
                {/* Digital scan line effect for dark mode */}
                <div className="hidden dark:block absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan"></div>
                </div>
                
                {/* Skill icon */}
                <div className="w-16 h-16 rounded-md bg-white dark:bg-black border border-black/10 dark:border-red-500/40 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 relative text-primary dark:text-red-400">
                  {skill.icon}
                  
                  {/* Pulse effect in dark mode */}
                  <div className="hidden dark:block absolute inset-0 rounded-md animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Title with terminal decoration in dark mode */}
                <h3 className="text-xl font-semibold mb-4 relative dark:text-red-400">
                  <span className="hidden dark:inline-block absolute -left-4 text-primary/50 code-font text-red-500">
                    &gt;
                  </span>
                  {skill.title}
                </h3>
                
                <p className="text-muted-foreground dark:text-red-400/70">{skill.description}</p>
                
                {/* Terminal command pattern overlay in dark mode */}
                <div className="hidden dark:block absolute bottom-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
                  <div className="text-[0.5rem] text-red-500 font-mono text-right">
                    $ sudo<br />
                    $ nmap<br />
                    $ ssh<br />
                    $ chmod<br />
                  </div>
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
