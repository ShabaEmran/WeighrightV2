import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCheckEligibility: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckEligibility }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Vital for mobile autoplay
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      
      const attemptPlay = async () => {
        try {
          await video.play();
        } catch (error) {
          console.warn("Video autoplay failed:", error);
        }
      };
      attemptPlay();
    }
  }, []);

  return (
    <section className="bg-voy-cream w-full min-h-screen p-4 md:p-6 flex flex-col box-border">
      {/* Floating Frame Container with Rounded Corners */}
      <div className="relative flex-1 w-full rounded-[2.5rem] overflow-hidden bg-voy-dark shadow-2xl ring-1 ring-black/5 min-h-[600px] flex items-center justify-center">
        
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            key="hero-video-final"
            ref={videoRef}
            className="w-full h-full object-cover scale-105"
            autoPlay 
            loop 
            muted 
            playsInline
            poster="https://images.pexels.com/photos/6550608/pexels-photo-6550608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          >
            <source src="https://videos.pexels.com/video-files/6550608/6550608-hd_1920_1080_24fps.mp4" type="video/mp4" />
          </video>
          
          {/* Overlays for text readability */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-[1.05] tracking-tight drop-shadow-lg">
              Today can be <br />
              <span className="italic font-light text-voy-peach/90">life-changing</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/95 mb-12 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            Science-backed weight loss plans, prescribed by UK clinicians and delivered to your door.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <button
              onClick={onCheckEligibility}
              className="group min-w-[200px] px-8 py-4 rounded-full bg-white text-voy-dark hover:bg-voy-peach transition-all duration-500 text-lg font-medium shadow-xl flex items-center gap-2 hover:scale-105"
            >
              Check Eligibility
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#pricing"
              className="min-w-[200px] px-8 py-4 rounded-full border border-white/60 text-white hover:bg-white/10 hover:border-white transition-all duration-300 text-lg font-medium backdrop-blur-sm"
            >
              Explore Plans
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};