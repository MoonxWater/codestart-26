'use client';

import React from 'react';
import { Sparkles, MessageSquare, ArrowUpRight, UserPlus, Send, Code, Shield, Cloud, Terminal, Gamepad, Database } from 'lucide-react';
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
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 font-mono text-xs hover:border-indigo-500/40 transition-colors"
          >
            <item.icon className="w-4 h-4 text-indigo-400" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* 3 Prominent CTA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Card 1: Registration Form */}
        <a
          href={LINKS.clubForm}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-6 rounded-2xl bg-gradient-to-b from-indigo-900/40 to-slate-900 border border-indigo-500/30 hover:border-indigo-500/70 shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">
                Official Membership
              </span>
              <h3 className="text-xl font-bold text-slate-100 font-sans group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                Join the Club
                <ArrowUpRight className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Register as an official member for workshops, hackathons, mentorship, and project teams.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <span className="w-full py-3 px-4 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors">
              Fill Registration Form
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </a>

        {/* Card 2: Discord */}
        <a
          href={LINKS.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-6 rounded-2xl bg-slate-900 border border-white/10 hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/10 transition-all flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">
                Community Hub
              </span>
              <h3 className="text-xl font-bold text-slate-100 font-sans group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                Join Discord
                <ArrowUpRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Chat with seniors, ask technical questions, get code reviews, and join interest channels.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <span className="w-full py-3 px-4 rounded-xl bg-slate-800 group-hover:bg-slate-700 text-purple-300 font-mono font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors">
              Open Discord Server
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </a>

        {/* Card 3: WhatsApp Community */}
        <a
          href={LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-6 rounded-2xl bg-slate-900 border border-white/10 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-500/10 transition-all flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                Announcements
              </span>
              <h3 className="text-xl font-bold text-slate-100 font-sans group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                Join WhatsApp
                <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Stay updated on upcoming seminars, venue details, batch deadlines, and instant alerts.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <span className="w-full py-3 px-4 rounded-xl bg-slate-800 group-hover:bg-slate-700 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors">
              Join WhatsApp Group
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};
