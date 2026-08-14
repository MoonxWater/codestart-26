'use client';

import React from 'react';
import { ArrowRight, TerminalSquare, ChevronDown } from 'lucide-react';
import { CLUB_INFO } from '@/config/club';

export const Hero: React.FC = () => {
  const handleScrollToNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById('variables-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-24 overflow-hidden bg-grid-pattern">
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center z-10 space-y-8 sm:space-y-10">
        
        {/* Incoming Batch Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-white/20 bg-black text-slate-300 text-xs font-mono uppercase tracking-widest animate-fade-up delay-100">
          <TerminalSquare className="w-3.5 h-3.5" />
          <span>{CLUB_INFO.name} // Batch {CLUB_INFO.batch}</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white font-sans animate-fade-up delay-200">
            Welcome, {CLUB_INFO.batch}.
          </h1>

          <p className="text-lg sm:text-2xl font-mono text-slate-400 tracking-tight animate-fade-up delay-300">
            {CLUB_INFO.tagline}
          </p>
        </div>

        {/* Supporting Quote Block */}
        <div className="max-w-2xl mx-auto p-8 border border-white/10 bg-[#050505] relative animate-fade-up delay-400">
          <div className="absolute -top-2.5 left-6 px-2 bg-black text-[10px] font-mono text-slate-400 tracking-widest uppercase border border-white/10">
            System.Philosophy
          </div>
          <p className="text-slate-300 text-base sm:text-lg font-mono leading-relaxed">
            "Programming isn't about memorizing syntax.
            <br className="hidden sm:inline" />
            <span className="text-white block sm:inline sm:ml-1">
              It's about learning how to think."
            </span>
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-6 animate-fade-up delay-500">
          <a
            href="#variables-section"
            onClick={handleScrollToNext}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-mono font-bold text-black bg-white hover:bg-slate-200 transition-colors cursor-pointer rounded-sm"
          >
            <span>Initialize Sequence</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs font-mono pointer-events-none">
        <span>[ SCROLL ]</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
};
