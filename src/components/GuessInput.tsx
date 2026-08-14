'use client';

import React, { useState } from 'react';
import { Send, ArrowUp, ArrowDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { GuessRecord } from '@/types/game';

interface GuessInputProps {
  upperBound: number;
  currentPossibleMin: number;
  currentPossibleMax: number;
  onGuess: (value: number) => void;
  lastGuess: GuessRecord | null;
  isWon: boolean;
  disabled?: boolean;
}

export const GuessInput: React.FC<GuessInputProps> = ({
  upperBound,
  currentPossibleMin,
  currentPossibleMax,
  onGuess,
  lastGuess,
  isWon,
  disabled = false,
}) => {
  const [guessValue, setGuessValue] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const val = parseInt(guessValue.trim(), 10);

    if (isNaN(val)) {
      setErrorMsg('Please enter a valid number.');
      return;
    }

    if (val < 1 || val > upperBound) {
      setErrorMsg(`Please enter a number between 1 and ${upperBound.toLocaleString()}.`);
      return;
    }

    onGuess(val);
    setGuessValue('');
  };

  return (
    <div className="w-full bg-[#050505] border border-white/10 p-4 sm:p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono border border-white/20 uppercase tracking-widest">
          Step 2: Start Guessing
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tighter">
          I'm thinking of a number between
        </h4>
        <div className="inline-block px-4 py-1.5 bg-white/10 text-white font-mono font-bold text-lg sm:text-xl uppercase tracking-widest border border-white/20">
          1 and {upperBound.toLocaleString()}
        </div>
      </div>

      {/* Input Form */}
      {!isWon && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <input
                type="number"
                min={1}
                max={upperBound}
                disabled={disabled}
                value={guessValue}
                onChange={(e) => {
                  setGuessValue(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder={`Search bounds: ${currentPossibleMin} - ${currentPossibleMax}`}
                className="w-full h-12 sm:h-14 px-5 rounded-sm bg-black border border-white/20 text-white placeholder-slate-500 font-mono text-sm sm:text-lg focus:outline-none focus:border-white disabled:opacity-50 transition-all"
                aria-label="Your numeric guess"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 pointer-events-none hidden sm:inline">
                Enter ↵
              </span>
            </div>

            <button
              type="submit"
              disabled={disabled || !guessValue.trim()}
              className="h-12 sm:h-14 px-6 rounded-sm bg-white hover:bg-slate-200 text-black font-mono font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shrink-0"
            >
              <span>Guess</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 text-white text-xs font-mono bg-black border border-white p-2.5 rounded-sm animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      )}

      {/* Immediate Feedback Banner */}
      {lastGuess && (
        <div
          key={lastGuess.id}
          className={`w-full max-w-md mx-auto p-4 rounded-sm border flex items-center justify-center gap-3 font-mono font-bold text-sm sm:text-base uppercase tracking-widest transition-all animate-bounce-subtle ${
            lastGuess.result === 'correct'
              ? 'bg-black border-white text-white'
              : lastGuess.result === 'too_low'
              ? 'bg-black border-slate-400 text-slate-400'
              : 'bg-black border-slate-600 text-slate-600'
          }`}
          role="status"
          aria-live="polite"
        >
          {lastGuess.result === 'correct' && (
            <>
              <CheckCircle2 className="w-5 h-5 text-white shrink-0 animate-spin-once" />
              <span>You found it!</span>
            </>
          )}

          {lastGuess.result === 'too_low' && (
            <>
              <ArrowUp className="w-5 h-5 shrink-0" />
              <span>Too low.</span>
            </>
          )}

          {lastGuess.result === 'too_high' && (
            <>
              <ArrowDown className="w-5 h-5 shrink-0" />
              <span>Too high.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
