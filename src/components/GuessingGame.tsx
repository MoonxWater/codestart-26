'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TerminalSquare } from 'lucide-react';

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
    console.log('%c[CodeStart 26] Secret number: ' + s, 'color: #ffffff; font-weight: bold;');
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
      <div className="text-left space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-white/20 bg-[#050505] text-slate-400 text-xs font-mono uppercase tracking-widest">
          <TerminalSquare className="w-3.5 h-3.5" />
          Chapter 02: Interactive Experience
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tighter">
          "Let's play a game."
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-mono">
          I picked a secret number between 1 and {max.toLocaleString()}. Find it!
        </p>
      </div>

      {/* Dashboard */}
      <div className="bg-black border border-white/20 shadow-2xl overflow-hidden rounded-sm">

        {/* Range bar */}
        <div className="bg-[#0a0a0a] p-4 border-b border-white/10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-mono text-slate-400 w-full sm:w-auto mb-1 sm:mb-0">Range:</span>
            {RANGES.map(r => (
              <button key={r} type="button" onClick={() => newGame(r)}
                className={`px-3 py-1.5 sm:py-1 rounded-sm text-xs font-mono font-bold cursor-pointer transition-colors flex-1 sm:flex-none text-center border ${max === r ? 'bg-white text-black border-white' : 'bg-transparent text-slate-300 border-white/20 hover:bg-white/10'}`}>
                1–{r.toLocaleString()}
              </button>
            ))}
            <div className="flex items-center gap-1 w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2">
              <input type="number" value={customVal} onChange={e => setCustomVal(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); newGame(parseInt(customVal) || 100); }}}
                className="flex-1 sm:w-24 h-8 sm:h-7 px-2 rounded-sm bg-black text-slate-200 text-xs font-mono text-center border border-white/20 focus:border-white outline-none" />
              <button type="button" onClick={() => newGame(parseInt(customVal) || 100)}
                className="h-8 sm:h-7 px-4 sm:px-3 rounded-sm bg-black border border-white/20 hover:bg-white/10 text-white text-xs font-mono font-bold cursor-pointer transition-colors">
                Set
              </button>
            </div>
          </div>
          <button type="button" onClick={() => newGame(max)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-transparent hover:bg-white/10 border border-white/20 text-slate-200 rounded-sm text-sm font-bold font-mono cursor-pointer transition-colors w-full sm:w-auto">
            [ RESET ]
          </button>
        </div>

        {/* Console hint */}
        <div className="bg-[#050505] px-4 py-2 border-b border-white/10 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          &gt; Secret number printed to browser console (F12)
        </div>

        {/* Play area */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-black">

          {/* Left column */}
          <div className="space-y-5">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Attempts</div>
                <div className="text-4xl font-black text-white font-mono leading-none">{tries}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Optimal</div>
                <div className="text-sm font-mono text-white font-bold">≤ {optimal}</div>
              </div>
            </div>

            {!won ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                  <input ref={inputRef} type="number" value={input}
                    onChange={e => { setInput(e.target.value); setError(''); }}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); guess(); }}}
                    placeholder={`1–${max.toLocaleString()}`}
                    className="w-full bg-[#050505] border border-white/20 rounded-sm px-4 py-3 text-white font-mono text-lg outline-none focus:border-white transition-colors" />
                  <button type="button" onClick={guess}
                    className="w-full sm:w-auto bg-white hover:bg-slate-200 text-black px-6 py-3 sm:py-0 rounded-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors text-sm font-mono uppercase tracking-widest whitespace-nowrap">
                    Submit
                  </button>
                </div>
                {error && (
                  <div className="text-white text-xs font-mono bg-red-900/50 p-3 rounded-sm border border-red-500/50">
                    [ ERROR ] {error}
                  </div>
                )}
                {latest && latest.result !== 'correct' && (
                  <div className={`p-4 rounded-sm border flex items-center justify-center gap-3 font-bold font-mono text-sm uppercase tracking-widest ${
                    latest.result === 'low' ? 'bg-[#1a1a1a] border-white/20 text-white' : 'bg-[#1a1a1a] border-white/20 text-white'
                  }`}>
                    {latest.result === 'low' ? `↑ ${latest.val} TOO LOW` : `↓ ${latest.val} TOO HIGH`}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#050505] border border-white/30 rounded-sm p-6 text-center space-y-4">
                <h3 className="text-2xl font-bold text-white font-mono uppercase tracking-widest">Match Found</h3>
                <p className="text-slate-400 font-mono text-sm">
                  Secret: <strong className="text-white">{secret}</strong>. 
                  <br />
                  Solved in <strong className="text-white">{tries}</strong> {tries === 1 ? 'try' : 'tries'}.
                  {tries <= optimal && <span className="text-white block mt-2">[ OPTIMAL EFFICIENCY ACHIEVED ]</span>}
                </p>
                <button type="button" onClick={() => newGame(max)}
                  className="bg-white hover:bg-slate-200 text-black px-6 py-2 rounded-sm font-bold font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors">
                  Restart
                </button>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-4 flex flex-col">
            <div className="pb-4">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Search Space</div>
              <div className="h-4 bg-[#050505] rounded-sm border border-white/20 flex p-0.5 relative">
                {lo > 1 && <div style={{ width: `${((lo - 1) / max) * 100}%` }} className="bg-[#111] h-full transition-all duration-300" />}
                <div style={{ width: `${((hi - lo + 1) / max) * 100}%`, minWidth: '4px' }}
                  className="bg-white h-full relative flex justify-center transition-all duration-300">
                  <span className="absolute top-full mt-2 z-10 text-[10px] font-mono font-bold text-white whitespace-nowrap pointer-events-none bg-black px-1">
                    [{lo}-{hi}]
                  </span>
                </div>
                {hi < max && <div style={{ width: `${((max - hi) / max) * 100}%` }} className="bg-[#111] h-full transition-all duration-300" />}
              </div>
            </div>

            <div className="flex-1 bg-[#050505] border border-white/10 rounded-sm p-4 flex flex-col max-h-[260px] mt-4">
              <div className="text-[10px] font-mono text-slate-500 mb-3 uppercase tracking-widest border-b border-white/10 pb-2">History ({tries})</div>
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                {tries === 0 ? (
                  <div className="text-xs text-slate-600 font-mono h-full flex items-center justify-center uppercase tracking-widest">Awaiting Input</div>
                ) : history.map(g => (
                  <div key={g.n} className="flex justify-between items-center bg-black px-3 py-2 rounded-sm border border-white/10 text-xs font-mono uppercase tracking-widest">
                    <span className="text-slate-500">#{g.n}</span>
                    <span className="text-white font-bold">{g.val.toLocaleString()}</span>
                    <span className={`px-2 py-0.5 rounded-sm font-bold ${
                      g.result === 'correct' ? 'bg-white text-black' :
                      g.result === 'low' ? 'text-slate-300' : 'text-slate-300'
                    }`}>
                      {g.result === 'correct' ? 'MATCH' : g.result === 'low' ? 'LOW' : 'HIGH'}
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
