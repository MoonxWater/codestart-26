'use client';

import React from 'react';
import { ArrowRight, Code2, Sparkles, ChevronDown } from 'lucide-react';
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
      {/* Subtle radial ambient lighting glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Decorative ambient blur blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center z-10 space-y-6 sm:space-y-8">
        {/* Incoming Batch Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-mono tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.15)] animate-fade-in">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>{CLUB_INFO.name} — Batch of {CLUB_INFO.batch}</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-100 font-sans">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300">{CLUB_INFO.batch}.</span>
          </h1>

          <p className="text-xl sm:text-3xl font-semibold text-slate-300 tracking-tight font-mono">
            {CLUB_INFO.tagline}
          </p>
        </div>

        {/* Supporting Quote Block */}
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm relative group hover:border-indigo-500/30 transition-all">
          <div className="absolute -top-3 left-6 px-2 bg-[#090d16] text-[11px] font-mono text-indigo-400 tracking-widest uppercase flex items-center gap-1 border border-indigo-500/20 rounded">
            <Code2 className="w-3 h-3" /> Club Philosophy
          </div>
          <p className="text-slate-300 text-base sm:text-xl font-normal leading-relaxed italic">
            &ldquo;Programming isn&apos;t about memorizing code.
            <br className="hidden sm:inline" />
            <span className="text-indigo-300 font-medium not-italic block sm:inline sm:ml-1">
              It&apos;s about learning how to think.
            </span>&rdquo;
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#variables-section"
            onClick={handleScrollToNext}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold font-mono text-white bg-indigo-600 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:bg-indigo-500 hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] active:scale-98 transition-all cursor-pointer"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-5 h-5 text-indigo-200 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs font-mono animate-bounce pointer-events-none">
        <span>Scroll to start</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
};
