
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, ChevronRight, AlertTriangle, Info, User, Lock, Mail, Clock } from 'lucide-react';

interface EligibilityWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper types for the form state
type FormState = {
  // Account
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  
  // Vitals
  gender: string;
  height: string;
  weight: string;
  ethnicity: string;
  
  // History & Logic
  glp1Usage: string;
  glp1Dose?: string;
  glp1StopDate?: string;
  otherWeightMeds: string;
  preferredMed: string;
  
  // Medical
  diabetes: string;
  diabetesRemissionTime?: string;
  giConditions: string[];
  cvEvents: string;
  thyroid: string;
  gallbladder: string;
  generalConditions: string[];
  
  // Mental Health
  mentalHealthConditions: string[];
  mhStatus?: string;
  mhCrisis?: string;
  mhMedsChange?: string;
  mhLastProfessional?: string;
  
  // Bariatric
  bariatricSurgery: string;
  bariatricType?: string;
  bariatricSupplements?: string;
  
  // Interactions & Safety
  medicationInteractions: string[];
  otherHistory: string;
  currentMeds: string;
  alcohol: string;
  allergies: string;
  
  // Female Only
  pregnancy?: string;
  breastfeeding?: string;
  contraception?: string;
  recentChildbirth?: string;
  
  // Logistics
  gpInfo: string;
};

const INITIAL_STATE: FormState = {
  firstName: '', lastName: '', email: '', password: '',
  gender: '', height: '', weight: '', ethnicity: '',
  glp1Usage: '', otherWeightMeds: '', preferredMed: '',
  diabetes: '', giConditions: [], cvEvents: '', thyroid: '', gallbladder: '', generalConditions: [],
  mentalHealthConditions: [], bariatricSurgery: '', medicationInteractions: [],
  otherHistory: '', currentMeds: '', alcohol: '', allergies: '', gpInfo: ''
};

