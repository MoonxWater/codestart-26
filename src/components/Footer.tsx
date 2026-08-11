'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import { CLUB_INFO } from '@/config/club';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono font-bold text-slate-100 text-base">
                {CLUB_INFO.name}
              </span>
              <p className="text-xs text-slate-400 font-mono">
                CodeStart &apos;{CLUB_INFO.batch.slice(2)} • {CLUB_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Team Credits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono w-full md:w-auto">
            {/* Developer & Admin */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] uppercase text-indigo-400 tracking-wider block font-semibold">
                {CLUB_INFO.developer.role}
              </span>
              <a
                href={CLUB_INFO.developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-200 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{CLUB_INFO.developer.name}</span>
                <svg className="w-3.5 h-3.5 fill-current text-slate-400" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* Founder */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] uppercase text-slate-400 tracking-wider block font-semibold">
                {CLUB_INFO.founder.role}
              </span>
              <a
                href={CLUB_INFO.founder.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-200 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{CLUB_INFO.founder.name}</span>
                <svg className="w-3.5 h-3.5 fill-current text-slate-400" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* Co-Founder */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] uppercase text-slate-400 tracking-wider block font-semibold">
                {CLUB_INFO.coFounder.role}
              </span>
              <a
                href={CLUB_INFO.coFounder.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-200 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{CLUB_INFO.coFounder.name}</span>
                <svg className="w-3.5 h-3.5 fill-current text-slate-400" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="text-center text-xs font-mono text-slate-500">
          © 2026 {CLUB_INFO.name}. All rights reserved. Built for incoming batch onboarding.
        </div>
      </div>
    </footer>
  );
};
