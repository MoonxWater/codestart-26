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
    <div className="w-full bg-[#050505] border border-white/10 p-4 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black border border-white/20 text-white shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tighter">
              Range Visualizer
            </h4>
            <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest">
              Possibilities shrink with guesses
            </p>
          </div>
        </div>

        {/* Stats Badge */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
          <span className="px-2 py-1 bg-black text-white border border-white/20">
            Active: <strong className="text-white">{currentPossibleMin} – {currentPossibleMax}</strong>
          </span>
        </div>
      </div>

      {/* Visual Range Track */}
      <div className="space-y-3 pt-1">
        {/* Track Bounds Labels */}
        <div className="flex justify-between text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
          <span>1</span>
          <span className="text-white flex items-center gap-1 bg-white/10 px-2 py-0.5 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            {eliminatedPercentage}% Eliminated
          </span>
          <span>{upperBound.toLocaleString()}</span>
        </div>

        {/* Visual Bar Segment */}
        <div className="relative w-full h-10 bg-black border border-white/20 flex p-1">
          {/* Left Eliminated Section */}
          {leftEliminatedPct > 0 && (
            <div
              style={{ width: `${leftEliminatedPct}%` }}
              className="h-full bg-black border-r border-white/10 flex items-center justify-center text-[10px] font-mono text-slate-500 overflow-hidden transition-all duration-500 relative group"
              title={`Eliminated: 1 to ${currentPossibleMin - 1}`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,transparent)] bg-[length:8px_8px]" />
              <span className="truncate px-1 z-10 font-bold hidden sm:inline">ELIMINATED</span>
            </div>
          )}

          {/* Remaining Possible Range Section */}
          <div
            style={{ width: `${activePct}%` }}
            className="h-full bg-white flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-black transition-all duration-500 relative z-10 px-1 sm:px-2 overflow-hidden"
          >
            <span className="truncate">
              {currentPossibleMin} - {currentPossibleMax}
            </span>
          </div>

          {/* Right Eliminated Section */}
          {rightEliminatedPct > 0 && (
            <div
              style={{ width: `${rightEliminatedPct}%` }}
              className="h-full bg-black border-l border-white/10 flex items-center justify-center text-[10px] font-mono text-slate-500 overflow-hidden transition-all duration-500 relative group"
              title={`Eliminated: ${currentPossibleMax + 1} to ${upperBound}`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,transparent)] bg-[length:8px_8px]" />
              <span className="truncate px-1 z-10 font-bold hidden sm:inline">ELIMINATED</span>
            </div>
          )}
        </div>

        {/* Intuition Callout */}
        <div className="flex items-start gap-2 p-3 bg-black border border-white/10 text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase">
          <Info className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Every guess filters out numbers. By asking <span className="text-white font-bold bg-white/10 px-1">&ldquo;higher or lower?&rdquo;</span>, you instantly eliminate half the remaining space.
          </p>
        </div>
      </div>
    </div>
  );
};
