'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Gamepad2, RotateCcw, Terminal, ArrowUp, ArrowDown, CheckCircle2, AlertCircle, Send, SlidersHorizontal } from 'lucide-react';
import { GuessRecord, GuessResult } from '@/types/game';

const PRESETS = [10, 50, 100, 1000, 10000];

export const GuessingGame: React.FC = () => {
  const [upperBound, setUpperBound] = useState<number>(100);
  const [customBoundInput, setCustomBoundInput] = useState<string>('100');
  const [target, setTarget] = useState<number>(42);
  const [tries, setTries] = useState<number>(0);
  const [guesses, setGuesses] = useState<GuessRecord[]>([]);
  const [possibleMin, setPossibleMin] = useState<number>(1);
  const [possibleMax, setPossibleMax] = useState<number>(100);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [lastGuess, setLastGuess] = useState<GuessRecord | null>(null);

  const [inputVal, setInputVal] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize a new game round
  const initGame = (bound: number) => {
    const validBound = Math.max(2, Math.min(1000000, bound));
    const newTarget = Math.floor(Math.random() * validBound) + 1;
    
    setUpperBound(validBound);
    setCustomBoundInput(validBound.toString());
    setTarget(newTarget);
    setTries(0);
    setGuesses([]);
    setPossibleMin(1);
    setPossibleMax(validBound);
    setIsWon(false);
    setLastGuess(null);
    setInputVal('');
    setErrorMsg(null);

    // Console log secret number for presentation demo
    if (typeof window !== 'undefined') {
      console.log(`[CodeStart '26] Secret number: ${newTarget} (Range: 1 - ${validBound})`);
    }
  };

  // Generate initial target on mount
  useEffect(() => {
    initGame(100);
  }, []);

  const handlePresetSelect = (bound: number) => {
    initGame(bound);
  };

  const handleCustomBoundApply = () => {
    const val = parseInt(customBoundInput.trim(), 10);
    if (!isNaN(val) && val >= 2) {
      initGame(val);
    } else {
      initGame(100);
    }
  };

  const executeGuess = () => {
    setErrorMsg(null);

    const trimmed = inputVal.trim();
    if (!trimmed) {
      setErrorMsg('Please enter a number to guess.');
      return;
    }

    const val = parseInt(trimmed, 10);

    if (isNaN(val)) {
      setErrorMsg('Please enter a valid whole number.');
      return;
    }

    if (val < 1 || val > upperBound) {
      setErrorMsg(`Please enter a number between 1 and ${upperBound.toLocaleString()}.`);
      return;
    }

    let result: GuessResult;
    let newMin = possibleMin;
    let newMax = possibleMax;

    if (val < target) {
      result = 'too_low';
      newMin = Math.max(possibleMin, val + 1);
    } else if (val > target) {
      result = 'too_high';
      newMax = Math.min(possibleMax, val - 1);
    } else {
      result = 'correct';
    }

    const won = result === 'correct';
    const nextTries = tries + 1;

    const record: GuessRecord = {
      id: `${Date.now()}-${Math.random()}`,
      value: val,
      result,
      timestamp: Date.now(),
      rangeBefore: [possibleMin, possibleMax],
      rangeAfter: [newMin, newMax],
    };

    setTries(nextTries);
    setGuesses((prev) => [...prev, record]);
    setPossibleMin(newMin);
    setPossibleMax(newMax);
    setLastGuess(record);
    setIsWon(won);
    setInputVal('');

    if (won) {
      if (typeof window !== 'undefined') {
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#10b981', '#38bdf8', '#fbbf24'],
          });
        } catch {
          // ignore if canvas unavailable
        }
      }
    } else {
      // Focus without viewport jumping
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 50);
    }
  };

  const totalPossible = upperBound;
  const remainingCount = possibleMax - possibleMin + 1;
  const eliminatedPercentage = Math.round(((totalPossible - remainingCount) / totalPossible) * 100);
  const maxRecommendedTries = Math.ceil(Math.log2(upperBound));

  return (
    <section id="game-section" className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-8 scroll-mt-20 relative z-10">
      {/* Game Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Gamepad2 className="w-4 h-4 text-indigo-400" />
          Chapter 02: Interactive Experience
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-sans">
          &ldquo;Let&apos;s play a game.&rdquo;
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-normal">
          Somewhere between 1 and a number you choose, I&apos;ve picked a secret number.
          <span className="text-indigo-300 font-semibold font-mono"> Can you find it?</span>
        </p>
      </div>

      {/* ALL-IN-ONE COMPACT GAME DASHBOARD */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl backdrop-blur-md space-y-6 relative z-20">
        {/* Range Selection Bar (No HTML forms = zero page refreshes) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Presets & Custom Max Input */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
            <span className="text-xs font-mono text-slate-400 font-semibold flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" /> Range (1 to Max):
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all active:scale-95 border cursor-pointer ${
                    upperBound === preset
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                      : 'bg-slate-950 text-slate-300 border-white/10 hover:border-indigo-500/40 hover:bg-slate-800'
                  }`}
                >
                  1–{preset.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Max Bound Input */}
            <div className="flex items-center gap-1.5 ml-0 sm:ml-2">
              <span className="text-xs font-mono text-slate-500">Custom:</span>
              <input
                type="number"
                min={2}
                max={1000000}
                value={customBoundInput}
                onChange={(e) => setCustomBoundInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCustomBoundApply();
                  }
                }}
                className="w-20 h-8 px-2 rounded-lg bg-slate-950 border border-white/15 text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500 text-center"
              />
              <button
                type="button"
                onClick={handleCustomBoundApply}
                className="h-8 px-2.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white font-mono text-xs font-bold border border-indigo-500/30 transition-all cursor-pointer"
              >
                Set
              </button>
            </div>
          </div>

          {/* New Game Button */}
          <button
            type="button"
            onClick={() => initGame(upperBound)}
            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30 hover:border-indigo-500/60 flex items-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            New Secret Number
          </button>
        </div>

        {/* Console Hint for Presenter */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-950/70 px-4 py-2 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Target secret is stored in browser memory.</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">Press F12 → Console to view</span>
        </div>

        {/* MAIN GAME CORE LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Tries counter, Input form, Feedback */}
          <div className="md:col-span-7 space-y-5">
            {/* Prominent Tries Header */}
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-semibold">
                  Current Attempts
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Optimal binary search target: ≤{maxRecommendedTries} tries
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Tries:</span>
                <span
                  className={`font-mono text-3xl font-extrabold tracking-tight ${
                    isWon
                      ? 'text-emerald-400'
                      : tries > 0
                      ? 'text-indigo-400'
                      : 'text-slate-500'
                  }`}
                >
                  {tries}
                </span>
              </div>
            </div>

            {/* Input Controls (NO form wrapper = NO page refresh!) */}
            {!isWon ? (
              <div className="space-y-3">
                <label htmlFor="guess-input-field" className="block text-xs font-mono text-slate-300">
                  Enter your guess (Between <strong className="text-indigo-300">1 and {upperBound.toLocaleString()}</strong>):
                </label>

                <div className="flex items-center gap-3">
                  <input
                    id="guess-input-field"
                    ref={inputRef}
                    type="number"
                    min={1}
                    max={upperBound}
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        executeGuess();
                      }
                    }}
                    placeholder={`Active bounds: ${possibleMin} - ${possibleMax}`}
                    className="flex-1 h-13 px-4 rounded-xl bg-slate-950 border border-white/20 text-slate-100 placeholder-slate-500 font-mono text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-inner"
                    aria-label="Your numeric guess"
                  />

                  {/* Explicit button type="button" to prevent native form submission */}
                  <button
                    type="button"
                    onClick={executeGuess}
                    className="h-13 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all active:scale-95 border border-indigo-400/30 shrink-0 cursor-pointer"
                  >
                    <span>Guess</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>
            ) : (
              /* Victory Card */
              <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <h3 className="text-xl font-extrabold text-emerald-300 font-sans">
                  You found it in {tries} {tries === 1 ? 'try' : 'tries'}! 🎉
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  {tries <= maxRecommendedTries
                    ? '⚡ Excellent! You used an optimal searching strategy.'
                    : `Target was ${target}. Play again to try in fewer tries!`}
                </p>
                <button
                  type="button"
                  onClick={() => initGame(upperBound)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Play Again
                </button>
              </div>
            )}

            {/* Immediate Feedback Banner */}
            {lastGuess && (
              <div
                key={lastGuess.id}
                className={`p-3.5 rounded-xl border flex items-center justify-center gap-2.5 font-mono font-bold text-sm transition-all ${
                  lastGuess.result === 'correct'
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : lastGuess.result === 'too_low'
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                }`}
              >
                {lastGuess.result === 'correct' && (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>You found it! 🎉</span>
                  </>
                )}
                {lastGuess.result === 'too_low' && (
                  <>
                    <ArrowUp className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Too low ({lastGuess.value}). Try higher!</span>
                  </>
                )}
                {lastGuess.result === 'too_high' && (
                  <>
                    <ArrowDown className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>Too high ({lastGuess.value}). Try lower!</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Visual Range Narrowing Track & Guess History */}
          <div className="md:col-span-5 space-y-5">
            {/* Visual Range Track */}
            <div className="bg-slate-950 p-4 rounded-xl border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-semibold">Search Window:</span>
                <span className="text-indigo-300 font-bold">
                  {possibleMin} – {possibleMax} ({eliminatedPercentage}% eliminated)
                </span>
              </div>

              <div className="w-full h-8 bg-slate-900 rounded-lg overflow-hidden border border-white/10 flex p-0.5">
                {/* Left Eliminated */}
                {possibleMin > 1 && (
                  <div
                    style={{ width: `${((possibleMin - 1) / upperBound) * 100}%` }}
                    className="h-full bg-slate-800/90 border-r border-slate-700 flex items-center justify-center text-[9px] font-mono text-slate-500 overflow-hidden"
                  >
                    ✕
                  </div>
                )}

                {/* Remaining Active */}
                <div
                  style={{
                    width: `${Math.max(1, ((possibleMax - possibleMin + 1) / upperBound) * 100)}%`,
                  }}
                  className="h-full bg-gradient-to-r from-indigo-600 to-sky-500 rounded flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-md truncate px-1"
                >
                  [{possibleMin}..{possibleMax}]
                </div>

                {/* Right Eliminated */}
                {possibleMax < upperBound && (
                  <div
                    style={{ width: `${((upperBound - possibleMax) / upperBound) * 100}%` }}
                    className="h-full bg-slate-800/90 border-l border-slate-700 flex items-center justify-center text-[9px] font-mono text-slate-500 overflow-hidden"
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>

            {/* Compact Guess History */}
            <div className="bg-slate-950 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1 border-b border-white/5">
                <span>Guess History ({guesses.length})</span>
                <span>Result</span>
              </div>

              {guesses.length === 0 ? (
                <p className="text-xs font-mono text-slate-600 text-center py-4">
                  No guesses yet. Enter your first guess!
                </p>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                  {[...guesses].reverse().map((g, idx) => (
                    <div
                      key={g.id}
                      className="flex items-center justify-between text-xs font-mono p-2 rounded bg-slate-900 border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-[10px]">#{guesses.length - idx}</span>
                        <span className="font-bold text-slate-200">{g.value.toLocaleString()}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          g.result === 'correct'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : g.result === 'too_low'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {g.result === 'correct'
                          ? 'Correct!'
                          : g.result === 'too_low'
                          ? 'Too low'
                          : 'Too high'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
