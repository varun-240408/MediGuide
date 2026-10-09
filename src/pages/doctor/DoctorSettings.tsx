import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Sliders, 
  Eye, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Lock, 
  Database, 
  Cloud, 
  Bot, 
  Sparkles,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorSettings: React.FC = () => {
  const { currentUser, isHighContrast, setIsHighContrast, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'defaults' | 'architecture'>('profile');

  // Notification states
  const [notifyUrgentPush, setNotifyUrgentPush] = useState(true);
  const [notifyUrgentSound, setNotifyUrgentSound] = useState(true);
  const [notifyDailyEmail, setNotifyDailyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);

  // Defaults
  const [defaultDuration, setDefaultDuration] = useState(30);
  const [defaultCheckinHour, setDefaultCheckinHour] = useState('09:00');
  const [defaultPainThreshold, setDefaultPainThreshold] = useState(7);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings & preferences saved successfully to local demo state.');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Platform Settings & Integrations</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Doctor profile, notification triage rules, monitoring defaults, and system architecture
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'border-sky-600 text-sky-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Doctor Profile</span>
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'notifications'
              ? 'border-sky-600 text-sky-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications & Alerts</span>
        </button>
        <button
          onClick={() => setActiveTab('defaults')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'defaults'
              ? 'border-sky-600 text-sky-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Monitoring Defaults</span>
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`py-2.5 px-4 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'architecture'
              ? 'border-sky-600 text-sky-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Cloud className="w-4 h-4" />
          <span>Backend & Architecture Blueprint</span>
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSavePreferences} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250'}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sky-500/30"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-900">{currentUser.name}</h3>
              <p className="text-xs text-slate-500">{currentUser.title}</p>
              <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded-full mt-1 inline-block">
                Licensed Attending Physician
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name & Title</label>
              <input
                type="text"
                defaultValue={currentUser.name}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinical Department</label>
              <input
                type="text"
                defaultValue="Department of Orthopedic Surgery & Joint Reconstruction"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Hospital Email</label>
              <input
                type="email"
                defaultValue={currentUser.email}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hospital Pager / Direct Line</label>
              <input
                type="text"
                defaultValue="(555) 448-2100 (Pager #4482)"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Notifications */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSavePreferences} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Clinical Alert Dispatch Channels</h3>
            <p className="text-xs text-slate-500">Configure how red and amber priority alerts reach your on-call care team</p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white cursor-pointer transition">
              <div>
                <p className="font-bold text-slate-900">Instant In-App Red Priority Banner</p>
                <p className="text-slate-500 text-[11px]">Display high-priority red alert modal banner on doctor dashboard immediately.</p>
              </div>
              <input
                type="checkbox"
                checked={notifyUrgentPush}
                onChange={(e) => setNotifyUrgentPush(e.target.checked)}
                className="rounded text-sky-600 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white cursor-pointer transition">
              <div>
                <p className="font-bold text-slate-900">Audible Clinical Alert Sound</p>
                <p className="text-slate-500 text-[11px]">Play gentle alert chime when an acute complication is detected.</p>
              </div>
              <input
                type="checkbox"
                checked={notifyUrgentSound}
                onChange={(e) => setNotifyUrgentSound(e.target.checked)}
                className="rounded text-sky-600 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white cursor-pointer transition">
              <div>
                <p className="font-bold text-slate-900">Daily Morning Cohort Digest Email</p>
                <p className="text-slate-500 text-[11px]">Send a 07:00 AM summary of all active patients, adherence stats, and flagged deviations.</p>
              </div>
              <input
                type="checkbox"
                checked={notifyDailyEmail}
                onChange={(e) => setNotifyDailyEmail(e.target.checked)}
                className="rounded text-sky-600 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white cursor-pointer transition">
              <div>
                <p className="font-bold text-slate-900">On-Call SMS Escalation</p>
                <p className="text-slate-500 text-[11px]">Forward unreviewed Red alerts to on-call surgeon pager via SMS after 30 minutes.</p>
              </div>
              <input
                type="checkbox"
                checked={notifySms}
                onChange={(e) => setNotifySms(e.target.checked)}
                className="rounded text-sky-600 w-4 h-4"
              />
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Notification Preferences</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Defaults & Accessibility */}
      {activeTab === 'defaults' && (
        <form onSubmit={handleSavePreferences} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Clinical Protocol Defaults</h3>
            <p className="text-xs text-slate-500">Preset values applied when enrolling new post-operative patients</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Default Monitoring Duration</label>
              <select
                value={defaultDuration}
                onChange={(e) => setDefaultDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none"
              >
                <option value={14}>14 Days</option>
                <option value={30}>30 Days (Recommended)</option>
                <option value={60}>60 Days</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Standard Morning Follow-Up Time</label>
              <input
                type="time"
                value={defaultCheckinHour}
                onChange={(e) => setDefaultCheckinHour(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none"
              >
              </input>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Default Pain Trigger Threshold</label>
              <select
                value={defaultPainThreshold}
                onChange={(e) => setDefaultPainThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none"
              >
                <option value={6}>Pain &ge; 6/10</option>
                <option value={7}>Pain &ge; 7/10 (Standard)</option>
                <option value={8}>Pain &ge; 8/10</option>
              </select>
            </div>
          </div>

          {/* Accessibility Settings */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Accessibility & Display</h4>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">High Contrast Mode</p>
                <p className="text-[11px] text-slate-500">Enhance border contrast and text legibility across all clinical screens.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  isHighContrast ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-slate-300 text-slate-700'
                }`}
              >
                {isHighContrast ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Protocol Defaults</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Backend & Architecture Blueprint */}
      {activeTab === 'architecture' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 text-xs text-slate-700">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-teal-600" />
              <span>MediGuide Cloud Infrastructure & Integrations</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Designed integration points for Supabase, ElizaOS, RAG, and Scaleway
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Supabase */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Supabase Backend (DB, Auth, RLS)</span>
              </div>
              <p className="leading-relaxed text-slate-600">
                Primary data store for patient records, check-in questionnaires, and alert logs. Utilizes PostgreSQL Row Level Security (RLS) to enforce doctor tenant boundaries.
              </p>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[10px] text-slate-600">
                Tables: patients, check_ins, alerts, monitoring_profiles, vector_guidelines
              </div>
            </div>

            {/* ElizaOS Agent */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-sky-800 font-bold">
                <Bot className="w-4 h-4 text-sky-600" />
                <span>ElizaOS Autonomous Agent Scheduler</span>
              </div>
              <p className="leading-relaxed text-slate-600">
                Orchestrates cron-scheduled proactive follow-ups at 09:00 AM. Interacts with patients over multi-channel interfaces (Web, Twilio SMS/Voice).
              </p>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[10px] text-slate-600">
                Engine: ElizaOS scheduled runtime with mock fallback provider
              </div>
            </div>

            {/* RAG Knowledge Engine */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-purple-800 font-bold">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>RAG Retrieval & Dense Vector Index</span>
              </div>
              <p className="leading-relaxed text-slate-600">
                Indexes AAOS, ACS, and CDC postoperative recovery guidelines. Computes cosine similarity between patient-reported symptoms and warning signs.
              </p>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[10px] text-slate-600">
                Embeddings: text-embedding-3-small (1536 dim) + pgvector
              </div>
            </div>

            {/* Scaleway */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-teal-800 font-bold">
                <Cloud className="w-4 h-4 text-teal-600" />
                <span>Scaleway Cloud Deployment</span>
              </div>
              <p className="leading-relaxed text-slate-600">
                Containerized serverless microservices hosted in Scaleway European datacenter regions for strict GDPR and health data sovereignty compliance.
              </p>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[10px] text-slate-600">
                Compute: Scaleway Serverless Containers / Kubernetes Kapsule
              </div>
            </div>

          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <span className="flex items-center gap-2 text-emerald-900 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Current Status: Frontend Sandbox with Mock Architecture Services Ready for Backend Binding.</span>
            </span>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">
              Ready
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
