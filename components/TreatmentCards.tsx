
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';

export const TreatmentCards: React.FC = () => {
  return (
    <section id="treatments" className="py-20 bg-voy-cream">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 h-auto lg:h-[650px]">
          
          {/* Card 1: Weight Loss */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-[3rem] overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-2xl transition-all duration-500 p-10 md:p-14 flex flex-col justify-between h-[500px] lg:h-auto"
          >
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-voy-peach/20 text-voy-dark text-xs font-bold uppercase tracking-wider mb-6">Most Popular</span>
              <h3 className="text-4xl md:text-6xl font-serif text-voy-dark mb-6 group-hover:translate-x-2 transition-transform duration-500">Weight Loss</h3>
              <p className="text-xl text-voy-text/70 max-w-sm mb-8 leading-relaxed">
                Start your journey with clinically proven GLP-1 medication.
              </p>
              
              <a href="#pricing" className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-voy-dark text-white shadow-lg group-hover:scale-110 group-hover:bg-voy-peach group-hover:text-voy-dark transition-all duration-300">
                <ArrowRight size={28} />
              </a>
            </div>

            {/* Image positioned absolutely */}
            <div className="absolute right-0 bottom-0 w-[80%] h-[70%] translate-x-[15%] translate-y-[15%]">
                 <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop" 
                    alt="Healthy food bowl"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-tl-[4rem] shadow-2xl group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-700 ease-out opacity-90"
                 />
            </div>
          </motion.div>

          {/* Card 2: Switch to Us */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative rounded-[3rem] overflow-hidden bg-voy-dark shadow-sm hover:shadow-2xl transition-all duration-500 p-10 md:p-14 flex flex-col justify-between h-[500px] lg:h-auto text-white"
          >
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6">Fast Track</span>
              <h3 className="text-4xl md:text-6xl font-serif mb-6 group-hover:translate-x-2 transition-transform duration-500">Switching?</h3>
              <p className="text-xl text-white/70 max-w-sm mb-8 leading-relaxed">
                Already on Wegovy or Mounjaro? We match your dose instantly.
              </p>
              
              <a href="#pricing" className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-voy-dark shadow-lg group-hover:scale-110 group-hover:bg-voy-peach transition-all duration-300">
                <ArrowRight size={28} />
              </a>
            </div>

            {/* Custom "Transfer Pass" Visual - CSS Only, No heavy blurs */}
            <div className="absolute right-0 bottom-0 w-[80%] h-[70%] translate-x-[10%] translate-y-[10%] flex items-end justify-end p-8">
                 <div className="w-full aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 rounded-tl-[3rem] rounded-br-[4rem] border border-white/10 shadow-2xl p-8 flex flex-col justify-between group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-700 ease-out relative overflow-hidden">
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-voy-peach mb-1">Weighright</div>
                            <div className="text-2xl font-serif">Prescription Transfer</div>
                        </div>
                        <ArrowLeftRight className="text-voy-peach opacity-80" size={32} strokeWidth={1.5} />
                    </div>

                    <div className="space-y-4">
                        <div className="h-px w-full bg-white/20"></div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Current Status</div>
                                <div className="text-lg font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    Priority Review
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Dose Match</div>
                                <div className="text-lg font-mono">100%</div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
