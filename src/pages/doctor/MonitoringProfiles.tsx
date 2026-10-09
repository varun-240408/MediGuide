import React, { useState } from 'react';
import { 
  Sliders, 
  CheckCircle2, 
  Save, 
  HelpCircle, 
  User, 
  Phone, 
  Calendar, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SurgeryCategory, MonitoringProfile } from '../../types';

export const MonitoringProfiles: React.FC = () => {
  const { patients, monitoringProfiles, saveMonitoringProfile, showToast } = useApp();

  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || 'PAT-1082');
  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Form state
  const [condition, setCondition] = useState<SurgeryCategory>(selectedPatient?.surgery || 'Total Knee Arthroplasty');
  const [dischargeDate, setDischargeDate] = useState<string>(selectedPatient?.dischargeDate || new Date().toISOString().split('T')[0]);
  const [durationDays, setDurationDays] = useState<number>(30);
  const [frequency, setFrequency] = useState<'daily_morning' | 'twice_daily' | 'every_48h'>('daily_morning');
  const [preferredChannel, setPreferredChannel] = useState<'text_sms' | 'voice_call' | 'web_portal'>('web_portal');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('English');

  // Included questions toggles
  const [questions, setQuestions] = useState({
    pain: true,
    incision: true,
    fever: true,
    medications: true,
    mobility: true,
    dvtSigns: true,
    generalWellbeing: true,
  });

  // Warning thresholds
  const [maxPainScore, setMaxPainScore] = useState<number>(7);
  const [maxTemperature, setMaxTemperature] = useState<number>(100.4);
  const [consecutiveMissedChecks, setConsecutiveMissedChecks] = useState<number>(2);
  const [flagDrainage, setFlagDrainage] = useState<boolean>(true);

  // Escalation team
  const [escalationTeam, setEscalationTeam] = useState<string>('Orthopedic Joint Recovery Team A');
  const [careTeamContact, setCareTeamContact] = useState<string>('Dr. Sarah Chen, MD & Nurse Practitioner Miller (ext 4482)');

  const [savedSuccessBanner, setSavedSuccessBanner] = useState(false);

  // Apply pre-set template
  const applyTemplate = (type: 'ortho' | 'abdominal' | 'cardiac') => {
    if (type === 'ortho') {
      setCondition('Total Knee Arthroplasty');
      setDurationDays(30);
      setFrequency('daily_morning');
      setMaxPainScore(7);
      setMaxTemperature(100.4);
      setQuestions({
        pain: true,
        incision: true,
        fever: true,
        medications: true,
        mobility: true,
        dvtSigns: true,
        generalWellbeing: true,
      });
      setEscalationTeam('Joint Reconstruction Care Team');
      showToast('Loaded Orthopedic Joint Recovery Protocol Template');
    } else if (type === 'abdominal') {
      setCondition('Laparoscopic Cholecystectomy');
      setDurationDays(14);
      setFrequency('daily_morning');
      setMaxPainScore(6);
      setMaxTemperature(100.4);
      setQuestions({
        pain: true,
        incision: true,
        fever: true,
        medications: true,
        mobility: false,
        dvtSigns: false,
        generalWellbeing: true,
      });
      setEscalationTeam('Outpatient General Surgery Team');
      showToast('Loaded Abdominal Surgery Recovery Template');
    } else {
      setCondition('Coronary Artery Bypass (CABG)');
      setDurationDays(45);
      setFrequency('twice_daily');
      setMaxPainScore(5);
      setMaxTemperature(100.2);
      setQuestions({
        pain: true,
        incision: true,
        fever: true,
        medications: true,
        mobility: true,
        dvtSigns: true,
        generalWellbeing: true,
      });
      setEscalationTeam('Cardiovascular Post-Op Intensive Team');
      showToast('Loaded Cardiac Surgical Protocol Template');
    }
  };

  const handlePatientSelectChange = (patId: string) => {
    setSelectedPatientId(patId);
    const pat = patients.find((p) => p.id === patId);
    if (pat) {
      setCondition(pat.surgery);
      setDischargeDate(pat.dischargeDate);
      // Check if existing profile exists
      const existing = monitoringProfiles.find((pr) => pr.patientId === patId);
      if (existing) {
        setDurationDays(existing.durationDays);
        setFrequency(existing.frequency);
        setPreferredChannel(existing.preferredChannel);
        setPreferredLanguage(existing.preferredLanguage);
        setQuestions(existing.includedQuestions);
        setMaxPainScore(existing.warningThresholds.maxPainScore);
        setMaxTemperature(existing.warningThresholds.maxTemperature);
        setConsecutiveMissedChecks(existing.warningThresholds.consecutiveMissedChecks);
        setFlagDrainage(existing.warningThresholds.flagDrainage);
        setEscalationTeam(existing.escalationTeam);
        setCareTeamContact(existing.careTeamContact);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    saveMonitoringProfile({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      condition,
      dischargeDate,
      durationDays,
      frequency,
      preferredChannel,
      preferredLanguage,
      includedQuestions: questions,
      warningThresholds: {
        maxPainScore,
        maxTemperature,
        consecutiveMissedChecks,
        flagDrainage,
      },
      escalationTeam,
      careTeamContact,
    });

    setSavedSuccessBanner(true);
    setTimeout(() => setSavedSuccessBanner(false), 5000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Monitoring Profile Configuration</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Design clinician-supervised post-discharge check-in schedules, question sets, and early warning thresholds
        </p>
      </div>

      {/* Success Notification Banner */}
      {savedSuccessBanner && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs text-emerald-900 animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Monitoring Profile Saved Successfully!</p>
              <p className="text-emerald-700 mt-0.5">
                Saved in local demo state for {selectedPatient?.name}. Daily automated follow-ups are configured according to this protocol.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSavedSuccessBanner(false)}
            className="text-xs font-semibold text-emerald-800 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Clinical Template Quick-Load Buttons */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold text-slate-800">Quick-Apply Clinical Protocols:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyTemplate('ortho')}
            className="px-3 py-1.5 rounded-lg border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-medium transition"
          >
            Orthopedic Joint Protocol
          </button>
          <button
            type="button"
            onClick={() => applyTemplate('abdominal')}
            className="px-3 py-1.5 rounded-lg border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-medium transition"
          >
            Abdominal Surgery Protocol
          </button>
          <button
            type="button"
            onClick={() => applyTemplate('cardiac')}
            className="px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-medium transition"
          >
            Cardiac Surgical Protocol
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Patient Selection & Condition */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-4 h-4 text-sky-600" />
            <span>1. Patient Assignment & Surgical Procedure</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
              <select
                value={selectedPatientId}
                onChange={(e) => handlePatientSelectChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id}) — {p.surgery}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Recovery Condition / Procedure</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as SurgeryCategory)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
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
              <label className="block font-semibold text-slate-700 mb-1">Discharge Date</label>
              <input
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Cadence & Communication */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>2. Follow-Up Schedule & Communication Preferences</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Monitoring Duration</label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value={14}>14 Days (Standard Outpatient)</option>
                <option value={30}>30 Days (Standard Arthroplasty)</option>
                <option value={60}>60 Days (Extended Recovery)</option>
                <option value={90}>90 Days (Complex Joint/Spine)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Follow-Up Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="daily_morning">Daily (Morning at 09:00 AM)</option>
                <option value="twice_daily">Twice Daily (Morning & Evening)</option>
                <option value="every_48h">Every 48 Hours</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Channel</label>
              <select
                value={preferredChannel}
                onChange={(e) => setPreferredChannel(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="web_portal">Web Portal (High Contrast)</option>
                <option value="voice_call">Automated Voice Call (TTS)</option>
                <option value="text_sms">SMS Text Micro-Checkin</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Preferred Language</label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="Mandarin">Mandarin (中文)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Questions to Ask */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. Clinical Questions To Ask In Follow-Up</span>
            </h3>
            <span className="text-xs text-slate-400">Questions are presented one-at-a-time to patients</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white cursor-pointer transition">
              <input
                type="checkbox"
                checked={questions.pain}
                onChange={(e) => setQuestions({ ...questions, pain: e.target.checked })}
                className="mt-0.5 rounded text-sky-600"
              />
              <div>
                <p className="font-bold text-slate-900">Numeric Pain Score (0 - 10)</p>
                <p className="text-slate-500 text-[11px] mt-0.5">"How would you rate your surgical pain today from 0 (none) to 10 (severe)?"</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white cursor-pointer transition">
              <input
                type="checkbox"
                checked={questions.incision}
                onChange={(e) => setQuestions({ ...questions, incision: e.target.checked })}
                className="mt-0.5 rounded text-sky-600"
              />
              <div>
                <p className="font-bold text-slate-900">Incision Inspection & Drainage</p>
                <p className="text-slate-500 text-[11px] mt-0.5">"Is your incision site clean and dry, or do you notice new redness or fluid drainage?"</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white cursor-pointer transition">
              <input
                type="checkbox"
                checked={questions.fever}
                onChange={(e) => setQuestions({ ...questions, fever: e.target.checked })}
                className="mt-0.5 rounded text-sky-600"
              />
              <div>
                <p className="font-bold text-slate-900">Body Temperature & Chills</p>
                <p className="text-slate-500 text-[11px] mt-0.5">"Have you experienced any fever, chills, or body sweating since yesterday?"</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white cursor-pointer transition">
              <input
                type="checkbox"
                checked={questions.medications}
                onChange={(e) => setQuestions({ ...questions, medications: e.target.checked })}
                className="mt-0.5 rounded text-sky-600"
              />
              <div>
                <p className="font-bold text-slate-900">Medication Adherence</p>
                <p className="text-slate-500 text-[11px] mt-0.5">"Have you taken all prescribed medications including blood thinners and pain pills?"</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white cursor-pointer transition">
              <input
                type="checkbox"
                checked={questions.mobility}
                onChange={(e) => setQuestions({ ...questions, mobility: e.target.checked })}
                className="mt-0.5 rounded text-sky-600"
              />
              <div>
                <p className="font-bold text-slate-900">Mobility & Weight-Bearing Milestones</p>
                <p className="text-slate-500 text-[11px] mt-0.5">"Were you able to walk and perform your prescribed physical therapy exercises?"</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white cursor-pointer transition">
              <input
                type="checkbox"
                checked={questions.dvtSigns}
                onChange={(e) => setQuestions({ ...questions, dvtSigns: e.target.checked })}
                className="mt-0.5 rounded text-sky-600"
              />
              <div>
                <p className="font-bold text-slate-900">Calf Tenderness & Warmth (DVT Signs)</p>
                <p className="text-slate-500 text-[11px] mt-0.5">"Do you feel unexpected tightness, localized swelling, or warmth in your calf?"</p>
              </div>
            </label>
          </div>
        </div>

        {/* Section 4: Warning Signs & Thresholds */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>4. Clinician-Defined Warning Signs & Trigger Thresholds</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="block font-semibold text-slate-700">
                Pain Alert Threshold: <span className="font-bold text-red-600">{maxPainScore}/10</span>
              </label>
              <input
                type="range"
                min="4"
                max="10"
                value={maxPainScore}
                onChange={(e) => setMaxPainScore(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <p className="text-[10px] text-slate-500">Flags immediate clinical review if reported pain &ge; {maxPainScore}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="block font-semibold text-slate-700">
                Fever Threshold: <span className="font-bold text-red-600">{maxTemperature}°F (38.0°C)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="99.5"
                max="104.0"
                value={maxTemperature}
                onChange={(e) => setMaxTemperature(Number(e.target.value))}
                className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg outline-none"
              />
              <p className="text-[10px] text-slate-500">CDC Surgical Site Infection guideline standard</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="block font-semibold text-slate-700">
                Missed Check-In Alert: <span className="font-bold text-amber-600">{consecutiveMissedChecks} checks</span>
              </label>
              <select
                value={consecutiveMissedChecks}
                onChange={(e) => setConsecutiveMissedChecks(Number(e.target.value))}
                className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg outline-none"
              >
                <option value={1}>1 Missed Check-In (Immediate Flag)</option>
                <option value={2}>2 Missed Check-Ins (Protocol Default)</option>
                <option value={3}>3 Missed Check-Ins</option>
              </select>
              <p className="text-[10px] text-slate-500">Never assume patient is healthy if unresponsive</p>
            </div>
          </div>
        </div>

        {/* Section 5: Escalation Team */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Phone className="w-4 h-4 text-purple-600" />
            <span>5. Escalation Contacts & Care Team</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Clinical Care Team</label>
              <input
                type="text"
                value={escalationTeam}
                onChange={(e) => setEscalationTeam(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Triage Phone / Pager Contact</label>
              <input
                type="text"
                value={careTeamContact}
                onChange={(e) => setCareTeamContact(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-100 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Profile stored locally in demo state. Ready for ElizaOS scheduled runner integration.</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-sky-600/20 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Monitoring Profile</span>
          </button>
        </div>

      </form>

    </div>
  );
};
