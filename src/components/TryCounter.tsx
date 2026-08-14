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
    <div className="w-full bg-[#050505] border border-white/10 p-4 sm:p-5 flex flex-col items-center justify-center space-y-3">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 sm:gap-0">
        <div className="flex items-center gap-2 text-slate-300 font-mono text-xs sm:text-sm uppercase tracking-widest">
          {isWon ? (
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce" />
          ) : tries > 0 ? (
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
          )}
          <span className="font-bold text-white">Attempts Counter</span>
        </div>

        {maxRecommendedTries && (
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-black px-2 py-1 border border-white/10">
            Optimal target: ≤{maxRecommendedTries} tries
          </span>
        )}
      </div>

      {/* Main Counter Display */}
      <div 
        aria-live="polite" 
        className="flex items-center gap-3 py-1"
      >
        <span className="text-xs sm:text-sm uppercase tracking-widest font-mono text-slate-500 font-bold">
          Tries:
        </span>
        <span
          key={tries}
          className={`font-mono text-4xl sm:text-5xl font-bold tracking-tighter transition-all transform ${
            isWon
              ? 'text-white scale-110'
              : tries > 0
              ? 'text-white scale-105'
              : 'text-slate-500'
          }`}
        >
          {tries}
        </span>
      </div>

      {/* Visual Stepper Trail: 1 → 2 → 3 → 4 */}
      {tries > 0 && (
        <div className="w-full pt-2 border-t border-white/10 flex items-center justify-center gap-1.5 flex-wrap font-mono text-[10px] sm:text-xs text-slate-500 mt-2">
          {trySteps.map((step, idx) => (
            <React.Fragment key={step}>
              <span
                className={`px-2 py-0.5 border transition-all ${
                  step === tries
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-black text-slate-400 border-white/20'
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
