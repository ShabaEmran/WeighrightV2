
export interface Plan {
  id: string;
  name: string;
  medication: 'Mounjaro' | 'Wegovy';
  description: string;
  price: number;
  features: string[];
  strengths: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export enum PatientType {
  NEW = 'NEW',
  EXISTING = 'EXISTING'
}

export type PatientStage = 'new' | 'review' | 'payment' | 'active' | 'discharged';
export type Medication = 'Mounjaro' | 'Wegovy';

export interface Message {
  id: string;
  sender: 'patient' | 'admin' | 'system';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ConsultationRecord {
  id: string;
  question: string;
  answer: string;
  flag: 'low' | 'medium' | 'high';
}

export interface ClinicalNote {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
}

export interface TreatmentRecord {
  id: string;
  month: number;
  date: string;
  dose: string;
  status: 'completed' | 'shipped' | 'scheduled';
}

export interface PatientProfile {
  id: string;
  name: string;
  email: string;
  stage: PatientStage;
  plan: {
    med: Medication;
    dose: string;
  };
  weightHistory: {
    current: number;
    start: number;
    lastLogged: string; // ISO Date
  };
  photos: {
    front: boolean;
    side: boolean;
  };
  paymentStatus: 'paid' | 'due' | 'overdue';
  nextDispatchDate: string;
  dispatchStatus?: 'preparing' | 'dispatched' | 'delivered';
  startDate?: string;
  alerts: {
    weightDue: boolean;
    paymentOverdue: boolean;
  };
  riskLevel?: 'low' | 'medium' | 'high';
  messages?: Message[];
  consultation?: ConsultationRecord[];
  notes?: ClinicalNote[];
  paymentHistory?: PaymentRecord[];
  treatmentHistory?: TreatmentRecord[];
}
