
import React, { useRef, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
}

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<Array<HTMLDivElement | null>>([]);

  const projects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'A fully responsive e-commerce platform with advanced filtering, cart functionality, and payment integration.',
      image: 'bg-gradient-to-r from-primary to-secondary',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      title: 'Task Management App',
      description: 'A drag-and-drop task management application with team collaboration features and real-time updates.',
      image: 'bg-gradient-to-r from-secondary to-accent',
      tags: ['React', 'Firebase', 'Tailwind CSS', 'DnD'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'A creative and animated portfolio website showcasing projects and skills with smooth transitions.',
      image: 'bg-gradient-to-r from-accent to-primary',
      tags: ['TypeScript', 'React', 'Framer Motion', 'GSAP'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather dashboard with location search, forecasts, and beautiful visualizations of weather data.',
      image: 'bg-gradient-to-r from-primary/80 to-secondary/80',
      tags: ['JavaScript', 'Chart.js', 'API Integration', 'CSS Animations'],
      demoLink: '#',
      githubLink: '#',
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

    projectRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 bg-muted/50 section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out some of my recent projects that showcase my technical skills and creative abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              ref={el => projectRefs.current[index] = el}
              className="bg-card rounded-lg overflow-hidden border border-border shadow-md hover:shadow-xl transition-shadow duration-300 section"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-48 ${project.image} flex items-center justify-center`}>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
