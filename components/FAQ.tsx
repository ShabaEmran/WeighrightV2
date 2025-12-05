
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Am I eligible for weight loss medication?",
      answer: "Eligibility is determined by our clinicians based on your BMI (typically 30+, or 27+ with weight-related conditions) and medical history. Complete our free 3-minute consultation to find out immediately."
    },
    {
      question: "How do I switch my prescription to Aura?",
      answer: "Select 'Switching to Us' during checkout. You'll need to upload a photo of your current prescription or medication box label. We verify this quickly to ensure you continue on your correct dosage."
    },
    {
      question: "What is the difference between Mounjaro and Wegovy?",
      answer: "Both are weekly injections. Wegovy (Semaglutide) mimics one hormone (GLP-1), while Mounjaro (Tirzepatide) mimics two (GLP-1 and GIP), which clinical trials suggest may lead to greater weight loss for some patients."
    },
    {
      question: "Is the packaging discreet?",
      answer: "Yes. All deliveries arrive in plain, unbranded packaging. Inside, we use temperature-controlled wool insulation to keep your medication at the correct temperature."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-aura-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-aura-dark mb-12 text-center">Common Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/50 shadow-sm transition-all hover:bg-white/80">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-serif text-lg text-aura-dark">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-5 h-5 text-aura-muted" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-aura-text leading-relaxed border-t border-stone-100/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
