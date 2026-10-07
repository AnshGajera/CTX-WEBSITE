import React, { useState } from 'react';
import { Star, Sun, Moon, Github, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenDocs: () => void;
  onOpenChat?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDocs,
  isDarkMode = true,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80">
      <div className="site-container">
        <div className="w-full h-16 flex items-center justify-between">
          {/* 1. LEFT: [Icon] CTX Brand Mark */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2.5 group select-none">
              <div className="w-8 h-8 rounded-[8px] bg-zinc-900 border border-zinc-700/80 group-hover:border-cyan-500/80 flex items-center justify-center transition-colors shadow-xs shadow-cyan-950/30">
                {/* Custom AST Context Graph Icon representing CTX (Git for Context) */}
                <svg
                  className="w-4.5 h-4.5 transition-transform group-hover:scale-105"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                    stroke="#06b6d4"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                    fill="rgba(6, 182, 212, 0.12)"
                  />
                  <path
                    d="M12 12V3.5M12 12L19.5 16.2M12 12L4.5 16.2"
                    stroke="#2dd4bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="12" r="2.2" fill="#06b6d4" />
                  <circle cx="12" cy="3.5" r="1.5" fill="#22d3ee" />
                  <circle cx="19.5" cy="16.2" r="1.5" fill="#22d3ee" />
                  <circle cx="4.5" cy="16.2" r="1.5" fill="#22d3ee" />
                </svg>
              </div>
              <span className="font-orbitron font-extrabold text-[16px] tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                CTX
              </span>
            </a>
          </div>

          {/* 2. CENTER: Clean Navigation (Introduction, Videos, Docs, About) */}
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-[13px] font-medium">
            <a
              href="#introduction"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Introduction
            </a>
            <a
              href="#videos"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Videos
            </a>
            <button
              onClick={onOpenDocs}
              className="text-zinc-200 hover:text-cyan-400 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Docs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </button>
            <a
              href="#about-us"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              About
            </a>
          </nav>

          {/* 3. RIGHT: Actions (GitHub, Star count, Theme, Get Started CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub Action Link with Secondary Star Count */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-zinc-300 hover:text-white transition-colors py-1.5 px-2 rounded-md hover:bg-zinc-900/80"
              title="View CTX on GitHub"
            >
              <Github className="w-4 h-4 text-zinc-400" />
              <span>GitHub</span>
              <span className="flex items-center gap-0.5 text-zinc-500 text-xs ml-0.5">
                <Star className="w-3 h-3 text-amber-400/90 fill-amber-400/90" />
                4.8k
              </span>
            </a>

            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors cursor-pointer"
                title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Primary CTA: Get Started → (Always visible on mobile & desktop) */}
            <a
              href="#get-started"
              className="h-9 px-3.5 sm:px-4 rounded-[8px] bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-[13px] sm:text-sm transition-colors border border-cyan-500/40 shadow-xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Get Started</span>
              <span className="text-cyan-200 text-sm leading-none">→</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-4 py-3 space-y-2 text-xs font-mono">
          <a
            href="#introduction"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-cyan-400 transition-colors"
          >
            Introduction
          </a>
          <a
            href="#videos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-cyan-400 transition-colors"
          >
            Videos
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDocs();
            }}
            className="block py-1.5 text-zinc-200 hover:text-cyan-400 font-semibold transition-colors w-full text-left cursor-pointer flex items-center gap-1.5"
          >
            <span>Docs</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </button>
          <a
            href="#about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-zinc-300 hover:text-cyan-400 transition-colors"
          >
            About
          </a>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub (4.8k stars)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
