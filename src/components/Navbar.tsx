import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  HeartPulse, 
  UserCheck, 
  Stethoscope, 
  ShieldAlert, 
  ArrowRight,
  Eye,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { currentUser, switchRole, isHighContrast, setIsHighContrast, resetDemoData, alerts } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');
  const isPatientPortal = location.pathname.startsWith('/patient');
  const urgentAlertsCount = alerts.filter(a => a.severity === 'red' && a.status === 'new').length;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top Demo Notice Bar */}
      <div className="bg-gradient-to-r from-sky-600 to-teal-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span><strong>Interactive Demo Environment:</strong> AI-powered proactive surgical follow-up system with human-supervised triage.</span>
        </div>
        <button
          onClick={resetDemoData}
          className="text-xs bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded transition flex items-center gap-1 shrink-0"
          title="Reset sample patients and alerts to baseline"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Demo
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900">Medi<span className="text-sky-600">Guide</span></span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">AI Recovery</span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Doctor-Supervised Patient Follow-Ups</p>
          </div>
        </Link>

        {/* Navigation Links for Public View */}
        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-sky-600 transition">Home</Link>
            <a href="/#how-it-works" className="hover:text-sky-600 transition">How It Works</a>
            <a href="/#features" className="hover:text-sky-600 transition">Features</a>
            <a href="/#safety" className="hover:text-sky-600 transition">Trust & Safety</a>
            <Link to="/dashboard/pipeline" className="hover:text-sky-600 transition flex items-center gap-1">
              <span>Explainable AI</span>
              <span className="text-[10px] bg-teal-100 text-teal-800 px-1 rounded font-bold">RAG</span>
            </Link>
          </nav>
        )}

        {/* Right Action Buttons & Quick Role Switcher */}
        <div className="flex items-center gap-3">
          {/* Accessibility Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            title="Toggle high contrast accessibility styling"
            className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
              isHighContrast 
                ? 'bg-amber-100 border-amber-300 text-amber-900' 
                : 'border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span className="hidden lg:inline">{isHighContrast ? 'Standard Mode' : 'High Contrast'}</span>
          </button>

          {/* Quick Persona Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => {
                switchRole('doctor');
                navigate('/dashboard');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
                currentUser.role === 'doctor'
                  ? 'bg-white text-sky-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor</span>
              {urgentAlertsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </button>
            <button
              onClick={() => {
                switchRole('patient');
                navigate('/patient/checkin');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
                currentUser.role === 'patient'
                  ? 'bg-white text-teal-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Patient</span>
            </button>
          </div>

          {/* Main Action Links */}
          {currentUser.role === 'doctor' ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition"
            >
              <Stethoscope className="w-4 h-4" />
              <span className="hidden sm:inline">Doctor Portal</span>
            </Link>
          ) : (
            <Link
              to="/patient/checkin"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition"
            >
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Daily Check-In</span>
            </Link>
          )}

          <Link
            to="/login"
            className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4 hidden sm:inline"
          >
            Switch/Login
          </Link>
        </div>
      </div>
    </header>
  );
};
