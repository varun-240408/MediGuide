import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck, FileText, Lock, Activity, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span>MediGuide Systems</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              AI-powered proactive post-operative follow-up platform designed for enhanced patient recovery, early warning detection, and doctor-supervised clinical intervention.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ElizaOS Engine: Mock Ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-sky-400 text-xs border border-slate-700">
                <Sparkles className="w-3 h-3" />
                RAG Medical Index: Active
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/dashboard" className="hover:text-white transition">Doctor Dashboard</Link></li>
              <li><Link to="/dashboard/patients" className="hover:text-white transition">Patient Management</Link></li>
              <li><Link to="/dashboard/alerts" className="hover:text-white transition">Alerts Center</Link></li>
              <li><Link to="/dashboard/pipeline" className="hover:text-white transition">Explainable RAG Pipeline</Link></li>
              <li><Link to="/patient/checkin" className="hover:text-white transition">Patient Check-In Interface</Link></li>
            </ul>
          </div>

          {/* Clinical Safety */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Clinical Care</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#how-it-works" className="hover:text-white transition">Post-Op Recovery Protocols</a></li>
              <li><a href="#safety" className="hover:text-white transition">Human-in-the-Loop Triage</a></li>
              <li><Link to="/dashboard/profiles" className="hover:text-white transition">Monitoring Configuration</Link></li>
              <li><Link to="/dashboard/reports" className="hover:text-white transition">Adherence Reports</Link></li>
              <li><a href="#safety" className="hover:text-white transition">Emergency Warning Signs</a></li>
            </ul>
          </div>

          {/* Security & Governance */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Governance</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> HIPAA Architecture</li>
              <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-teal-400" /> GDPR Data Encryption</li>
              <li className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-teal-400" /> Scaleway Deployment Specs</li>
              <li className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-teal-400" /> Supabase RLS Schema</li>
            </ul>
          </div>
        </div>

        {/* Clinical Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 mb-8 text-xs text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            Important Clinical and Safety Notice:
          </p>
          <p>
            MediGuide is an assistive medical decision-support technology designed solely to aid licensed healthcare providers in tracking recovery progress. 
            <strong> MediGuide does not provide automated diagnoses, prescribe therapies, or replace licensed physician judgment.</strong> 
            Serious or life-threatening symptoms must be reported directly to local emergency services (911) or your nearest hospital emergency center.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-800 text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MediGuide Health Technologies. All rights reserved. Demo Version.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Clinical Consent Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
