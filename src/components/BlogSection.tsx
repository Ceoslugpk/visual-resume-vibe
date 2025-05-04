
import React, { useRef, useEffect } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageClass: string;
}

const BlogSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const postsRef = useRef<Array<HTMLDivElement | null>>([]);

  const blogPosts: BlogPost[] = [
    {
      title: "The Future of Web Development in 2025",
      excerpt: "Exploring emerging technologies and methodologies that will shape the web development landscape in the coming years.",
      date: "Apr 10, 2025",
      readTime: "5 min read",
      category: "Technology",
      imageClass: "bg-gradient-to-br from-blue-500 to-violet-600"
    },
    {
      title: "Mastering Modern CSS Techniques",
      excerpt: "A deep dive into advanced CSS features like Grid, Container Queries, and CSS Variables for better layouts.",
      date: "Mar 22, 2025",
      readTime: "8 min read",
      category: "CSS",
      imageClass: "bg-gradient-to-br from-pink-500 to-orange-500"
    },
    {
      title: "Building Accessible Web Applications",
      excerpt: "Best practices for creating inclusive web experiences that work for everyone, regardless of abilities or disabilities.",
      date: "Feb 15, 2025",
      readTime: "6 min read",
      category: "Accessibility",
      imageClass: "bg-gradient-to-br from-green-500 to-teal-600"
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

    postsRef.current.forEach((post) => {
      if (post) observer.observe(post);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="blog" 
      ref={sectionRef} 
      className="py-20 lg:py-32 relative overflow-hidden section"
    >
      {/* Background decoration */}
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest <span className="text-primary">Articles</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mb-8 rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl">
              Thoughts, insights, and perspectives on web development, design, and technology.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-6 md:mt-0 group border-primary/30 hover:border-primary dark:border-primary/20 dark:hover:border-primary"
          >
            <span>View All Articles</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              ref={el => postsRef.current[index] = el}
              className="group bg-card dark:bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border dark:border-white/5 section"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`h-48 ${post.imageClass} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border dark:border-white/5">
                  <a href="#" className="inline-flex items-center text-primary font-medium group-hover:underline">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
