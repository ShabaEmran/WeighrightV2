import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const stories = [
  {
    loss: "22kg",
    quote: "Weighright gave me the full package – a plan that actually fits real life. With their support and gradual medication, I lost 22kg in under a year.",
    name: "Amy",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop",
    color: "bg-[#eaddcf]" // Beige/Peach tone
  },
  {
    loss: "18kg",
    quote: "I tried everything before this. The biology-first approach made me realize it wasn't just about willpower. It's been life-changing.",
    name: "Marcus",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
    color: "bg-[#dceae5]" // Light green tone
  },
  {
    loss: "30kg",
    quote: "Finally, a doctor who listened. The transition to Mounjaro was seamless and the coaching app keeps me on track every day.",
    name: "Sarah",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    color: "bg-[#eaddcf]"
  }
];

export const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="stories" className="py-24 bg-voy-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-sm font-bold tracking-widest uppercase text-voy-text/50 mb-4 block">Testimonials</span>
            <h2 className="text-5xl md:text-6xl font-serif text-voy-dark">Their words, not ours</h2>
          </div>
          
          <div className="flex gap-4 mt-8 md:mt-0">
            <button onClick={() => scroll('left')} className="p-4 rounded-full border border-voy-dark/20 hover:bg-voy-dark hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="p-4 rounded-full border border-voy-dark/20 hover:bg-voy-dark hover:text-white transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory"
        >
          {stories.map((story, i) => (
            <div 
              key={i} 
              className="min-w-[90vw] md:min-w-[80vw] lg:min-w-[1000px] snap-center"
            >
              <div className="grid lg:grid-cols-2 h-auto lg:h-[600px] rounded-[3rem] overflow-hidden">
                {/* Text Side */}
                <div className={`${story.color} p-12 lg:p-20 flex flex-col justify-between`}>
                  <div>
                    <div className="text-7xl lg:text-9xl font-serif text-voy-dark mb-4">{story.loss}</div>
                    <div className="text-lg text-voy-text/60 font-medium">Weight lost</div>
                  </div>
                  
                  <div className="mt-12">
                    <p className="text-2xl lg:text-3xl font-serif leading-tight text-voy-dark mb-8">
                      “{story.quote}”
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-voy-dark text-white flex items-center justify-center font-serif italic">
                            {story.name.charAt(0)}
                        </div>
                        <span className="font-medium text-voy-dark">{story.name}</span>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="h-[400px] lg:h-full relative">
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-voy-dark/10"></div>
                </div>
              </div>
            </div>
          ))}
          
          {/* End spacer */}
          <div className="min-w-[5vw]"></div>
        </div>
      </div>
    </section>
  );
};