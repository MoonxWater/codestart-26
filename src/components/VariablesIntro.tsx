'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, TerminalSquare, Bot } from 'lucide-react';

const MASTER_PROMPT = `Teach me variables in programming from the absolute basics.

Start with a simple explanation using everyday language, then gradually move to the proper technical definition. Whenever you introduce a programming term that I may not know, explain it in simple words before using it further.

Use simple code examples and explain what each part means. Build the concept step by step rather than giving me everything at once.

After teaching the concept, give me a few examples and small questions to check whether I actually understood it.

Do not assume that I already know programming terminology or concepts.`;

export const VariablesIntro: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MASTER_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="variables-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="text-left space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-white/20 bg-[#050505] text-slate-400 text-xs font-mono uppercase tracking-widest">
          <TerminalSquare className="w-3.5 h-3.5" />
          Chapter 01: Variables & Prompting
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter font-sans">
          The Power of Better Prompts
        </h2>

        <p className="text-base sm:text-lg text-slate-400 font-mono leading-relaxed max-w-xl">
          When learning programming today, how you ask AI to teach you makes all the difference. Compare a generic question with a structured learning prompt.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Weak Prompt */}
        <div className="md:col-span-4 p-6 bg-[#050505] border border-white/10 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-slate-500 text-xs font-mono uppercase tracking-widest">
              [ Generic Prompt ]
            </div>
            <p className="font-mono text-sm text-slate-300 italic p-4 bg-[#0a0a0a] border border-white/5">
              "Teach me variables" or "What is variables?"
            </p>
            <div className="text-xs font-mono text-slate-500 space-y-3 pt-2">
              <p className="flex items-start gap-2">
                <span className="text-slate-700 mt-0.5">&gt;</span>
                Yields complex, textbook jargon dumps.
              </p>
              <p className="flex items-start gap-2">
                <span className="text-slate-700 mt-0.5">&gt;</span>
                Assumes prior computer science knowledge.
              </p>
              <p className="flex items-start gap-2">
                <span className="text-slate-700 mt-0.5">&gt;</span>
                No checks for understanding or interactive practice.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Master Prompt Card */}
        <div className="md:col-span-8 p-6 sm:p-8 bg-black border border-white/20 shadow-2xl flex flex-col justify-between space-y-6 relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-white text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Master Prompt Blueprint
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-200 text-black text-xs font-mono font-bold transition-colors cursor-pointer"
                aria-label="Copy prompt to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY PROMPT</span>
                  </>
                )}
              </button>
            </div>

            {/* Prompt Box */}
            <div className="bg-[#050505] border border-white/10 p-5 font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-72 custom-scrollbar">
              {MASTER_PROMPT}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Copy & paste this into ChatGPT, Gemini, or Claude to start learning Variables.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
