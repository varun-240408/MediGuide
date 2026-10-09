import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Sliders, 
  CalendarClock, 
  BellRing, 
  Network, 
  BarChart3, 
  Settings, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { alerts, currentUser } = useApp();

  const redAlertsCount = alerts.filter(a => a.severity === 'red' && a.status === 'new').length;
  const amberAlertsCount = alerts.filter(a => a.severity === 'amber' && a.status === 'new').length;
  const totalNewAlerts = redAlertsCount + amberAlertsCount;

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/dashboard/patients', label: 'Patients', icon: Users },
    { to: '/dashboard/profiles', label: 'Monitoring Profiles', icon: Sliders },
    { to: '/dashboard/schedule', label: 'Follow-Up Schedule', icon: CalendarClock },
    { 
      to: '/dashboard/alerts', 
      label: 'Alerts Center', 
      icon: BellRing,
      badge: totalNewAlerts > 0 ? (
        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
          redAlertsCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-500 text-white'
        }`}>
          {totalNewAlerts}
        </span>
      ) : null
    },
    { 
      to: '/dashboard/pipeline', 
      label: 'AI & RAG Pipeline', 
      icon: Network, 
      highlight: true 
    },
    { to: '/dashboard/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Clinician Profile Brief */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="relative">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250'}
            alt={currentUser.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-sky-500/30"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.name}</p>
          <p className="text-xs text-slate-500 truncate">{currentUser.specialty || 'Lead Surgeon'}</p>
          <span className="inline-block mt-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-200">
            On Duty • Clinical Lead
          </span>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Clinical Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-teal-100 text-teal-800 rounded font-bold uppercase">
                    RAG
                  </span>
                )}
              </div>
              {item.badge}
            </NavLink>
          );
        })}
      </div>

      {/* Quick Test Switcher Callout */}
      <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-teal-50 to-sky-50 border border-teal-200/80">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-teal-900">Simulate Patient View</p>
            <p className="text-[11px] text-teal-700 mt-0.5 leading-tight">
              Test how Robert Taylor experiences the simple follow-up questionnaire.
            </p>
          </div>
        </div>
        <NavLink
          to="/patient/checkin"
          className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium transition shadow-xs"
        >
          <span>Open Patient Check-In</span>
          <ExternalLink className="w-3 h-3" />
        </NavLink>
      </div>

      {/* Safety Compliance Footer in Sidebar */}
      <div className="p-4 border-t border-slate-100 text-[11px] text-slate-400">
        <p className="flex items-center gap-1 font-medium text-slate-500">
          <span>AI Decision Support Mode</span>
        </p>
        <p className="mt-0.5 text-[10px] text-slate-400">
          Human verification required for all clinical orders.
        </p>
      </div>
    </aside>
  );
};
