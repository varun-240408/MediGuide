import React, { useState } from 'react';
import { 
  Network, 
  Sparkles, 
  Sliders, 
  CalendarClock, 
  UserCheck, 
  Database, 
  GitCompare, 
  ShieldAlert, 
  Stethoscope, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_RAG_GUIDELINES } from '../../data/mockData';

export const AIMonitoringPipeline: React.FC = () => {
  const { patients, alerts } = useApp();

  const [selectedPatientId, setSelectedPatientId] = useState<string>('PAT-1082');
  const [activeStep, setActiveStep] = useState<number>(6); // Default show full pipeline completed
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const patientAlert = alerts.find(a => a.patientId === selectedPatient?.id) || alerts[0];

  const pipelineSteps = [
    {
      num: 1,
      title: 'Profile Setup',
      desc: 'Doctor configures monitoring protocol, thresholds, and follow-up frequency.',
      icon: Sliders,
      agent: 'Care Team Clinician',
    },
    {
      num: 2,
      title: 'Scheduled Follow-Up',
      desc: 'Autonomous agent initiates check-in at 09:00 AM via preferred patient channel.',
      icon: CalendarClock,
      agent: 'ElizaOS Runner',
    },
    {
      num: 3,
      title: 'Patient Response',
      desc: 'Patient reports pain score, incision inspection, fever, and mobility updates.',
      icon: UserCheck,
      agent: 'Patient Interface',
    },
    {
      num: 4,
      title: 'RAG Knowledge Retrieval',
      desc: 'Retrieves patient surgical history + verified clinical guidelines from vector index.',
      icon: Database,
      agent: 'Semantic Vector Store',
    },
    {
      num: 5,
      title: 'Baseline Comparison',
      desc: 'Compares current answers with Day 1-3 baseline and expected post-op trajectory.',
      icon: GitCompare,
      agent: 'Comparative Delta Engine',
    },
    {
      num: 6,
      title: 'Explainable AI Triage',
      desc: 'Generates structured rationale with confidence score and priority categorization.',
      icon: ShieldAlert,
      agent: 'Clinical Triage Classifier',
    },
    {
      num: 7,
      title: 'Doctor Supervised Action',
      desc: 'Attending physician reviews concerning alert and initiates clinical intervention.',
      icon: Stethoscope,
      agent: 'Licensed Physician',
    },
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveStep(1);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 7) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          return 7;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Monitoring & Explainable Analysis</h1>
            <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full uppercase">
              RAG Grounded
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent 7-step clinical pipeline tracing responses to physician intervention
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="text-xs border border-slate-300 rounded-xl px-3 py-2 bg-white font-medium outline-none focus:ring-2 focus:ring-sky-500"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                Inspect: {p.name} ({p.surgery})
              </option>
            ))}
          </select>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulating Pipeline...' : 'Run Pipeline Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Safety & Demo Label */}
      <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex items-start gap-3 text-xs text-sky-950">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Simulated Demonstration Environment:</span>
          <span className="ml-1 text-sky-800">
            This explainable analysis demonstrates how MediGuide pairs Retrieval-Augmented Generation (RAG) with personal patient baselines to produce auditable clinical alerts. No fabricated clinical accuracy or claim to real electronic health records is made.
          </span>
        </div>
      </div>

      {/* Visual 7-Step Interactive Pipeline Diagram */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Network className="w-4 h-4 text-sky-600" />
            <span>7-Step Autonomous Follow-Up & Clinical Triage Workflow</span>
          </h3>
          <span className="text-xs text-slate-400">Step {activeStep} of 7 Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 pt-2">
          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            const isCompleted = activeStep >= step.num;
            const isCurrent = activeStep === step.num;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition flex flex-col justify-between ${
                  isCurrent
                    ? 'border-sky-500 bg-sky-50/80 ring-2 ring-sky-500/20 shadow-xs'
                    : isCompleted
                    ? 'border-teal-200 bg-teal-50/40 text-slate-800'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCompleted ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {step.num}
                    </span>
                    <Icon className={`w-4 h-4 ${isCompleted ? 'text-teal-600' : 'text-slate-400'}`} />
                  </div>
                  <h4 className="font-bold text-slate-900 leading-tight mb-1">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-3 leading-snug">{step.desc}</p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-slate-100/80 text-[10px] font-medium text-slate-400">
                  {step.agent}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Patient Baseline Comparison Card & RAG Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Baseline Comparison (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-sky-600" />
                <span>Patient Baseline Comparison: {selectedPatient.name}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {selectedPatient.surgery} • Day {selectedPatient.daysPostOp} Post-Op
              </p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
              selectedPatient.alertStatus === 'red' ? 'bg-red-100 text-red-800 border border-red-200' :
              selectedPatient.alertStatus === 'amber' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
              'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {selectedPatient.alertStatus} Alert Priority
            </span>
          </div>

          {/* Condition Delta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Previous */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Previous Reported Baseline</span>
              <p className="font-semibold text-slate-800 text-sm">
                Pain: {selectedPatient.recoveryBaseline.currentPain > 4 ? 4 : selectedPatient.recoveryBaseline.currentPain}/10
              </p>
              <p className="text-slate-600 leading-relaxed">
                Incision dry, ambulating with walker, medications taken without distress. Expected surgical soreness.
              </p>
            </div>

            {/* Current */}
            <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-1.5">
              <span className="font-bold text-red-600 uppercase tracking-wide text-[10px]">Current Reported Condition</span>
              <p className="font-semibold text-red-950 text-sm">
                Pain: {selectedPatient.recoveryBaseline.currentPain}/10
              </p>
              <p className="text-slate-700 leading-relaxed font-medium">
                {patientAlert?.reportedChanges || 'Pain increase and localized discomfort reported during morning follow-up.'}
              </p>
            </div>
          </div>

          {/* Notable Changes */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-bold uppercase tracking-wide text-[10px] text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Notable Clinical Deviations Detected:</span>
            </span>
            <p className="leading-relaxed font-medium">
              Pain score increased abruptly by &ge; 3 points. Reported symptoms deviate from the standard Day 3-5 postoperative decline curve.
            </p>
          </div>

          {/* Reason for Alert */}
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-950 space-y-1">
            <span className="font-bold uppercase tracking-wide text-[10px] text-sky-800">
              Explainable Alert Reason:
            </span>
            <p className="leading-relaxed">
              {patientAlert?.reason || 'Deviation from baseline recovery threshold warrants prompt physician review.'}
            </p>
          </div>

          {/* Suggested Priority & Human Action */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
            <div>
              <span className="font-bold uppercase tracking-wide text-[10px] text-emerald-800">
                Suggested Physician Action:
              </span>
              <p className="font-medium mt-0.5">
                {patientAlert?.suggestedAction || 'Conduct clinical telephone triage and schedule diagnostic ultrasound if calf symptoms persist.'}
              </p>
            </div>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-1 rounded">
              High Confidence (0.94)
            </span>
          </div>
        </div>

        {/* RAG Retrieved Supporting Context (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>RAG Retrieved Knowledge Snippets</span>
            </h3>
            <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
              Verified Guidelines
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Chunks retrieved from curated clinical knowledge database via dense vector cosine similarity matching:
          </p>

          <div className="space-y-3">
            {MOCK_RAG_GUIDELINES.map((guide) => (
              <div key={guide.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-700 truncate">{guide.source}</span>
                  <span className="font-mono text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded font-semibold shrink-0">
                    Similarity: {(guide.relevanceScore * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-slate-600">{guide.citation}</p>
                <p className="text-slate-700 leading-relaxed italic bg-white p-2.5 rounded border border-slate-100">
                  "{guide.content}"
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500">
            <strong>Architecture Integration Point:</strong> In production, embeddings are generated via text-embedding-3-small and queried in Supabase pgvector with threshold &ge; 0.82.
          </div>
        </div>

      </div>

    </div>
  );
};
