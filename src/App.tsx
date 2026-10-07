/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { HowToUseVideo } from './components/HowToUseVideo';
import { HowItWorks } from './components/HowItWorks';
import { McpIntegration } from './components/McpIntegration';
import { DashboardPreview } from './components/DashboardPreview';
import { HealthScore } from './components/HealthScore';
import { PrivacySection } from './components/PrivacySection';
import { StackMatrix } from './components/StackMatrix';
import { TeamServer } from './components/TeamServer';
import { InstallSection } from './components/InstallSection';
import { OpenSourceSection } from './components/OpenSourceSection';
import { Footer } from './components/Footer';
import { DocsView } from './components/DocsView';
import { GeminiChatbot } from './components/GeminiChatbot';
import { TerminalDemo } from './components/TerminalDemo';

export default function App() {
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Initialize theme based on user's system preferences
  useEffect(() => {
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Sync theme changes with DOM
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Handle URL hash changes for #docs route
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#docs') {
        setIsDocsOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openDocs = () => {
    setIsDocsOpen(true);
    window.location.hash = 'docs';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDocs = () => {
    setIsDocsOpen(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isDocsOpen) {
    return (
      <>
        <DocsView onBackToLanding={closeDocs} />
        <GeminiChatbot
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onOpen={() => setIsChatOpen(true)}
        />
      </>
    );
  }

  return (
    <div className={`min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 ${!isDarkMode ? 'light-mode-theme' : ''}`}>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-cyan-600 focus:text-white focus:top-2 focus:left-2 rounded-lg font-mono text-xs"
      >
        Skip to main content
      </a>

      {/* Global Navigation Bar */}
      <Navbar
        onOpenDocs={openDocs}
        onOpenChat={() => setIsChatOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero with title, badges, and install CTA */}
        <Hero
          onOpenDocs={openDocs}
          onOpenChat={() => setIsChatOpen(true)}
        />

        {/* Live Interactive Terminal & Side-by-Side AI Impact Demonstration */}
        <section id="demo" className="py-8 sm:py-10 md:py-12 border-b border-zinc-800/80 bg-zinc-950 relative">
          <div className="site-container">
            <div className="mb-4 sm:mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-800/50 text-[10.5px] font-mono text-cyan-400 mb-2">
                <span>LIVE CONTEXT SIMULATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-bold tracking-tight text-white mb-1.5">
                See what happens when AI tools have your codebase map.
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Watch CTX extract structured repository knowledge via MCP, and immediately compare what an AI tool generates with and without context.
              </p>
            </div>
            <TerminalDemo />
          </div>
        </section>

        {/* 2. The problem: AI tools guess about your codebase */}
        <ProblemSection />

        {/* 3. How to use demo video walkthrough (All steps) */}
        <HowToUseVideo />

        {/* 4. How it works: init, extract, serve */}
        <HowItWorks />

        {/* 4. Works with: Cursor, Claude Desktop, VS Code, MCP clients */}
        <McpIntegration />

        {/* 5. Dashboard preview: interactive screenshot with endpoints, ER diagram, diff timeline */}
        <DashboardPreview />

        {/* 6. Health score: animated 0-100 gauge with the tips list */}
        <HealthScore />

        {/* 7. Privacy: never stores .env values, secrets redacted, runs locally */}
        <PrivacySection />

        {/* 8. Supported stack matrix: languages, frameworks, ORMs as a clear table */}
        <StackMatrix />

        {/* 9. Team server: self-hosted push/pull/share */}
        <TeamServer />

        {/* 10. Install: tabs for Linux/macOS, Windows, From source, Docker */}
        <InstallSection />

        {/* 11. Open source: GitHub stars, MIT license, contributing, roadmap */}
        <OpenSourceSection />
      </main>

      {/* 12. Footer: docs, GitHub, issues, security, changelog */}
      <Footer onOpenDocs={openDocs} />

      {/* Gemini Multi-Turn Chatbot */}
      <GeminiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
      />
    </div>
  );
}
