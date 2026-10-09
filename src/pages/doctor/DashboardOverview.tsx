import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  CalendarClock, 
  ShieldAlert, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Plus, 
  Activity, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { TriageModal } from '../../components/TriageModal';
import { AddPatientModal } from '../../components/AddPatientModal';
import { Link, useNavigate } from 'react-router-dom';
import { AlertSeverity } from '../../types';

// Demo data for recovery trajectory chart
const recoveryTrendData = [
  { day: 'Day 1', avgPain: 6.8, expectedPain: 6.5, adherence: 98 },
  { day: 'Day 2', avgPain: 5.9, expectedPain: 5.8, adherence: 96 },
  { day: 'Day 3', avgPain: 4.8, expectedPain: 4.9, adherence: 95 },
  { day: 'Day 4', avgPain: 4.2, expectedPain: 4.1, adherence: 94 },
  { day: 'Day 5', avgPain: 3.5, expectedPain: 3.4, adherence: 97 },
  { day: 'Day 6', avgPain: 2.8, expectedPain: 2.9, adherence: 93 },
  { day: 'Day 7', avgPain: 2.1, expectedPain: 2.2, adherence: 95 },
];

export const DashboardOverview: React.FC = () => {
  const { patients, alerts, triageAlert, setTriageAlert, setSelectedPatientId } = useApp();
  const navigate = useNavigate();

  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'red' | 'amber' | 'green'>('all');

  const totalMonitored = patients.length;
  const requiringAttention = patients.filter(p => p.alertStatus === 'red' || p.alertStatus === 'amber').length;
  const scheduledToday = 18;
  const pendingReview = alerts.filter(a => a.status === 'new').length;

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = 
      alert.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.surgery.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'red':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">Red Priority</span>;
      case 'amber':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">Amber Caution</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Green Normal</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-600 text-white animate-pulse">Awaiting Review</span>;
      case 'under_review':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">In Triage</span>;
      case 'escalated':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-100 text-purple-800">Escalated</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">Resolved</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Clinical Overview Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time proactive monitoring • Department of Orthopedic & Surgical Recovery
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddPatientOpen(true)}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Patient</span>
          </button>
          <Link
            to="/dashboard/alerts"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>View All Alerts ({alerts.length})</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Monitored</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalMonitored}</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <span>+3 new discharges today</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Requiring Attention</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{requiringAttention}</h3>
            <p className="text-[11px] text-amber-700 font-medium mt-1 flex items-center gap-1">
              <span>Deviating from recovery protocol</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Follow-Ups Today</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{scheduledToday}</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <span>94.2% completion adherence</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
            <CalendarClock className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Awaiting Review</p>
            <h3 className="text-2xl font-extrabold text-red-600 mt-1">{pendingReview}</h3>
            <p className="text-[11px] text-red-700 font-medium mt-1 flex items-center gap-1">
              <span>Needs prompt clinical review</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recovery Trend Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Cohort Recovery & Pain Trajectory</h3>
              <p className="text-xs text-slate-500">Average reported pain score vs expected clinical pathway</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-sky-700">
                <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
                Actual Reported Pain (0-10)
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
                Expected Baseline
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recoveryTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="painGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="avgPain" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#painGradient)" name="Reported Pain" />
                <Area type="monotone" dataKey="expectedPain" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} fillOpacity={0} name="Expected Baseline" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl text-xs text-sky-900 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-sky-600" />
              <span>Overall cohort shows healthy downward slope in post-op pain by Day 5.</span>
            </span>
            <Link to="/dashboard/reports" className="font-semibold text-sky-700 hover:underline">
              View Detailed Analytics →
            </Link>
          </div>
        </div>

        {/* Live Patient Activity Stream (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Patient Activity</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Live Feed</span>
          </div>

          <div className="space-y-3.5">
            {patients.slice(0, 4).map((patient) => (
              <div 
                key={patient.id} 
                onClick={() => {
                  setSelectedPatientId(patient.id);
                  navigate('/dashboard/patients');
                }}
                className="p-3 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-slate-50/80 transition cursor-pointer flex items-start gap-3"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                  patient.alertStatus === 'red' 
                    ? 'bg-red-100 text-red-700' 
                    : patient.alertStatus === 'amber' 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 truncate">{patient.name}</p>
                    <span className="text-[10px] text-slate-400">{patient.lastCheckIn}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{patient.surgery}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      patient.alertStatus === 'red' ? 'bg-red-50 text-red-700' :
                      patient.alertStatus === 'amber' ? 'bg-amber-50 text-amber-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      Pain: {patient.recoveryBaseline.currentPain}/10
                    </span>
                    <span className="text-[10px] text-slate-400">Day {patient.daysPostOp} Post-Op</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/dashboard/patients"
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition"
          >
            <span>View All Monitored Patients</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Alerts Awaiting Review Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span>Surgical Follow-Up Alerts</span>
            </h3>
            <p className="text-xs text-slate-500">Triage and review patient-reported changes and RAG-flagged deviations</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient or symptom..."
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 w-48 sm:w-60"
              />
            </div>

            {/* Severity Filter */}
            <div className="flex items-center text-xs bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setSeverityFilter('all')}
                className={`px-2.5 py-1 rounded font-medium ${severityFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setSeverityFilter('red')}
                className={`px-2.5 py-1 rounded font-medium ${severityFilter === 'red' ? 'bg-white text-red-700 shadow-xs' : 'text-slate-600'}`}
              >
                Red
              </button>
              <button
                onClick={() => setSeverityFilter('amber')}
                className={`px-2.5 py-1 rounded font-medium ${severityFilter === 'amber' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600'}`}
              >
                Amber
              </button>
              <button
                onClick={() => setSeverityFilter('green')}
                className={`px-2.5 py-1 rounded font-medium ${severityFilter === 'green' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'}`}
              >
                Green
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Patient / Surgery</th>
                <th className="py-3 px-4">Priority Level</th>
                <th className="py-3 px-4">Reported Changes & RAG Reason</th>
                <th className="py-3 px-4">Detected</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-sky-700 transition">
                          {alert.patientName} <span className="text-slate-400 font-normal">({alert.patientAge}y)</span>
                        </p>
                        <p className="text-[11px] text-slate-500">{alert.surgery}</p>
                        <span className="font-mono text-[10px] text-slate-400">ID: {alert.patientId}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getSeverityBadge(alert.severity)}
                    </td>
                    <td className="py-3.5 px-4 max-w-md">
                      <p className="font-medium text-slate-800 line-clamp-2 leading-relaxed">
                        {alert.reportedChanges}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">
                        AI Rationale: {alert.reason}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                      {alert.detectedAt}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(alert.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setTriageAlert(alert)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold text-xs transition shadow-xs"
                      >
                        Review Alert
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPatientId(alert.patientId);
                          navigate('/dashboard/patients');
                        }}
                        className="px-2 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-lg text-xs transition"
                        title="View Patient Record"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    No alerts found matching your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Triage & Add Modals */}
      <TriageModal alert={triageAlert} onClose={() => setTriageAlert(null)} />
      <AddPatientModal isOpen={isAddPatientOpen} onClose={() => setIsAddPatientOpen(false)} />

    </div>
  );
};
