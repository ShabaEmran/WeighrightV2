
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-voy-dark text-white pt-10 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="inline-block text-4xl font-serif mb-6 text-white">
              Weighright
            </a>
            <p className="text-white/60 max-w-md leading-relaxed">
              Weighright is a trading name of Aura Health Ltd. Our clinicians are registered with the General Pharmaceutical Council (GPhC) and regulated by the Care Quality Commission (CQC).
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-voy-peach">Treatments</h4>
            <ul className="space-y-4 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Mounjaro®</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wegovy®</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-voy-peach">Support</h4>
            <ul className="space-y-4 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Help Centre</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">
            © 2024 Weighright. All rights reserved.
          </p>
          <div className="flex gap-8">
             <div className="flex flex-col text-right">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Regulated by</span>
                <span className="text-sm font-medium">Care Quality Commission</span>
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Registered Pharmacy</span>
                <span className="text-sm font-medium">GPhC 9011832</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
