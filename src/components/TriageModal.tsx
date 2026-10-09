import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Phone, 
  CheckCircle, 
  ArrowUpRight, 
  BookOpen, 
  FileText, 
  Stethoscope, 
  User, 
  Clock, 
  AlertTriangle,
  Send
} from 'lucide-react';
import { Alert, AlertStatus } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface TriageModalProps {
  alert: Alert | null;
  onClose: () => void;
}

export const TriageModal: React.FC<TriageModalProps> = ({ alert, onClose }) => {
  const { updateAlertStatus, setSelectedPatientId } = useApp();
  const navigate = useNavigate();
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'guidelines' | 'actions'>('details');

  if (!alert) return null;

  const handleStatusChange = (status: AlertStatus) => {
    updateAlertStatus(alert.id, status, clinicalNotes || alert.clinicalNotes);
    onClose();
  };

  const handleOpenPatientProfile = () => {
    setSelectedPatientId(alert.patientId);
    onClose();
    navigate('/dashboard/patients');
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'red':
        return {
          bg: 'bg-red-50 border-red-200 text-red-800',
          badge: 'bg-red-600 text-white',
          label: 'RED • Urgent Clinical Review Required',
        };
      case 'amber':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          badge: 'bg-amber-600 text-white',
          label: 'AMBER • Warning / Protocol Deviation',
        };
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          badge: 'bg-emerald-600 text-white',
          label: 'GREEN • Routine Monitoring Event',
        };
    }
  };

  const style = getSeverityStyle(alert.severity);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Severity Indicator */}
        <div className={`p-5 border-b ${style.bg} flex items-start justify-between gap-4`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${style.badge} shadow-sm`}>
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.badge}`}>
                  {alert.severity} Priority
                </span>
                <span className="text-xs text-slate-500 font-mono">ID: {alert.id}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {alert.detectedAt}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Clinical Triage: {alert.patientName}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {alert.surgery} • Patient ID: {alert.patientId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'details'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Reported Changes & Baseline
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'guidelines'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Retrieved Clinical Context (RAG)</span>
            {alert.retrievedGuidelines && alert.retrievedGuidelines.length > 0 && (
              <span className="bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded-full text-[10px]">
                {alert.retrievedGuidelines.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'actions'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Clinician Action & Notes
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {activeTab === 'details' && (
            <>
              {/* Reported Changes vs Baseline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-900 uppercase tracking-wide mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span>Reported Changes</span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {alert.reportedChanges}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Previous Baseline</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {alert.previousBaseline}
                  </p>
                </div>
              </div>

              {/* AI Clinical Reasoning */}
              <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-900 bg-sky-200 px-2 py-0.5 rounded">
                    AI Decision-Support Rationale
                  </span>
                  <span className="text-[11px] text-sky-700 italic">
                    (Requires clinical verification)
                  </span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {alert.reason}
                </p>
              </div>

              {/* Recommended Next Step */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-900 uppercase tracking-wide mb-1">
                  Suggested Clinical Next Step
                </div>
                <p className="text-sm text-emerald-950 font-medium">
                  {alert.suggestedAction}
                </p>
              </div>

              {/* Patient History snippet */}
              <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                <strong>Relevant Medical Context:</strong> {alert.relevantHistory}
              </div>
            </>
          )}

          {activeTab === 'guidelines' && (
            <div className="space-y-4">
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-center justify-between">
                <span>RAG Retrieval Vector Similarity Search Score: <strong>94.8%</strong></span>
                <span className="bg-teal-200 text-teal-800 px-2 py-0.5 rounded font-semibold text-[10px]">Curated Clinical DB</span>
              </div>

              {alert.retrievedGuidelines && alert.retrievedGuidelines.length > 0 ? (
                alert.retrievedGuidelines.map((guideline, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-700">{guideline.source}</span>
                      <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-mono">
                        Relevance: {(guideline.relevanceScore * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">{guideline.citation}</p>
                    <p className="text-xs text-slate-600 leading-relaxed italic bg-white p-2.5 rounded border border-slate-200">
                      "{guideline.content}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  No external guideline citations attached for routine baseline check-in.
                </div>
              )}
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Add Clinical Reviewer Notes (Dr. Sarah Chen, MD):
                </label>
                <textarea
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Enter clinical assessment, e.g., 'Called patient, confirmed calf pain started this morning. Scheduled right lower extremity duplex scan for 2 PM today...'"
                  rows={4}
                  className="w-full text-sm p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Supervised Care Protocol:</strong> Clinical actions taken here update the patient's electronic follow-up chart in local demo state.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleOpenPatientProfile}
            className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 transition"
          >
            <User className="w-3.5 h-3.5" />
            <span>Open Full Patient Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStatusChange('under_review')}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
            >
              Mark In Review
            </button>
            <button
              onClick={() => handleStatusChange('escalated')}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition shadow-xs flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Escalate Care</span>
            </button>
            <button
              onClick={() => handleStatusChange('resolved')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Mark Resolved</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
