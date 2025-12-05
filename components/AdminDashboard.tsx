import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, Activity, Settings, LogOut, 
    Search, Bell, Filter, ChevronRight,
    CheckCircle2, AlertTriangle, FileText, Camera, Pill,
    CreditCard, Scale, ArrowRight, TrendingUp, Plus, Mail, UserPlus, MoreHorizontal, X, Trash2,
    Stethoscope, ShieldCheck, StickyNote, Send, ArrowLeft, Clock, History, AlertCircle, RefreshCcw, Truck,
    Package, Calendar, Receipt
} from 'lucide-react';
import { PatientProfile, PatientStage, ConsultationRecord, ClinicalNote, Message, PaymentRecord, TreatmentRecord } from '../types';

interface AdminDashboardProps {
    patient: PatientProfile;
    onUpdatePatient: (updates: Partial<PatientProfile>) => void;
    onLogout: () => void;
}

// Mock Team Data
const INITIAL_TEAM = [
    { id: 1, name: 'Dr. Sarah Smith', role: 'Clinical Lead', email: 'sarah.smith@weighright.co.uk', status: 'Active' },
    { id: 2, name: 'Dr. James Wilson', role: 'Prescriber', email: 'james.wilson@weighright.co.uk', status: 'Active' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ patient, onUpdatePatient, onLogout }) => {
    // Core View State
    const [activeView, setActiveView] = useState<'dashboard' | 'patients' | 'review' | 'mailbox' | 'payments' | 'compliance' | 'settings'>('dashboard');
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    
    // Detailed Profile Tabs
    const [detailTab, setDetailTab] = useState<'overview' | 'clinical' | 'financial' | 'timeline' | 'messages'>('overview'); 
    
    // Inputs
    const [noteInput, setNoteInput] = useState('');
    const [messageInput, setMessageInput] = useState('');
    
    // Team Management
    const [team, setTeam] = useState(INITIAL_TEAM);
    const [isAddClinicianOpen, setIsAddClinicianOpen] = useState(false);
    const [newClinician, setNewClinician] = useState({ name: '', email: '', role: 'Prescriber' });

    // --- MOCK DATA GENERATION (Updated to match new Questionnaire) ---
    const mockConsultation: ConsultationRecord[] = [
        { id: '1', question: 'BMI Eligibility', answer: 'BMI 31.4 (White)', flag: 'low' },
        { id: '2', question: 'Current GLP-1 Use', answer: 'No - Never used', flag: 'low' },
        { id: '3', question: 'Diabetes History', answer: 'Type 2 Diabetes', flag: 'high' },
        { id: '4', question: 'GI Conditions', answer: 'None', flag: 'low' },
        { id: '5', question: 'CV Events (3 months)', answer: 'None', flag: 'low' },
        { id: '6', question: 'Thyroid History', answer: 'None', flag: 'low' },
        { id: '7', question: 'Mental Health', answer: 'Depression (Stable)', flag: 'medium' },
        { id: '8', question: 'Medication Interaction', answer: 'Metformin', flag: 'medium' },
        { id: '9', question: 'Pregnancy/Breastfeeding', answer: 'Not applicable', flag: 'low' },
        { id: '10', question: 'GP Registration', answer: 'Dr. Jones, High St Surgery', flag: 'low' },
    ];

    const mockMessages: Message[] = [
        { id: '1', sender: 'system', content: 'Application received.', timestamp: '2023-12-01T09:00:00', read: true },
        { id: '2', sender: 'patient', content: 'Hi, when will my next dispatch be?', timestamp: '2023-12-05T14:30:00', read: false }
    ];

    const mockPaymentHistory: PaymentRecord[] = [
        { id: 'pay_1', date: '2023-11-01', amount: 199, method: 'Visa **** 4242', status: 'paid' },
        { id: 'pay_2', date: '2023-12-01', amount: 199, method: 'Visa **** 4242', status: 'paid' }
    ];

    const mockTreatmentHistory: TreatmentRecord[] = [
        { id: 'tx_1', month: 1, date: '2023-11-02', dose: '0.25mg', status: 'completed' },
        { id: 'tx_2', month: 2, date: '2023-12-02', dose: '0.5mg', status: 'completed' },
        { id: 'tx_3', month: 3, date: '2024-01-02', dose: '1.0mg', status: 'scheduled' }
    ];

    // 1. Enriched Real Patient (Prop)
    const enrichedPatient: PatientProfile = {
        ...patient,
        riskLevel: patient.riskLevel || 'medium', 
        consultation: patient.consultation || mockConsultation,
        notes: patient.notes || [],
        messages: patient.messages || mockMessages,
        paymentHistory: patient.paymentHistory || mockPaymentHistory,
        treatmentHistory: patient.treatmentHistory || mockTreatmentHistory,
        startDate: patient.startDate || '2023-11-01'
    };

    // 2. Mock Patient List (Hardcoded for Demo)
    const mockPatientList: PatientProfile[] = [
        enrichedPatient,
        {
            id: '882101',
            name: 'Sarah Miller',
            email: 'sarah.m@example.com',
            stage: 'review', // New Review
            plan: { med: 'Wegovy', dose: '1.7mg' },
            paymentStatus: 'due',
            weightHistory: { current: 78.4, start: 85.0, lastLogged: '2023-11-20' },
            photos: { front: true, side: true },
            nextDispatchDate: '2023-12-15',
            alerts: { weightDue: false, paymentOverdue: false },
            riskLevel: 'low',
            consultation: [
                { id: '1', question: 'BMI', answer: '29.2 (BAME)', flag: 'low' },
                { id: '2', question: 'Medical History', answer: 'None', flag: 'low' },
                { id: '3', question: 'Current Meds', answer: 'None', flag: 'low' }
            ],
            notes: [],
            messages: [],
            paymentHistory: [],
            treatmentHistory: [],
            startDate: '2023-12-01'
        },
        {
            id: '882105',
            name: 'David Chen',
            email: 'd.chen@example.com',
            stage: 'active', // Active - Good
            plan: { med: 'Mounjaro', dose: '5mg' },
            paymentStatus: 'paid',
            weightHistory: { current: 102.1, start: 115.0, lastLogged: '2023-11-25' },
            photos: { front: true, side: true },
            nextDispatchDate: '2023-12-20',
            alerts: { weightDue: false, paymentOverdue: false },
            riskLevel: 'low',
            consultation: [],
            notes: [],
            messages: [],
            dispatchStatus: 'dispatched',
            paymentHistory: mockPaymentHistory,
            treatmentHistory: mockTreatmentHistory,
            startDate: '2023-10-01'
        },
        {
            id: '882109',
            name: 'Emma Watson',
            email: 'emma.w@example.com',
            stage: 'active', // Active - Alert
            plan: { med: 'Wegovy', dose: '2.4mg' },
            paymentStatus: 'overdue',
            weightHistory: { current: 68.0, start: 75.0, lastLogged: '2023-10-20' },
            photos: { front: true, side: true },
            nextDispatchDate: '2023-12-01',
            alerts: { weightDue: true, paymentOverdue: true },
            riskLevel: 'low',
            consultation: [],
            notes: [],
            messages: [],
            dispatchStatus: 'preparing',
            paymentHistory: [],
            treatmentHistory: [],
            startDate: '2023-09-01'
        }
    ];

    // --- FILTER LOGIC ---
    const patientsInReview = mockPatientList.filter(p => p.stage === 'review' || p.stage === 'new');
    const directoryPatients = mockPatientList.filter(p => p.stage === 'active' || p.stage === 'payment' || p.stage === 'discharged');
    const paymentsDue = mockPatientList.filter(p => p.stage === 'active' || p.stage === 'payment'); 
    
    const viewingPatient = selectedPatientId 
        ? mockPatientList.find(p => p.id === selectedPatientId) || enrichedPatient
        : enrichedPatient;

    // --- ACTIONS ---
    const handleRejectPhotos = () => {
        onUpdatePatient({
            stage: 'new',
            photos: { front: false, side: false },
            messages: [
                ...(viewingPatient.messages || []),
                {
                    id: Date.now().toString(),
                    sender: 'system',
                    content: 'Your photos were rejected during clinical review. Please upload clear photos.',
                    timestamp: new Date().toISOString(),
                    read: false
                }
            ]
        });
        setSelectedPatientId(null);
    };

    const handleDispatch = () => {
        onUpdatePatient({ dispatchStatus: 'dispatched' });
    };

    const handleForceStatusChange = (newStage: string) => {
        onUpdatePatient({ stage: newStage as PatientStage });
    };

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;
        const newMsg: Message = {
            id: Date.now().toString(),
            sender: 'admin',
            content: messageInput,
            timestamp: new Date().toISOString(),
            read: true
        };
        viewingPatient.messages = [...(viewingPatient.messages || []), newMsg];
        setMessageInput('');
    };

    const handleMarkPaid = () => {
        viewingPatient.paymentStatus = 'paid';
        if(viewingPatient.id === patient.id) onUpdatePatient({ paymentStatus: 'paid' }); 
    }

    const handleAddNote = () => {
        if (!noteInput.trim()) return;
        const newNote: ClinicalNote = {
            id: Date.now().toString(),
            author: 'Dr. Sarah Smith',
            role: 'Clinical Lead',
            content: noteInput,
            timestamp: new Date().toISOString()
        };
        viewingPatient.notes = [newNote, ...(viewingPatient.notes || [])];
        setNoteInput('');
    };

    const handleAddClinician = () => {
        if(newClinician.name && newClinician.email) {
            setTeam([...team, { id: Date.now(), ...newClinician, status: 'Invited' }]);
            setIsAddClinicianOpen(false);
            setNewClinician({ name: '', email: '', role: 'Prescriber' });
        }
    };

    const handleDeleteClinician = (id: number) => {
        setTeam(team.filter(t => t.id !== id));
    }

    // Sidebar Item Component
    const NavItem = ({ id, icon: Icon, label, alert }: { id: string, icon: any, label: string, alert?: number }) => (
        <button 
            onClick={() => { setActiveView(id as any); setSelectedPatientId(null); setDetailTab('overview'); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all mb-1 ${
                activeView === id 
                ? 'bg-voy-peach text-voy-dark font-bold shadow-md' 
                : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
        >
            <Icon size={18} strokeWidth={activeView === id ? 2.5 : 2} />
            <span className="text-sm tracking-wide">{label}</span>
            {alert ? <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{alert}</span> : null}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#F5F5F0] flex font-sans text-voy-dark">
            
            {/* Sidebar */}
            <aside className="w-72 bg-voy-dark flex flex-col shadow-2xl z-20 sticky top-0 h-screen">
                <div className="h-20 flex items-center px-8 border-b border-white/10">
                    <span className="text-white font-serif text-2xl tracking-tight">Weighright <span className="text-voy-peach text-xs font-sans font-bold tracking-widest uppercase ml-2 px-2 py-1 bg-white/10 rounded-md">Admin</span></span>
                </div>
                
                <div className="p-6 flex-1 space-y-8 overflow-y-auto">
                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/30 mb-4 px-2 font-bold">Clinical Operations</div>
                        <NavItem id="dashboard" icon={LayoutDashboard} label="Overview" />
                        <NavItem id="review" icon={Activity} label="Review Queue" alert={patientsInReview.length} />
                    </div>

                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/30 mb-4 px-2 font-bold">Patient Management</div>
                        <NavItem id="patients" icon={Users} label="Patient Directory" />
                        <NavItem id="mailbox" icon={Mail} label="Mailbox" alert={2} />
                    </div>
                    
                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/30 mb-4 px-2 font-bold">Finance & Logistics</div>
                        <NavItem id="payments" icon={CreditCard} label="Payments & Dispatch" alert={paymentsDue.filter(p => p.paymentStatus !== 'paid').length} />
                        <NavItem id="compliance" icon={AlertTriangle} label="Compliance" alert={(patient.alerts.weightDue) ? 1 : 0} />
                        <NavItem id="settings" icon={Settings} label="Settings" />
                    </div>
                </div>

                <div className="p-6 border-t border-white/10 bg-black/20">
                    <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white text-sm w-full font-medium transition-colors">
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F2F4F7]">
                {/* Top Bar */}
                <header className="h-20 bg-white border-b border-stone-200 flex items-center justify-between px-8 shadow-sm z-10 flex-shrink-0">
                    <div className="flex items-center gap-4 bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-200 w-96 focus-within:ring-2 focus-within:ring-voy-dark/10 transition-all">
                        <Search size={18} className="text-stone-400" />
                        <input type="text" placeholder="Search patients..." className="bg-transparent outline-none text-sm text-voy-dark w-full placeholder:text-stone-400 font-medium" />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 pl-6 border-l border-stone-100">
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-bold text-voy-dark">Dr. Sarah Smith</div>
                                <div className="text-xs text-stone-500">Clinical Lead</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-voy-peach text-voy-dark flex items-center justify-center font-bold text-sm shadow-sm border border-stone-100">DR</div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    
                    {/* --- DASHBOARD OVERVIEW --- */}
                    {activeView === 'dashboard' && (
                        <div className="max-w-[1400px] mx-auto animate-fade-in-up">
                            {/* ... Metrics ... */}
                            <div className="flex justify-between items-end mb-8">
                                <h1 className="text-3xl text-voy-dark font-serif mb-2">Practice Overview</h1>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                                    <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Active Patients</div>
                                    <div className="text-4xl font-serif text-voy-dark">{directoryPatients.length}</div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                                    <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Pending Review</div>
                                    <div className="text-4xl font-serif text-voy-dark">{patientsInReview.length}</div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                                    <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Safety Alerts</div>
                                    <div className="text-4xl font-serif text-red-500">{mockPatientList.filter(p => p.alerts.weightDue || p.alerts.paymentOverdue).length}</div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                                    <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Revenue MTD</div>
                                    <div className="text-4xl font-serif text-voy-dark">£42.5k</div>
                                </div>
                            </div>
                            {/* Quick Actions */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="bg-voy-dark text-white rounded-[2rem] p-8 shadow-xl">
                                    <h3 className="text-xl font-serif mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button onClick={() => setActiveView('review')} className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left text-sm font-medium flex items-center gap-3"><Activity size={16} /> Review Queue ({patientsInReview.length})</button>
                                        <button onClick={() => setActiveView('patients')} className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left text-sm font-medium flex items-center gap-3"><Users size={16} /> Patient Directory</button>
                                        <button onClick={() => setActiveView('payments')} className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left text-sm font-medium flex items-center gap-3"><CreditCard size={16} /> Manage Payments</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- REVIEW QUEUE (NEW PATIENTS ONLY) --- */}
                    {activeView === 'review' && !selectedPatientId && (
                        <div className="max-w-[1400px] mx-auto animate-fade-in-up">
                            <h1 className="text-3xl text-voy-dark font-serif mb-8">Clinical Review Queue</h1>
                            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-stone-100 text-stone-400 text-xs font-bold uppercase tracking-wider bg-stone-50/50">
                                            <th className="p-6">Patient</th>
                                            <th className="p-6">Submitted</th>
                                            <th className="p-6">Requested Plan</th>
                                            <th className="p-6">Risk Flags</th>
                                            <th className="p-6 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-50">
                                        {patientsInReview.map(p => (
                                            <tr key={p.id} onClick={() => { setSelectedPatientId(p.id); setDetailTab('overview'); }} className="hover:bg-stone-50 transition-colors cursor-pointer group">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-voy-peach/20 text-voy-dark flex items-center justify-center font-bold text-xs">{p.name.charAt(0)}</div>
                                                        <div>
                                                            <div className="font-bold text-voy-dark">{p.name}</div>
                                                            <div className="text-xs text-stone-400">#{p.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-sm text-stone-500">Today, 09:00 AM</td>
                                                <td className="p-6">
                                                    <span className="bg-stone-100 text-voy-dark px-3 py-1 rounded-lg text-sm font-medium">{p.plan.med} {p.plan.dose}</span>
                                                </td>
                                                <td className="p-6">
                                                    {p.riskLevel === 'high' && <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">High Risk</span>}
                                                    {p.riskLevel === 'medium' && <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Medium Risk</span>}
                                                    {p.riskLevel === 'low' && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Low Risk</span>}
                                                </td>
                                                <td className="p-6 text-right">
                                                    <button className="text-voy-peach font-bold text-sm group-hover:underline">Review &rarr;</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {patientsInReview.length === 0 && (
                                            <tr><td colSpan={5} className="p-8 text-center text-stone-400">All caught up! No new patients to review.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- MAILBOX (NEW) --- */}
                    {activeView === 'mailbox' && (
                        <div className="max-w-[1400px] mx-auto animate-fade-in-up h-[calc(100vh-140px)] flex gap-6">
                            {/* Inbox List */}
                            <div className="w-1/3 bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden flex flex-col">
                                <div className="p-6 border-b border-stone-100 bg-stone-50/50">
                                    <h2 className="text-xl font-serif text-voy-dark mb-4">Inbox</h2>
                                    <div className="relative">
                                        <Search size={16} className="absolute left-3 top-3 text-stone-400" />
                                        <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm outline-none" />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    {mockPatientList.map(p => (
                                        <div key={p.id} onClick={() => setSelectedPatientId(p.id)} className={`p-4 border-b border-stone-50 hover:bg-stone-50 cursor-pointer transition-colors ${selectedPatientId === p.id ? 'bg-stone-50' : ''}`}>
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-voy-dark text-sm">{p.name}</span>
                                                <span className="text-[10px] text-stone-400">10:42 AM</span>
                                            </div>
                                            <p className="text-xs text-stone-500 line-clamp-1">
                                                {p.messages && p.messages.length > 0 ? p.messages[p.messages.length-1].content : 'No messages yet.'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Message Thread */}
                            <div className="flex-1 bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden flex items-center justify-center text-stone-400">
                                {selectedPatientId ? (
                                    <div className="w-full h-full flex flex-col">
                                        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                                            <div className="font-bold text-voy-dark">Viewing: {viewingPatient.name}</div>
                                            <button onClick={() => setSelectedPatientId(null)} className="p-2 hover:bg-stone-100 rounded-lg"><X size={20}/></button>
                                        </div>
                                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-stone-50/30">
                                            {viewingPatient.messages?.map(msg => (
                                                <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[70%] p-4 rounded-2xl ${msg.sender === 'admin' ? 'bg-voy-dark text-white rounded-br-none' : 'bg-white border border-stone-200 rounded-bl-none'}`}>
                                                        <p className="text-sm">{msg.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 border-t border-stone-100 flex gap-3">
                                            <input type="text" className="flex-1 p-3 border border-stone-200 rounded-xl outline-none" placeholder="Type reply..." />
                                            <button className="p-3 bg-voy-dark text-white rounded-xl"><Send size={20} /></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Mail size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>Select a conversation to view.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- PAYMENTS & DISPATCH (NEW) --- */}
                    {activeView === 'payments' && (
                        <div className="max-w-[1400px] mx-auto animate-fade-in-up">
                            <h1 className="text-3xl text-voy-dark font-serif mb-8">Monthly Payments & Dispatch</h1>
                            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-stone-100 text-stone-400 text-xs font-bold uppercase tracking-wider bg-stone-50/50">
                                            <th className="p-6">Patient</th>
                                            <th className="p-6">Treatment Month</th>
                                            <th className="p-6">Plan</th>
                                            <th className="p-6">Payment Status</th>
                                            <th className="p-6">Dispatch Status</th>
                                            <th className="p-6 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-50">
                                        {paymentsDue.map(p => (
                                            <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                                                <td className="p-6 font-bold text-voy-dark">{p.name}</td>
                                                <td className="p-6"><span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-lg text-xs font-bold">Month 2</span></td>
                                                <td className="p-6 text-sm">{p.plan.med} {p.plan.dose}</td>
                                                <td className="p-6">
                                                    {p.paymentStatus === 'paid' 
                                                        ? <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={14} /> Paid</span>
                                                        : <span className="text-amber-600 font-bold flex items-center gap-1"><AlertCircle size={14} /> Due</span>
                                                    }
                                                </td>
                                                <td className="p-6">
                                                    {p.dispatchStatus === 'dispatched'
                                                        ? <span className="text-green-600 font-bold flex items-center gap-1"><Truck size={14} /> Dispatched</span>
                                                        : <span className="text-stone-400 font-medium">Processing</span>
                                                    }
                                                </td>
                                                <td className="p-6 text-right">
                                                    {p.paymentStatus !== 'paid' ? (
                                                        <button onClick={() => { setSelectedPatientId(p.id); setDetailTab('financial'); }} className="text-voy-peach font-bold text-sm hover:underline">Manage Payment</button>
                                                    ) : p.dispatchStatus !== 'dispatched' ? (
                                                        <button onClick={() => { setSelectedPatientId(p.id); setDetailTab('overview'); }} className="text-voy-dark font-bold text-sm hover:underline">Dispatch</button>
                                                    ) : (
                                                        <span className="text-stone-300 text-xs">Completed</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- UNIFIED PATIENT DIRECTORY & DETAIL --- */}
                    {(activeView === 'patients' || selectedPatientId) && activeView !== 'review' && activeView !== 'mailbox' && (
                        <>
                            {!selectedPatientId ? (
                                <div className="max-w-[1400px] mx-auto animate-fade-in-up">
                                    <h1 className="text-3xl text-voy-dark font-serif mb-8">Patient Directory</h1>
                                    <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-stone-100 text-stone-400 text-xs font-bold uppercase tracking-wider bg-stone-50/50">
                                                    <th className="p-6">Patient</th>
                                                    <th className="p-6">Status</th>
                                                    <th className="p-6">Treatment</th>
                                                    <th className="p-6">Alerts</th>
                                                    <th className="p-6 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-stone-50">
                                                {directoryPatients.map(p => (
                                                    <tr key={p.id} onClick={() => { setSelectedPatientId(p.id); setDetailTab('overview'); }} className="hover:bg-stone-50 cursor-pointer group">
                                                        <td className="p-6 font-bold text-voy-dark">{p.name} <span className="text-xs font-normal text-stone-400 block">ID: {p.id}</span></td>
                                                        <td className="p-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase">{p.stage}</span></td>
                                                        <td className="p-6 text-sm">{p.plan.med} {p.plan.dose}</td>
                                                        <td className="p-6">
                                                            {p.alerts.weightDue && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-[10px] font-bold uppercase mr-2">Weight Due</span>}
                                                            {(p.alerts.paymentOverdue || p.paymentStatus === 'overdue') && <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[10px] font-bold uppercase">Payment Due</span>}
                                                            {(!p.alerts.weightDue && p.paymentStatus === 'paid') && <span className="bg-green-50 text-green-600 px-2 py-1 rounded text-[10px] font-bold uppercase">Good Standing</span>}
                                                        </td>
                                                        <td className="p-6 text-right"><button className="text-voy-peach font-bold text-sm group-hover:underline">Manage &rarr;</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                /* --- UNIFIED MASTER PROFILE --- */
                                <div className="max-w-[1600px] mx-auto animate-fade-in-up h-[calc(100vh-140px)] flex flex-col">
                                    <div className="flex items-center justify-between mb-6 flex-shrink-0">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setSelectedPatientId(null)} className="p-2 bg-white border border-stone-200 rounded-lg text-stone-500 hover:text-voy-dark"><ArrowLeft size={20} /></button>
                                            <div>
                                                <h1 className="text-2xl font-serif text-voy-dark flex items-center gap-3">
                                                    {viewingPatient.name}
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-sans font-bold uppercase tracking-wider">{viewingPatient.stage}</span>
                                                </h1>
                                                <div className="text-xs text-stone-400">ID: {viewingPatient.id}</div>
                                            </div>
                                        </div>
                                        <div className="flex bg-white p-1 rounded-xl border border-stone-200">
                                            <button onClick={() => setDetailTab('overview')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${detailTab==='overview'?'bg-voy-dark text-white':'text-stone-400 hover:text-voy-dark'}`}>Overview</button>
                                            <button onClick={() => setDetailTab('clinical')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${detailTab==='clinical'?'bg-voy-dark text-white':'text-stone-400 hover:text-voy-dark'}`}>Clinical</button>
                                            <button onClick={() => setDetailTab('financial')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${detailTab==='financial'?'bg-voy-dark text-white':'text-stone-400 hover:text-voy-dark'}`}>Financial</button>
                                            <button onClick={() => setDetailTab('timeline')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${detailTab==='timeline'?'bg-voy-dark text-white':'text-stone-400 hover:text-voy-dark'}`}>Timeline</button>
                                        </div>
                                    </div>

                                    <div className="flex-1 bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden p-8 overflow-y-auto">
                                        
                                        {/* --- REVIEW DETAIL TABS --- */}
                                        {(viewingPatient.stage === 'review' || viewingPatient.stage === 'new') ? (
                                            /* --- 3-COLUMN REVIEW COCKPIT --- */
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                                                {/* 1. Vitals */}
                                                <div className="space-y-6">
                                                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                                        <h3 className="font-bold text-voy-dark mb-4">Patient Data</h3>
                                                        <div className="space-y-3 text-sm">
                                                            <div className="flex justify-between"><span>BMI</span><span className="font-bold">31.4</span></div>
                                                            <div className="flex justify-between"><span>Weight</span><span className="font-bold">{viewingPatient.weightHistory.current}kg</span></div>
                                                        </div>
                                                    </div>
                                                    {/* Risk Banner */}
                                                    {(viewingPatient.riskLevel === 'high' || viewingPatient.riskLevel === 'medium') && (
                                                        <div className={`p-4 rounded-xl shadow-sm ${viewingPatient.riskLevel === 'high' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'}`}>
                                                            <div className="flex items-center gap-2 font-bold mb-2"><AlertTriangle size={18} /> Medical Warning</div>
                                                            <p className="text-xs opacity-90">Contraindications flagged in questionnaire.</p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* 2. Photos (Main) */}
                                                <div className="bg-stone-900 rounded-2xl p-6 relative overflow-hidden flex flex-col shadow-lg">
                                                    <div className="flex justify-between items-center text-white mb-4 z-10">
                                                        <h3 className="font-bold uppercase tracking-widest flex items-center gap-2"><Camera size={18}/> Verification</h3>
                                                        <button onClick={handleRejectPhotos} className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2">
                                                            <RefreshCcw size={14} /> Reject
                                                        </button>
                                                    </div>
                                                    <div className="flex-1 grid grid-cols-2 gap-4">
                                                        <div className="bg-stone-800 rounded-xl border border-white/10 flex items-center justify-center text-white/50 text-xs">Front</div>
                                                        <div className="bg-stone-800 rounded-xl border border-white/10 flex items-center justify-center text-white/50 text-xs">Side</div>
                                                    </div>
                                                </div>

                                                {/* 3. Decision */}
                                                <div className="flex flex-col gap-4">
                                                    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex-1">
                                                        <h3 className="font-bold text-voy-dark mb-4">Clinical Decision</h3>
                                                        <div className="space-y-4">
                                                            <button onClick={() => { onUpdatePatient({ stage: 'payment' }); setSelectedPatientId(null); }} className="w-full py-3 bg-voy-dark text-white rounded-xl font-bold shadow-lg hover:bg-voy-forest">Approve</button>
                                                            <button onClick={() => { onUpdatePatient({ stage: 'new' }); setSelectedPatientId(null); }} className="w-full py-3 bg-white border border-stone-200 text-stone-600 rounded-xl font-medium hover:bg-stone-50">Request Info</button>
                                                            <button onClick={() => { onUpdatePatient({ stage: 'discharged' }); setSelectedPatientId(null); }} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100">Reject</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* --- STANDARD ACTIVE PATIENT TABS --- */
                                            <>
                                                {detailTab === 'overview' && (
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                        <div className="space-y-6">
                                                            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                                                <h3 className="font-bold text-voy-dark mb-4">Fulfillment Status</h3>
                                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                                    <div className={`p-4 bg-white rounded-xl border ${viewingPatient.paymentStatus === 'paid' ? 'border-green-200' : 'border-amber-200'}`}>
                                                                        <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">Payment</div>
                                                                        <div className={`font-bold ${viewingPatient.paymentStatus === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>{viewingPatient.paymentStatus.toUpperCase()}</div>
                                                                    </div>
                                                                    <div className={`p-4 bg-white rounded-xl border ${viewingPatient.dispatchStatus === 'dispatched' ? 'border-green-200' : 'border-stone-200'}`}>
                                                                        <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">Dispatch</div>
                                                                        <div className={`font-bold ${viewingPatient.dispatchStatus === 'dispatched' ? 'text-green-600' : 'text-stone-600'}`}>{viewingPatient.dispatchStatus ? viewingPatient.dispatchStatus.toUpperCase() : 'PENDING'}</div>
                                                                    </div>
                                                                </div>
                                                                <button onClick={handleDispatch} disabled={viewingPatient.dispatchStatus === 'dispatched'} className="w-full py-3 bg-voy-dark text-white rounded-xl font-bold hover:bg-voy-forest disabled:opacity-50">
                                                                    {viewingPatient.dispatchStatus === 'dispatched' ? 'Order Dispatched' : 'Dispatch Order'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-6">
                                                            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                                                <h3 className="font-bold text-voy-dark mb-4">Current Plan</h3>
                                                                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-stone-200 mb-2">
                                                                    <div>
                                                                        <div className="text-xl font-serif text-voy-dark">{viewingPatient.plan.med}</div>
                                                                        <div className="text-sm text-stone-500">{viewingPatient.plan.dose}</div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="font-bold text-voy-dark">£219.00</div>
                                                                        <div className="text-xs text-stone-400">/ month</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {detailTab === 'clinical' && (
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                        <div>
                                                            <h3 className="font-bold text-voy-dark mb-4">Consultation History</h3>
                                                            <div className="space-y-2">
                                                                {viewingPatient.consultation?.map((rec, i) => (
                                                                    <div key={i} className="p-3 border rounded-lg bg-stone-50">
                                                                        <div className="text-xs text-stone-400 mb-1">{rec.question}</div>
                                                                        <div className="font-medium text-voy-dark">{rec.answer}</div>
                                                                        <div className={`text-[10px] font-bold uppercase ${rec.flag === 'high' ? 'text-red-500' : rec.flag === 'medium' ? 'text-amber-500' : 'text-green-500'}`}>Risk: {rec.flag}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-voy-dark mb-4">Clinical Notes</h3>
                                                            <div className="flex gap-2 mb-4">
                                                                <input value={noteInput} onChange={(e) => setNoteInput(e.target.value)} type="text" className="flex-1 p-2 border rounded-lg" placeholder="Add note..." />
                                                                <button onClick={handleAddNote} className="px-4 bg-voy-dark text-white rounded-lg">Add</button>
                                                            </div>
                                                            <div className="space-y-2">
                                                                {viewingPatient.notes?.map((n, i) => (
                                                                    <div key={i} className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                                                                        <div className="text-xs text-stone-400 mb-1">{new Date(n.timestamp).toLocaleDateString()} - {n.author}</div>
                                                                        <div className="text-sm text-stone-700">{n.content}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {detailTab === 'financial' && (
                                                    <div>
                                                        <div className="flex justify-between items-center mb-6">
                                                            <h3 className="font-bold text-voy-dark">Subscription & Payments</h3>
                                                            <button onClick={handleMarkPaid} className="px-4 py-2 bg-voy-dark text-white text-sm font-bold rounded-lg hover:bg-voy-forest">
                                                                Mark Current Month Paid
                                                            </button>
                                                        </div>
                                                        <table className="w-full text-left">
                                                            <thead><tr className="text-xs font-bold text-stone-400 uppercase border-b"><th className="pb-3">Date</th><th className="pb-3">Amount</th><th className="pb-3">Method</th><th className="pb-3">Status</th></tr></thead>
                                                            <tbody className="text-sm">
                                                                {viewingPatient.paymentHistory?.map(pay => (
                                                                    <tr key={pay.id} className="border-b border-stone-50">
                                                                        <td className="py-4">{new Date(pay.date).toLocaleDateString()}</td>
                                                                        <td className="py-4">£{pay.amount}</td>
                                                                        <td className="py-4">{pay.method}</td>
                                                                        <td className="py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase">{pay.status}</span></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}

                                                {detailTab === 'timeline' && (
                                                    <div className="relative border-l-2 border-stone-200 pl-8 ml-4 space-y-8 py-4">
                                                        {viewingPatient.treatmentHistory?.map((tx, i) => (
                                                            <div key={i} className="relative">
                                                                <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white ${tx.status === 'completed' ? 'bg-voy-dark' : 'bg-stone-300'}`}></div>
                                                                <h4 className="font-bold text-voy-dark">Month {tx.month} - {tx.dose}</h4>
                                                                <div className="text-sm text-stone-500">{new Date(tx.date).toLocaleDateString()} • {tx.status}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}

                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* --- COMPLIANCE (Existing) --- */}
                    {activeView === 'compliance' && (
                        <div className="max-w-[1400px] mx-auto animate-fade-in-up">
                            <h1 className="text-3xl text-voy-dark font-serif mb-8">Safety & Compliance</h1>
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden p-8"><h3 className="font-bold text-red-600 mb-4 flex items-center gap-2"><Scale size={20}/> Overdue Weight</h3><p className="text-stone-400 text-center py-8">No alerts.</p></div>
                                <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden p-8"><h3 className="font-bold text-amber-600 mb-4 flex items-center gap-2"><CreditCard size={20}/> Failed Payments</h3><p className="text-stone-400 text-center py-8">No alerts.</p></div>
                            </div>
                        </div>
                    )}

                    {/* --- SETTINGS (Existing) --- */}
                    {activeView === 'settings' && (
                        <div className="max-w-[1000px] mx-auto animate-fade-in-up">
                            <h1 className="text-3xl text-voy-dark font-serif mb-8">Platform Settings</h1>
                            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden mb-8">
                                <div className="p-8 border-b border-stone-100 flex justify-between items-center"><div><h3 className="text-lg font-bold text-voy-dark">Clinical Team</h3></div><button onClick={() => setIsAddClinicianOpen(true)} className="px-5 py-2.5 bg-voy-dark text-white rounded-xl text-sm font-medium shadow-md hover:bg-voy-forest flex items-center gap-2"><Plus size={16} /> Add Clinician</button></div>
                                <div className="divide-y divide-stone-50">{team.map(member => (<div key={member.id} className="p-6 flex items-center justify-between hover:bg-stone-50/50"><div className="font-bold text-voy-dark">{member.name}</div><button onClick={() => handleDeleteClinician(member.id)} className="p-2 text-stone-300 hover:text-red-500"><Trash2 size={18} /></button></div>))}</div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};