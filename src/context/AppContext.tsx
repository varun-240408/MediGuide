import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Patient, 
  Alert, 
  MonitoringProfile, 
  CheckInResponse, 
  AlertStatus, 
  AlertSeverity
} from '../types';
import { 
  CURRENT_DOCTOR, 
  CURRENT_PATIENT, 
  INITIAL_PATIENTS, 
  INITIAL_ALERTS, 
  INITIAL_PROFILES,
  MOCK_RAG_GUIDELINES
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: 'doctor' | 'patient') => void;
  patients: Patient[];
  addPatient: (data: Partial<Patient>) => Patient;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  alerts: Alert[];
  updateAlertStatus: (id: string, status: AlertStatus, clinicalNotes?: string) => void;
  monitoringProfiles: MonitoringProfile[];
  saveMonitoringProfile: (profile: Omit<MonitoringProfile, 'id' | 'updatedAt'>) => MonitoringProfile;
  submitPatientCheckIn: (checkInData: Omit<CheckInResponse, 'id' | 'timestamp'>) => Alert | null;
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
  triageAlert: Alert | null;
  setTriageAlert: (alert: Alert | null) => void;
  isHighContrast: boolean;
  setIsHighContrast: (val: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('mediguide_user');
    return saved ? JSON.parse(saved) : CURRENT_DOCTOR;
  });

  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('mediguide_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [alerts, setAlerts] = useState<Alert[]>(() => {
    const saved = localStorage.getItem('mediguide_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [monitoringProfiles, setMonitoringProfiles] = useState<MonitoringProfile[]>(() => {
    const saved = localStorage.getItem('mediguide_profiles');
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
  });

  const [selectedPatientId, setSelectedPatientId] = useState<string | null>('PAT-1082');
  const [triageAlert, setTriageAlert] = useState<Alert | null>(null);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('mediguide_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('mediguide_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('mediguide_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('mediguide_profiles', JSON.stringify(monitoringProfiles));
  }, [monitoringProfiles]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const switchRole = (role: 'doctor' | 'patient') => {
    if (role === 'doctor') {
      setCurrentUser(CURRENT_DOCTOR);
      showToast('Switched to Doctor Profile: Dr. Sarah Chen, MD');
    } else {
      setCurrentUser(CURRENT_PATIENT);
      showToast('Switched to Patient Profile: Robert Taylor');
    }
  };

  const resetDemoData = () => {
    setPatients(INITIAL_PATIENTS);
    setAlerts(INITIAL_ALERTS);
    setMonitoringProfiles(INITIAL_PROFILES);
    setCurrentUser(CURRENT_DOCTOR);
    showToast('Demo data reset to initial baseline.');
  };

  const addPatient = (data: Partial<Patient>): Patient => {
    const newId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPatient: Patient = {
      id: newId,
      name: data.name || 'New Patient',
      age: data.age || 65,
      gender: data.gender || 'Female',
      phone: data.phone || '(555) 000-0000',
      email: data.email || 'patient@example.com',
      emergencyContact: data.emergencyContact || {
        name: 'Family Member',
        relationship: 'Caregiver',
        phone: '(555) 000-0001',
      },
      surgery: data.surgery || 'Total Knee Arthroplasty',
      dischargeDate: data.dischargeDate || new Date().toISOString().split('T')[0],
      daysPostOp: 1,
      primarySurgeon: data.primarySurgeon || CURRENT_DOCTOR.name,
      monitoringStatus: 'active',
      lastCheckIn: 'Enrolled Today',
      lastCheckInStatus: 'pending',
      nextFollowUp: 'Tomorrow at 09:00 AM',
      alertStatus: 'green',
      medicalHistory: data.medicalHistory || ['No major chronic conditions noted'],
      allergies: data.allergies || ['None reported'],
      medications: data.medications || [
        {
          name: 'Acetaminophen',
          dosage: '500 mg Oral',
          frequency: 'Every 8h PRN',
          purpose: 'Analgesia',
          adherenceRate: 100,
        },
      ],
      recentCheckIns: [],
      recoveryBaseline: {
        expectedPainDay7: 3,
        expectedMobilityDay7: 'Independent ambulation',
        currentPain: 3,
        baselineNotes: 'Standard post-operative clinical pathway initiated.',
      },
    };

    setPatients((prev) => [newPatient, ...prev]);
    showToast(`Patient ${newPatient.name} (${newPatient.id}) added to monitoring list.`);
    return newPatient;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const updateAlertStatus = (id: string, status: AlertStatus, clinicalNotes?: string) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            status,
            clinicalNotes: clinicalNotes || a.clinicalNotes,
            reviewedBy: CURRENT_DOCTOR.name,
            reviewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        }
        return a;
      })
    );
    showToast(`Alert #${id} marked as ${status.replace('_', ' ').toUpperCase()}`);
  };

  const saveMonitoringProfile = (profileData: Omit<MonitoringProfile, 'id' | 'updatedAt'>): MonitoringProfile => {
    const existingIndex = monitoringProfiles.findIndex((p) => p.patientId === profileData.patientId);
    const updatedProfile: MonitoringProfile = {
      ...profileData,
      id: existingIndex >= 0 ? monitoringProfiles[existingIndex].id : `PROF-${Math.floor(1000 + Math.random() * 9000)}`,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      setMonitoringProfiles((prev) => {
        const next = [...prev];
        next[existingIndex] = updatedProfile;
        return next;
      });
    } else {
      setMonitoringProfiles((prev) => [updatedProfile, ...prev]);
    }

    showToast(`Monitoring Profile saved for ${profileData.patientName} (Stored in Local Demo State)`);
    return updatedProfile;
  };

  const submitPatientCheckIn = (checkInData: Omit<CheckInResponse, 'id' | 'timestamp'>): Alert | null => {
    const timestamp = new Date().toISOString();
    const newCheckIn: CheckInResponse = {
      ...checkInData,
      id: `CHK-${checkInData.patientId}-${Date.now().toString().slice(-4)}`,
      timestamp,
    };

    // Determine alert trigger
    let severity: AlertSeverity = 'green';
    let alertReason = '';
    let suggestedAction = '';
    let generatedAlert: Alert | null = null;

    const patient = patients.find((p) => p.id === checkInData.patientId);
    const patientName = patient?.name || 'Patient';
    const surgery = patient?.surgery || 'Total Knee Arthroplasty';

    if (checkInData.urgentAssistanceRequested || checkInData.painScore >= 7 || checkInData.feverReported || checkInData.incisionStatus === 'drainage') {
      severity = 'red';
      alertReason = checkInData.feverReported
        ? `Patient reported fever with temperature ${checkInData.temperature || 101.2}°F and incision ${checkInData.incisionStatus}. High risk of surgical site infection.`
        : `Patient reported acute severe pain jump (score ${checkInData.painScore}/10) with reduced mobility. Signs warrant immediate clinical triage.`;
      
      suggestedAction = 'Direct clinical phone contact required within 30 minutes. Evaluate need for in-person ultrasound or wound inspection.';
    } else if (checkInData.painScore >= 5 || checkInData.incisionStatus === 'mild_redness' || !checkInData.medicationsTaken || checkInData.mobilityRating === 'reduced') {
      severity = 'amber';
      alertReason = !checkInData.medicationsTaken
        ? 'Patient reported missed prescribed medications, risking symptom escalation or thrombosis.'
        : `Reported moderate pain (${checkInData.painScore}/10) or localized mild redness deviating from optimal recovery curve.`;
      
      suggestedAction = 'Schedule nurse follow-up call. Reinforce medication compliance and activity limits.';
    }

    // Update patient record
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === checkInData.patientId) {
          return {
            ...p,
            alertStatus: severity,
            lastCheckIn: 'Just now',
            lastCheckInStatus: 'completed',
            recentCheckIns: [newCheckIn, ...(p.recentCheckIns || [])],
            recoveryBaseline: {
              ...p.recoveryBaseline,
              currentPain: checkInData.painScore,
            },
          };
        }
        return p;
      })
    );

    if (severity !== 'green') {
      generatedAlert = {
        id: `ALT-${Math.floor(9100 + Math.random() * 800)}`,
        patientId: checkInData.patientId,
        patientName,
        patientAge: patient?.age || 68,
        surgery,
        severity,
        status: 'new',
        detectedAt: 'Just now (Patient Check-In)',
        reportedChanges: `Pain score: ${checkInData.painScore}/10, Incision: ${checkInData.incisionStatus}, Meds adherence: ${checkInData.medicationsTaken ? 'Yes' : 'No'}. Notes: "${checkInData.notes || 'None'}"`,
        previousBaseline: `Previous baseline pain was ${patient?.recoveryBaseline.currentPain || 4}/10.`,
        reason: alertReason,
        relevantHistory: `${surgery}, Day ${checkInData.dayPostOp} Post-Op. Allergies: ${patient?.allergies.join(', ') || 'None'}.`,
        suggestedAction,
        retrievedGuidelines: severity === 'red' ? [MOCK_RAG_GUIDELINES[0], MOCK_RAG_GUIDELINES[1]] : [MOCK_RAG_GUIDELINES[2]],
      };

      setAlerts((prev) => [generatedAlert!, ...prev]);
      showToast(`Check-in recorded! Clinical alert (${severity.toUpperCase()}) forwarded to Dr. Sarah Chen's dashboard.`);
    } else {
      showToast('Check-in submitted successfully! Recovery indicators within expected routine range.');
    }

    return generatedAlert;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        patients,
        addPatient,
        updatePatient,
        alerts,
        updateAlertStatus,
        monitoringProfiles,
        saveMonitoringProfile,
        submitPatientCheckIn,
        selectedPatientId,
        setSelectedPatientId,
        triageAlert,
        setTriageAlert,
        isHighContrast,
        setIsHighContrast,
        toastMessage,
        showToast,
        resetDemoData,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-slate-900 text-white text-sm font-medium rounded-xl shadow-2xl border border-slate-700 animate-bounce duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
