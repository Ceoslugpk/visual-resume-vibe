
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
}

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      content: "John's ability to understand complex requirements and translate them into elegant solutions is exceptional. His work consistently exceeds expectations.",
      author: "Sarah Johnson",
      position: "CTO",
      company: "TechVision Inc."
    },
    {
      content: "Working with John was a game-changer for our project. His technical expertise combined with creative problem-solving made all the difference.",
      author: "Michael Chen",
      position: "Product Manager",
      company: "InnovateCorp"
    },
    {
      content: "John delivered a stunning website that perfectly captures our brand identity. His attention to detail and responsive design skills are top-notch.",
      author: "Emily Rodriguez",
      position: "Marketing Director",
      company: "BrandForward"
    },
    {
      content: "I've worked with many developers, but John stands out for his communication skills and ability to deliver high-quality work consistently on time.",
      author: "David Kim",
      position: "Startup Founder",
      company: "NextWave Solutions"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

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

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    // Auto-advance testimonials
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 lg:py-32 bg-muted/30 dark:bg-background/50 relative overflow-hidden section">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what my clients have to say about working with me.
          </p>
        </div>

        <div 
          ref={testimonialsRef} 
          className="max-w-4xl mx-auto relative section"
        >
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-10 -left-10 text-primary/20 dark:text-primary/10">
              <Quote size={80} />
            </div>

            {/* Testimonial Card */}
            <div className="bg-card dark:bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-border dark:border-white/5">
              <div className="min-h-[200px]">
                <p className="text-lg md:text-xl italic text-foreground/90 dark:text-foreground/80 mb-8 relative">
                  "{testimonials[currentIndex].content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {testimonials[currentIndex].author[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonials[currentIndex].author}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentIndex === index 
                      ? 'bg-primary' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevTestimonial}
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background dark:bg-background/30 dark:hover:bg-background/50"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextTestimonial}
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background dark:bg-background/30 dark:hover:bg-background/50"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
