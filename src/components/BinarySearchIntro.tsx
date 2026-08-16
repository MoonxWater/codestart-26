'use client';

import React, { useState } from 'react';

/* ===== CONSTANTS ===== */
const RANGES = [10, 50, 100, 1000, 10000, 1000000];

/* ===== COMPONENT ===== */
export function BinarySearchIntro() {
  const [range, setRange] = useState(100);
  const [customInput, setCustomInput] = useState('100');

  function applyCustom() {
    const v = parseInt(customInput.trim(), 10);
    if (!isNaN(v) && v >= 2) setRange(Math.min(1000000000, v));
  }

  // Calculate binary search halving steps
  const steps: number[] = [range];
  let cur = range;
  while (cur > 1) { cur = Math.ceil(cur / 2); steps.push(cur); }

  return (
    <section id="binary-search-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12 scroll-mt-20">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          🔀 Chapter 03: Fast Searching Strategy
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          &ldquo;Could you have done it faster?&rdquo;
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          If you always guess near the <span className="text-indigo-300 font-bold underline decoration-indigo-500/50 underline-offset-4 font-mono">middle</span> of the remaining range, every guess eliminates roughly half the possibilities.
        </p>
      </div>

      {/* Waterfall */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1 text-center xl:text-left">
            <span className="text-xs uppercase tracking-widest font-mono text-indigo-400 font-semibold">
              📊 Visualizing Halving Power
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              From {range.toLocaleString()} possibilities to 1 in <strong className="text-indigo-300 font-mono">{steps.length - 1} tries</strong>!
            </h3>
          </div>

          {/* Range controls */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full xl:w-auto">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {RANGES.map(r => (
                <button key={r} type="button"
                  onClick={() => { setRange(r); setCustomInput(r.toString()); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors border flex-1 sm:flex-none text-center ${
                    range === r
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                      : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-indigo-500/40 hover:bg-slate-800'
                  }`}>
                  {r === 1000000 ? '1 Million' : r.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1.5 w-full sm:w-auto mt-1 sm:mt-0">
              <span className="text-xs font-mono text-slate-500">Custom:</span>
              <input type="number" min={2} max={1000000000} value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); applyCustom(); }}}
                className="w-full sm:w-24 h-8 sm:h-8 px-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500 text-center" />
              <button type="button" onClick={applyCustom}
                className="h-8 px-4 sm:px-2.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white font-mono text-xs font-bold border border-indigo-500/30 cursor-pointer transition-all">
                Set
              </button>
            </div>
          </div>
        </div>

        {/* Steps diagram */}
        <div className="flex flex-col items-center space-y-3 py-2 max-w-xl mx-auto">
          {steps.map((count, i) => {
            const isLast = i === steps.length - 1;
            const pct = Math.max(8, Math.round((count / range) * 100));
            return (
              <React.Fragment key={`${range}-${i}`}>
                <div className={`w-full p-3 sm:p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono transition-all ${
                  isLast
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0">
                      #{i + 1}
                    </span>
                    <span className="font-extrabold text-base sm:text-lg">
                      ~{count.toLocaleString()} <span className="hidden sm:inline">possible</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex-1 sm:w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden block">
                      <div style={{ width: `${pct}%` }}
                        className={`h-full rounded-full ${isLast ? 'bg-emerald-400' : 'bg-indigo-500'}`} />
                    </div>
                    {isLast
                      ? <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold border border-emerald-500/40 whitespace-nowrap">Target Found!</span>
                      : <span className="text-[10px] sm:text-xs text-slate-500 whitespace-nowrap">Cut by 50%</span>
                    }
                  </div>
                </div>
                {!isLast && (
                  <div className="flex items-center justify-center py-0.5">
                    <span className="font-mono text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      ↓ Eliminate ~50%
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Concept reveal */}
        <div className="pt-8 border-t border-slate-800 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-500/20">
            ✨ Concept Unlocked
          </div>

          <h3 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-300 tracking-tight">
            Binary Search
          </h3>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-medium leading-relaxed italic">
            &ldquo;The strategy you just discovered is the intuition behind <span className="text-indigo-300 font-bold not-italic">Binary Search</span>.&rdquo;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-2xl">⚡</div>
              <h4 className="font-mono font-bold text-slate-200 text-sm">Divide &amp; Conquer</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                By splitting search spaces in half repeatedly, massive problems shrink to zero in seconds.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-2xl">📐</div>
              <h4 className="font-mono font-bold text-slate-200 text-sm">Logarithmic Scale</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Even among 1,000,000 items, Binary Search finds the target in at most <strong className="text-indigo-300 font-mono">20 tries</strong>!
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-2xl">🧠</div>
              <h4 className="font-mono font-bold text-slate-200 text-sm">Computational Thinking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Programmers don&apos;t guess randomly. They design systems that eliminate impossible paths.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
