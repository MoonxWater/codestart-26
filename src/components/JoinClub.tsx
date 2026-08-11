'use client';

import React from 'react';
import { Sparkles, ArrowUpRight, UserPlus, Code, Shield, Cloud, Terminal, Gamepad, Database, MessageSquare } from 'lucide-react';
import { LINKS } from '@/config/links';
import { CLUB_INFO } from '@/config/club';

export const JoinClub: React.FC = () => {
  return (
    <section id="join-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          {CLUB_INFO.name} — Batch of {CLUB_INFO.batch}
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight font-sans">
          Want to learn how computers actually do this?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          This is only the beginning.
          <br className="hidden sm:inline" />
          At <strong className="text-indigo-300 font-mono">{CLUB_INFO.name}</strong>, we&apos;ll explore programming, algorithms, development, cybersecurity, data, cloud, games, and more.
        </p>
      </div>

      {/* Domain Pills preview */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
        {[
          { icon: Code, label: 'Web & Mobile Dev' },
          { icon: Terminal, label: 'Data Structures & Algorithms' },
          { icon: Shield, label: 'Cybersecurity & Hacking' },
          { icon: Cloud, label: 'Cloud Architecture' },
          { icon: Gamepad, label: 'Game Development' },
          { icon: Database, label: 'Data Science & AI' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 font-mono text-xs hover:border-indigo-500/40 transition-colors"
          >
            <item.icon className="w-4 h-4 text-indigo-400" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* CTA Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 max-w-4xl mx-auto">
        
        {/* Card 1: Registration Form */}
        <a
          href={LINKS.clubForm}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block p-8 rounded-2xl bg-gradient-to-b from-indigo-900/40 to-slate-900 border border-indigo-500/30 hover:border-indigo-500/70 shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all text-center space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <UserPlus className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block font-semibold">
                Official Membership
              </span>
              <h3 className="text-2xl font-bold text-slate-100 font-sans group-hover:text-indigo-300 transition-colors flex items-center justify-center gap-2">
                Join {CLUB_INFO.name}
                <ArrowUpRight className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                Register as an official member for workshops, hackathons, mentorship, and project teams.
              </p>
            </div>
          </div>

          <span className="block w-full mt-6 py-3.5 px-4 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-white font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors">
            Fill Registration Form
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </a>

        {/* Card 2: Discord (Intellects) */}
        <a
          href={LINKS.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block p-8 rounded-2xl bg-slate-900 border border-white/10 hover:border-purple-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all text-center space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block font-semibold">
                Alumni Network & Resources
              </span>
              <h3 className="text-2xl font-bold text-slate-100 font-sans group-hover:text-purple-300 transition-colors flex items-center justify-center gap-2">
                Join Intellects
                <ArrowUpRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                Get all 8 semester notes, PYQs, and connect with alumni. Created by Aitesaf bhaiya (Batch 2k20).
              </p>
            </div>
          </div>

          <span className="block w-full mt-6 py-3.5 px-4 rounded-xl bg-slate-800 group-hover:bg-slate-700 text-purple-300 font-mono font-bold text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors">
            Join Discord Server
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </a>

      </div>
    </section>
  );
};
