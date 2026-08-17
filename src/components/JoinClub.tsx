'use client';

import { Sparkles, ArrowUpRight, UserPlus, Code, Shield, Cloud, Terminal, Gamepad, Database, MessageSquare, Download, Lock, X } from 'lucide-react';
import { useState } from 'react';
import { LINKS } from '@/config/links';
import { CLUB_INFO } from '@/config/club';

export const JoinClub: React.FC = () => {
  const [modalTarget, setModalTarget] = useState<'discord' | 'form' | null>(null);
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const code = secretCode.trim().toUpperCase();
    const isValid = modalTarget === 'discord' 
      ? code === 'INTELLECTS20' 
      : code === 'CODESTART26';

    if (isValid) {
      window.open(modalTarget === 'discord' ? LINKS.discord : LINKS.clubForm, '_blank');
      setModalTarget(null);
      setSecretCode('');
      setError('');
    } else {
      setError('Invalid Access Code');
    }
  };

  return (
    <section id="join-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12 scroll-mt-20 relative">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 max-w-6xl mx-auto">
        
        {/* Card 1: Discord Download */}
        <a
          href={LINKS.discordApp}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block p-8 rounded-2xl bg-slate-900 border border-white/10 hover:border-blue-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all text-center space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Download className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block font-semibold">
                Get The App
              </span>
              <h3 className="text-2xl font-bold text-slate-100 font-sans group-hover:text-blue-300 transition-colors flex items-center justify-center gap-2">
                Download Discord
                <ArrowUpRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                Get Discord on your phone or PC to join the community and never miss an update.
              </p>
            </div>
          </div>

          <span className="block w-full mt-6 py-3.5 px-4 rounded-xl bg-slate-800 group-hover:bg-slate-700 text-blue-300 font-mono font-bold text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors">
            Download App
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </a>

        {/* Card 2: Registration Form */}
        <button
          onClick={() => setModalTarget('form')}
          className="group relative block p-8 rounded-2xl bg-gradient-to-b from-indigo-900/40 to-slate-900 border border-indigo-500/30 hover:border-indigo-500/70 shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all text-left space-y-6 flex flex-col justify-between cursor-pointer w-full"
        >
          <div className="space-y-6 w-full text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <UserPlus className="w-8 h-8" />
            </div>

            <div className="space-y-2 text-center">
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
            <Lock className="w-4 h-4" />
            Fill Registration Form
          </span>
        </button>

        {/* Card 3: Discord (Intellects) - Hidden behind secret code */}
        <button
          onClick={() => setModalTarget('discord')}
          className="group relative block p-8 rounded-2xl bg-slate-900 border border-white/10 hover:border-purple-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all text-left space-y-6 flex flex-col justify-between w-full cursor-pointer"
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
            <Lock className="w-4 h-4" />
            Unlock Access
          </span>
        </button>

      </div>

      {/* Secret Code Modal */}
      {modalTarget !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`relative w-full max-w-md bg-slate-900 border ${modalTarget === 'discord' ? 'border-purple-500/30' : 'border-indigo-500/30'} rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-fade-up`}>
            <button
              onClick={() => { setModalTarget(null); setError(''); setSecretCode(''); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-2 text-center">
              <div className={`mx-auto w-12 h-12 rounded-full ${modalTarget === 'discord' ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'} flex items-center justify-center mb-4 border`}>
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Restricted Access</h3>
              <p className="text-sm text-slate-400">
                Enter the secret passcode provided during the seminar to unlock {modalTarget === 'discord' ? 'the Intellects Alumni Network' : 'the Registration Form'}.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={secretCode}
                  onChange={(e) => { setSecretCode(e.target.value); setError(''); }}
                  placeholder="Enter Passcode..."
                  className={`w-full bg-slate-950 border border-slate-700 ${modalTarget === 'discord' ? 'focus:border-purple-500' : 'focus:border-indigo-500'} rounded-xl px-4 py-3 text-white font-mono text-center outline-none transition-colors uppercase tracking-widest`}
                  autoFocus
                />
                {error && <p className="text-rose-400 text-xs font-bold text-center mt-2 font-mono">{error}</p>}
              </div>
              <button
                type="submit"
                className={`w-full ${modalTarget === 'discord' ? 'bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]'} text-white font-bold py-3 rounded-xl transition-colors`}
              >
                Unlock
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
