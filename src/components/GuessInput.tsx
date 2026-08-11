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
    <div className="w-full bg-slate-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-widest font-mono text-indigo-400">
          Guessing Interface
        </p>
        <h4 className="text-xl sm:text-2xl font-bold text-slate-100 font-sans">
          I&apos;m thinking of a number between
        </h4>
        <div className="inline-block px-4 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono font-extrabold text-lg sm:text-xl">
          1 and {upperBound.toLocaleString()}
        </div>
      </div>

      {/* Input Form */}
      {!isWon && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="flex items-center gap-3">
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
                className="w-full h-14 px-5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 placeholder-slate-500 font-mono text-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 transition-all shadow-inner"
                aria-label="Your numeric guess"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 pointer-events-none hidden sm:inline">
                Enter ↵
              </span>
            </div>

            <button
              type="submit"
              disabled={disabled || !guessValue.trim()}
              className="h-14 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 border border-indigo-400/30 shrink-0"
            >
              <span>Guess</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-lg animate-shake">
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
          className={`w-full max-w-md mx-auto p-4 rounded-xl border flex items-center justify-center gap-3 font-mono font-bold text-base sm:text-lg transition-all animate-bounce-subtle ${
            lastGuess.result === 'correct'
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
              : lastGuess.result === 'too_low'
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
              : 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
          }`}
          role="status"
          aria-live="polite"
        >
          {lastGuess.result === 'correct' && (
            <>
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 animate-spin-once" />
              <span>You found it! 🎉</span>
            </>
          )}

          {lastGuess.result === 'too_low' && (
            <>
              <ArrowUp className="w-6 h-6 text-amber-400 shrink-0" />
              <span>Too low. Try again.</span>
            </>
          )}

          {lastGuess.result === 'too_high' && (
            <>
              <ArrowDown className="w-6 h-6 text-rose-400 shrink-0" />
              <span>Too high. Try again.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
