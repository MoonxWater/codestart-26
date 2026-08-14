'use client';

import React from 'react';
import { Play } from 'lucide-react';

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
    <div className="w-full max-w-xl mx-auto p-4 sm:p-8 bg-[#050505] border border-white/10 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white text-[10px] font-mono border border-white/20 uppercase tracking-widest">
          Step 1: Set the bounds
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tighter">
          Choose your range
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-widest uppercase">
          The secret number will be generated between <span className="text-white font-bold bg-white/10 px-1">1</span> and your selected maximum.
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
            className={`px-3 py-1.5 rounded-sm text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest transition-all active:scale-95 border flex-1 sm:flex-none text-center min-w-[70px] ${
              upperBound === preset
                ? 'bg-white text-black border-white'
                : 'bg-black text-slate-400 border-white/10 hover:border-white hover:text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            1 – {preset.toLocaleString()}
          </button>
        ))}
      </div>

      {/* Visual Slider & Display */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-widest">
          <span>1</span>
          <span className="text-white font-bold px-3 py-1 bg-black border border-white/20">
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
          className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-white disabled:opacity-50"
          aria-label="Upper range bound slider"
        />
      </div>

      {/* Start Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={onStartGame}
        className="w-full py-4 px-6 rounded-sm bg-white hover:bg-slate-200 text-black font-mono font-bold text-sm sm:text-base uppercase tracking-widest active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Play className="w-5 h-5 fill-current" />
        <span>Start Game</span>
      </button>
    </div>
  );
};
