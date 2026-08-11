'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Code2, Bot, Zap, MessageSquareText } from 'lucide-react';

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
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Code2 className="w-4 h-4 text-indigo-400" />
          Chapter 01: Variables & Prompting
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight font-sans">
          The Power of Better Prompts
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          When learning programming today, how you ask AI to teach you makes all the difference. Compare a generic question with a structured learning prompt.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Weak Prompt */}
        <div className="md:col-span-4 p-6 rounded-2xl bg-slate-900/60 border border-rose-500/20 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-mono border border-rose-500/20">
              ❌ Generic Prompt
            </div>
            <p className="font-mono text-sm text-slate-300 italic bg-slate-950/60 p-3 rounded-xl border border-white/5">
              &ldquo;Teach me variables&rdquo; or &ldquo;What is variables?&rdquo;
            </p>
            <div className="text-xs text-slate-400 space-y-2 pt-2">
              <p className="flex items-center gap-2 text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Yields complex, textbook jargon dumps. Uses terms you may not know.
              </p>
              <p className="flex items-center gap-2 text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Assumes prior computer science knowledge.
              </p>
              <p className="flex items-center gap-2 text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                No checks for understanding or interactive practice.
              </p>
              <p className="flex items-center gap-2 text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Can only be used for simple and shallow topics.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Master Prompt Card */}
        <div className="md:col-span-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/40 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-mono border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                ✅ Master Prompt Blueprint
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition-all active:scale-95 cursor-pointer shadow-md"
                aria-label="Copy prompt to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* Prompt Box */}
            <div className="bg-slate-950/90 border border-indigo-500/20 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap shadow-inner overflow-x-auto max-h-72 custom-scrollbar">
              {MASTER_PROMPT}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-400" />
              Copy & paste this into ChatGPT, Gemini, or Claude to start learning Variables!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
