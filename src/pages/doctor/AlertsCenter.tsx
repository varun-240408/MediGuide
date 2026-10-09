import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Clock, 
  BookOpen, 
  User, 
  ArrowUpRight, 
  Check, 
  PhoneCall, 
  Layers,
  HeartCrack,
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TriageModal } from '../../components/TriageModal';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertSeverity, AlertStatus } from '../../types';

export const AlertsCenter: React.FC = () => {
  const { alerts, updateAlertStatus, setSelectedPatientId, triageAlert, setTriageAlert } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'red' | 'amber' | 'green'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const redCount = alerts.filter(a => a.severity === 'red').length;
  const amberCount = alerts.filter(a => a.severity === 'amber').length;
  const greenCount = alerts.filter(a => a.severity === 'green').length;

  const filteredAlerts = alerts.filter((alert) => {
    const matchesTab = activeTab === 'all' || alert.severity === activeTab;
    const matchesSearch = 
      alert.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.reportedChanges.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getAlertCardStyle = (severity: AlertSeverity) => {
    switch (severity) {
      case 'red':
        return {
          border: 'border-red-200 hover:border-red-400 bg-white',
          headerBg: 'bg-red-50/70 border-b border-red-100',
          badge: 'bg-red-600 text-white',
          iconColor: 'text-red-600',
          titleColor: 'text-red-950',
          label: 'HIGH PRIORITY • Urgent Clinical Review Required',
        };
      case 'amber':
        return {
          border: 'border-amber-200 hover:border-amber-400 bg-white',
          headerBg: 'bg-amber-50/70 border-b border-amber-100',
          badge: 'bg-amber-600 text-white',
          iconColor: 'text-amber-600',
          titleColor: 'text-amber-950',
          label: 'CAUTION • Protocol Deviation Flagged',
        };
      default:
        return {
          border: 'border-emerald-200 hover:border-emerald-400 bg-white',
          headerBg: 'bg-emerald-50/70 border-b border-emerald-100',
          badge: 'bg-emerald-600 text-white',
          iconColor: 'text-emerald-600',
          titleColor: 'text-emerald-950',
          label: 'ROUTINE • Expected Recovery Milestone',
        };
    }
  };

  const handleViewPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    navigate('/dashboard/patients');
  };

  const handleMarkReviewed = (alertId: string) => {
    updateAlertStatus(alertId, 'resolved', 'Clinician verified and acknowledged routine/resolved check-in.');
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Clinical Alerts & Triage Center</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Proactive complication detection • Human-in-the-loop review queue for post-op cohorts
        </p>
      </div>

      {/* Emergency Notice Banner */}
      <div className="p-4 bg-red-600 text-white rounded-2xl shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/20">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Critical Safety Standard:</p>
            <p className="text-xs text-red-100 mt-0.5">
              Patients reporting acute emergency symptoms (chest pain, dyspnea, heavy hemorrhage) are instructed to call 911 immediately. MediGuide alerts serve as clinical decision support.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold bg-white text-red-700 px-3 py-1 rounded-lg shrink-0 hidden sm:inline-block">
          Protocol 911 / ER Active
        </span>
      </div>

      {/* Filters and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab('red')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'red' ? 'bg-red-600 text-white shadow-xs' : 'text-red-700 hover:bg-red-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span>Red Priority ({redCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('amber')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'amber' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-300" />
            <span>Amber Caution ({amberCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('green')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'green' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-300" />
            <span>Green Routine ({greenCount})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search alerts or symptoms..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => {
            const style = getAlertCardStyle(alert.severity);
            return (
              <div
                key={alert.id}
                className={`rounded-2xl border ${style.border} shadow-xs transition hover:shadow-md overflow-hidden`}
              >
                {/* Alert Card Header */}
                <div className={`p-4 ${style.headerBg} flex flex-wrap items-center justify-between gap-3`}>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${style.badge}`}>
                      {alert.severity}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`text-base font-bold ${style.titleColor}`}>
                          {alert.patientName} <span className="text-slate-500 font-normal">({alert.patientAge}y)</span>
                        </h3>
                        <span className="text-xs text-slate-500 font-mono">[{alert.patientId}]</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        {alert.surgery}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {alert.detectedAt}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      alert.status === 'new' ? 'bg-red-600 text-white animate-pulse' :
                      alert.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                      alert.status === 'escalated' ? 'bg-purple-100 text-purple-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {alert.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Alert Body */}
                <div className="p-5 space-y-4">
                  {/* Reported changes vs baseline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-800 mb-1">Reported Clinical Changes:</p>
                      <p className="text-slate-700 leading-relaxed font-medium">
                        {alert.reportedChanges}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-800 mb-1">Previous Baseline:</p>
                      <p className="text-slate-600 leading-relaxed">
                        {alert.previousBaseline}
                      </p>
                    </div>
                  </div>

                  {/* Reason for Alert */}
                  <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-950">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <ShieldAlert className="w-4 h-4 text-sky-700" />
                      <span>AI Decision-Support Triage Reason:</span>
                    </div>
                    <p className="leading-relaxed">
                      {alert.reason}
                    </p>
                  </div>

                  {/* Retrieved Clinical Guidelines Citation if attached */}
                  {alert.retrievedGuidelines && alert.retrievedGuidelines.length > 0 && (
                    <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200 text-xs text-teal-950">
                      <p className="font-bold mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                        <span>RAG Retrieved Medical Guideline: {alert.retrievedGuidelines[0].source}</span>
                      </p>
                      <p className="italic text-teal-900 leading-relaxed">
                        "{alert.retrievedGuidelines[0].content}"
                      </p>
                    </div>
                  )}

                  {/* Clinician Notes if present */}
                  {alert.clinicalNotes && (
                    <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
                      <strong>Doctor Notes ({alert.reviewedBy} at {alert.reviewedAt}):</strong> {alert.clinicalNotes}
                    </div>
                  )}
                </div>

                {/* Alert Card Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    <strong>Medical History:</strong> {alert.relevantHistory}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTriageAlert(alert)}
                      className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold transition shadow-xs"
                    >
                      Review Alert
                    </button>
                    <button
                      onClick={() => handleViewPatient(alert.patientId)}
                      className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition"
                    >
                      View Patient
                    </button>
                    {alert.status !== 'resolved' && (
                      <button
                        onClick={() => handleMarkReviewed(alert.id)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold transition flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Reviewed</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400">
            No alerts found in category '{activeTab}'.
          </div>
        )}
      </div>

      <TriageModal alert={triageAlert} onClose={() => setTriageAlert(null)} />

    </div>
  );
};
