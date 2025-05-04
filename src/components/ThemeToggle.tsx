
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from local storage or system preference
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Add transition class to body for smooth color transitions
    document.body.classList.add('theme-transition');
    
    // Toggle dark mode class
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    
    // Update local storage
    localStorage.setItem("theme", newTheme);
    
    // Remove transition class after transition completes
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 600);
  };

  if (!isMounted) return null;

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 bg-background/80 backdrop-blur-md border-border transition-all duration-500 relative overflow-hidden hover:shadow-lg dark:hover:shadow-primary/20"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Sun 
          className={`h-4 w-4 text-yellow-500 absolute transition-transform duration-500 ${
            theme === 'light' 
              ? 'translate-y-0 rotate-0 opacity-100' 
              : 'translate-y-10 rotate-90 opacity-0'
          }`} 
        />
        <Moon 
          className={`h-4 w-4 text-blue-400 absolute transition-transform duration-500 ${
            theme === 'dark' 
              ? 'translate-y-0 rotate-0 opacity-100' 
              : '-translate-y-10 -rotate-90 opacity-0'
          }`} 
        />
      </div>
      <span className="sr-only">{theme === "light" ? "Dark mode" : "Light mode"}</span>
      
      {/* Enhanced highlight effect on toggle */}
      <div className={`
        absolute inset-0 rounded-full transition-all duration-700
        before:absolute before:inset-0 before:rounded-full before:animate-spin-slow before:border before:opacity-0
        dark:before:opacity-100 dark:before:border-primary/20
        bg-gradient-to-tr from-yellow-300/20 to-orange-300/20
        dark:from-blue-500/30 dark:to-purple-500/30
        ${theme === "light" ? "opacity-100" : "opacity-0"}
      `}></div>
      
      {/* Radial ripple effect on click */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <span className="absolute inset-0 transform scale-0 rounded-full bg-primary/10 animate-ripple"></span>
      </div>
    </Button>
  );
};

export default ThemeToggle;
