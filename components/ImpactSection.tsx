
import React from 'react';
import { motion } from 'framer-motion';

export const ImpactSection: React.FC = () => {
  return (
    <section id="impact" className="bg-voy-dark text-white py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif mb-6 leading-none"
          >
            Changing lives through <br/>
            <span className="italic text-white/90">proven outcomes</span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          
          {/* Left Stat */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5"
          >
            <p className="text-sm font-bold tracking-widest uppercase text-white/60 mb-8">Weight Loss</p>
            <div className="text-8xl md:text-[10rem] font-serif leading-none mb-6 text-voy-peach">53%</div>
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed border-l-2 border-voy-peach pl-6">
              Patients on our plan achieve <span className="text-white font-medium">3x greater weight loss</span> than diet and exercise alone, maintained over 12 months.
            </p>
          </motion.div>

          {/* Right Graph Visual */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative h-[600px] bg-white/5 rounded-[2.5rem] border border-white/5 p-10 overflow-hidden flex flex-col"
          >
             <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-bold tracking-widest uppercase text-white/60">Trajectory (60 Weeks)</p>
                <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-white/20"></span> Medication Only</span>
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-voy-peach"></span> Weighright Plan</span>
                </div>
             </div>
             
             {/* Graph Container */}
             <div className="flex-grow relative mt-8">
                {/* SVG Graph */}
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 300">
                    {/* Grid Lines */}
                    {[0, 75, 150, 225, 300].map(y => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    ))}

                    {/* Medication Only Line (Moderate Drop then plateau) */}
                    <path 
                        d="M0,20 C100,50 200,100 400,120"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="3"
                    />

                    {/* Weighright Line (Steep drop, sustained) */}
                    <motion.path 
                        d="M0,20 C120,150 250,250 400,260"
                        fill="none"
                        stroke="#f7bfaa"
                        strokeWidth="5"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                    />
                    
                    {/* Area under curve */}
                    <motion.path 
                        d="M0,20 C120,150 250,250 400,260 V350 H0 Z"
                        fill="url(#gradient-chart)"
                        opacity="0.3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.3 }}
                        transition={{ duration: 1.5, delay: 1 }}
                    />
                    
                    <defs>
                        <linearGradient id="gradient-chart" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#f7bfaa" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>

                    {/* Data Point Pulse */}
                    <motion.circle 
                        cx="380" 
                        cy="258" 
                        r="8" 
                        fill="#f7bfaa"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 2.5, type: "spring" }}
                    />
                </svg>
                
                {/* Floating Tooltip Style Label */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.6 }}
                    className="absolute bottom-[8%] right-[5%] bg-white text-voy-dark px-6 py-3 rounded-2xl shadow-xl"
                >
                    <div className="text-xs text-voy-muted uppercase tracking-wider mb-1">Total Loss</div>
                    <div className="text-2xl font-serif font-bold">-22% Body Weight</div>
                </motion.div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
