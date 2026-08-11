'use client';

import React from 'react';
import { Target, Trophy, Flame } from 'lucide-react';

interface TryCounterProps {
  tries: number;
  isWon: boolean;
  maxRecommendedTries?: number;
}

export const TryCounter: React.FC<TryCounterProps> = ({
  tries,
  isWon,
  maxRecommendedTries,
}) => {
  // Generate try history pills for visual progression (e.g. 1 → 2 → 3)
  const trySteps = Array.from({ length: Math.min(tries, 12) }, (_, i) => i + 1);
  const isOverflow = tries > 12;

  return (
    <div className="w-full bg-slate-900/90 border border-white/10 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col items-center justify-center space-y-3">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
          {isWon ? (
            <Trophy className="w-5 h-5 text-emerald-400 animate-bounce" />
          ) : tries > 0 ? (
            <Flame className="w-5 h-5 text-indigo-400" />
          ) : (
            <Target className="w-5 h-5 text-slate-400" />
          )}
          <span className="font-semibold text-slate-200">Attempts Counter</span>
        </div>

        {maxRecommendedTries && (
          <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-white/5">
            Optimal target: ≤{maxRecommendedTries} tries
          </span>
        )}
      </div>

      {/* Main Counter Display */}
      <div 
        aria-live="polite" 
        className="flex items-center gap-3 py-1"
      >
        <span className="text-sm uppercase tracking-widest font-mono text-slate-400">
          Tries:
        </span>
        <span
          key={tries}
          className={`font-mono text-4xl sm:text-5xl font-extrabold tracking-tight transition-all transform ${
            isWon
              ? 'text-emerald-400 scale-110 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]'
              : tries > 0
              ? 'text-indigo-400 scale-105 drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]'
              : 'text-slate-500'
          }`}
        >
          {tries}
        </span>
      </div>

      {/* Visual Stepper Trail: 1 → 2 → 3 → 4 */}
      {tries > 0 && (
        <div className="w-full pt-2 border-t border-white/5 flex items-center justify-center gap-1.5 flex-wrap font-mono text-xs text-slate-400">
          {trySteps.map((step, idx) => (
            <React.Fragment key={step}>
              <span
                className={`px-2 py-0.5 rounded-md border transition-all ${
                  step === tries
                    ? isWon
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                      : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-bold'
                    : 'bg-slate-800/60 text-slate-400 border-white/5'
                }`}
              >
                {step}
              </span>
              {idx < trySteps.length - 1 && <span className="text-slate-600">→</span>}
            </React.Fragment>
          ))}
          {isOverflow && <span className="text-slate-500 font-bold">→ ... +{tries - 12}</span>}
        </div>
      )}
    </div>
  );
};
