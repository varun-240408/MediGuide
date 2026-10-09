import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  Stethoscope, 
  UserCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CURRENT_DOCTOR, CURRENT_PATIENT } from '../data/mockData';

export const LoginPage: React.FC = () => {
  const { setCurrentUser, showToast } = useApp();
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState<'doctor' | 'patient'>('doctor');
  const [email, setEmail] = useState('sarah.chen@mediguide-health.org');
  const [password, setPassword] = useState('DoctorSecret123!');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleRoleToggle = (role: 'doctor' | 'patient') => {
    setActiveRole(role);
    if (role === 'doctor') {
      setEmail('sarah.chen@mediguide-health.org');
      setPassword('DoctorSecret123!');
    } else {
      setEmail('robert.taylor68@demo-email.com');
      setPassword('PatientPass2026!');
    }
    setErrors({});
  };

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.includes('@')) {
      errs.email = 'Please enter a valid clinical or patient email address.';
    }
    if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (activeRole === 'doctor') {
      setCurrentUser(CURRENT_DOCTOR);
      showToast('Logged in as Dr. Sarah Chen, MD');
      navigate('/dashboard');
    } else {
      setCurrentUser(CURRENT_PATIENT);
      showToast('Logged in as Robert Taylor');
      navigate('/patient/checkin');
    }
  };

  const handleQuickLogin = (role: 'doctor' | 'patient') => {
    if (role === 'doctor') {
      setCurrentUser(CURRENT_DOCTOR);
      showToast('Quick Access: Logged in as Dr. Sarah Chen, MD');
      navigate('/dashboard');
    } else {
      setCurrentUser(CURRENT_PATIENT);
      showToast('Quick Access: Logged in as Robert Taylor');
      navigate('/patient/checkin');
    }
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 bg-gradient-to-b from-sky-50/50 via-slate-50 to-white">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Card Header */}
        <div className="p-8 pb-6 text-center border-b border-slate-100 bg-gradient-to-b from-sky-50/60 to-transparent">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 mx-auto flex items-center justify-center text-white shadow-md shadow-sky-500/20 mb-3">
            <HeartPulse className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isRegisterMode ? 'Create MediGuide Account' : 'Welcome to MediGuide'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Proactive Surgical Recovery & Human-Supervised Care
          </p>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mt-5 border border-slate-200">
            <button
              type="button"
              onClick={() => handleRoleToggle('doctor')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                activeRole === 'doctor'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Doctor / Clinical Team</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleToggle('patient')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                activeRole === 'patient'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Patient Follow-Up</span>
            </button>
          </div>
        </div>

        {/* 1-Click Fast Demo Buttons */}
        <div className="p-6 pb-2 space-y-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
            ⚡ Quick 1-Click Evaluator Login
          </div>
          <button
            type="button"
            onClick={() => handleQuickLogin('doctor')}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-semibold flex items-center justify-between transition"
          >
            <span className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sky-600" />
              <span>Enter as Dr. Sarah Chen, MD (Attending Surgeon)</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('patient')}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-semibold flex items-center justify-between transition"
          >
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-600" />
              <span>Enter as Robert Taylor (Day 4 Knee Patient)</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="px-6 py-2 flex items-center gap-3">
          <div className="flex-1 border-t border-slate-200" />
          <span className="text-[11px] text-slate-400 font-medium uppercase">Or Custom Sign-In</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        {/* Traditional Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {activeRole === 'doctor' ? 'Clinical Hospital Email' : 'Patient Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={activeRole === 'doctor' ? 'doctor@hospital.org' : 'patient@example.com'}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-sky-600" />
              <span>Remember demo credentials</span>
            </label>
            <span className="text-sky-600 hover:underline cursor-pointer">Need assistance?</span>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition shadow-md flex items-center justify-center gap-2 ${
              activeRole === 'doctor'
                ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
                : 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
            }`}
          >
            <span>{isRegisterMode ? 'Register & Enter Sandbox' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center text-xs text-slate-500 pt-2">
            <span>{isRegisterMode ? 'Already have an account?' : 'Need a new monitoring account?'} </span>
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="font-bold text-sky-600 hover:underline"
            >
              {isRegisterMode ? 'Sign In' : 'Register Here'}
            </button>
          </div>
        </form>

        {/* Demo Disclaimer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Demo Authentication Mode • No real protected health information (PHI) stored</span>
        </div>

      </div>
    </div>
  );
};
