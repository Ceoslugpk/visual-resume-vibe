
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card py-8 border-t border-border dark:bg-background/50 dark:border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              John Doe
            </div>
            <p className="text-muted-foreground mt-2">Full Stack Developer & UI/UX Designer</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-muted-foreground">
              © {currentYear} All Rights Reserved
            </p>
            <p className="text-sm mt-1">
              Designed & Built with <span className="text-red-500 animate-pulse">♥</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
