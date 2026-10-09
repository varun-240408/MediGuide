import React, { useState } from 'react';
import { X, UserPlus, ShieldAlert, Check } from 'lucide-react';
import { SurgeryCategory } from '../types';
import { useApp } from '../context/AppContext';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose }) => {
  const { addPatient } = useApp();

  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(65);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('(555) 321-7654');
  const [email, setEmail] = useState('');
  const [surgery, setSurgery] = useState<SurgeryCategory>('Total Knee Arthroplasty');
  const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
  const [emergencyContactName, setEmergencyContactName] = useState('Karen Smith (Daughter)');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('(555) 321-7655');
  const [allergies, setAllergies] = useState('Penicillin');
  const [medicalHistory, setMedicalHistory] = useState('Hypertension, Osteoarthritis');
  const [initialPain, setInitialPain] = useState<number>(3);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addPatient({
      name: name.trim(),
      age: Number(age),
      gender,
      phone,
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@demo-patient.com`,
      emergencyContact: {
        name: emergencyContactName,
        relationship: 'Primary Contact',
        phone: emergencyContactPhone,
      },
      surgery,
      dischargeDate,
      allergies: allergies.split(',').map((s) => s.trim()).filter(Boolean),
      medicalHistory: medicalHistory.split(',').map((s) => s.trim()).filter(Boolean),
      recoveryBaseline: {
        expectedPainDay7: 2,
        expectedMobilityDay7: 'Independent walking with cane',
        currentPain: initialPain,
        baselineNotes: 'Post-op discharge plan configured. Standard proactive protocol.',
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-sky-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-600 text-white shadow-sm">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Enroll Post-Op Patient</h3>
              <p className="text-xs text-slate-500">Add patient into MediGuide proactive monitoring registry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Patient Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Samuel Henderson"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                <input
                  type="number"
                  min="18"
                  max="105"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Surgical Procedure *</label>
              <select
                value={surgery}
                onChange={(e) => setSurgery(e.target.value as SurgeryCategory)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              >
                <option value="Total Knee Arthroplasty">Total Knee Arthroplasty (TKA)</option>
                <option value="Total Hip Replacement">Total Hip Replacement (THR)</option>
                <option value="Laparoscopic Cholecystectomy">Laparoscopic Cholecystectomy</option>
                <option value="Lumbar Discectomy">Lumbar Discectomy</option>
                <option value="Coronary Artery Bypass (CABG)">Coronary Artery Bypass (CABG)</option>
                <option value="Inguinal Hernia Repair">Inguinal Hernia Repair</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Discharge Date</label>
              <input
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <p className="text-xs font-bold text-slate-800">Caregiver & Emergency Contact</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Contact Name (e.g. Karen Smith)"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-sky-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Emergency Phone"
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Allergies (comma-separated)</label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="e.g. Penicillin, Sulfa"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Medical History / Comorbidities</label>
            <input
              type="text"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              placeholder="e.g. Hypertension, Type 2 Diabetes"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Discharge Pain Baseline: <span className="font-bold text-sky-700">{initialPain} / 10</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={initialPain}
              onChange={(e) => setInitialPain(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Enroll Patient</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
