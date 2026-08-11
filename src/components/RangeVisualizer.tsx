'use client';

import React from 'react';
import { SlidersHorizontal, Info, ShieldCheck } from 'lucide-react';
import { GuessRecord } from '@/types/game';

interface RangeVisualizerProps {
  upperBound: number;
  currentPossibleMin: number;
  currentPossibleMax: number;
  guesses: GuessRecord[];
}

export const RangeVisualizer: React.FC<RangeVisualizerProps> = ({
  upperBound,
  currentPossibleMin,
  currentPossibleMax,
  guesses,
}) => {
  const totalRange = upperBound;
  const remainingCount = currentPossibleMax - currentPossibleMin + 1;
  const eliminatedCount = totalRange - remainingCount;
  const eliminatedPercentage = Math.round((eliminatedCount / totalRange) * 100);

  // Percentages for CSS track widths
  const leftEliminatedPct = Math.max(0, ((currentPossibleMin - 1) / totalRange) * 100);
  const activePct = Math.max(0.5, (remainingCount / totalRange) * 100);
  const rightEliminatedPct = Math.max(0, ((totalRange - currentPossibleMax) / totalRange) * 100);

  return (
    <div className="w-full bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-100 font-sans">
              Range Narrowing Visualizer
            </h4>
            <p className="text-xs text-slate-400">
              Watch possibilities shrink after each guess
            </p>
          </div>
        </div>

        {/* Stats Badge */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            Active search space: <strong className="text-white">{currentPossibleMin} – {currentPossibleMax}</strong> ({remainingCount.toLocaleString()} candidates)
          </span>
        </div>
      </div>

      {/* Visual Range Track */}
      <div className="space-y-3 pt-1">
        {/* Track Bounds Labels */}
        <div className="flex justify-between text-xs font-mono font-semibold text-slate-400">
          <span>1</span>
          <span className="text-indigo-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            {eliminatedPercentage}% Eliminated
          </span>
          <span>{upperBound.toLocaleString()}</span>
        </div>

        {/* Visual Bar Segment */}
        <div className="relative w-full h-10 bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex p-1 shadow-inner">
          {/* Left Eliminated Section */}
          {leftEliminatedPct > 0 && (
            <div
              style={{ width: `${leftEliminatedPct}%` }}
              className="h-full bg-slate-850/80 border-r border-slate-700/60 flex items-center justify-center text-[10px] font-mono text-slate-400 overflow-hidden transition-all duration-500 relative group"
              title={`Eliminated: 1 to ${currentPossibleMin - 1}`}
            >
              <div className="absolute inset-0 bg-rose-500/10 bg-[linear-gradient(45deg,transparent_25%,rgba(244,63,94,0.1)_25%,rgba(244,63,94,0.1)_50%,transparent_50%,transparent_75%,rgba(244,63,94,0.1)_75%,transparent)] bg-[length:12px_12px]" />
              <span className="truncate px-1 z-10 font-semibold opacity-75">✕ ELIMINATED</span>
            </div>
          )}

          {/* Remaining Possible Range Section */}
          <div
            style={{ width: `${activePct}%` }}
            className="h-full bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-600 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-500 relative z-10 px-2 overflow-hidden"
          >
            <span className="truncate drop-shadow-md">
              POSSIBLE ({currentPossibleMin} - {currentPossibleMax})
            </span>
          </div>

          {/* Right Eliminated Section */}
          {rightEliminatedPct > 0 && (
            <div
              style={{ width: `${rightEliminatedPct}%` }}
              className="h-full bg-slate-850/80 border-l border-slate-700/60 flex items-center justify-center text-[10px] font-mono text-slate-400 overflow-hidden transition-all duration-500 relative group"
              title={`Eliminated: ${currentPossibleMax + 1} to ${upperBound}`}
            >
              <div className="absolute inset-0 bg-rose-500/10 bg-[linear-gradient(45deg,transparent_25%,rgba(244,63,94,0.1)_25%,rgba(244,63,94,0.1)_50%,transparent_50%,transparent_75%,rgba(244,63,94,0.1)_75%,transparent)] bg-[length:12px_12px]" />
              <span className="truncate px-1 z-10 font-semibold opacity-75">✕ ELIMINATED</span>
            </div>
          )}
        </div>

        {/* Intuition Callout */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-300">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Every guess acts as a filter. By asking <span className="font-mono text-indigo-300">&ldquo;is it higher or lower?&rdquo;</span>, you eliminate all numbers in the wrong direction forever.
          </p>
        </div>
      </div>
    </div>
  );
};
