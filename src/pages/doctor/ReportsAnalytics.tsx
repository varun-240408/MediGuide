import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  FileSpreadsheet, 
  Filter, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';
import { useApp } from '../../context/AppContext';

// Weekly activity data
const weeklyActivityData = [
  { week: 'Week 1', completed: 112, missed: 8 },
  { week: 'Week 2', completed: 128, missed: 6 },
  { week: 'Week 3', completed: 140, missed: 7 },
  { week: 'Week 4', completed: 135, missed: 5 },
];

// Recovery trajectory comparison
const recoveryTrajectoryData = [
  { day: 'Day 1', arthroplasty: 6.8, laparoscopy: 4.5, bypass: 5.8 },
  { day: 'Day 3', arthroplasty: 5.2, laparoscopy: 3.1, bypass: 4.4 },
  { day: 'Day 5', arthroplasty: 3.8, laparoscopy: 1.8, bypass: 3.5 },
  { day: 'Day 7', arthroplasty: 2.7, laparoscopy: 0.9, bypass: 2.6 },
  { day: 'Day 10', arthroplasty: 1.8, laparoscopy: 0.4, bypass: 1.9 },
  { day: 'Day 14', arthroplasty: 1.1, laparoscopy: 0.2, bypass: 1.2 },
];

const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

export const ReportsAnalytics: React.FC = () => {
  const { patients, alerts, showToast } = useApp();

  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedPatientReport, setSelectedPatientReport] = useState<string>('all');

  const redCount = alerts.filter(a => a.severity === 'red').length;
  const amberCount = alerts.filter(a => a.severity === 'amber').length;
  const greenCount = alerts.filter(a => a.severity === 'green').length;

  const alertsDistribution = [
    { name: 'Red (High Priority)', value: redCount },
    { name: 'Amber (Caution)', value: amberCount },
    { name: 'Green (Routine)', value: greenCount },
  ];

  const handleExportCSV = () => {
    showToast('Exporting post-operative monitoring report (CSV simulated)...');
    setTimeout(() => {
      showToast('Downloaded: MediGuide_Recovery_Report_30D.csv');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Clinical Reports & Adherence Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cohort completion statistics, complication frequency, and recovery velocity
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Patient Filter */}
          <select
            value={selectedPatientReport}
            onChange={(e) => setSelectedPatientReport(e.target.value)}
            className="text-xs border border-slate-300 rounded-xl px-3 py-2 bg-white font-medium outline-none"
          >
            <option value="all">Cohort: All Monitored Patients</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id})
              </option>
            ))}
          </select>

          {/* Date range */}
          <div className="flex items-center text-xs bg-slate-100 p-0.5 rounded-xl border border-slate-200 font-medium">
            <button
              onClick={() => setDateRange('7d')}
              className={`px-2.5 py-1.5 rounded-lg ${dateRange === '7d' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              7 Days
            </button>
            <button
              onClick={() => setDateRange('30d')}
              className={`px-2.5 py-1.5 rounded-lg ${dateRange === '30d' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              30 Days
            </button>
            <button
              onClick={() => setDateRange('90d')}
              className={`px-2.5 py-1.5 rounded-lg ${dateRange === '90d' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              90 Days
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-2xl flex items-center gap-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-500 shrink-0" />
        <span>
          <strong>Demo Notice:</strong> Metrics displayed below are generated from fictional test cohorts and should not be interpreted as validated clinical outcomes or clinical trial endpoints.
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Check-In Adherence</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">94.2%</h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Above benchmark (target: 85%)</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Missed Check-Ins</p>
          <h3 className="text-2xl font-extrabold text-amber-600 mt-1">5.8%</h3>
          <p className="text-[11px] text-slate-500 mt-1">
            Promptly flagged for nurse call
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Avg Triage Response</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">18.4 min</h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            Fast physician oversight loop
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Complications Caught Early</p>
          <h3 className="text-2xl font-extrabold text-teal-600 mt-1">12</h3>
          <p className="text-[11px] text-slate-500 mt-1">
            Early DVT, wound infection, fluid retention
          </p>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Activity (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weekly Patient Follow-Up Volume</h3>
              <p className="text-xs text-slate-500">Completed vs Missed check-ins over 4 weeks</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-sky-700">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" /> Completed
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Missed
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="completed" fill="#0284c7" radius={[4, 4, 0, 0]} name="Completed Check-Ins" />
                <Bar dataKey="missed" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Missed Check-Ins" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alert Priority Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Alert Distribution by Severity</h3>
            <p className="text-xs text-slate-500">Triage volume across active patient cohorts</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertsDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {alertsDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-red-50 text-red-800">
              <span className="font-bold text-base block">{redCount}</span>
              <span className="text-[10px]">Red Priority</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800">
              <span className="font-bold text-base block">{amberCount}</span>
              <span className="text-[10px]">Amber Caution</span>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
              <span className="font-bold text-base block">{greenCount}</span>
              <span className="text-[10px]">Green Routine</span>
            </div>
          </div>
        </div>

      </div>

      {/* Recovery Trends by Procedure */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Average Post-Operative Pain Decline by Surgery Type</h3>
          <p className="text-xs text-slate-500">Comparing expected trajectory slopes from Day 1 to Day 14</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={recoveryTrajectoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip />
              <Line type="monotone" dataKey="arthroplasty" stroke="#0284c7" strokeWidth={2.5} name="Total Knee Arthroplasty" />
              <Line type="monotone" dataKey="laparoscopy" stroke="#10b981" strokeWidth={2.5} name="Laparoscopic Cholecystectomy" />
              <Line type="monotone" dataKey="bypass" stroke="#8b5cf6" strokeWidth={2.5} name="Coronary Artery Bypass" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
