
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, MessageSquare, User, LogOut, CheckCircle2, AlertCircle, 
  ChevronRight, ChevronLeft, CreditCard, Pill, Activity, Calendar, Plus, 
  Scale, AlertTriangle, Download, BookOpen, PlayCircle, Settings, Bell, 
  Lock, Search, ArrowRight, Camera, Send, Clock, Check, RefreshCw, XCircle,
  FileText, Video, HelpCircle, Truck
} from 'lucide-react';
import { PatientProfile, Message } from '../types';

interface DashboardProps {
  profile: PatientProfile;
  onUpdateProfile: (updates: Partial<PatientProfile>) => void;
  onLogout: () => void;
}

type Tab = 'overview' | 'inbox' | 'payments' | 'resources' | 'account';

const PRICING = {
  Mounjaro: { '2.5mg': 219, '5mg': 219, '7.5mg': 229, '10mg': 249, '12.5mg': 269, '15mg': 269 },
  Wegovy: { '0.25mg': 199, '0.5mg': 199, '1.0mg': 199, '1.7mg': 249, '2.4mg': 299 }
};

export const Dashboard: React.FC<DashboardProps> = ({ profile, onUpdateProfile, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [weightInput, setWeightInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const price = (PRICING[profile.plan.med] as any)[profile.plan.dose];

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === 'inbox') {
        scrollToBottom();
    }
  }, [profile.messages, activeTab]);

  const handlePhotoUpload = (type: 'front' | 'side') => {
    onUpdateProfile({ 
        photos: { ...profile.photos, [type]: true } 
    });
  };

  const handleSubmitApplication = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        onUpdateProfile({ stage: 'review' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleWeightLog = () => {
    if(weightInput) {
        onUpdateProfile({
            weightHistory: { ...profile.weightHistory, current: Number(weightInput) },
            alerts: { ...profile.alerts, weightDue: false }
        });
        setWeightInput('');
    }
  };

  const handleSendMessage = () => {
    if(!messageInput.trim()) return;
    const newMsg: Message = {
        id: Date.now().toString(),
        sender: 'patient',
        content: messageInput,
        timestamp: new Date().toISOString(),
        read: true
    };
    onUpdateProfile({ messages: [...(profile.messages || []), newMsg] });
    setMessageInput('');
  };

  // --- JOURNEY STEPPER COMPONENT ---
  const JourneyStepper = () => {
    const steps = [
        { id: 'new', label: 'Profile' },
        { id: 'review', label: 'Clinical Review' },
        { id: 'payment', label: 'Payment' },
        { id: 'active', label: 'Dispatch' }
    ];
    
    // Calculate progress index
    let currentIdx = 0;
    if (profile.stage === 'review') currentIdx = 1;
    if (profile.stage === 'payment') currentIdx = 2;
    if (profile.stage === 'active') currentIdx = 3;
    if (profile.stage === 'discharged') currentIdx = 1;

    return (
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-stone-100 shadow-sm mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center relative px-2 md:px-6">
                {/* Connecting Line */}
                <div className="absolute top-5 left-6 right-6 h-1 bg-stone-100 -z-10"></div>
                <div 
                    className="absolute top-5 left-6 h-1 bg-voy-dark transition-all duration-1000 ease-out -z-10"
                    style={{ width: `calc(${Math.min((currentIdx / (steps.length - 1)) * 100, 100)}% - 3rem)` }}
                ></div>

                {steps.map((step, idx) => {
                    const isCompleted = idx < currentIdx;
                    const isCurrent = idx === currentIdx;
                    
                    return (
                        <div key={step.id} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 ${
                                isCompleted ? 'bg-voy-dark border-voy-dark text-white scale-100' :
                                isCurrent ? 'bg-voy-peach border-voy-dark text-voy-dark scale-110 shadow-lg' :
                                'bg-white border-stone-200 text-stone-300'
                            }`}>
                                {isCompleted ? <Check size={16} strokeWidth={3} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                            </div>
                            <span className={`mt-3 text-[10px] md:text-xs font-bold uppercase tracking-wider text-center ${isCurrent ? 'text-voy-dark' : 'text-stone-400'}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
            {profile.stage === 'discharged' && (
                <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm font-medium border border-red-100 flex items-center justify-center gap-2">
                    <AlertCircle size={16} /> Application Discharged. Please check your inbox or contact support.
                </div>
            )}
        </div>
    );
  };

  // Sidebar Item
  const NavItem = ({ id, icon: Icon, label, alert = false }: { id: Tab, icon: any, label: string, alert?: boolean }) => (
    <button 
      onClick={() => { setActiveTab(id); }}
      className={`w-full flex items-center relative transition-all duration-300 group
        ${isSidebarOpen ? 'gap-4 px-4 py-3.5' : 'justify-center px-2 py-4'}
        ${activeTab === id 
          ? 'bg-voy-dark text-white shadow-lg shadow-voy-dark/20' 
          : 'text-stone-400 hover:bg-stone-100 hover:text-voy-dark'
        } rounded-2xl`}
      title={!isSidebarOpen ? label : undefined}
    >
      <Icon 
        size={24} 
        strokeWidth={activeTab === id ? 2 : 1.5} 
        className={`${activeTab === id ? 'text-voy-peach' : 'group-hover:text-voy-dark transition-colors'} flex-shrink-0`} 
      />
      <div className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
         <span className="font-medium text-sm tracking-wide whitespace-nowrap">{label}</span>
      </div>
      {alert && (
        <span className={`absolute w-2.5 h-2.5 rounded-full bg-voy-peach animate-pulse border-2 border-white ${isSidebarOpen ? 'right-3 top-3' : 'top-3 right-3'}`}></span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F2F4F7] flex font-sans text-voy-dark overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-30 bg-white border-r border-stone-100 transform transition-all duration-300 ease-in-out hidden lg:flex flex-col justify-between ${isSidebarOpen ? 'w-72' : 'w-24'}`}>
        <div className="flex flex-col h-full">
            <div className={`h-24 flex items-center ${isSidebarOpen ? 'px-8 justify-between' : 'justify-center'} border-b border-stone-50`}>
                 <div className="flex items-center gap-3 overflow-hidden">
                     <div className="w-10 h-10 rounded-xl bg-voy-dark flex items-center justify-center text-voy-peach font-serif font-bold text-xl flex-shrink-0 shadow-md">W</div>
                     <span className={`text-2xl font-serif font-bold text-voy-dark transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>Weighright</span>
                 </div>
            </div>
            <nav className="flex-1 px-4 py-8 space-y-2">
                <NavItem id="overview" icon={LayoutDashboard} label="Overview" alert={profile.stage === 'new'} />
                <NavItem id="inbox" icon={MessageSquare} label="Messages" alert={profile.messages?.some(m => !m.read && m.sender !== 'patient')} />
                <NavItem id="payments" icon={CreditCard} label="Payments" />
                <NavItem id="resources" icon={BookOpen} label="Guide & Help" />
                <NavItem id="account" icon={User} label="Account" />
            </nav>
            <div className="p-4 space-y-2 border-t border-stone-50">
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className={`w-full flex items-center relative transition-all duration-300 group ${isSidebarOpen ? 'gap-4 px-4 py-3' : 'justify-center px-2 py-4'} text-stone-400 hover:bg-stone-50 rounded-2xl`}>
                    {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
                <button onClick={onLogout} className={`w-full flex items-center relative transition-all duration-300 group ${isSidebarOpen ? 'gap-4 px-4 py-3' : 'justify-center px-2 py-4'} text-stone-400 hover:bg-red-50 hover:text-red-600 rounded-2xl`}>
                    <LogOut size={20} />
                </button>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 h-screen overflow-y-auto overflow-x-hidden bg-[#F2F4F7] transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-24'} p-6 pt-8 pb-32 lg:pt-8 lg:pb-10`}>
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
            <div>
                <h1 className="text-3xl font-serif text-voy-dark mb-1">
                    {activeTab === 'overview' ? `Hi, ${profile.name.split(' ')[0]}!` : 
                     activeTab === 'inbox' ? 'Messages' : 
                     activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className="text-stone-400 text-sm">
                   {activeTab === 'overview' ? 'Your daily activity overview.' : `Manage your ${activeTab}.`}
                </p>
            </div>
            <div className="flex items-center gap-4">
                 <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-full border border-stone-200 shadow-sm cursor-pointer hover:shadow-md transition-all">
                    <div className="w-8 h-8 rounded-full bg-voy-peach text-voy-dark flex items-center justify-center font-bold text-sm">{profile.name.charAt(0)}</div>
                    <span className="text-sm font-medium text-voy-dark">{profile.name}</span>
                </div>
            </div>
        </header>

        {activeTab === 'overview' && (
            <>
                {/* --- JOURNEY STATUS (Visible for Pending Patients) --- */}
                {profile.stage !== 'active' && <JourneyStepper />}

                {profile.stage === 'active' ? (
                    /* --- ACTIVE BENTO GRID --- */
                    <div key="active-dashboard" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-10 animate-fade-in-up">
                        
                        {/* 1. Safety Hero Card (Combined Action) */}
                        <div className="col-span-1 md:col-span-2 xl:col-span-2 relative h-auto min-h-[22rem] rounded-[2.5rem] overflow-hidden group shadow-lg shadow-voy-dark/5 flex flex-col md:flex-row">
                            <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hero"/>
                            <div className="absolute inset-0 bg-voy-dark/60 backdrop-blur-[2px]"></div>
                            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 w-full">
                                <div className="flex-1 flex flex-col justify-between text-white">
                                    <div>
                                        {profile.alerts.weightDue && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-voy-peach text-voy-dark text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                                                <AlertTriangle size={12} /> Action Required
                                            </div>
                                        )}
                                        <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                                            {profile.alerts.weightDue ? 'Weight Reading Due' : 'You are on track!'}
                                        </h2>
                                        <p className="text-white/80 leading-relaxed max-w-sm">
                                            {profile.alerts.weightDue 
                                                ? `For your safety, please log your latest weight to approve your next dispatch for ${new Date(profile.nextDispatchDate).toLocaleDateString()}.`
                                                : "Your next dispatch is scheduled. Keep up the great work."
                                            }
                                        </p>
                                    </div>
                                    <div className="hidden md:block mt-6">
                                        <div className="flex items-center gap-2 text-white/60 text-sm mb-1"><Scale size={14} /> Previous Entry</div>
                                        <div className="text-2xl font-serif text-white">{profile.weightHistory.current} <span className="text-sm font-sans opacity-60">kg</span></div>
                                    </div>
                                </div>
                                <div className="w-full md:w-80 flex flex-col justify-center">
                                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] shadow-2xl">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-3 block">Enter Current Weight (kg)</label>
                                        <div className="flex gap-2">
                                            <input type="number" value={weightInput} onChange={(e) => setWeightInput(e.target.value)} placeholder="0.0" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-xl font-medium focus:ring-2 focus:ring-voy-peach/50 outline-none transition-all" />
                                            <button onClick={handleWeightLog} className="bg-white text-voy-dark px-5 rounded-xl font-bold hover:bg-voy-peach transition-colors flex items-center justify-center shadow-lg"><Plus size={24} /></button>
                                        </div>
                                        <p className="text-white/40 text-xs mt-3 text-center">Securely logged for clinical review.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Next Payment */}
                        <div className="bg-[#EAE4DD] rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm transition-transform hover:-translate-y-1">
                             <div>
                                 <div className="flex justify-between items-start mb-6"><h3 className="text-voy-dark font-medium text-lg">Next Payment</h3><div className="bg-voy-dark/10 px-3 py-1 rounded-full text-voy-dark text-xs font-bold">Upcoming</div></div>
                                 <div className="text-4xl font-serif text-voy-dark mb-1">£{price}</div>
                                 <div className="text-voy-dark/60 text-sm">Due {new Date(profile.nextDispatchDate).toLocaleDateString()}</div>
                             </div>
                             <div className="flex items-center gap-2 text-voy-dark/40 text-xs font-medium"><CreditCard size={14}/> Auto-renewal active</div>
                        </div>

                        {/* 3. Delivery Status (UPDATED) */}
                        <div className={`rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg transition-transform hover:-translate-y-1 ${
                            profile.dispatchStatus === 'dispatched' ? 'bg-green-100' :
                            (profile.paymentStatus === 'due' || profile.alerts.weightDue) ? 'bg-amber-100' : 
                            'bg-[#A7C5D4]'
                        }`}>
                            <div>
                                <div className="flex justify-between items-start mb-6"><h3 className="text-voy-dark font-medium text-lg">Delivery</h3></div>
                                <div className="flex gap-2">
                                    <Truck size={32} className="text-voy-dark opacity-80" />
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl font-serif text-voy-dark mb-1 font-bold">
                                    {profile.dispatchStatus === 'dispatched' ? 'On Way' :
                                     profile.paymentStatus === 'due' ? 'Payment Due' :
                                     profile.alerts.weightDue ? 'Action Needed' : 'Preparing'
                                    }
                                </div>
                                <div className="text-voy-dark/60 text-sm">
                                    {profile.dispatchStatus === 'dispatched' ? 'Arrives tomorrow' : 'Pending checks'}
                                </div>
                            </div>
                        </div>

                        {/* 4. Weight Progress Chart (Restored) */}
                        <div className="col-span-1 md:col-span-2 bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-serif text-voy-dark">Progress</h3>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-voy-dark">{profile.weightHistory.start - profile.weightHistory.current} kg</div>
                                    <div className="text-xs text-green-600 font-bold uppercase tracking-wider">Total Loss</div>
                                </div>
                            </div>
                            <div className="h-48 w-full relative mt-4">
                                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#f7bfaa" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#f7bfaa" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {/* Area */}
                                    <path 
                                        d="M0,10 C30,25 60,35 100,45 V60 H0 Z" 
                                        fill="url(#chartGradient)" 
                                    />
                                    {/* Line */}
                                    <path 
                                        d="M0,10 C30,25 60,35 100,45" 
                                        fill="none" 
                                        stroke="#f7bfaa" 
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    {/* Dots */}
                                    <circle cx="0" cy="10" r="3" fill="#0f2c28" />
                                    <circle cx="100" cy="45" r="3" fill="#0f2c28" />
                                </svg>
                                <div className="absolute top-0 left-2 text-xs font-bold text-stone-400 bg-white/80 px-2 rounded">Start: {profile.weightHistory.start}kg</div>
                                <div className="absolute bottom-2 right-0 text-xs font-bold text-voy-dark bg-voy-peach/20 px-2 py-1 rounded-full">Current: {profile.weightHistory.current}kg</div>
                            </div>
                        </div>

                        {/* 5. Current Dose */}
                        <div className="bg-white rounded-[2.5rem] p-8 text-center border border-stone-100 flex flex-col justify-center items-center shadow-sm">
                            <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-voy-dark mb-4">
                                <Pill size={28}/>
                            </div>
                            <div className="text-4xl font-serif text-voy-dark mb-1">{profile.plan.dose}</div>
                            <div className="text-voy-dark/60 text-sm font-medium">{profile.plan.med}</div>
                            <button className="mt-6 text-xs font-bold text-voy-peach uppercase tracking-widest hover:text-voy-dark transition-colors">Manage Plan</button>
                        </div>
                    </div>
                ) : (
                    /* --- PENDING DASHBOARD (Consultation/Review/Payment) --- */
                    <div key="pending-dashboard" className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 animate-fade-in-up">
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Status Card */}
                            <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm flex items-start gap-6 relative overflow-hidden">
                                <div className={`absolute left-0 top-0 bottom-0 w-2 ${profile.stage === 'review' || profile.stage === 'payment' ? 'bg-voy-peach' : 'bg-stone-200'}`}></div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-voy-dark mb-2">
                                        {profile.stage === 'new' ? 'Action Required' : profile.stage === 'review' ? 'In Clinical Review' : 'Payment Required'}
                                    </h3>
                                    <p className="text-stone-500 leading-relaxed mb-4 max-w-lg">
                                        {profile.stage === 'new' ? "Please upload your safety photos to complete your profile." : 
                                         profile.stage === 'review' ? "Our clinicians are reviewing your application details and photos." : 
                                         "Your application has been approved. Please complete payment to initiate dispatch."}
                                    </p>
                                    {profile.stage === 'payment' && (
                                        <button 
                                            onClick={() => onUpdateProfile({ stage: 'active', paymentStatus: 'paid' })}
                                            className="px-6 py-3 bg-voy-dark text-white rounded-xl font-medium shadow-lg hover:bg-voy-forest transition-colors flex items-center gap-2"
                                        >
                                            <CreditCard size={18} /> Pay £{price} & Start Treatment
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Plan Card */}
                            <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden p-8 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-voy-dark"><Pill size={28} /></div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Proposed Treatment</div>
                                        <div className="text-2xl font-serif text-voy-dark">{profile.plan.med}</div>
                                        <div className="text-stone-500 text-sm font-medium">{profile.plan.dose} Weekly</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold text-voy-dark">£{price}</div>
                                    <div className="text-stone-400 text-xs">/ month</div>
                                </div>
                            </div>

                            {/* Photo Uploads (Only for 'new') */}
                            {profile.stage === 'new' && (
                                <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8">
                                    <h3 className="font-serif text-voy-dark text-lg mb-6">Safety Verification Photos</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Front Photo */}
                                        <div onClick={() => handlePhotoUpload('front')} className={`aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${profile.photos.front ? 'border-green-400 bg-green-50 text-green-600' : 'border-stone-200 hover:border-voy-dark hover:bg-stone-50'}`}>
                                            {profile.photos.front ? (
                                                <div className="flex flex-col items-center animate-fade-in-up">
                                                    <CheckCircle2 size={40} className="mb-2"/>
                                                    <span className="text-sm font-bold">Uploaded</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center text-center p-4">
                                                    {/* Custom SVG Silhouette: Front */}
                                                    <svg width="60" height="120" viewBox="0 0 100 200" className="text-stone-300 mb-4 group-hover:text-voy-dark transition-colors" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M50 30 C 50 10, 80 10, 80 30 C 80 50, 50 50, 50 30 M 50 50 L 50 150 M 20 80 L 80 80 M 30 200 L 50 150 L 70 200" />
                                                    </svg>
                                                    <span className="text-sm font-bold text-voy-dark mb-1">Front Photo</span>
                                                    <span className="text-[10px] text-stone-400 font-medium">Face camera, arms natural</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Side Photo */}
                                        <div onClick={() => handlePhotoUpload('side')} className={`aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${profile.photos.side ? 'border-green-400 bg-green-50 text-green-600' : 'border-stone-200 hover:border-voy-dark hover:bg-stone-50'}`}>
                                            {profile.photos.side ? (
                                                <div className="flex flex-col items-center animate-fade-in-up">
                                                    <CheckCircle2 size={40} className="mb-2"/>
                                                    <span className="text-sm font-bold">Uploaded</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center text-center p-4">
                                                    {/* Custom SVG Silhouette: Side */}
                                                    <svg width="60" height="120" viewBox="0 0 100 200" className="text-stone-300 mb-4 group-hover:text-voy-dark transition-colors" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M50 30 C 50 10, 70 10, 70 30 C 70 50, 50 50, 50 30 M 50 50 L 50 150 M 50 80 L 75 90 M 50 150 L 65 200" />
                                                    </svg>
                                                    <span className="text-sm font-bold text-voy-dark mb-1">Side Photo</span>
                                                    <span className="text-[10px] text-stone-400 font-medium">Turn 90°, standing straight</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button 
                                            onClick={handleSubmitApplication} 
                                            disabled={!profile.photos.front || !profile.photos.side || isSubmitting} 
                                            className="px-8 py-4 bg-voy-dark text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-voy-forest shadow-lg hover:shadow-xl flex items-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <> <RefreshCw size={18} className="animate-spin" /> Processing... </>
                                            ) : (
                                                'Submit for Review'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </>
        )}

        {/* --- RESOURCES VIEW (Implemented) --- */}
        {activeTab === 'resources' && (
            <div className="max-w-5xl mx-auto animate-fade-in-up pb-10">
                
                {/* Featured: Injection Guide */}
                <div className="bg-voy-dark text-white rounded-[2rem] p-8 md:p-12 mb-8 relative overflow-hidden group shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <span className="inline-block px-3 py-1 bg-voy-peach text-voy-dark text-xs font-bold uppercase tracking-widest rounded-full mb-4">Essential Guide</span>
                            <h2 className="text-3xl md:text-4xl font-serif mb-4">How to self-inject</h2>
                            <p className="text-white/70 text-lg mb-8 max-w-md">A step-by-step video guide on using your pen safely and effectively from home.</p>
                            <button className="px-6 py-3 bg-white text-voy-dark rounded-full font-medium flex items-center gap-2 hover:bg-voy-peach transition-colors">
                                <PlayCircle size={20} /> Watch Video (3 min)
                            </button>
                        </div>
                        <div className="w-full md:w-1/3 aspect-video bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                            <Video size={48} className="text-white/40" />
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-voy-forest/50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <h3 className="text-xl font-serif text-voy-dark mb-6">Knowledge Base</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                            <Activity size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-voy-dark mb-2">Nutrition Advice</h4>
                        <p className="text-stone-500 text-sm mb-4">High protein meal plans to support your GLP-1 journey.</p>
                        <span className="text-voy-dark font-medium text-sm flex items-center gap-1 group-hover:underline">Read Article <ArrowRight size={14}/></span>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            <HelpCircle size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-voy-dark mb-2">Side Effects</h4>
                        <p className="text-stone-500 text-sm mb-4">How to manage nausea and common early symptoms.</p>
                        <span className="text-voy-dark font-medium text-sm flex items-center gap-1 group-hover:underline">Read Article <ArrowRight size={14}/></span>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                            <Clock size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-voy-dark mb-2">Dosing Schedule</h4>
                        <p className="text-stone-500 text-sm mb-4">Understanding titration and when to increase your dose.</p>
                        <span className="text-voy-dark font-medium text-sm flex items-center gap-1 group-hover:underline">Read Article <ArrowRight size={14}/></span>
                    </div>
                </div>

                <h3 className="text-xl font-serif text-voy-dark mb-6">Documents</h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200 hover:border-voy-dark transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-stone-100 rounded-lg text-stone-500 group-hover:text-voy-dark group-hover:bg-stone-200 transition-colors">
                                <FileText size={20} />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-voy-dark text-sm">Patient Information Leaflet (PIL)</div>
                                <div className="text-stone-400 text-xs">PDF • 2.4 MB</div>
                            </div>
                        </div>
                        <Download size={20} className="text-stone-300 group-hover:text-voy-dark transition-colors" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200 hover:border-voy-dark transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-stone-100 rounded-lg text-stone-500 group-hover:text-voy-dark group-hover:bg-stone-200 transition-colors">
                                <FileText size={20} />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-voy-dark text-sm">Welcome Pack & Safety Info</div>
                                <div className="text-stone-400 text-xs">PDF • 1.1 MB</div>
                            </div>
                        </div>
                        <Download size={20} className="text-stone-300 group-hover:text-voy-dark transition-colors" />
                    </button>
                </div>
            </div>
        )}

        {/* --- INBOX VIEW (Restored & Enhanced) --- */}
        {activeTab === 'inbox' && (
            <div className="h-[calc(100vh-10rem)] bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden flex flex-col animate-fade-in-up">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                    <div>
                        <h2 className="text-lg font-bold text-voy-dark">Clinical Support</h2>
                        <p className="text-xs text-stone-400">Typical response time: 2 hours</p>
                    </div>
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-voy-dark text-white flex items-center justify-center text-xs border-2 border-white">Dr</div>
                        <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs border-2 border-white">S</div>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {profile.messages?.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] p-5 rounded-2xl relative shadow-sm ${
                                msg.sender === 'patient' 
                                ? 'bg-voy-peach text-voy-dark rounded-br-none' 
                                : 'bg-stone-100 text-stone-800 rounded-bl-none'
                            }`}>
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                <span className="text-[10px] opacity-50 block text-right mt-2 font-medium">
                                    {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        </div>
                    ))}
                    {(!profile.messages || profile.messages.length === 0) && (
                        <div className="h-full flex flex-col items-center justify-center text-stone-300">
                            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                                <MessageSquare size={32} className="opacity-20" />
                            </div>
                            <p className="font-medium">No messages yet.</p>
                            <p className="text-xs mt-1">Start a conversation with your clinician.</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 bg-stone-50 border-t border-stone-100 flex gap-3">
                    <input 
                        type="text" 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message to your clinician..." 
                        className="flex-1 p-4 rounded-2xl border border-stone-200 outline-none focus:ring-2 focus:ring-voy-dark/10 bg-white shadow-sm transition-all"
                    />
                    <button 
                        onClick={handleSendMessage}
                        className="p-4 bg-voy-dark text-white rounded-2xl hover:bg-voy-forest transition-colors shadow-md hover:shadow-lg flex-shrink-0"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        )}

        {/* Other Tabs Placeholders */}
        {(activeTab === 'payments' || activeTab === 'account') && (
            <div className="h-[calc(100vh-10rem)] bg-white rounded-[2rem] border border-stone-100 shadow-sm flex items-center justify-center text-stone-300 flex-col animate-fade-in-up">
                <Settings size={48} className="mb-4 opacity-20" />
                <p>This section is under development.</p>
            </div>
        )}

      </main>

      {/* MOBILE NAV */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50 bg-voy-dark/90 backdrop-blur-xl rounded-2xl p-2 flex justify-between items-center shadow-2xl">
          <button onClick={() => setActiveTab('overview')} className={`flex-1 py-3 flex justify-center ${activeTab === 'overview' ? 'text-voy-peach' : 'text-white/60'}`}><LayoutDashboard size={24}/></button>
          <button onClick={() => setActiveTab('inbox')} className={`flex-1 py-3 flex justify-center ${activeTab === 'inbox' ? 'text-voy-peach' : 'text-white/60'}`}><MessageSquare size={24}/></button>
          <button onClick={() => setActiveTab('account')} className={`flex-1 py-3 flex justify-center ${activeTab === 'account' ? 'text-voy-peach' : 'text-white/60'}`}><User size={24}/></button>
      </div>
    </div>
  );
};
