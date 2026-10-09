import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Sliders, 
  ArrowUpRight, 
  ShieldAlert, 
  HeartPulse, 
  Pill, 
  Calendar, 
  Phone, 
  Clock, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { AddPatientModal } from '../../components/AddPatientModal';
import { useNavigate } from 'react-router-dom';
import { Patient, AlertSeverity, SurgeryCategory } from '../../types';

export const PatientsList: React.FC = () => {
  const { patients, selectedPatientId, setSelectedPatientId, alerts, setTriageAlert } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [surgeryFilter, setSurgeryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  // Selected patient for the detailed right/bottom drawer view
  const currentSelectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.surgery.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSurgery = surgeryFilter === 'all' || patient.surgery === surgeryFilter;
    const matchesStatus = statusFilter === 'all' || patient.alertStatus === statusFilter;

    return matchesSearch && matchesSurgery && matchesStatus;
  });

  const getAlertBadge = (status: AlertSeverity) => {
    switch (status) {
      case 'red':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">Red Alert</span>;
      case 'amber':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">Caution</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Stable</span>;
    }
  };

  // Format recovery check-in chart data for the selected patient
  const patientCheckInGraphData = currentSelectedPatient?.recentCheckIns?.map((chk) => ({
    day: `Day ${chk.dayPostOp}`,
    pain: chk.painScore,
    temp: chk.temperature || 98.6,
  })).reverse() || [];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Patient Management Registry</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Post-discharge monitoring cohorts, clinical baselines, and individual check-in trends
          </p>
        </div>
        <button
          onClick={() => setIsAddPatientOpen(true)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient name, ID, or procedure..."
            className="w-full text-xs outline-none bg-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Surgery filter */}
          <select
            value={surgeryFilter}
            onChange={(e) => setSurgeryFilter(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="all">All Procedures</option>
            <option value="Total Knee Arthroplasty">Total Knee Arthroplasty</option>
            <option value="Total Hip Replacement">Total Hip Replacement</option>
            <option value="Laparoscopic Cholecystectomy">Laparoscopic Cholecystectomy</option>
            <option value="Lumbar Discectomy">Lumbar Discectomy</option>
            <option value="Coronary Artery Bypass (CABG)">Coronary Artery Bypass (CABG)</option>
            <option value="Inguinal Hernia Repair">Inguinal Hernia Repair</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="all">All Alert Statuses</option>
            <option value="red">Red (Urgent)</option>
            <option value="amber">Amber (Warning)</option>
            <option value="green">Green (Normal)</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Patient List Table (Left) & Detailed Patient Profile Drawer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Patient Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" />
              <span>Monitored Patients ({filteredPatients.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Click row to inspect clinical record</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3.5">Patient Details</th>
                  <th className="py-3 px-3.5">Discharge / Post-Op</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5">Last Check-In</th>
                  <th className="py-3 px-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((patient) => {
                  const isSelected = patient.id === currentSelectedPatient?.id;
                  return (
                    <tr
                      key={patient.id}
                      onClick={() => setSelectedPatientId(patient.id)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-sky-50/80 font-medium' : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {patient.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              {patient.name} <span className="text-slate-400 font-normal">({patient.age}y, {patient.gender[0]})</span>
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">{patient.surgery}</p>
                            <span className="text-[10px] font-mono text-slate-400">{patient.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <p className="font-semibold text-slate-800">Day {patient.daysPostOp} Post-Op</p>
                        <p className="text-[11px] text-slate-400">Discharged: {patient.dischargeDate}</p>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {getAlertBadge(patient.alertStatus)}
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <p className="text-slate-700">{patient.lastCheckIn}</p>
                        <p className="text-[10px] text-slate-400">Next: {patient.nextFollowUp}</p>
                      </td>
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/dashboard/profiles');
                          }}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                          title="Configure Monitoring Plan"
                        >
                          <Sliders className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Patient Profile (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          {currentSelectedPatient ? (
            <>
              {/* Profile Card Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {currentSelectedPatient.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">{currentSelectedPatient.name}</h2>
                      {getAlertBadge(currentSelectedPatient.alertStatus)}
                    </div>
                    <p className="text-xs text-slate-500">
                      {currentSelectedPatient.surgery} • ID: <span className="font-mono">{currentSelectedPatient.id}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/dashboard/profiles')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure</span>
                </button>
              </div>

              {/* Vitals & Summary Metrics */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Pain</span>
                  <p className="text-base font-extrabold text-slate-900">
                    {currentSelectedPatient.recoveryBaseline.currentPain} / 10
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Expected D7</span>
                  <p className="text-base font-extrabold text-sky-600">
                    {currentSelectedPatient.recoveryBaseline.expectedPainDay7} / 10
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Post-Op Day</span>
                  <p className="text-base font-extrabold text-teal-600">
                    Day {currentSelectedPatient.daysPostOp}
                  </p>
                </div>
              </div>

              {/* Recovery Trend Graph for this Patient */}
              {patientCheckInGraphData.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Reported Pain Trajectory (Last Check-Ins)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Score 0 - 10</span>
                  </div>
                  <div className="h-32 w-full bg-slate-50/50 rounded-xl p-2 border border-slate-100">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={patientCheckInGraphData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#64748b' }} width={20} />
                        <Tooltip />
                        <Line type="monotone" dataKey="pain" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} name="Pain Score" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Contact & Surgery Information */}
              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">Clinical Demographics</p>
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Phone</span>
                    <span className="font-medium text-slate-800">{currentSelectedPatient.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Surgeon</span>
                    <span className="font-medium text-slate-800">{currentSelectedPatient.primarySurgeon}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Emergency Contact</span>
                    <span className="font-medium text-slate-800">{currentSelectedPatient.emergencyContact.name} ({currentSelectedPatient.emergencyContact.phone})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Known Allergies</span>
                    <span className="font-medium text-red-700">{currentSelectedPatient.allergies.join(', ') || 'None'}</span>
                  </div>
                </div>
              </div>

              {/* Medications entered by care team */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-800 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-teal-600" />
                    <span>Current Medications & Adherence</span>
                  </p>
                </div>
                <div className="space-y-1.5">
                  {currentSelectedPatient.medications.map((med, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">{med.name} <span className="font-normal text-slate-500">({med.dosage})</span></p>
                        <p className="text-[11px] text-slate-500">{med.frequency} • {med.purpose}</p>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        {med.adherenceRate}% Adherence
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Check-In History / Timeline */}
              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-800 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Recent Check-In Logs</span>
                </p>
                <div className="space-y-2">
                  {currentSelectedPatient.recentCheckIns?.map((chk) => (
                    <div key={chk.id} className="p-2.5 rounded-xl border border-slate-200 bg-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Day {chk.dayPostOp} Check-In</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(chk.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Pain: <strong>{chk.painScore}/10</strong> • Incision: <strong>{chk.incisionStatus.replace('_', ' ')}</strong> • Meds: {chk.medicationsTaken ? 'Yes' : 'No'}
                      </p>
                      {chk.notes && (
                        <p className="text-[11px] text-slate-700 bg-slate-50 p-1.5 rounded italic">
                          "{chk.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </>
          ) : (
            <div className="text-center py-12 text-slate-400">
              Select a patient from the list to view full profile.
            </div>
          )}
        </div>

      </div>

      <AddPatientModal isOpen={isAddPatientOpen} onClose={() => setIsAddPatientOpen(false)} />

    </div>
  );
};
