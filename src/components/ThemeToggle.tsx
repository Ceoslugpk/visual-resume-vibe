
import React, { useEffect, useState } from "react";
import { Terminal, Flame } from "lucide-react";
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
      className="rounded-md w-10 h-10 bg-background/80 backdrop-blur-md border-border transition-all duration-500 relative overflow-hidden hover:shadow-md dark:hover:shadow-primary/10 dark:bg-black/50"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Terminal 
          className={`h-4 w-4 text-black absolute transition-transform duration-500 ${
            theme === 'light' 
              ? 'translate-y-0 rotate-0 opacity-100' 
              : 'translate-y-10 rotate-90 opacity-0'
          }`} 
        />
        <Flame 
          className={`h-4 w-4 text-red-500 absolute transition-transform duration-500 ${
            theme === 'dark' 
              ? 'translate-y-0 rotate-0 opacity-100' 
              : '-translate-y-10 -rotate-90 opacity-0'
          }`} 
        />
      </div>
      <span className="sr-only">{theme === "light" ? "Terminal mode" : "Light mode"}</span>
      
      {/* Terminal cursor effect */}
      <div className={`
        absolute inset-0 rounded-md transition-all duration-700
        ${theme === "dark" ? "border border-red-400/30" : ""}
      `}></div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 rounded-md overflow-hidden pointer-events-none opacity-0 dark:opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-400/5 to-transparent animate-scan"></div>
      </div>

      {/* Binary code overlay in dark mode */}
      <div className="absolute inset-0 rounded-md overflow-hidden opacity-0 dark:opacity-20 pointer-events-none">
        <div className="h-full w-full text-[0.4rem] text-red-400/60 overflow-hidden select-none font-mono">
          10101
        </div>
      </div>
    </Button>
  );
};

export default ThemeToggle;
