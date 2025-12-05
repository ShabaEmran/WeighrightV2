
import React from 'react';

export const Partners: React.FC = () => {
  return (
    <section className="bg-voy-cream border-b border-stone-200/60 py-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <p className="text-center text-xs font-bold text-voy-dark/40 uppercase tracking-[0.2em] mb-12">
          In partnership with leading educational and research institutions
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70 grayscale mix-blend-multiply">
          
          {/* Ulster */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/2/23/Ulster_University_logo.svg" 
            alt="Ulster University" 
            className="h-10 md:h-12 w-auto object-contain"
          />

          {/* Imperial */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Imperial_College_London_new_logo.png" 
            alt="Imperial College London" 
            className="h-8 md:h-10 w-auto object-contain"
          />

          {/* Oxford */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg" 
            alt="University of Oxford" 
            className="h-12 md:h-14 w-auto object-contain"
          />

          {/* Bristol */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/University_of_Bristol_logo.svg" 
            alt="University of Bristol" 
            className="h-10 md:h-12 w-auto object-contain"
          />

          {/* UFMG - Using official crest */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/07/Brasao_UFMG.png" 
            alt="UFMG" 
            className="h-12 md:h-14 w-auto object-contain"
          />

        </div>
      </div>
    </section>
  );
};
