
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Partners } from './components/Partners';
import { TreatmentCards } from './components/TreatmentCards';
import { WeightCalculator } from './components/WeightCalculator';
import { ImpactSection } from './components/ImpactSection';
import { Testimonials } from './components/Testimonials';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { CTABanner } from './components/CTABanner';
import { LocationModal } from './components/LocationModal';
import { EligibilityWizard } from './components/EligibilityWizard';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PatientProfile } from './types';

type View = 'landing' | 'login' | 'dashboard' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [hasOpenedModal, setHasOpenedModal] = useState(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  // --- SHARED STATE (Single Source of Truth) ---
  // This allows the Admin panel to modify the Patient's data in real-time.
  const [patientData, setPatientData] = useState<PatientProfile>({
    id: '882910',
    name: 'John Doe',
    email: 'john.doe@example.com',
    stage: 'new', // Default start stage
    plan: { med: 'Mounjaro', dose: '2.5mg' },
    weightHistory: {
      current: 92.5,
      start: 95.0,
      lastLogged: '2023-11-28'
    },
    photos: { front: false, side: false },
    paymentStatus: 'due',
    nextDispatchDate: '2023-12-06',
    alerts: {
      weightDue: true,
      paymentOverdue: false
    }
  });

  const handleUpdateProfile = (updates: Partial<PatientProfile>) => {
    setPatientData(prev => ({ ...prev, ...updates }));
  };

  // Trigger location modal on scroll - Only on landing page
  useEffect(() => {
    const handleScroll = () => {
      if (currentView === 'landing' && !hasOpenedModal && window.scrollY > 400) {
        setIsLocationModalOpen(true);
        setHasOpenedModal(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasOpenedModal, currentView]);

  if (currentView === 'login') {
    return (
      <Login 
        onBack={() => setCurrentView('landing')} 
        onLoginSuccess={() => setCurrentView('dashboard')}
        onAdminLogin={() => setCurrentView('admin')}
      />
    );
  }

  if (currentView === 'admin') {
    return (
      <AdminDashboard 
        patient={patientData}
        onUpdatePatient={handleUpdateProfile}
        onLogout={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <Dashboard 
        profile={patientData}
        onUpdateProfile={handleUpdateProfile}
        onLogout={() => setCurrentView('landing')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-voy-cream font-sans antialiased selection:bg-voy-peach selection:text-voy-dark">
      <Navbar onNavigate={(page) => setCurrentView(page)} />
      <main>
        <Hero onCheckEligibility={() => setIsEligibilityOpen(true)} />
        <Partners />
        <TreatmentCards />
        <WeightCalculator />
        <ImpactSection />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />

      {/* Modals */}
      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
      />
      <EligibilityWizard 
        isOpen={isEligibilityOpen} 
        onClose={() => setIsEligibilityOpen(false)} 
      />
    </div>
  );
};

export default App;
