
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ArrowRight } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        {/* Dark Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-voy-dark/70 backdrop-blur-md"
        />

        {/* Modal Content - Glass Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/20"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors"
          >
            <X size={20} className="text-voy-dark" />
          </button>

          <div className="flex flex-col md:flex-row h-full">
            {/* Visual Side */}
            <div className="w-full md:w-2/5 h-64 md:h-auto relative">
               <img 
                 src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop" 
                 alt="Home Service"
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-voy-dark/20 mix-blend-multiply"></div>
               
               {/* Badge */}
               <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-voy-dark shadow-sm">
                  New
               </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-voy-peach mb-3">
                 <MapPin size={18} fill="currentColor" />
                 <span className="font-medium text-sm tracking-wide uppercase">Local Service Available</span>
              </div>
              
              <h3 className="text-3xl font-serif text-voy-dark mb-4">
                We now offer Home Service.
              </h3>
              
              <p className="text-voy-text/70 mb-8 leading-relaxed">
                For patients living in <strong className="text-voy-dark">Canvey Island</strong> and surrounding areas, our clinicians can now visit you for your initial consultation and setup.
              </p>

              <div className="space-y-3">
                <button onClick={onClose} className="w-full py-3.5 bg-voy-dark text-white rounded-full font-medium hover:bg-voy-forest transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                  Check Availability <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </button>
                <button onClick={onClose} className="w-full py-3 text-sm text-voy-text/50 hover:text-voy-dark transition-colors">
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
