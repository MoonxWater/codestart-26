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
    <div className="w-full bg-[#050505] border border-white/10 p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-white" />
          <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tighter">
            Your Guesses ({guesses.length})
          </h4>
        </div>
        <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-widest">
          Newest first
        </span>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
        {reversed.map((g, index) => {
          const attemptNum = guesses.length - index;
          return (
            <div
              key={g.id}
              className="flex items-center justify-between p-3 bg-black border border-white/10 font-mono text-[10px] sm:text-sm hover:border-white/20 transition-all rounded-sm"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-slate-500 w-6 sm:w-8">
                  #{attemptNum}
                </span>
                <span className="font-bold text-white min-w-10 sm:min-w-16 text-xs sm:text-base">
                  {g.value.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 hidden sm:inline mr-2 uppercase tracking-widest">
                  Range: [{g.rangeAfter[0]} – {g.rangeAfter[1]}]
                </span>

                {g.result === 'correct' && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white text-black font-bold uppercase tracking-widest border border-white text-[10px] sm:text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Correct!
                  </span>
                )}

                {g.result === 'too_low' && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-black text-slate-400 font-bold uppercase tracking-widest border border-slate-500 text-[10px] sm:text-xs">
                    <ArrowUp className="w-3.5 h-3.5" /> Too low
                  </span>
                )}

                {g.result === 'too_high' && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-black text-slate-400 font-bold uppercase tracking-widest border border-slate-500 text-[10px] sm:text-xs">
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
