import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Github, Play } from 'lucide-react';
import { DEMO_PROJECTS } from '../data/demoScripts';
import { ContextGraph } from './ContextGraph';

interface HeroProps {
  onOpenDocs: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [copiedQuickCmd, setCopiedQuickCmd] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<'nextjs' | 'fastapi' | 'gogin'>('nextjs');
  const quickInstall = 'curl -fsSL https://getctx.dev | sh';

  const currentProject = DEMO_PROJECTS.find((p) => p.id === selectedProjectId) || DEMO_PROJECTS[0];

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(quickInstall);
    setCopiedQuickCmd(true);
    setTimeout(() => setCopiedQuickCmd(false), 2000);
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] flex items-center justify-center py-6 sm:py-8 lg:py-10 border-b border-zinc-800/80 bg-zinc-950 overflow-hidden">
      {/* Subtle radial glow background centered behind composition */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[760px] max-w-[80vw] h-[380px] bg-cyan-500/6 blur-[140px] pointer-events-none rounded-full" />
      
      {/* Technical background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Main Container - Scalable site-container matching all sections */}
      <div className="site-container relative z-10 w-full">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-center w-full">
            
            {/* LEFT SIDE (Balanced 50% split on desktop, scalable typography) */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
              {/* 1. MAIN PRODUCT NAME TITLE TEXT: CTX (No label or badge above) */}
              <h1 className="font-orbitron font-black tracking-tight uppercase leading-[0.92] text-[48px] sm:text-[60px] md:text-[70px] lg:text-[78px] xl:text-[86px] 2xl:text-[92px] text-left select-none mb-1.5 sm:mb-2">
                <span className="text-white">CTX</span>
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]">.</span>
              </h1>

              {/* 2. EXPLANATION SECONDARY TEXT: GIT FOR CONTEXT */}
              <div className="font-orbitron font-bold tracking-tight uppercase text-xl sm:text-2xl md:text-[26px] lg:text-[28px] xl:text-[32px] leading-tight mb-2.5 sm:mb-3">
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(6,182,212,0.25)]">
                  GIT FOR CONTEXT.
                </span>
              </div>

              {/* 3. VALUE PROPOSITION */}
              <h2 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-bold text-zinc-100 leading-[1.3] tracking-tight text-left mb-2.5 sm:mb-3 font-sans max-w-xl">
                Give your AI tools an{' '}
                <span className="text-cyan-400 font-extrabold">accurate map</span>{' '}
                of your codebase.
              </h2>

              {/* 4. PRODUCT DESCRIPTION - Controlled reading width with crisp contrast */}
              <p className="text-zinc-300/90 text-sm sm:text-[15px] lg:text-[15.5px] xl:text-[16px] leading-[1.65] text-left max-w-[520px] sm:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] mb-3 sm:mb-3.5 font-sans">
                CTX extracts structured API endpoints, database schemas, environment contracts, and conventions from your repository. It serves them to Cursor, Claude Desktop, and VS Code via MCP.
              </p>

              {/* Secondary Technical Metadata Line - High contrast & readable */}
              <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono text-zinc-300 mb-3.5 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                <span>Hybrid TF-IDF + MiniLM search · Zero cloud dependencies</span>
              </div>

              {/* 5. INSTALL COMMAND - Intentionally proportioned terminal block */}
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 font-mono text-xs sm:text-[12.5px] text-zinc-300 shadow-xs w-full max-w-[390px] sm:max-w-[420px] mb-3.5 sm:mb-4">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-2">
                  <span className="text-cyan-400 font-bold">$</span>
                  <span className="text-zinc-200 truncate select-all">{quickInstall}</span>
                </div>
                <button
                  onClick={handleCopyInstall}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                  title="Copy install command"
                  aria-label="Copy install command"
                >
                  {copiedQuickCmd ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px] font-mono">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-mono">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* 6. CTA BUTTONS - Clear visual hierarchy */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                {/* Primary CTA: Install CTX */}
                <a
                  href="#get-started"
                  className="h-9 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs sm:text-[13px] font-mono transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 shadow-sm shadow-cyan-600/30"
                >
                  <span>Install CTX</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {/* Secondary CTA: Watch Demo */}
                <a
                  href="#videos"
                  className="h-9 px-3.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white font-medium text-xs sm:text-[13px] transition-colors whitespace-nowrap flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                  <span>Watch Demo</span>
                </a>

                {/* Tertiary CTA: GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 px-3 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 font-medium text-xs sm:text-[13px] transition-colors whitespace-nowrap flex items-center justify-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* RIGHT SIDE: Proportionate Codebase Graph Card aligned with container */}
            <div className="lg:col-span-6 xl:col-span-6 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[540px] lg:max-w-[540px] xl:max-w-[600px] 2xl:max-w-[650px] rounded-2xl border border-zinc-800/90 bg-zinc-950/95 shadow-[0_0_35px_rgba(6,182,212,0.1)] overflow-hidden backdrop-blur-md ring-1 ring-zinc-800/90 flex flex-col">
                {/* macOS-style Window Header */}
                <div className="px-3.5 py-2 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-zinc-300 font-mono text-[11px] ml-1.5 font-medium">
                      codebase-context.graph
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live AST Topology (v0.9.4)</span>
                  </div>
                </div>

                {/* Stack Architecture Selector */}
                <div className="px-3.5 py-1.5 bg-zinc-900/40 border-b border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400 text-[10.5px]">Active Stack:</span>
                  <div className="flex items-center gap-1">
                    {DEMO_PROJECTS.map((proj) => (
                      <button
                        key={proj.id}
                        onClick={() => setSelectedProjectId(proj.id)}
                        className={`px-2 py-0.5 rounded text-[10.5px] transition-colors cursor-pointer ${
                          selectedProjectId === proj.id
                            ? 'bg-zinc-800 text-cyan-400 border border-cyan-500/40 font-semibold shadow-xs'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                        }`}
                      >
                        {proj.id === 'nextjs'
                          ? 'Next.js 15'
                          : proj.id === 'fastapi'
                          ? 'FastAPI'
                          : 'Go / Gin'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Canvas 2D Context Graph with Viewport-Aware Height */}
                <div className="p-1 flex-1">
                  <ContextGraph
                    nodes={currentProject.graphNodes}
                    activeStep={4}
                    interactive={true}
                    canvasHeightClass="min-h-[220px] sm:min-h-[240px] md:min-h-[250px] lg:min-h-[270px] xl:min-h-[290px] 2xl:min-h-[310px]"
                  />
                </div>

                {/* Context Summary Bar */}
                <div className="px-3.5 py-2 bg-zinc-900/60 border-t border-zinc-800/70 flex items-center justify-between text-[10.5px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <span>MCP stdio connected</span>
                    <span className="text-zinc-600">•</span>
                    <span>{currentProject.graphNodes.length} symbols mapped</span>
                  </span>
                  <span className="text-zinc-500 hidden sm:inline">
                    Cursor • Claude Desktop • VS Code
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
