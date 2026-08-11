'use client';

import React from 'react';
import { Play, Sparkles } from 'lucide-react';

interface RangeSelectorProps {
  upperBound: number;
  onRangeChange: (val: number) => void;
  onStartGame: () => void;
  disabled?: boolean;
}

const PRESETS = [10, 50, 100, 1000, 10000];

export const RangeSelector: React.FC<RangeSelectorProps> = ({
  upperBound,
  onRangeChange,
  onStartGame,
  disabled = false,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-md space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 1: Set the bounds
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-sans">
          Choose your range
        </h3>
        <p className="text-sm text-slate-400">
          The secret number will be generated between <span className="font-mono text-indigo-300 font-semibold">1</span> and your selected maximum.
        </p>
      </div>

      {/* Preset range selection pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            disabled={disabled}
            onClick={() => onRangeChange(preset)}
            className={`px-4 py-2 rounded-xl text-sm font-mono font-semibold transition-all active:scale-95 border ${
              upperBound === preset
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-slate-800/80 text-slate-300 border-white/10 hover:border-indigo-500/50 hover:bg-slate-800'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            1 – {preset.toLocaleString()}
          </button>
        ))}
      </div>

      {/* Visual Slider & Display */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>1</span>
          <span className="text-indigo-300 font-bold text-base px-3 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/30">
            [ 1 – {upperBound.toLocaleString()} ]
          </span>
          <span>10,000</span>
        </div>

        <input
          type="range"
          min="10"
          max="10000"
          step="10"
          disabled={disabled}
          value={upperBound}
          onChange={(e) => onRangeChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-50"
          aria-label="Upper range bound slider"
        />
      </div>

      {/* Start Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={onStartGame}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-mono font-bold text-base shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 border border-indigo-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Play className="w-5 h-5 fill-current" />
        <span>Start Game</span>
      </button>
    </div>
  );
};
