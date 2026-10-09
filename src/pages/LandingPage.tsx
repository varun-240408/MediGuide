import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  ShieldCheck, 
  Stethoscope, 
  UserCheck, 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  AlertTriangle, 
  MessageSquareCheck,
  CalendarCheck,
  Database,
  Lock,
  ChevronRight,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();

  const handleStartAsDoctor = () => {
    switchRole('doctor');
    navigate('/dashboard');
  };

  const handleStartAsPatient = () => {
    switchRole('patient');
    navigate('/patient/checkin');
  };

  return (
    <div className="flex-1 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-sky-50/60 via-slate-50/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Next-Generation Proactive Surgical Recovery</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Better Recovery Starts With <span className="bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">Regular Follow-Ups</span>.
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                MediGuide proactively checks in with patients recovering from surgery, analyzes reported symptoms against their personal clinical baseline, retrieves verified clinical knowledge via RAG, and flags concerning deviations for immediate physician review.
              </p>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 p-3 bg-white/80 rounded-xl border border-sky-100 shadow-xs max-w-xl">
                <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
                <p className="text-xs text-slate-600">
                  <strong className="text-slate-800">Human-Supervised Care:</strong> MediGuide assists care teams and never claims to independently diagnose, prescribe, or replace licensed doctors.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleStartAsDoctor}
                  className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-lg shadow-sky-600/20 flex items-center gap-2 transition hover:-translate-y-0.5"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Launch Doctor Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleStartAsPatient}
                  className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-lg shadow-teal-600/20 flex items-center gap-2 transition hover:-translate-y-0.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Test Patient Check-In</span>
                </button>

                <a
                  href="#how-it-works"
                  className="px-5 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition"
                >
                  Explore How It Works
                </a>
              </div>

              {/* Key Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Daily Micro-Checkins</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>RAG Clinical Context</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Doctor Triage Alerts</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic / Interactive Tri-Entity Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/80 space-y-5">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Live Recovery Cycle</span>
                  </div>
                  <span className="text-xs bg-sky-50 text-sky-700 font-medium px-2 py-0.5 rounded-md">Day 4 Post-Op</span>
                </div>

                {/* Entity 1: Patient Card */}
                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                    RT
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">Patient: Robert Taylor, 68</p>
                      <span className="text-[10px] bg-teal-200 text-teal-800 px-1.5 py-0.2 rounded font-semibold">TKA</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">"Right calf feels tight and warm this morning."</p>
                    <span className="text-[10px] text-teal-800 font-medium mt-1 inline-block">Reported at 08:30 AM via Web Check-In</span>
                  </div>
                </div>

                {/* Arrow Connector with AI Processing */}
                <div className="flex items-center justify-center relative py-1">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dashed border-sky-300"></div></div>
                  <div className="relative z-10 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-[11px] font-semibold flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-sky-600 animate-spin" />
                    <span>RAG Baseline & AAOS Guidelines Comparison</span>
                  </div>
                </div>

                {/* Entity 2: AI Generated Insight Card */}
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-900">Explainable Triage Alert</span>
                      <span className="text-[10px] bg-red-600 text-white px-1.5 rounded font-bold uppercase">Red</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1">
                      Pain jump 4 to 8/10 + calf warmth violates baseline. High suspicion of early DVT.
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 italic">
                      Matched: AAOS Clinical Practice Guideline §3.1
                    </p>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="flex items-center justify-center relative py-1">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dashed border-sky-300"></div></div>
                  <div className="relative z-10 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-semibold flex items-center gap-1">
                    <span>Forwarded to Attending Surgeon</span>
                  </div>
                </div>

                {/* Entity 3: Doctor Supervised Care */}
                <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
                    alt="Dr. Sarah Chen"
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-sky-500/30 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">Dr. Sarah Chen, MD</p>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Action Taken</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      "Called Robert. Scheduled emergency Doppler duplex scan for 2 PM."
                    </p>
                    <span className="text-[10px] text-sky-700 font-semibold mt-1 inline-block">100% Doctor-Supervised Outcome</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Feature Cards */}
      <section id="features" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100/80 px-3 py-1 rounded-full">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Designed For High Clinical Efficacy & Patient Ease
            </h2>
            <p className="text-slate-600 text-base">
              MediGuide bridges the critical 30-day gap between hospital discharge and first in-clinic post-operative visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition hover:-translate-y-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                <MessageSquareCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Personalized Follow-Ups</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Adaptive daily questions tailored to each surgery: pain scale, surgical incision state, mobility milestones, and medication adherence.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> One question at a time</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Voice & Large Button UI</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition hover:-translate-y-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. AI-Powered RAG Context</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Retrieves verified clinical practice guidelines (AAOS, ACS, CDC) alongside patient EHR baseline to understand true clinical nuance.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-500" /> Grounded in real literature</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-500" /> Transparent citations</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition hover:-translate-y-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Early Warning Alerts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Catches complications before emergency readmission: sudden pain jumps, wound drainage, missed anti-coagulants, and fever spikes.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Green / Amber / Red triage</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Baseline delta detection</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition hover:-translate-y-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">4. Doctor-Supervised Care</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Attending physicians and care coordinators review flagged alerts and decide next clinical steps, keeping patients safe and supported.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Human in the loop</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Zero independent diagnosing</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Step-by-Step Interactive Workflow */}
      <section id="how-it-works" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-100/80 px-3 py-1 rounded-full">
              End-To-End Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How MediGuide Works from Discharge to Recovery
            </h2>
            <p className="text-slate-600 text-base">
              A transparent, continuous care loop ensuring no patient is left without support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-sky-300 transition">
              <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                01
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Discharge Profile</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Doctor selects surgical protocol, monitoring duration, alert thresholds, and preferred follow-up channel.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-teal-300 transition">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                02
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Daily Check-In</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scheduled automated prompt asks friendly, high-contrast questions about pain, incision, fever, and medications.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-sky-300 transition">
              <div className="w-9 h-9 rounded-xl bg-sky-700 text-white font-bold flex items-center justify-center text-sm mb-3">
                03
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">RAG Context Engine</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                System retrieves clinical guidelines (AAOS, CDC) and compares current answers against patient baseline trajectory.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-amber-300 transition">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                04
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Triaged Alert</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If changes indicate complications, an explainable alert is generated into Green, Amber, or Red priority for the clinic.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-emerald-300 transition">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                05
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Doctor Intervention</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Attending physician reviews full context, calls patient, orders imaging or lab tests, and prevents emergency readmissions.
              </p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <Link
              to="/dashboard/pipeline"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl border border-sky-200 transition"
            >
              <span>Explore Interactive 7-Step Explainable RAG Architecture</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section id="safety" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Clinical Ethics & Patient Protection</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                AI That Supports Healthcare Professionals, Never Replaces Them.
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                MediGuide is strictly designed as an assistive clinical triage tool. We adhere to rigorous medical software guidelines:
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-slate-100">No Independent Diagnosis or Prescriptions</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      The system never claims to diagnose diseases or prescribe medication. All clinical decisions remain exclusively with licensed doctors.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-slate-100">Emergency Protocol Routing</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Whenever severe symptoms (e.g. chest pain, severe shortness of breath, heavy bleeding) are reported, patients are immediately instructed to dial 911/ER.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-slate-100">Zero Unanswered Assumptions</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      MediGuide never assumes an unanswered check-in means the patient is healthy. Missed follow-ups trigger proactive escalation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Card */}
            <div className="lg:col-span-6 bg-slate-800/90 rounded-3xl p-8 border border-slate-700 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-teal-400" />
                <span>Production Security & Privacy Blueprint</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700">
                  <span className="font-bold text-sky-400 block mb-1">Backend Infrastructure (Supabase)</span>
                  <p className="text-slate-400">
                    Row-Level Security (RLS) ensuring strict tenant isolation. Clinicians only access patients within their assigned hospital surgical cohort.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700">
                  <span className="font-bold text-teal-400 block mb-1">Autonomous Scheduling (ElizaOS & Scaleway)</span>
                  <p className="text-slate-400">
                    Background agents deployed on Scaleway secure cloud execute time-scheduled check-ins without keeping raw patient PHI in memory.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700">
                  <span className="font-bold text-amber-400 block mb-1">Client Data Privacy Policy</span>
                  <p className="text-slate-400">
                    In demo mode, all records are stored in browser local state. In production, end-to-end TLS 1.3 encryption and zero PHI client caching are enforced.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-700">
                <span>HIPAA / GDPR Design Compliant</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Clinical Guardrails Active
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Sandbox Test Banner */}
      <section className="py-16 bg-gradient-to-r from-sky-600 to-teal-700 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Ready to Explore MediGuide?</h2>
          <p className="text-sky-100 text-base max-w-2xl mx-auto">
            Experience both sides of proactive post-op care right now in your browser. Switch instantly between Doctor and Patient personas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleStartAsDoctor}
              className="px-6 py-3.5 rounded-xl bg-white text-sky-800 hover:bg-slate-100 font-bold text-sm shadow-xl transition flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-sky-600" />
              <span>Enter Doctor Dashboard (Dr. Sarah Chen)</span>
            </button>
            <button
              onClick={handleStartAsPatient}
              className="px-6 py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm border border-teal-400/50 shadow-xl transition flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-teal-300" />
              <span>Enter Patient Check-In (Robert Taylor)</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
