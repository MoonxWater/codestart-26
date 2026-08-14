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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black border border-white/20 text-white text-[10px] font-mono tracking-widest uppercase">
          03. Fast Searching Strategy
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tighter uppercase">
          "Could you have done it faster?"
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-mono leading-relaxed">
          If you always guess near the <span className="text-white font-bold bg-white/10 px-1">middle</span> of the remaining range, every guess eliminates roughly half the possibilities.
        </p>
      </div>

      {/* Waterfall */}
      <div className="bg-[#050505] border border-white/10 p-6 sm:p-10 space-y-8">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1 text-center xl:text-left">
            <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 font-bold">
              Visualizing Halving Power
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
              From {range.toLocaleString()} possibilities to 1 in <strong className="text-white font-mono bg-white/10 px-2">{steps.length - 1} tries</strong>
            </h3>
          </div>

          {/* Range controls */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full xl:w-auto">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {RANGES.map(r => (
                <button key={r} type="button"
                  onClick={() => { setRange(r); setCustomInput(r.toString()); }}
                  className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer transition-colors border flex-1 sm:flex-none text-center ${
                    range === r
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-slate-400 border-white/20 hover:border-white hover:text-white'
                  }`}>
                  {r === 1000000 ? '1 Million' : r.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1.5 w-full sm:w-auto mt-1 sm:mt-0">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Custom:</span>
              <input type="number" min={2} max={1000000000} value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); applyCustom(); }}}
                className="w-full sm:w-24 h-8 px-2 bg-black border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-white text-center" />
              <button type="button" onClick={applyCustom}
                className="h-8 px-4 sm:px-2.5 bg-white text-black hover:bg-slate-200 font-mono text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all">
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
                <div className={`w-full p-3 sm:p-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono transition-all ${
                  isLast
                    ? 'bg-white border-white text-black'
                    : 'bg-black border-white/20 text-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0 ${isLast ? 'bg-black text-white' : 'bg-white text-black'}`}>
                      #{i + 1}
                    </span>
                    <span className="font-bold text-base sm:text-lg">
                      ~{count.toLocaleString()} <span className="hidden sm:inline uppercase text-xs tracking-widest">possible</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex-1 sm:w-32 h-2 bg-slate-800 overflow-hidden block">
                      <div style={{ width: `${pct}%` }}
                        className={`h-full ${isLast ? 'bg-black' : 'bg-white'}`} />
                    </div>
                    {isLast
                      ? <span className="px-2 py-1 bg-black text-white text-[10px] sm:text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">Target Found!</span>
                      : <span className="text-[10px] sm:text-[10px] uppercase tracking-widest text-slate-500 whitespace-nowrap">Cut by 50%</span>
                    }
                  </div>
                </div>
                {!isLast && (
                  <div className="flex items-center justify-center py-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold bg-[#050505] px-2 py-0.5 border border-white/10">
                      ↓ Eliminate ~50%
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Concept reveal */}
        <div className="pt-8 border-t border-white/10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black text-[10px] font-mono uppercase tracking-widest font-bold">
            Concept Unlocked
          </div>

          <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tighter uppercase">
            Binary Search
          </h3>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 font-mono uppercase tracking-widest leading-relaxed">
            "The strategy you just discovered is the intuition behind <span className="text-white font-bold bg-white/10 px-1">Binary Search</span>."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 bg-black border border-white/10 space-y-2">
              <h4 className="font-mono font-bold text-white text-[10px] uppercase tracking-widest">Divide &amp; Conquer</h4>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                By splitting search spaces in half repeatedly, massive problems shrink to zero in seconds.
              </p>
            </div>
            <div className="p-4 bg-black border border-white/10 space-y-2">
              <h4 className="font-mono font-bold text-white text-[10px] uppercase tracking-widest">Logarithmic Scale</h4>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                Even among 1,000,000 items, Binary Search finds the target in at most <strong className="text-white bg-white/10 px-1">20 tries</strong>!
              </p>
            </div>
            <div className="p-4 bg-black border border-white/10 space-y-2">
              <h4 className="font-mono font-bold text-white text-[10px] uppercase tracking-widest">Computational Thinking</h4>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                Programmers don't guess randomly. They design systems that eliminate impossible paths.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
