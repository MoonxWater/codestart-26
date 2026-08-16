'use client';

import React from 'react';
import { Terminal, Sparkles } from 'lucide-react';
import { LINKS } from '@/config/links';
import { CLUB_INFO } from '@/config/club';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/95 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
          aria-label={`${CLUB_INFO.name} Home`}
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/60 group-hover:text-indigo-300 transition-all shadow-[0_0_12px_rgba(99,102,241,0.2)]">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-slate-100 tracking-tight text-base flex items-center gap-1.5">
              CodeStart<span className="text-indigo-400">&apos;{CLUB_INFO.batch.slice(2)}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono -mt-1 hidden sm:inline-block">
              {CLUB_INFO.name}
            </span>
          </div>
        </a>

        {/* Quick Nav Links */}
        <nav className="flex items-center gap-3 sm:gap-6">
          <a
            href="#variables-section"
            className="text-xs sm:text-sm font-mono text-slate-300 hover:text-indigo-300 transition-colors hidden sm:inline-block"
          >
            01. Variables &amp; Prompts
          </a>
          <a
            href="#game-section"
            className="text-xs sm:text-sm font-mono text-slate-300 hover:text-indigo-300 transition-colors hidden sm:inline-block"
          >
            02. Game
          </a>
          <a
            href="#binary-search-section"
            className="text-xs sm:text-sm font-mono text-slate-300 hover:text-indigo-300 transition-colors hidden sm:inline-block"
          >
            03. Binary Search
          </a>
          <a
            href={LINKS.clubForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30 hover:border-indigo-500/70 transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Join
          </a>
        </nav>
      </div>
    </header>
  );
};
