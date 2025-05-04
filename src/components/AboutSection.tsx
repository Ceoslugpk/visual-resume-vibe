
import React, { useEffect, useRef } from 'react';
import { Award, Book, Briefcase, Code } from 'lucide-react';

interface Skill {
  name: string;
  percentage: number;
}

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Skills data
  const skills: Skill[] = [
    { name: 'HTML/CSS', percentage: 95 },
    { name: 'JavaScript', percentage: 90 },
    { name: 'React', percentage: 85 },
    { name: 'TypeScript', percentage: 80 },
    { name: 'Node.js', percentage: 75 },
    { name: 'UI/UX Design', percentage: 85 },
  ];

  const stats = [
    { value: '5+', label: 'Years Experience', icon: <Briefcase className="w-6 h-6" /> },
    { value: '50+', label: 'Projects Completed', icon: <Code className="w-6 h-6" /> },
    { value: '10+', label: 'Happy Clients', icon: <Award className="w-6 h-6" /> },
    { value: '3', label: 'Certifications', icon: <Book className="w-6 h-6" /> },
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

    // Observe each skill bar
    if (skillsRef.current) {
      const skillBars = skillsRef.current.querySelectorAll('.skill-progress');
      skillBars.forEach((bar) => {
        observer.observe(bar);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 bg-muted/50 section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate developer with expertise in creating engaging and interactive web experiences. 
            My journey in tech has equipped me with a diverse skill set and a problem-solving mindset.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Who am I?</h3>
            <p className="text-muted-foreground mb-4">
              I'm a Full Stack Developer based in San Francisco with a passion for building exceptional
              digital experiences. Over the past 5 years, I've refined my skills in web development and UI/UX design.
            </p>
            <p className="text-muted-foreground mb-6">
              I enjoy transforming complex problems into simple, beautiful and intuitive designs. When I'm not coding
              or pushing pixels, you'll find me exploring new technologies or hiking in the mountains.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-background rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:transform hover:scale-105 transition-transform duration-300 border border-border"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-center text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={skillsRef}>
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="skill-progress h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ 
                        width: '0%',
                        '--progress-width': `${skill.percentage}%` 
                      } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
