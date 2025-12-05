
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const WeightCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(95);
  const [unit, setUnit] = useState<'kg' | 'st'>('kg');
  const [medication, setMedication] = useState<'mounjaro' | 'wegovy'>('mounjaro');

  // Clinical data: Mounjaro ~21%, Wegovy ~15%
  const percentage = medication === 'mounjaro' ? 0.21 : 0.15;
  const lostAmount = weight * percentage;
  const finalWeight = weight - lostAmount;

  const displayWeight = (val: number) => {
    if (unit === 'kg') return Math.round(val);
    const stVal = val * 0.157473;
    return stVal.toFixed(1);
  };

  const minWeight = 60;
  const maxWeight = 180;
  
  // Calculate percentage for slider background
  const sliderPercent = ((weight - minWeight) / (maxWeight - minWeight)) * 100;

  return (
    <section id="calculator" className="py-24 bg-white relative">
      <div className="max-w-[1100px] mx-auto px-6">
        
        <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-serif text-voy-dark mb-4">Calculate your potential</h2>
           <p className="text-voy-text/60">Adjust the details to see your estimated results.</p>
        </div>

        {/* The "Power Card" Widget */}
        <div className="group bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-200 flex flex-col md:flex-row">
          
          {/* LEFT: Inputs */}
          <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center space-y-12 bg-voy-cream/50 relative z-10">
            
            {/* Toggles Row */}
            <div className="flex flex-wrap gap-4 justify-between items-center">
                
                {/* Unit Switch */}
                <div className="inline-flex bg-white p-1 rounded-2xl border border-stone-200 shadow-sm">
                    {(['kg', 'st'] as const).map((u) => (
                        <button
                            key={u}
                            onClick={() => setUnit(u)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                unit === u ? 'bg-voy-dark text-white shadow-sm' : 'text-voy-text/40 hover:text-voy-dark'
                            }`}
                        >
                            {u}
                        </button>
                    ))}
                </div>

                {/* Medication Switch */}
                <div className="inline-flex bg-white p-1 rounded-2xl border border-stone-200 shadow-sm">
                    {(['mounjaro', 'wegovy'] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMedication(m)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                medication === m ? 'bg-voy-peach text-voy-dark shadow-sm' : 'text-voy-text/40 hover:text-voy-dark'
                            }`}
                        >
                            {m === 'mounjaro' ? 'Mounjaro' : 'Wegovy'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Weight Slider Section */}
            <div className="py-4">
               <div className="flex justify-between items-end mb-8">
                 <label className="text-xs font-bold uppercase tracking-widest text-voy-dark/40">Starting Weight</label>
                 <div className="text-5xl font-serif text-voy-dark tabular-nums">
                    {displayWeight(weight)} <span className="text-xl text-voy-dark/30 font-sans font-medium">{unit}</span>
                 </div>
               </div>

               <div className="relative h-16 flex items-center group/slider select-none">
                  {/* Custom Track Background */}
                  <div className="absolute w-full h-4 bg-stone-200 rounded-full overflow-hidden">
                     {/* Fill */}
                     <div 
                       className="h-full bg-voy-dark transition-all duration-75 ease-out" 
                       style={{ width: `${sliderPercent}%` }}
                     />
                  </div>

                  {/* Range Input */}
                  <input
                    type="range"
                    min={minWeight}
                    max={maxWeight}
                    step="1"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-30"
                  />

                  {/* Custom Thumb */}
                  <div 
                    className="absolute h-10 w-10 bg-white border-[4px] border-voy-peach rounded-full shadow-lg z-20 pointer-events-none transition-all duration-75 ease-out flex items-center justify-center"
                    style={{ left: `calc(${sliderPercent}% - 20px)` }}
                  >
                     <div className="w-2.5 h-2.5 bg-voy-dark rounded-full"></div>
                  </div>
               </div>
               
               <div className="flex justify-between mt-2 text-xs text-voy-text/30 font-medium px-1">
                  <span>{unit === 'kg' ? '60kg' : '9st'}</span>
                  <span>{unit === 'kg' ? '180kg' : '28st'}</span>
               </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-stone-200">
               <div className="text-voy-forest mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
               </div>
               <p className="text-xs text-voy-text/60 leading-relaxed">
                  Calculation based on average weight loss observed in clinical trials for <strong className="text-voy-dark">{medication === 'mounjaro' ? 'Tirzepatide (21%)' : 'Semaglutide (15%)'}</strong>. Individual results may vary.
               </p>
            </div>

          </div>

          {/* RIGHT: Results */}
          <div className="w-full md:w-1/2 bg-voy-dark text-white p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
             
             {/* Static background elements instead of heavy animation */}
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-voy-forest/30 to-voy-dark"></div>
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-voy-peach/20 rounded-full blur-[80px]"></div>
             
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-10">
                    <p className="text-voy-peach text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                       <span className="w-8 h-px bg-voy-peach/50"></span> Projected Result
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl lg:text-6xl text-white/20 font-serif mr-2">-</span>
                        <span className="text-7xl lg:text-9xl font-serif leading-none tracking-tight text-white">
                             {displayWeight(lostAmount)}
                        </span>
                        <span className="text-2xl text-white/40 font-medium">{unit}</span>
                    </div>
                    <p className="text-white/60 mt-4 text-lg font-light border-l-2 border-white/10 pl-4 ml-2">Estimated total weight loss</p>
                </div>

                <div>
                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 mb-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-white/50 mb-2">Target Weight</p>
                                <div className="text-4xl font-serif text-white flex items-baseline gap-1">
                                    {displayWeight(finalWeight)} <span className="text-sm font-sans text-white/40">{unit}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-wider text-white/50 mb-2">Timeframe</p>
                                <div className="text-xl font-medium text-voy-peach">
                                    ~18 Months
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-5 bg-voy-peach text-voy-dark font-bold text-lg rounded-2xl hover:bg-white transition-all duration-300 shadow-xl shadow-black/20 flex items-center justify-center gap-3 group">
                        Start Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
