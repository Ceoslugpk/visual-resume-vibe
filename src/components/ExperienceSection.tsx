
import React, { useRef, useEffect } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const experiences: ExperienceItem[] = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      period: '2022 - Present',
      description: 'Led the frontend development team in creating responsive web applications. Implemented modern UI/UX techniques and improved performance by 40%.'
    },
    {
      title: 'Full Stack Developer',
      company: 'WebSolutions Co.',
      period: '2019 - 2022',
      description: 'Developed full-stack applications using React, Node.js, and MongoDB. Collaborated with designers to implement engaging user interfaces and interactive features.'
    },
    {
      title: 'UI/UX Designer',
      company: 'Creative Agency',
      period: '2017 - 2019',
      description: 'Created user-centered designs for web and mobile applications. Conducted usability testing and implemented feedback to improve user experience.'
    },
    {
      title: 'Junior Web Developer',
      company: 'StartUp Labs',
      period: '2015 - 2017',
      description: 'Built responsive websites and assisted in developing web applications. Gained foundational experience in HTML, CSS, JavaScript and various web technologies.'
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

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 lg:py-32 section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey through various roles and companies that have shaped my expertise and skills.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-border -translate-x-1/2 z-0"></div>

          <ul className="relative z-10 space-y-12">
            {experiences.map((experience, index) => (
              <li 
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`section relative ${index % 2 === 0 ? 'text-right' : ''}`}
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : ''}`}>
                  <div 
                    className={`w-full md:w-1/2 bg-card p-6 rounded-lg shadow-md border border-border relative ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    {/* Dot on timeline */}
                    <div className="absolute top-1/2 -translate-y-1/2 bg-primary w-4 h-4 rounded-full shadow z-20 hidden md:block"
                      style={{
                        [index % 2 === 0 ? 'right' : 'left']: '-42px',
                      }}
                    ></div>
                    
                    {/* Line to dot */}
                    <div className="absolute top-1/2 h-0.5 w-8 bg-primary hidden md:block"
                      style={{
                        [index % 2 === 0 ? 'right' : 'left']: '-32px',
                      }}
                    ></div>

                    <div className="flex items-center mb-4 space-x-2 text-primary">
                      <Briefcase className="w-5 h-5" />
                      <h3 className="text-xl font-semibold">{experience.title}</h3>
                    </div>
                    
                    <div className="mb-2 text-lg font-medium">{experience.company}</div>
                    
                    <div className="flex items-center mb-4 text-muted-foreground">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      <span>{experience.period}</span>
                    </div>
                    
                    <p className="text-muted-foreground">{experience.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
