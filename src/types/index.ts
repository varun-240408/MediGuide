export type UserRole = 'doctor' | 'patient' | 'guest';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  title?: string;
  specialty?: string;
}

export type SurgeryCategory = 
  | 'Total Knee Arthroplasty'
  | 'Total Hip Replacement'
  | 'Laparoscopic Cholecystectomy'
  | 'Lumbar Discectomy'
  | 'Coronary Artery Bypass (CABG)'
  | 'Inguinal Hernia Repair';

export type AlertSeverity = 'green' | 'amber' | 'red';
export type AlertStatus = 'new' | 'under_review' | 'resolved' | 'escalated';
export type MonitoringStatus = 'active' | 'paused' | 'completed';

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  adherenceRate: number; // e.g. 95%
}

export interface CheckInResponse {
  id: string;
  patientId: string;
  timestamp: string;
  dayPostOp: number;
  painScore: number; // 0 - 10
  feverReported: boolean;
  temperature?: number; // e.g. 98.6
  incisionStatus: 'clean_dry' | 'mild_redness' | 'drainage' | 'severe_redness';
  medicationsTaken: boolean;
  mobilityRating: 'normal' | 'reduced' | 'unable_to_walk';
  notes?: string;
  urgentAssistanceRequested?: boolean;
}

export interface RAGKnowledgeSnippet {
  id: string;
  source: string;
  citation: string;
  content: string;
  relevanceScore: number;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  surgery: SurgeryCategory;
  severity: AlertSeverity;
  status: AlertStatus;
  detectedAt: string;
  reportedChanges: string;
  previousBaseline: string;
  reason: string;
  relevantHistory: string;
  retrievedGuidelines?: RAGKnowledgeSnippet[];
  suggestedAction: string;
  clinicalNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface MonitoringProfile {
  id: string;
  patientId: string;
  patientName: string;
  condition: SurgeryCategory;
  dischargeDate: string;
  durationDays: number;
  frequency: 'daily_morning' | 'twice_daily' | 'every_48h';
  preferredChannel: 'text_sms' | 'voice_call' | 'web_portal';
  preferredLanguage: string;
  includedQuestions: {
    pain: boolean;
    incision: boolean;
    fever: boolean;
    medications: boolean;
    mobility: boolean;
    dvtSigns: boolean;
    generalWellbeing: boolean;
  };
  warningThresholds: {
    maxPainScore: number; // e.g. 7
    maxTemperature: number; // e.g. 100.4
    consecutiveMissedChecks: number; // e.g. 2
    flagDrainage: boolean;
  };
  escalationTeam: string;
  careTeamContact: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  surgery: SurgeryCategory;
  dischargeDate: string;
  daysPostOp: number;
  primarySurgeon: string;
  monitoringStatus: MonitoringStatus;
  lastCheckIn: string;
  lastCheckInStatus: 'completed' | 'missed' | 'pending';
  nextFollowUp: string;
  alertStatus: AlertSeverity;
  medicalHistory: string[];
  allergies: string[];
  medications: Medication[];
  recentCheckIns: CheckInResponse[];
  recoveryBaseline: {
    expectedPainDay7: number;
    expectedMobilityDay7: string;
    currentPain: number;
    baselineNotes: string;
  };
}
