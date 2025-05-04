
import React, { useRef, useEffect } from 'react';
import { Code2, Layout, Database, Palette, LineChart, Shield } from 'lucide-react';

interface SkillCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const SkillsShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const skills: SkillCard[] = [
    {
      icon: <Code2 size={32} />,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks.",
      color: "from-blue-500 to-violet-500",
    },
    {
      icon: <Database size={32} />,
      title: "Backend Development",
      description: "Creating robust server-side applications with Node.js, Express, and database integration.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <Layout size={32} />,
      title: "UI/UX Design",
      description: "Designing intuitive and visually appealing user experiences with a focus on usability and accessibility.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Palette size={32} />,
      title: "Creative Design",
      description: "Crafting beautiful visual elements, illustrations, and branding materials for digital products.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <LineChart size={32} />,
      title: "Data Visualization",
      description: "Transforming complex data into clear, meaningful visualizations using modern charting libraries.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Shield size={32} />,
      title: "Web Security",
      description: "Implementing best practices for secure web applications and protecting user data.",
      color: "from-amber-500 to-orange-500",
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
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These are the key areas where I excel and bring the most value to my projects and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="glass-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border dark:border-secondary/20 section"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`p-8 flex flex-col items-center text-center h-full`}>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center text-white mb-6 transform hover:scale-110 transition-transform duration-300`}>
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
                
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
