
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTABanner: React.FC = () => {
  return (
    <section className="relative py-32 lg:py-40 bg-white overflow-hidden">
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-voy-peach/20 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-green-100/40 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-voy-dark leading-[0.95] tracking-tight mb-12">
          Your first step towards <br className="hidden md:block" />
          weight loss starts here
        </h2>

        <div className="flex justify-center">
           <button className="group bg-white text-voy-dark border border-stone-200 px-10 py-5 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 flex items-center gap-3">
              Start assessment
              <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
           </button>
        </div>
      </div>
    </section>
  );
};
