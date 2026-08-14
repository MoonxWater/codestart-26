'use client';

import { Sparkles, ArrowUpRight, UserPlus, Code, Shield, Cloud, Terminal, Gamepad, Database, MessageSquare, Download, Lock, X, TerminalSquare } from 'lucide-react';
import { useState } from 'react';
import { LINKS } from '@/config/links';
import { CLUB_INFO } from '@/config/club';

export const JoinClub: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCode.trim().toUpperCase() === 'CODESTART26') {
      window.open(LINKS.discord, '_blank');
      setIsModalOpen(false);
      setSecretCode('');
      setError('');
    } else {
      setError('ACCESS DENIED. INVALID CODE.');
    }
  };

  return (
    <section id="join-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12 scroll-mt-20 relative">
      {/* Section Header */}
      <div className="text-left space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-white/20 bg-[#050505] text-slate-400 text-xs font-mono uppercase tracking-widest">
          <TerminalSquare className="w-3.5 h-3.5" />
          Chapter 03: The Network
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter font-sans">
          Beyond the Console.
        </h2>

        <p className="text-base sm:text-lg text-slate-400 font-mono leading-relaxed max-w-xl">
          This is only the beginning.
          <br className="hidden sm:inline" />
          At <strong className="text-white font-mono">{CLUB_INFO.name}</strong>, we explore programming, algorithms, development, cybersecurity, data, and more.
        </p>
      </div>

      {/* Domain Pills preview */}
      <div className="flex flex-wrap items-center justify-start gap-2.5 max-w-3xl">
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
            className="flex items-center gap-2 px-3 py-2 rounded-sm bg-black border border-white/10 text-slate-300 font-mono text-xs hover:border-white/40 transition-colors"
          >
            <item.icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* CTA Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 max-w-6xl">
        
        {/* Card 1: Discord Download */}
        <a
          href={LINKS.discordApp}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block p-8 rounded-sm bg-black border border-white/10 hover:border-white/40 transition-all text-left space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-sm bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
              <Download className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                Get The App
              </span>
              <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                Download Discord
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-400 font-mono leading-relaxed">
                Get Discord on your phone or PC to join the community and never miss an update.
              </p>
            </div>
          </div>

          <span className="block w-full mt-6 py-3 px-4 rounded-sm bg-[#050505] group-hover:bg-white text-slate-300 group-hover:text-black font-mono font-bold text-xs flex items-center justify-center gap-2 border border-white/10 group-hover:border-white transition-colors uppercase tracking-widest">
            Download App
          </span>
        </a>

        {/* Card 2: Registration Form */}
        <a
          href={LINKS.clubForm}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block p-8 rounded-sm bg-black border border-white/10 hover:border-white transition-all text-left space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-sm bg-white border border-white flex items-center justify-center text-black group-hover:scale-95 transition-transform">
              <UserPlus className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                Official Membership
              </span>
              <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                Join {CLUB_INFO.name}
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-400 font-mono leading-relaxed">
                Register as an official member for workshops, hackathons, mentorship, and project teams.
              </p>
            </div>
          </div>

          <span className="block w-full mt-6 py-3 px-4 rounded-sm bg-white text-black font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-widest">
            Fill Registration Form
          </span>
        </a>

        {/* Card 3: Discord (Intellects) - Hidden behind secret code */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative block p-8 rounded-sm bg-black border border-white/10 hover:border-white/40 transition-all text-left space-y-6 flex flex-col justify-between w-full cursor-pointer"
        >
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-sm bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                Alumni Network & Resources
              </span>
              <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                Join Intellects
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-400 font-mono leading-relaxed">
                Get all 8 semester notes, PYQs, and connect with alumni. Created by Aitesaf bhaiya (Batch 2k20).
              </p>
            </div>
          </div>

          <span className="block w-full mt-6 py-3 px-4 rounded-sm bg-[#050505] group-hover:bg-white text-slate-300 group-hover:text-black font-mono font-bold text-xs flex items-center justify-center gap-2 border border-white/10 group-hover:border-white transition-colors uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            Unlock Access
          </span>
        </button>

      </div>

      {/* Secret Code Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-black border border-white/20 p-6 sm:p-8 space-y-6 rounded-sm">
            <button
              onClick={() => { setIsModalOpen(false); setError(''); setSecretCode(''); }}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4 text-left">
              <div className="w-10 h-10 rounded-sm bg-[#050505] border border-white/20 flex items-center justify-center text-white mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-widest font-mono">Restricted Access</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Enter the secret passcode provided during the seminar to unlock the Intellects Alumni Network.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={secretCode}
                  onChange={(e) => { setSecretCode(e.target.value); setError(''); }}
                  placeholder="ENTER PASSCODE"
                  className="w-full bg-[#050505] border border-white/20 focus:border-white rounded-sm px-4 py-3 text-white font-mono outline-none transition-colors uppercase tracking-widest text-sm"
                  autoFocus
                />
                {error && <p className="text-white bg-red-900/50 border border-red-500/50 p-2 text-xs font-bold text-left mt-2 font-mono uppercase tracking-widest">[ ERROR ] {error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-white hover:bg-slate-200 text-black font-bold py-3 rounded-sm transition-colors text-xs font-mono uppercase tracking-widest"
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
