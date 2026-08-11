'use client';

import React, { useState } from 'react';
import { Zap, GitBranch, Cpu, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';

const PRESETS = [10, 50, 100, 1000, 10000, 1000000];

export const BinarySearchIntro: React.FC = () => {
  const [testRange, setTestRange] = useState<number>(100);
  const [customInput, setCustomInput] = useState<string>('100');

  const handleApplyCustom = () => {
    const val = parseInt(customInput.trim(), 10);
    if (!isNaN(val) && val >= 2) {
      setTestRange(Math.min(1000000000, val));
    }
  };

  // Calculate binary search steps array for visual simulation
  const getBinarySearchSteps = (total: number) => {
    const steps: number[] = [total];
    let curr = total;
    while (curr > 1) {
      curr = Math.ceil(curr / 2);
      steps.push(curr);
    }
    return steps;
  };

  const steps = getBinarySearchSteps(testRange);

  return (
    <section id="binary-search-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12 scroll-mt-20">
      {/* Header transition */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <GitBranch className="w-4 h-4 text-indigo-400" />
          Chapter 03: Fast Searching Strategy
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight font-sans">
          &ldquo;Could you have done it faster?&rdquo;
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          If you always guess somewhere near the <span className="text-indigo-300 font-bold underline decoration-indigo-500/50 underline-offset-4 font-mono">middle</span> of the remaining range, every guess can eliminate roughly half of the possibilities.
        </p>
      </div>

      {/* Visual Reduction Waterfall Tree */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-8">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1 text-center xl:text-left">
            <span className="text-xs uppercase tracking-widest font-mono text-indigo-400 font-semibold flex items-center justify-center xl:justify-start gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Visualizing Halving Power
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-sans">
              From {testRange.toLocaleString()} possibilities down to 1 in <strong className="text-indigo-300 font-mono">{steps.length - 1} tries</strong>!
            </h3>
          </div>

          {/* Interactive Range Controls for Flowchart */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {PRESETS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setTestRange(r);
                    setCustomInput(r.toString());
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                    testRange === r
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                      : 'bg-slate-950 text-slate-300 border-white/10 hover:border-indigo-500/40 hover:bg-slate-800'
                  }`}
                >
                  {r === 1000000 ? '1 Million' : r.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Input Field for Flowchart */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-slate-500">Custom:</span>
              <input
                type="number"
                min={2}
                max={1000000000}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleApplyCustom();
                  }
                }}
                className="w-24 h-8 px-2 rounded-lg bg-slate-950 border border-white/15 text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500 text-center"
              />
              <button
                type="button"
                onClick={handleApplyCustom}
                className="h-8 px-2.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white font-mono text-xs font-bold border border-indigo-500/30 transition-all cursor-pointer"
              >
                Set
              </button>
            </div>
          </div>
        </div>

        {/* Steps Diagram Stream */}
        <div className="flex flex-col items-center space-y-3 py-2 max-w-xl mx-auto">
          {steps.map((count, index) => {
            const isLast = index === steps.length - 1;
            const pct = Math.max(8, Math.round((count / testRange) * 100));

            return (
              <React.Fragment key={`${testRange}-${index}`}>
                <div
                  className={`w-full p-3 sm:p-4 rounded-xl border flex items-center justify-between font-mono transition-all transform hover:scale-[1.01] ${
                    isLast
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-950 border-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0">
                      #{index + 1}
                    </span>
                    <span className="font-extrabold text-base sm:text-lg">
                      ~{count.toLocaleString()} possible
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-24 sm:w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                      <div
                        style={{ width: `${pct}%` }}
                        className={`h-full rounded-full ${
                          isLast ? 'bg-emerald-400' : 'bg-indigo-500'
                        }`}
                      />
                    </div>
                    {isLast ? (
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                        Target Found! 🎉
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">
                        Cut by 50%
                      </span>
                    )}
                  </div>
                </div>

                {!isLast && (
                  <div className="flex items-center justify-center text-slate-600 py-0.5">
                    <span className="font-mono text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      ↓ Eliminate ~50%
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Big Reveal Section */}
        <div className="pt-8 border-t border-white/10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Concept Unlocked
          </div>

          <h3 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-300 font-sans tracking-tight">
            Binary Search
          </h3>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-medium leading-relaxed italic">
            &ldquo;The strategy you just discovered is the intuition behind <span className="text-indigo-300 font-bold not-italic">Binary Search</span>.&rdquo;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-indigo-500/10 text-indigo-400">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-mono font-bold text-slate-200 text-sm">Divide & Conquer</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                By splitting search spaces in half repeatedly, massive problems shrink to zero in seconds.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-indigo-500/10 text-indigo-400">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-mono font-bold text-slate-200 text-sm">Logarithmic Scale</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Even among 1,000,000 items, Binary Search guarantees finding the target in at most <strong className="text-indigo-300 font-mono">20 tries</strong>!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
              <div className="p-2 w-fit rounded-lg bg-indigo-500/10 text-indigo-400">
                <Cpu className="w-5 h-5" />
              </div>
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
};