export const EligibilityWizard: React.FC<EligibilityWizardProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  if (!isOpen) return null;

  // --- LOGIC HELPERS ---
  const calculateBMI = () => {
    const h = parseFloat(formData.height) / 100;
    const w = parseFloat(formData.weight);
    if (!h || !w) return 0;
    return (w / (h * h)).toFixed(1);
  };

  const checkEligibility = () => {
    const bmi = parseFloat(calculateBMI() as string);
    const isWhite = formData.ethnicity === 'White';
    // Logic: White >= 30, Others >= 27.5 (Simplified logic for wizard)
    const minBMI = isWhite ? 30 : 27.5;
    
    if (bmi < minBMI) {
      setIsEligible(false);
    } else {
      setIsEligible(true);
    }
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const update = (field: keyof FormState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- RENDERERS ---
  const renderSingleSelect = (field: keyof FormState, options: string[], nextOnSelect = true) => (
    <div className="space-y-3">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => {
            update(field, opt);
            if (nextOnSelect) setTimeout(handleNext, 200);
          }}
          className={`w-full p-4 rounded-xl border text-left transition-all flex justify-between items-center ${
            formData[field] === opt 
            ? 'border-voy-dark bg-voy-dark/5 text-voy-dark font-medium' 
            : 'border-stone-200 text-stone-600 hover:border-stone-300'
          }`}
        >
          {opt}
          {formData[field] === opt && <Check size={18} />}
        </button>
      ))}
    </div>
  );

  const renderMultiSelect = (field: keyof FormState, options: string[]) => {
    const current = (formData[field] as string[]) || [];
    return (
      <div className="space-y-3">
        {options.map(opt => {
          const isSelected = current.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => {
                let newVal;
                if (opt === 'None' || opt === 'None of the above') {
                    newVal = ['None'];
                } else {
                    const withoutNone = current.filter(c => c !== 'None' && c !== 'None of the above');
                    newVal = isSelected ? withoutNone.filter(c => c !== opt) : [...withoutNone, opt];
                }
                update(field, newVal);
              }}
              className={`w-full p-4 rounded-xl border text-left transition-all flex justify-between items-center ${
                isSelected
                ? 'border-voy-dark bg-voy-dark/5 text-voy-dark font-medium' 
                : 'border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              {opt}
              {isSelected && <Check size={18} />}
            </button>
          );
        })}
        <button 
            onClick={handleNext} 
            disabled={current.length === 0}
            className="w-full mt-6 py-4 bg-voy-dark text-white rounded-xl font-medium disabled:opacity-50"
        >
            Continue
        </button>
      </div>
    );
  };

  // --- STEPS CONFIGURATION ---
  const steps = [
    // 0. Intro
    {
      title: "Welcome to Weighright",
      subtitle: "Let's ensure this treatment is safe for you.",
      render: () => (
        <div className="text-center">
            <div className="bg-voy-cream p-6 rounded-2xl mb-8 text-left border border-stone-100">
                <h4 className="font-serif text-lg mb-2 text-voy-dark">Important</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                    This medication is one part of a complete weight-management plan. Building muscle, increasing physical activity, and maintaining healthy eating habits are essential for long-term success.
                </p>
            </div>
            <button onClick={handleNext} className="w-full py-4 bg-voy-dark text-white rounded-xl font-medium hover:bg-voy-forest">
                I understand
            </button>
        </div>
      )
    },
    // 1. Gender (Moved up as requested to be early)
    {
        title: "Biological Sex",
        subtitle: "This helps us tailor your plan.",
        render: () => renderSingleSelect('gender', ['Female', 'Male'])
    },
    // 2. Measurements
    {
      title: "Your Measurements",
      subtitle: "We use this to calculate BMI eligibility.",
      render: () => (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-voy-dark mb-2">Height (cm)</label>
            <input type="number" value={formData.height} onChange={(e) => update('height', e.target.value)} className="w-full p-4 rounded-xl border border-stone-200 outline-none text-lg" placeholder="170" />
          </div>
          <div>
            <label className="block text-sm font-medium text-voy-dark mb-2">Weight (kg)</label>
            <input type="number" value={formData.weight} onChange={(e) => update('weight', e.target.value)} className="w-full p-4 rounded-xl border border-stone-200 outline-none text-lg" placeholder="85" />
          </div>
          {formData.height && formData.weight && (
             <div className="p-4 bg-stone-50 rounded-xl text-center">
                <span className="text-sm text-stone-500">Calculated BMI</span>
                <div className="text-2xl font-serif text-voy-dark">{calculateBMI()}</div>
             </div>
          )}
          <button onClick={handleNext} disabled={!formData.height || !formData.weight} className="w-full py-4 bg-voy-dark text-white rounded-xl font-medium disabled:opacity-50">Continue</button>
        </div>
      )
    },
    // 3. Ethnicity & Check
    {
        title: "Ethnic Background",
        subtitle: "This helps us apply the correct BMI thresholds.",
        render: () => (
            <div className="space-y-3">
                {['White', 'Black / Black British', 'Asian / Asian British', 'Mixed', 'Arab', 'Other'].map(opt => (
                    <button key={opt} onClick={() => { update('ethnicity', opt); checkEligibility(); handleNext(); }} className="w-full p-4 rounded-xl border border-stone-200 text-left hover:border-voy-dark hover:text-voy-dark transition-colors">{opt}</button>
                ))}
            </div>
        )
    },
    // 4. Safety Gates
    {
        title: "Safety Awareness",
        subtitle: "Please confirm you understand the following.",
        render: () => (
            <div className="space-y-6">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="flex items-center gap-2 text-red-700 font-bold mb-2"><AlertTriangle size={18}/> Side Effects</div>
                    <p className="text-sm text-red-600/80">Weight-loss injections can cause nausea, vomiting, diarrhoea, and constipation.</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 text-amber-700 font-bold mb-2"><Info size={18}/> Hypoglycaemia</div>
                    <p className="text-sm text-amber-600/80">Low blood sugar is rare but possible. Symptoms include sweating, shaking, or confusion.</p>
                </div>
                <button onClick={handleNext} className="w-full py-4 bg-voy-dark text-white rounded-xl font-medium">I understand</button>
            </div>
        )
    },
    // 5. GLP-1 History
    {
        title: "Treatment History",
        subtitle: "Are you currently using any weight-loss injection?",
        render: () => (
            <div className="space-y-3">
                <button onClick={() => { update('glp1Usage', 'No - Never'); handleNext(); }} className="w-full p-4 border rounded-xl text-left hover:border-voy-dark">No — I have never used GLP-1 injections</button>
                <button onClick={() => { update('glp1Usage', 'No - Stopped'); handleNext(); }} className="w-full p-4 border rounded-xl text-left hover:border-voy-dark">No — I used them before but stopped</button>
                <button onClick={() => { update('glp1Usage', 'Yes - Mounjaro'); handleNext(); }} className="w-full p-4 border rounded-xl text-left hover:border-voy-dark">Yes — I’m currently using Mounjaro</button>
                <button onClick={() => { update('glp1Usage', 'Yes - Wegovy'); handleNext(); }} className="w-full p-4 border rounded-xl text-left hover:border-voy-dark">Yes — I’m currently using Wegovy / Ozempic</button>
            </div>
        )
    },
    // 6. Branching Logic for GLP-1
    ...(formData.glp1Usage.includes('Yes') ? [{
        title: "Current Dosage",
        subtitle: "What is your current maintenance dose?",
        render: () => renderSingleSelect('glp1Dose', ['Lowest / Starting Dose', 'Maintenance Dose', 'High Dose'])
    }] : []),
    ...(formData.glp1Usage.includes('Stopped') ? [{
        title: "Previous Usage",
        subtitle: "When did you last use a weight-loss injection?",
        render: () => (
            <div className="space-y-4">
                <input type="date" className="w-full p-4 border rounded-xl" onChange={(e) => update('glp1StopDate', e.target.value)} />
                <button onClick={handleNext} className="w-full py-4 bg-voy-dark text-white rounded-xl">Continue</button>
            </div>
        )
    }] : []),
    // 6b. Preferred Treatment
    {
        title: "Preferred Treatment",
        subtitle: "Which medication would you prefer if eligible?",
        render: () => renderSingleSelect('preferredMed', ['Mounjaro', 'Wegovy', 'No Preference'])
    },
    // 7. Other Weight Meds
    {
        title: "Other Medications",
        subtitle: "Are you taking any other weight-loss drugs?",
        render: () => renderSingleSelect('otherWeightMeds', ['Orlistat', 'Mysimba', 'Diet Pills', 'None'])
    },
    // 8. Diabetes
    {
        title: "Diabetes History",
        subtitle: "Have you been diagnosed with diabetes?",
        render: () => renderSingleSelect('diabetes', ['No', 'Type 1', 'Type 2', 'Pre-diabetes', 'Gestational (Pregnancy)', 'Diabetes in Remission'])
    },
    ...(formData.diabetes === 'Diabetes in Remission' ? [{
        title: "Remission Status",
        subtitle: "Has your diabetes been in remission for at least 6 months?",
        render: () => renderSingleSelect('diabetesRemissionTime', ['Yes', 'No'])
    }] : []),
    // 9. GI Conditions
    {
        title: "Stomach & Bowel",
        subtitle: "Do you have any of these conditions?",
        render: () => renderMultiSelect('giConditions', ['Crohns / Colitis', 'Gastroparesis', 'Severe IBS', 'Diverticular Disease', 'Significant Digestive Issues', 'None'])
    },
    ...(formData.giConditions.length > 0 && !formData.giConditions.includes('None') ? [{
        title: "GI Warning",
        subtitle: "Please confirm understanding.",
        render: () => (
            <div className="text-center">
                <p className="mb-6 text-stone-600">Some side effects of treatment overlap with symptoms of gastrointestinal conditions. Monitor carefully and discontinue treatment if symptoms worsen.</p>
                <button onClick={handleNext} className="w-full py-4 bg-voy-dark text-white rounded-xl">I understand</button>
            </div>
        )
    }] : []),
    // 10. CV History
    {
        title: "Heart Health",
        subtitle: "In the last 3 months, have you had:",
        render: () => renderSingleSelect('cvEvents', ['Heart Attack', 'Stroke', 'Unstable Angina', 'None'])
    },
    // 11. Thyroid
    {
        title: "Thyroid Health",
        subtitle: "Do you have a history of:",
        render: () => renderSingleSelect('thyroid', ['Thyroid Cancer', 'Family History of MEN2', 'Thyroid Lump', 'None'])
    },
    // 12. Gallbladder
    {
        title: "Gallbladder",
        subtitle: "Do you have a history of gallstones or removal?",
        render: () => renderSingleSelect('gallbladder', ['Gallstones', 'Gallbladder Removed', 'Other Bile Condition', 'None'])
    },
    // 13. Other Conditions
    {
        title: "Other Conditions",
        subtitle: "Do you have any of the following?",
        render: () => renderMultiSelect('generalConditions', ['Cancer', 'Cardiomyopathy', 'Heart Failure', 'Serious Kidney Disease', 'Serious Liver Disease', 'Pancreatitis', 'None'])
    },
    // 14. Mental Health
    {
        title: "Mental Health",
        subtitle: "Please select any that apply to you.",
        render: () => renderMultiSelect('mentalHealthConditions', ['Depression / Anxiety', 'Eating Disorder', 'Bipolar', 'Psychosis', 'None'])
    },
    // Branching for Mental Health
    ...(formData.mentalHealthConditions.length > 0 && !formData.mentalHealthConditions.includes('None') ? [
        {
            title: "Mental Health Status",
            subtitle: "How do you feel currently?",
            render: () => renderSingleSelect('mhStatus', ['Stable', 'Unstable / Concerned'])
        },
        {
            title: "Hospital Admission",
            subtitle: "Have you been admitted for mental health in the last 2 years?",
            render: () => renderSingleSelect('mhCrisis', ['Yes', 'No'])
        }
    ] : []),
    // 15. Bariatric
    {
        title: "Weight Loss Surgery",
        subtitle: "Have you ever had bariatric surgery?",
        render: () => renderSingleSelect('bariatricSurgery', ['No', 'Yes - Within last 12 months', 'Yes - Over 12 months ago'])
    },
    // 16. Medication Interactions
    {
        title: "Medication Check",
        subtitle: "Do you take any of these? (Insulin, Blood Thinners, Lithium, Steroids)",
        render: () => renderMultiSelect('medicationInteractions', ['Insulin', 'Warfarin', 'Lithium', 'Oral Steroids', 'None'])
    },
    // 17. Pregnancy (Female Only)
    ...(formData.gender === 'Female' ? [{
        title: "Pregnancy & Safety",
        subtitle: "For your safety, please confirm:",
        render: () => renderSingleSelect('pregnancy', ['Pregnant', 'Breastfeeding', 'Trying to conceive', 'None apply'])
    }] : []),
    // 18. GP Info
    {
        title: "GP Registration",
        subtitle: "We need this for safe prescribing.",
        render: () => (
            <div className="space-y-4">
                <textarea 
                    className="w-full p-4 rounded-xl border border-stone-200 h-32" 
                    placeholder="GP Name & Address..."
                    value={formData.gpInfo}
                    onChange={(e) => update('gpInfo', e.target.value)}
                />
                <div className="p-4 bg-stone-50 rounded-xl text-xs text-stone-500">
                    Your GP will be notified of any medication supplied to ensure continuity of care.
                </div>
                <button onClick={handleNext} disabled={!formData.gpInfo} className="w-full py-4 bg-voy-dark text-white rounded-xl font-medium disabled:opacity-50">Continue</button>
            </div>
        )
    },
    // 19. Processing Gate
    {
        title: "Processing Time",
        subtitle: "Almost done.",
        render: () => (
            <div className="text-center">
                <div className="p-6 bg-stone-50 rounded-2xl mb-8 border border-stone-200">
                    <Clock size={40} className="mx-auto text-voy-dark mb-4" />
                    <p className="font-medium text-voy-dark mb-2">24-72 Hour Review</p>
                    <p className="text-stone-500 text-sm">
                        Orders are processed within 24 hours, but clinical safety checks may take up to 72 hours during busy periods.
                    </p>
                </div>
                <button onClick={handleNext} className="w-full py-4 bg-voy-dark text-white rounded-xl font-medium">I understand</button>
            </div>
        )
    },
    // 20. CREATE ACCOUNT (Final Step)
    {
        title: "Create Your Account",
        subtitle: "Save your progress and view your eligibility results.",
        render: () => (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-400 mb-1">First Name</label>
                        <input type="text" className="w-full p-3 border rounded-xl" placeholder="Jane" value={formData.firstName} onChange={e => update('firstName', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-400 mb-1">Last Name</label>
                        <input type="text" className="w-full p-3 border rounded-xl" placeholder="Doe" value={formData.lastName} onChange={e => update('lastName', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-stone-400 mb-1">Email Address</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-3.5 text-stone-400" />
                        <input type="email" className="w-full pl-10 p-3 border rounded-xl" placeholder="jane@example.com" value={formData.email} onChange={e => update('email', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-stone-400 mb-1">Password</label>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-3.5 text-stone-400" />
                        <input type="password" className="w-full pl-10 p-3 border rounded-xl" placeholder="••••••••" value={formData.password} onChange={e => update('password', e.target.value)} />
                    </div>
                </div>
                
                <div className="pt-4">
                    <button 
                        onClick={() => {
                            // In real app, submit to backend here
                            onClose();
                            // Ideally navigate to dashboard or success page
                        }}
                        disabled={!formData.email || !formData.password || !formData.firstName}
                        className="w-full py-4 bg-voy-peach text-voy-dark font-bold rounded-xl hover:bg-white border border-transparent hover:border-voy-dark transition-all disabled:opacity-50"
                    >
                        Create Account & View Results
                    </button>
                    <p className="text-center text-xs text-stone-400 mt-4">
                        By creating an account, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        )
    }
  ];

  // Logic to handle "Not Eligible" state if isEligible is explicitly false
  if (isEligible === false && step > 3) {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-voy-dark/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                    <X size={32} />
                </div>
                <h3 className="text-2xl font-serif text-voy-dark mb-4">Not Eligible</h3>
                <p className="text-stone-600 mb-8">
                    Based on the information provided, we cannot prescribe this medication safely at this time. Your BMI does not meet the safety threshold for online prescription.
                </p>
                <button onClick={onClose} className="w-full py-3 bg-stone-100 text-stone-600 rounded-xl font-medium">Close</button>
            </div>
        </div>
      );
  }

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-voy-dark/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-stone-100 flex justify-between items-center bg-white z-10">
            <div>
                <div className="text-xs font-bold uppercase tracking-widest text-voy-peach mb-1">Assessment</div>
                <div className="text-stone-400 text-sm">Step {step + 1} of {steps.length}</div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <X size={24} className="text-voy-dark" />
            </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-stone-100 w-full">
            <motion.div 
                className="h-full bg-voy-peach"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
            />
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-serif text-voy-dark mb-3">{currentStep.title}</h2>
                <p className="text-stone-500 text-lg mb-8">{currentStep.subtitle}</p>
                {currentStep.render()}
              </motion.div>
            </AnimatePresence>
        </div>

        {/* Footer Navigation (if needed, mostly handled inside render) */}
        {step > 0 && step < steps.length - 1 && (
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-start">
                <button onClick={() => setStep(prev => prev - 1)} className="px-4 py-2 text-stone-400 hover:text-voy-dark text-sm font-medium">
                    Back
                </button>
            </div>
        )}

      </motion.div>
    </div>
  );
};
