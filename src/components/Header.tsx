'use client';

import React, { useState } from 'react';
import { TerminalSquare, ArrowUpRight, Menu, X } from 'lucide-react';
import { LINKS } from '@/config/links';
import { CLUB_INFO } from '@/config/club';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 group transition-transform active:scale-95"
          aria-label={`${CLUB_INFO.name} Home`}
        >
          <div className="w-8 h-8 rounded-sm bg-white text-black flex items-center justify-center group-hover:bg-slate-200 transition-colors shrink-0">
            <TerminalSquare className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-white tracking-tighter text-sm flex items-center gap-1.5 uppercase">
              CodeStart<span className="text-slate-500">'{CLUB_INFO.batch.slice(2)}</span>
            </span>
            <span className="text-[9px] text-slate-500 font-mono -mt-0.5 uppercase tracking-widest block sm:inline-block">
              {CLUB_INFO.name}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="#variables-section"
            className="text-[10px] uppercase tracking-widest font-mono text-slate-400 hover:text-white transition-colors"
          >
            01. Prompting
          </a>
          <a
            href="#game-section"
            className="text-[10px] uppercase tracking-widest font-mono text-slate-400 hover:text-white transition-colors"
          >
            02. Game
          </a>
          <a
            href="#binary-search-section"
            className="text-[10px] uppercase tracking-widest font-mono text-slate-400 hover:text-white transition-colors"
          >
            03. Binary Search
          </a>
          <a
            href="#join-section"
            className="text-[10px] uppercase tracking-widest font-mono text-slate-400 hover:text-white transition-colors"
          >
            04. Network
          </a>
          <a
            href={LINKS.clubForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-widest font-mono font-bold bg-white text-black hover:bg-slate-200 transition-colors active:scale-95"
          >
            Join Batch '{CLUB_INFO.batch.slice(2)}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-3">
          <a
            href={LINKS.clubForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-widest font-mono font-bold bg-white text-black hover:bg-slate-200 transition-colors active:scale-95"
          >
            Join
          </a>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-white/10 bg-black absolute w-full">
          <nav className="flex flex-col p-4 space-y-4">
            <a
              href="#variables-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest font-mono text-slate-400 hover:text-white transition-colors block py-2 border-b border-white/5"
            >
              01. Prompting
            </a>
            <a
              href="#game-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest font-mono text-slate-400 hover:text-white transition-colors block py-2 border-b border-white/5"
            >
              02. Game
            </a>
            <a
              href="#binary-search-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest font-mono text-slate-400 hover:text-white transition-colors block py-2 border-b border-white/5"
            >
              03. Binary Search
            </a>
            <a
              href="#join-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest font-mono text-slate-400 hover:text-white transition-colors block py-2"
            >
              04. Network
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
