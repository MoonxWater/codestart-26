'use client';

import React from 'react';
import { History, ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';
import { GuessRecord } from '@/types/game';

interface GuessHistoryProps {
  guesses: GuessRecord[];
}

export const GuessHistory: React.FC<GuessHistoryProps> = ({ guesses }) => {
  if (guesses.length === 0) {
    return null;
  }

  // Reverse so newest guess is at the top
  const reversed = [...guesses].reverse();

  return (
    <div className="w-full bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-400" />
          <h4 className="text-base font-bold text-slate-100 font-sans">
            Your Guesses ({guesses.length})
          </h4>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Newest first
        </span>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
        {reversed.map((g, index) => {
          const attemptNum = guesses.length - index;
          return (
            <div
              key={g.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/5 font-mono text-sm hover:border-white/15 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-8">
                  #{attemptNum}
                </span>
                <span className="text-base font-bold text-slate-100 min-w-16">
                  {g.value.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 hidden sm:inline">
                  Range: [{g.rangeAfter[0]} – {g.rangeAfter[1]}]
                </span>

                {g.result === 'correct' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Correct!
                  </span>
                )}

                {g.result === 'too_low' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <ArrowUp className="w-3.5 h-3.5" /> Too low
                  </span>
                )}

                {g.result === 'too_high' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                    <ArrowDown className="w-3.5 h-3.5" /> Too high
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
