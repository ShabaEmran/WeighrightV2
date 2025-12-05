
import React, { useState } from 'react';
import { Button } from './Button';
import { Check, ArrowRight } from 'lucide-react';
import { PatientType } from '../types';

export const Pricing: React.FC = () => {
  const [patientType, setPatientType] = useState<PatientType>(PatientType.NEW);
  
  // State for selected doses
  const [wegovyDose, setWegovyDose] = useState('0.25mg');
  const [mounjaroDose, setMounjaroDose] = useState('2.5mg');

  const wegovyPrices: Record<string, number> = {
    '0.25mg': 199,
    '0.5mg': 199,
    '1.0mg': 199,
    '1.7mg': 249,
    '2.4mg': 299
  };

  const mounjaroPrices: Record<string, number> = {
    '2.5mg': 219,
    '5mg': 219,
    '7.5mg': 229,
    '10mg': 249,
    '12.5mg': 269,
    '15mg': 269
  };

  const wegovyStrengths = Object.keys(wegovyPrices);
  const mounjaroStrengths = Object.keys(mounjaroPrices);

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-voy-peach/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-voy-dark mb-6">Simple, transparent pricing.</h2>
          
          {/* Patient Type Toggle */}
          <div className="inline-flex bg-voy-cream p-1.5 rounded-full border border-stone-200 mb-8">
            <button
              onClick={() => setPatientType(PatientType.NEW)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                patientType === PatientType.NEW ? 'bg-voy-dark text-white shadow-md' : 'text-voy-text/60 hover:text-voy-dark'
              }`}
            >
              New Patient
            </button>
            <button
              onClick={() => setPatientType(PatientType.EXISTING)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                patientType === PatientType.EXISTING ? 'bg-voy-dark text-white shadow-md' : 'text-voy-text/60 hover:text-voy-dark'
              }`}
            >
              Switching to Us
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Wegovy Card */}
          <div className="flex flex-col bg-voy-cream/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/40 hover:border-voy-dark/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-6 border-b border-stone-200/50 pb-6">
              <div className="flex justify-between items-start mb-2">
                  <h3 className="text-4xl font-serif text-voy-dark">Wegovy®</h3>
              </div>
              <p className="text-voy-text/60 mb-6">Weekly Semaglutide injection</p>
              
              <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-serif text-voy-dark">£{wegovyPrices[wegovyDose]}</span>
                  <span className="text-voy-text/60 font-medium">/ month</span>
              </div>

              {/* Strength Selectors */}
              <div className="flex flex-wrap gap-2">
                {wegovyStrengths.map((dose) => (
                  <button
                    key={dose}
                    onClick={() => setWegovyDose(dose)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-200 border ${
                      wegovyDose === dose
                        ? 'bg-voy-dark text-white border-voy-dark'
                        : 'bg-white/50 text-voy-dark/60 border-stone-200 hover:border-voy-dark/40'
                    }`}
                  >
                    {dose}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-voy-dark/10 flex items-center justify-center text-voy-dark flex-shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-voy-text/80 text-sm font-medium">Clinically proven for weight loss</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-voy-dark/10 flex items-center justify-center text-voy-dark flex-shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-voy-text/80 text-sm font-medium">Reduces appetite & cravings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-voy-dark/10 flex items-center justify-center text-voy-dark flex-shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-voy-text/80 text-sm font-medium">Weekly self-injection</span>
              </div>
            </div>

            <Button fullWidth className="h-14 text-base group bg-voy-dark hover:bg-voy-forest">
              Select Wegovy <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mounjaro Card */}
          <div className="flex flex-col bg-voy-cream/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/40 hover:border-voy-dark/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
             {/* Highlight Badge */}
             <div className="absolute top-0 right-0 bg-voy-peach text-voy-dark text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-bl-2xl">
                Most Popular
             </div>

            <div className="mb-6 border-b border-stone-200/50 pb-6">
              <div className="flex justify-between items-start mb-2">
                  <h3 className="text-4xl font-serif text-voy-dark">Mounjaro®</h3>
              </div>
              <p className="text-voy-text/60 mb-6">Weekly Tirzepatide injection</p>
              
              <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-serif text-voy-dark">£{mounjaroPrices[mounjaroDose]}</span>
                  <span className="text-voy-text/60 font-medium">/ month</span>
              </div>

              {/* Strength Selectors */}
              <div className="flex flex-wrap gap-2">
                {mounjaroStrengths.map((dose) => (
                  <button
                    key={dose}
                    onClick={() => setMounjaroDose(dose)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-200 border ${
                      mounjaroDose === dose
                        ? 'bg-voy-peach text-voy-dark border-voy-peach'
                        : 'bg-white/50 text-voy-dark/60 border-stone-200 hover:border-voy-peach/50'
                    }`}
                  >
                    {dose}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-voy-peach/20 flex items-center justify-center text-voy-dark flex-shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-voy-text/80 text-sm font-medium">Newest generation treatment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-voy-peach/20 flex items-center justify-center text-voy-dark flex-shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-voy-text/80 text-sm font-medium">Dual-action hormone mimic</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-voy-peach/20 flex items-center justify-center text-voy-dark flex-shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-voy-text/80 text-sm font-medium">Highest efficacy in trials</span>
              </div>
            </div>

            <Button fullWidth className="h-14 text-base group bg-voy-dark hover:bg-voy-forest">
              Select Mounjaro <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

        </div>
        
        <div className="mt-12 text-center">
            <p className="text-sm text-voy-text/40">
                *Pricing subject to consultation and availability. Medications are prescribed only if clinically appropriate.
            </p>
        </div>
      </div>
    </section>
  );
};
