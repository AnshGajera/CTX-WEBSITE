import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Copy, Check, Terminal, Sparkles, AlertTriangle, CornerDownLeft } from 'lucide-react';
import { DEMO_PROJECTS, QUICK_COMMANDS } from '../data/demoScripts';
import { ProjectDemo } from '../types';

export const TerminalDemo: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<'nextjs' | 'fastapi' | 'gogin'>('nextjs');
  const project: ProjectDemo = DEMO_PROJECTS.find((p) => p.id === selectedProjectId) || DEMO_PROJECTS[0];

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const terminalLogsRef = useRef<HTMLDivElement | null>(null);

  // Auto-run simulation sequence on mount or project switch
  useEffect(() => {
    setActiveStepIndex(0);
    setIsPlaying(true);
  }, [selectedProjectId]);

  useEffect(() => {
    if (!isPlaying) return;

    if (activeStepIndex < project.steps.length - 1) {
      const timer = setTimeout(() => {
        setActiveStepIndex((prev) => prev + 1);
      }, 2400);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [activeStepIndex, isPlaying, project.steps.length]);

  // Scroll to bottom of terminal when logs change
  useEffect(() => {
    if (terminalLogsRef.current) {
      terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
    }
  }, [activeStepIndex]);

  const handleReplay = () => {
    setActiveStepIndex(0);
    setIsPlaying(true);
  };

  const handleSelectCommand = (cmd: string) => {
    setIsPlaying(false);
    const stepIdx = project.steps.findIndex((s) => s.command.toLowerCase().includes(cmd.toLowerCase().slice(0, 10)));
    if (stepIdx !== -1) {
      setActiveStepIndex(stepIdx);
    } else {
      setActiveStepIndex(project.steps.length - 1);
    }
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    handleSelectCommand(userInput.trim());
    setUserInput('');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Compile executed steps up to activeStepIndex
  const executedSteps = project.steps.slice(0, activeStepIndex + 1);

  return (
    <div className="w-full flex flex-col gap-3.5">
      {/* Compact Project Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-3 py-2 bg-zinc-900/60 border border-zinc-800/80 rounded-xl backdrop-blur-xs text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-zinc-400 text-xs flex items-center gap-1.5 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Sample Project:</span>
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {DEMO_PROJECTS.map((p) => {
              const isSelected = p.id === selectedProjectId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800 text-cyan-400 border border-cyan-500/40 shadow-xs font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`}
                >
                  <span>{p.name}</span>
                  <span
                    className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                      isSelected ? 'bg-cyan-950/70 text-cyan-300' : 'bg-zinc-800/80 text-zinc-400'
                    }`}
                  >
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Replay Demo Control */}
        <button
          onClick={handleReplay}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800/90 hover:bg-zinc-700/90 rounded-md border border-zinc-700/60 transition-colors cursor-pointer"
          title="Replay sequence from beginning"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>Replay Demo</span>
        </button>
      </div>

      {/* Main Two-Column Demonstration Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
        
        {/* LEFT PANEL: CTX Terminal (~58% desktop width) */}
        <div className="lg:col-span-7 flex flex-col bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/80 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-1.5 font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                ctx-terminal ~ {project.id}-repo
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="hidden sm:inline">Go v1.23</span>
              <span className="text-zinc-600">•</span>
              <span className="text-cyan-400">ctx v0.9.4</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalLogsRef}
            className="p-3.5 font-mono text-xs sm:text-[12.5px] leading-relaxed overflow-y-auto max-h-[380px] min-h-[320px] bg-zinc-950/90 text-zinc-200 select-text flex-1"
            aria-live="polite"
            aria-atomic="false"
          >
            {/* Terminal Initial Greeting */}
            <div className="text-zinc-400 mb-2.5 text-xs">
              # CTX CLI (Git for Context) – Extracting structured context for MCP
            </div>

            {/* Render Executed Steps */}
            {executedSteps.map((step, idx) => (
              <div key={idx} className="mb-3.5">
                {/* Prompt Line */}
                <div className="flex items-center gap-2 text-zinc-100 font-semibold mb-1">
                  <span className="text-cyan-400">user@dev:~/repo$</span>
                  <span className="text-white">{step.command}</span>
                </div>

                {/* Step Output */}
                <div className="pl-3 border-l-2 border-zinc-800 space-y-0.5 text-zinc-300">
                  {step.output.map((line, lineIdx) => {
                    const isCheck = line.includes('✓');
                    const isWarn = line.includes('⚠');
                    const isBox = line.includes('┌') || line.includes('│') || line.includes('└');
                    const isCyan = line.startsWith('ctx:');

                    return (
                      <div
                        key={lineIdx}
                        className={`${
                          isCheck
                            ? 'text-emerald-400'
                            : isWarn
                            ? 'text-amber-400'
                            : isCyan
                            ? 'text-cyan-300 font-medium'
                            : isBox
                            ? 'text-zinc-400'
                            : 'text-zinc-300'
                        }`}
                      >
                        {line}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Active Running Line or Idle Prompt */}
            {isPlaying ? (
              <div className="flex items-center gap-2 text-cyan-400 animate-pulse text-xs">
                <span>Executing next step...</span>
              </div>
            ) : (
              <form onSubmit={handleUserSubmit} className="flex items-center gap-2 text-zinc-300 pt-1">
                <span className="text-cyan-400">user@dev:~/repo$</span>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type 'ctx extract' or 'ctx health'..."
                  className="flex-1 bg-transparent border-none outline-hidden text-white font-mono placeholder:text-zinc-400 text-xs sm:text-[12.5px]"
                />
                <button
                  type="submit"
                  aria-label="Submit command"
                  className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Quick Command Suggestion Chips */}
          <div className="p-2 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-zinc-400 font-mono text-[11px] whitespace-nowrap pl-1">
              Run:
            </span>
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleSelectCommand(cmd)}
                className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700/80 text-zinc-300 hover:text-cyan-300 font-mono text-[11px] whitespace-nowrap border border-zinc-700/50 transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: What Your AI Tool Sees Side-by-Side (~42% desktop width) */}
        <div className="lg:col-span-5 flex flex-col bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-3.5 py-2.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                What Your AI Tool Sees
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
              Live Comparison
            </span>
          </div>

          {/* User Query Box */}
          <div className="px-3.5 py-2 bg-zinc-900/40 border-b border-zinc-800/70 text-xs">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-0.5">
              User Prompt:
            </span>
            <span className="text-zinc-200 font-medium line-clamp-2 text-xs">
              "{project.beforeAi.prompt}"
            </span>
          </div>

          {/* Side-by-Side Comparison Area */}
          <div className="flex-1 p-2.5 sm:p-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto max-h-[380px] min-h-[320px]">
            
            {/* 1. WITHOUT CTX (AI Guessing) */}
            <div className="rounded-lg border border-red-900/40 bg-red-950/10 flex flex-col overflow-hidden">
              <div className="px-2.5 py-1.5 bg-red-950/30 border-b border-red-900/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-red-400 text-[11px] flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                  Without CTX
                </span>
                <span className="text-[9.5px] font-mono text-red-400 bg-red-900/30 px-1 py-0.2 rounded">
                  ❌ Guessing
                </span>
              </div>

              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <pre className="font-mono text-[10.5px] text-red-200/90 overflow-x-auto leading-relaxed bg-zinc-950/90 p-2 rounded border border-red-900/20 max-h-[140px]">
                    <code>{project.beforeAi.aiAnswer}</code>
                  </pre>

                  <div className="mt-2 space-y-1">
                    <span className="text-[10px] font-mono text-red-400 font-semibold block">
                      Why this breaks:
                    </span>
                    {project.beforeAi.flaws.map((flaw, i) => (
                      <div key={i} className="text-[10.5px] text-zinc-300 flex items-start gap-1 leading-snug">
                        <span className="text-red-400 font-mono shrink-0">✕</span>
                        <span>{flaw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. WITH CTX (Accurate Context) */}
            <div className="rounded-lg border border-cyan-500/40 bg-cyan-950/10 flex flex-col overflow-hidden shadow-sm">
              <div className="px-2.5 py-1.5 bg-cyan-950/30 border-b border-cyan-500/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-300 text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3 text-cyan-400" />
                  With CTX
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[9.5px] font-mono text-cyan-300 bg-cyan-900/40 px-1 py-0.2 rounded">
                    ✓ Accurate
                  </span>
                  <button
                    onClick={() => handleCopy(project.afterAi.aiAnswer, 'after-code')}
                    className="text-zinc-400 hover:text-white p-0.5 rounded cursor-pointer"
                    title="Copy code"
                  >
                    {copiedCode === 'after-code' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <pre className="font-mono text-[10.5px] text-cyan-100 overflow-x-auto leading-relaxed bg-zinc-950/90 p-2 rounded border border-cyan-500/20 max-h-[140px]">
                    <code>{project.afterAi.aiAnswer}</code>
                  </pre>

                  <div className="mt-2 space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold block">
                      Context provided:
                    </span>
                    {project.afterAi.highlights.map((h, i) => (
                      <div key={i} className="text-[10.5px] text-zinc-300 flex items-start gap-1 leading-snug">
                        <span className="text-cyan-400 font-mono shrink-0">✓</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-3.5 py-2 bg-zinc-900/80 border-t border-zinc-800 text-[10.5px] text-zinc-400 font-mono flex items-center justify-between">
            <span>Served via local MCP (stdio JSON-RPC)</span>
            <span className="text-cyan-400">Zero cloud latency</span>
          </div>
        </div>

      </div>
    </div>
  );
};
