
import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Video, Truck, LineChart } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Complete Consultation",
      desc: "Answer a secure, 3-minute medical questionnaire about your health history and weight loss goals."
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Clinical Review",
      desc: "Our UK-registered clinicians review your eligibility and prescribe the most suitable medication for you."
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Discreet Delivery",
      desc: "Your medication arrives in plain, temperature-controlled packaging, usually within 24 hours of approval."
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Ongoing Support",
      desc: "Access your dashboard to track progress, request refills, and chat with our medical support team."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-aura-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:justify-between lg:items-end mb-16">
          <div className="max-w-xl">
             <h2 className="text-4xl font-serif text-aura-dark mb-4">Your journey, simplified.</h2>
             <p className="text-aura-muted">We've removed the friction from medical weight loss. No waiting rooms, no judgement, just effective care.</p>
          </div>
          <div className="hidden lg:block">
            {/* Decorative line */}
             <div className="h-px w-64 bg-stone-300"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-aura-dark text-white flex items-center justify-center mb-6 group-hover:bg-aura-gold transition-colors duration-300">
                {step.icon}
              </div>
              <div className="absolute top-6 right-6 text-6xl font-serif text-stone-200/50 -z-10 group-hover:text-stone-300/50 transition-colors">
                0{i + 1}
              </div>
              <h3 className="text-xl font-serif text-aura-dark mb-3">{step.title}</h3>
              <p className="text-sm text-aura-muted leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
