import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck, Clock } from 'lucide-react';

export const MedicationShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mounjaro' | 'wegovy'>('mounjaro');

  const medications = {
    mounjaro: {
      name: "Mounjaro®",
      sub: "Tirzepatide",
      description: "A dual-action GIP and GLP-1 receptor agonist. It targets two hormonal pathways to control appetite and regulate blood sugar effectively.",
      stats: [
        { label: "Active Ingredient", value: "Tirzepatide" },
        { label: "Dosage Form", value: "Weekly Injection" },
        { label: "Mechanism", value: "Dual Agonist" }
      ],
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop"
    },
    wegovy: {
      name: "Wegovy®",
      sub: "Semaglutide",
      description: "A GLP-1 receptor agonist that mimics the hormone responsible for regulating appetite, helping you feel fuller for longer.",
      stats: [
        { label: "Active Ingredient", value: "Semaglutide" },
        { label: "Dosage Form", value: "Weekly Injection" },
        { label: "Mechanism", value: "GLP-1 Agonist" }
      ],
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop"
    }
  };

  return (
    <section id="medication" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-serif text-aura-dark mb-4">Clinically proven treatments.</h2>
                <p className="text-aura-muted max-w-2xl mx-auto">We prescribe only MHRA-approved GLP-1 medications, delivered discreetly to your door.</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div className="bg-aura-sand/50 p-1.5 rounded-full inline-flex">
                    {(['mounjaro', 'wegovy'] as const).map((med) => (
                        <button
                            key={med}
                            onClick={() => setActiveTab(med)}
                            className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeTab === med 
                                ? 'bg-white text-aura-dark shadow-md' 
                                : 'text-aura-muted hover:text-aura-dark'
                            }`}
                        >
                            {med.charAt(0).toUpperCase() + med.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-aura-cream rounded-3xl overflow-hidden shadow-sm border border-stone-100">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid lg:grid-cols-2"
                    >
                        {/* Image Side */}
                        <div className="relative h-64 lg:h-auto bg-stone-200">
                             <img 
                                src={medications[activeTab].image} 
                                alt={medications[activeTab].name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>

                        {/* Info Side */}
                        <div className="p-8 lg:p-16 flex flex-col justify-center">
                            <div className="mb-2 text-aura-gold font-bold text-sm tracking-wider uppercase">Rx Only</div>
                            <h3 className="text-4xl font-serif text-aura-dark mb-2">{medications[activeTab].name}</h3>
                            <p className="text-lg text-stone-500 italic mb-6">{medications[activeTab].sub}</p>
                            
                            <p className="text-aura-text leading-relaxed mb-8">
                                {medications[activeTab].description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 border-t border-b border-stone-200 py-6">
                                {medications[activeTab].stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-xs text-aura-muted uppercase tracking-wider mb-1">{stat.label}</div>
                                        <div className="font-serif text-lg text-aura-dark">{stat.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Activity className="w-5 h-5 text-aura-dark mt-0.5" />
                                    <p className="text-sm text-aura-muted">Regulates appetite centers in the brain to reduce cravings.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-aura-dark mt-0.5" />
                                    <p className="text-sm text-aura-muted">Simple once-weekly self-injection with a discreet pen.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-aura-dark mt-0.5" />
                                    <p className="text-sm text-aura-muted">Fully regulated UK pharmacy & registered clinicians.</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <a href="#pricing" className="inline-flex items-center text-aura-dark font-medium border-b border-aura-dark pb-0.5 hover:text-aura-light transition-colors">
                                    View Pricing & Availability <ArrowRight className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </section>
  );
};