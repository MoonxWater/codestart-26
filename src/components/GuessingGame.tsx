'use client';

import React, { useState, useEffect, useRef } from 'react';

/* ===== TYPES ===== */
type Result = 'low' | 'high' | 'correct';
interface Guess { n: number; val: number; result: Result; }

/* ===== CONSTANTS ===== */
const RANGES = [10, 50, 100, 1000, 10000];

/* ===== COMPONENT ===== */
export function GuessingGame() {
  const [max, setMax] = useState(100);
  const [secret, setSecret] = useState(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Guess[]>([]);
  const [error, setError] = useState('');
  const [won, setWon] = useState(false);
  const [ready, setReady] = useState(false);
  const [customVal, setCustomVal] = useState('100');
  const counter = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Generate a new secret number */
  function newGame(range: number) {
    const r = Math.max(2, Math.floor(range));
    const s = Math.floor(Math.random() * r) + 1;
    setMax(r);
    setSecret(s);
    setHistory([]);
    setInput('');
    setError('');
    setWon(false);
    setCustomVal(r.toString());
    counter.current = 0;
    console.log('%c[CodeStart 26] Secret number: ' + s, 'color: #6366f1; font-weight: bold;');
  }

  /* Start on mount */
  useEffect(() => {
    newGame(100);
    setReady(true);
  }, []);

  /* Handle guess */
  function guess() {
    setError('');
    const trimmed = input.trim();
    if (!trimmed) { setError('Enter a number first.'); return; }
    const v = parseInt(trimmed, 10);
    if (isNaN(v)) { setError('That is not a valid number.'); return; }
    if (v < 1 || v > max) { setError('Must be between 1 and ' + max + '.'); return; }

    let result: Result;
    if (v === secret) result = 'correct';
    else if (v < secret) result = 'low';
    else result = 'high';

    counter.current++;
    const entry: Guess = { n: counter.current, val: v, result };
    setHistory(prev => [entry, ...prev]);
    setInput('');
    if (result === 'correct') setWon(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  /* Derived values */
  const tries = history.length;
  const optimal = Math.ceil(Math.log2(max));
  const lo = history.reduce((a, g) => g.result === 'low' ? Math.max(a, g.val + 1) : a, 1);
  const hi = history.reduce((a, g) => g.result === 'high' ? Math.min(a, g.val - 1) : a, max);
  const latest = history[0] || null;

  if (!ready) return null; // Don't render anything on the server — completely avoid hydration mismatch

  return (
    <section id="game-section" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-6 scroll-mt-20">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono border border-indigo-500/30">
          🎮 Chapter 02: Interactive Experience
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          &ldquo;Let&apos;s play a game.&rdquo;
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          I picked a secret number between 1 and {max.toLocaleString()}. Find it!
        </p>
      </div>

      {/* Dashboard */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">

        {/* Range bar */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-mono text-slate-400 w-full sm:w-auto mb-1 sm:mb-0">Range:</span>
            {RANGES.map(r => (
              <button key={r} type="button" onClick={() => newGame(r)}
                className={`px-3 py-1.5 sm:py-1 rounded-md text-xs font-mono font-bold cursor-pointer transition-colors flex-1 sm:flex-none text-center ${max === r ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                1–{r.toLocaleString()}
              </button>
            ))}
            <div className="flex items-center gap-1 w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2">
              <input type="number" value={customVal} onChange={e => setCustomVal(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); newGame(parseInt(customVal) || 100); }}}
                className="flex-1 sm:w-24 h-8 sm:h-7 px-2 rounded bg-slate-800 text-slate-200 text-xs font-mono text-center border border-slate-700 focus:border-indigo-500 outline-none" />
              <button type="button" onClick={() => newGame(parseInt(customVal) || 100)}
                className="h-8 sm:h-7 px-4 sm:px-3 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-mono font-bold cursor-pointer transition-colors">
                Set
              </button>
            </div>
          </div>
          <button type="button" onClick={() => newGame(max)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-bold font-mono cursor-pointer transition-colors w-full sm:w-auto">
            🔄 Reset
          </button>
        </div>

        {/* Console hint */}
        <div className="bg-indigo-950/30 px-4 py-2 border-b border-indigo-900/30 text-xs font-mono text-indigo-300">
          💻 Secret number is printed to your browser console (F12 → Console tab).
        </div>

        {/* Play area */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left column */}
          <div className="space-y-5">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Attempts</div>
                <div className="text-4xl font-black text-white font-mono leading-none">{tries}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-500">Optimal</div>
                <div className="text-sm font-mono text-indigo-400 font-bold">≤ {optimal} tries</div>
              </div>
            </div>

            {!won ? (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                  <input ref={inputRef} type="number" value={input}
                    onChange={e => { setInput(e.target.value); setError(''); }}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); guess(); }}}
                    placeholder={`Guess 1–${max.toLocaleString()}`}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-lg outline-none focus:border-indigo-500 transition-colors" />
                  <button type="button" onClick={guess}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-6 py-3 sm:py-0 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors text-sm whitespace-nowrap">
                    Guess ➤
                  </button>
                </div>
                {error && (
                  <div className="text-rose-400 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                    ⚠️ {error}
                  </div>
                )}
                {latest && latest.result !== 'correct' && (
                  <div className={`p-4 rounded-xl border flex items-center justify-center gap-3 font-bold text-lg ${
                    latest.result === 'low' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}>
                    {latest.result === 'low' ? `⬆ ${latest.val} is too low!` : `⬇ ${latest.val} is too high!`}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center space-y-4">
                <div className="text-4xl">🎉</div>
                <h3 className="text-2xl font-bold text-emerald-400">You found it!</h3>
                <p className="text-emerald-200/70 font-mono text-sm">
                  The secret was <strong>{secret}</strong>. Solved in <strong>{tries}</strong> {tries === 1 ? 'try' : 'tries'}.
                  {tries <= optimal && ' ⚡ Optimal!'}
                </p>
                <button type="button" onClick={() => newGame(max)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold font-mono cursor-pointer transition-colors">
                  Play Again
                </button>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-4 flex flex-col">
            <div>
              <div className="text-sm font-mono text-slate-400 mb-2">Search Window</div>
              <div className="h-8 bg-slate-950 rounded-lg border border-slate-800 flex overflow-hidden p-0.5">
                {lo > 1 && <div style={{ width: `${((lo - 1) / max) * 100}%` }} className="bg-slate-800/60 h-full rounded-l" />}
                <div style={{ width: `${Math.max(2, ((hi - lo + 1) / max) * 100)}%` }}
                  className="bg-indigo-600 h-full rounded shadow-[0_0_10px_rgba(79,70,229,0.5)] flex items-center justify-center text-[10px] font-mono font-bold text-white overflow-hidden whitespace-nowrap px-1">
                  {lo}–{hi}
                </div>
                {hi < max && <div style={{ width: `${((max - hi) / max) * 100}%` }} className="bg-slate-800/60 h-full rounded-r" />}
              </div>
            </div>

            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col max-h-[260px]">
              <div className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-wider">Guess History ({tries})</div>
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {tries === 0 ? (
                  <div className="text-sm text-slate-600 font-mono h-full flex items-center justify-center">No guesses yet.</div>
                ) : history.map(g => (
                  <div key={g.n} className="flex justify-between items-center bg-slate-900 px-3 py-2 rounded border border-slate-800 text-sm font-mono">
                    <span className="text-slate-500">#{g.n}</span>
                    <span className="text-white font-bold text-base">{g.val.toLocaleString()}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      g.result === 'correct' ? 'bg-emerald-500/20 text-emerald-400' :
                      g.result === 'low' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {g.result === 'correct' ? '✓ Correct' : g.result === 'low' ? '↑ Low' : '↓ High'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
