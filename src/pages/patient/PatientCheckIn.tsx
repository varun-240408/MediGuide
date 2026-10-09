import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Volume2, 
  VolumeX, 
  Mic, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  AlertTriangle, 
  Languages, 
  Sparkles,
  ShieldAlert,
  Send,
  Home
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export const PatientCheckIn: React.FC = () => {
  const { currentUser, submitPatientCheckIn, patients } = useApp();
  const navigate = useNavigate();

  // Find Robert Taylor or current patient
  const patient = patients.find(p => p.id === currentUser.id) || patients[0];

  // Language state
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');

  // Text to speech narration state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  // Question wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // Answers state
  const [painScore, setPainScore] = useState<number>(4);
  const [feverReported, setFeverReported] = useState<boolean | null>(false);
  const [temperature, setTemperature] = useState<number>(98.6);
  const [incisionStatus, setIncisionStatus] = useState<'clean_dry' | 'mild_redness' | 'drainage' | 'severe_redness'>('clean_dry');
  const [medicationsTaken, setMedicationsTaken] = useState<boolean | null>(true);
  const [mobilityRating, setMobilityRating] = useState<'normal' | 'reduced' | 'unable_to_walk'>('normal');
  const [calfTenderness, setCalfTenderness] = useState<boolean | null>(false);
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [assistanceRequested, setAssistanceRequested] = useState<boolean>(false);

  // Completion state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedAlert, setGeneratedAlert] = useState<any>(null);

  // Check speech synthesis support
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const questionsContent = {
    en: [
      {
        step: 1,
        title: "How is your pain level right now?",
        instruction: "Slide or tap the number that matches how you feel today (0 is no pain, 10 is very severe pain).",
        speech: "Question 1. How is your pain level right now? Slide or tap the number that matches how you feel.",
      },
      {
        step: 2,
        title: "How does your surgical incision look today?",
        instruction: "Please look closely at your surgical dressing and incision area.",
        speech: "Question 2. How does your surgical incision look today? Please tell us if it is clean and dry or if you see fluid or redness.",
      },
      {
        step: 3,
        title: "Did you take all your prescribed medications today?",
        instruction: "This includes your blood thinners, pain relief, and antibiotics.",
        speech: "Question 3. Did you take all your prescribed medications today, including blood thinners and antibiotics?",
      },
      {
        step: 4,
        title: "How is your walking and mobility today?",
        instruction: "Tell us how easily you can stand up and take steps with your walker or cane.",
        speech: "Question 4. How is your walking and mobility today? Can you walk normally or do you feel restricted?",
      },
      {
        step: 5,
        title: "Do you have any new symptoms or calf tightness?",
        instruction: "Let Dr. Chen know if you have fever, chills, or warmth/swelling in your calf.",
        speech: "Question 5. Do you have any new symptoms, fever, or swelling in your calf?",
      },
    ],
    es: [
      {
        step: 1,
        title: "¿Cuál es su nivel de dolor en este momento?",
        instruction: "Seleccione el número del 0 al 10 que mejor represente su dolor.",
        speech: "Pregunta 1. ¿Cuál es su nivel de dolor en este momento?",
      },
      {
        step: 2,
        title: "¿Cómo se ve su incisión quirúrgica hoy?",
        instruction: "Por favor revise su vendaje y área de la cirugía.",
        speech: "Pregunta 2. ¿Cómo se ve su incisión hoy?",
      },
      {
        step: 3,
        title: "¿Tomó todos sus medicamentos recetados hoy?",
        instruction: "Esto incluye sus anticoagulantes y analgésicos.",
        speech: "Pregunta 3. ¿Tomó todos sus medicamentos hoy?",
      },
      {
        step: 4,
        title: "¿Cómo está su movilidad y caminata hoy?",
        instruction: "Indíquenos si puede caminar normalmente con su andador.",
        speech: "Pregunta 4. ¿Cómo está su movilidad hoy?",
      },
      {
        step: 5,
        title: "¿Tiene síntomas nuevos o tensión en la pantorrilla?",
        instruction: "Avísenos si tiene fiebre, escalofríos o calor en la pierna.",
        speech: "Pregunta 5. ¿Tiene fiebre o hinchazón en la pantorrilla?",
      },
    ],
    fr: [
      {
        step: 1,
        title: "Quel est votre niveau de douleur aujourd'hui ?",
        instruction: "Choisissez un chiffre de 0 (aucune douleur) à 10 (douleur intense).",
        speech: "Question 1. Quel est votre niveau de douleur aujourd'hui ?",
      },
      {
        step: 2,
        title: "Quel est l'état de votre pansement chirurgical ?",
        instruction: "Vérifiez attentivement la zone de votre incision.",
        speech: "Question 2. Quel est l'état de votre pansement ?",
      },
      {
        step: 3,
        title: "Avez-vous pris tous vos médicaments prescrits ?",
        instruction: "Y compris vos anticoagulants et analgésiques.",
        speech: "Question 3. Avez-vous pris tous vos médicaments prescrits ?",
      },
      {
        step: 4,
        title: "Comment se passe votre mobilité et marche ?",
        instruction: "Indiquez si vous pouvez marcher avec votre déambulateur.",
        speech: "Question 4. Comment se passe votre marche ?",
      },
      {
        step: 5,
        title: "Avez-vous de la fièvre ou une tension au mollet ?",
        instruction: "Signalez toute rougeur, chaleur au mollet ou frisson.",
        speech: "Question 5. Avez-vous de la fièvre ou une tension au mollet ?",
      },
    ],
  };

  const currentQ = questionsContent[language][currentStep - 1];

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.9; // Slightly slower for elderly patients
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const getPainFace = (score: number) => {
    if (score <= 2) return '😊';
    if (score <= 4) return '🙂';
    if (score <= 6) return '😐';
    if (score <= 8) return '😣';
    return '😫';
  };

  const getPainColor = (score: number) => {
    if (score <= 3) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score <= 6) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const alertResult = submitPatientCheckIn({
      patientId: patient.id,
      dayPostOp: patient.daysPostOp,
      painScore,
      feverReported: Boolean(feverReported),
      temperature,
      incisionStatus,
      medicationsTaken: Boolean(medicationsTaken),
      mobilityRating,
      notes: calfTenderness ? `${patientNotes} [Calf warmth/tightness flagged]`.trim() : patientNotes,
      urgentAssistanceRequested: assistanceRequested,
    });

    setGeneratedAlert(alertResult);
    setIsSubmitted(true);
  };

  // Preset demo scenarios for easy reviewer testing
  const applyPresetTest = (preset: 'normal' | 'dvt_flag' | 'infection_flag') => {
    if (preset === 'normal') {
      setPainScore(2);
      setIncisionStatus('clean_dry');
      setMedicationsTaken(true);
      setMobilityRating('normal');
      setFeverReported(false);
      setCalfTenderness(false);
      setPatientNotes('Walking around the garden with cane. Feeling stronger!');
    } else if (preset === 'dvt_flag') {
      setPainScore(8);
      setIncisionStatus('clean_dry');
      setMedicationsTaken(true);
      setMobilityRating('reduced');
      setFeverReported(false);
      setCalfTenderness(true);
      setPatientNotes('Right calf is very tight, tender to touch, and warm since this morning.');
    } else {
      setPainScore(7);
      setIncisionStatus('drainage');
      setMedicationsTaken(true);
      setMobilityRating('reduced');
      setFeverReported(true);
      setTemperature(101.2);
      setCalfTenderness(false);
      setPatientNotes('Noticed yellow fluid seeping through dressing and had chills last night.');
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-sky-50/60 via-slate-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wide">
                Day {patient.daysPostOp} Post-Op Follow-Up
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Good morning, {patient.name}!
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Recovery Care Team: <strong>{patient.primarySurgeon}</strong> • Next Check-In: Tomorrow 09:00 AM
            </p>
          </div>

          {/* Accessibility & Language Selectors */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSpeak(currentQ.speech)}
              className={`p-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                isSpeaking ? 'bg-sky-600 text-white border-sky-600 animate-pulse' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Read Question Aloud"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
            </button>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="px-3 py-2 border border-slate-200 rounded-2xl text-xs font-medium bg-slate-50 outline-none"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>

        {/* Evaluator Quick Test Scenarios Bar */}
        <div className="p-3 bg-sky-100/70 border border-sky-200 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-sky-900 font-bold">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Tester Quick-Fill:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => applyPresetTest('normal')}
              className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg font-medium transition"
            >
              Normal Check-In
            </button>
            <button
              type="button"
              onClick={() => applyPresetTest('dvt_flag')}
              className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-800 border border-red-200 rounded-lg font-bold transition"
            >
              Simulate DVT Warning (Pain 8/10 + Calf Warmth)
            </button>
            <button
              type="button"
              onClick={() => applyPresetTest('infection_flag')}
              className="px-2.5 py-1 bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 rounded-lg font-bold transition"
            >
              Simulate Infection Flag (Fever 101.2°F)
            </button>
          </div>
        </div>

        {/* Main Interaction Card */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            
            {/* Step Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
                <span>Question {currentStep} of {totalSteps}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-teal-500 transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Heading */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentQ.title}
              </h2>
              <p className="text-sm text-slate-500">
                {currentQ.instruction}
              </p>
            </div>

            {/* Step 1: Pain Score */}
            {currentStep === 1 && (
              <div className="space-y-6 py-4">
                <div className={`p-6 rounded-3xl border-2 text-center transition ${getPainColor(painScore)}`}>
                  <span className="text-5xl block mb-2">{getPainFace(painScore)}</span>
                  <div className="text-4xl font-extrabold tracking-tight">
                    {painScore} <span className="text-lg font-normal text-slate-500">/ 10</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider mt-1">
                    {painScore === 0 ? 'No Pain At All' :
                     painScore <= 3 ? 'Mild Pain (Manageable)' :
                     painScore <= 6 ? 'Moderate Pain' :
                     painScore <= 8 ? 'Severe Pain (Needs Review)' : 'Very Severe Pain'}
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={painScore}
                    onChange={(e) => setPainScore(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
                    <span>0 (None)</span>
                    <span>5 (Moderate)</span>
                    <span>10 (Severe)</span>
                  </div>
                </div>

                {/* Quick select buttons */}
                <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 pt-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPainScore(num)}
                      className={`h-11 rounded-xl text-sm font-bold border transition ${
                        painScore === num
                          ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Incision Status */}
            {currentStep === 2 && (
              <div className="space-y-3 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIncisionStatus('clean_dry')}
                    className={`p-5 rounded-2xl border-2 text-left transition flex items-start gap-3 min-h-[72px] ${
                      incisionStatus === 'clean_dry'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-800'
                    }`}
                  >
                    <CheckCircle2 className={`w-6 h-6 mt-0.5 shrink-0 ${incisionStatus === 'clean_dry' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <div>
                      <p className="font-bold text-base">Clean and Dry</p>
                      <p className="text-xs text-slate-500 mt-0.5">Dressing is intact, no unusual fluid or redness.</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIncisionStatus('mild_redness')}
                    className={`p-5 rounded-2xl border-2 text-left transition flex items-start gap-3 min-h-[72px] ${
                      incisionStatus === 'mild_redness'
                        ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-800'
                    }`}
                  >
                    <AlertTriangle className={`w-6 h-6 mt-0.5 shrink-0 ${incisionStatus === 'mild_redness' ? 'text-amber-600' : 'text-slate-400'}`} />
                    <div>
                      <p className="font-bold text-base">Mild Redness</p>
                      <p className="text-xs text-slate-500 mt-0.5">Slight pink or irritation around edge.</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIncisionStatus('drainage')}
                    className={`p-5 rounded-2xl border-2 text-left transition flex items-start gap-3 min-h-[72px] ${
                      incisionStatus === 'drainage'
                        ? 'border-red-500 bg-red-50 text-red-950 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-800'
                    }`}
                  >
                    <ShieldAlert className={`w-6 h-6 mt-0.5 shrink-0 ${incisionStatus === 'drainage' ? 'text-red-600' : 'text-slate-400'}`} />
                    <div>
                      <p className="font-bold text-base">Fluid or Drainage</p>
                      <p className="text-xs text-slate-500 mt-0.5">Yellow fluid, drainage soaking bandage.</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIncisionStatus('severe_redness')}
                    className={`p-5 rounded-2xl border-2 text-left transition flex items-start gap-3 min-h-[72px] ${
                      incisionStatus === 'severe_redness'
                        ? 'border-red-500 bg-red-50 text-red-950 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-800'
                    }`}
                  >
                    <AlertTriangle className={`w-6 h-6 mt-0.5 shrink-0 ${incisionStatus === 'severe_redness' ? 'text-red-600' : 'text-slate-400'}`} />
                    <div>
                      <p className="font-bold text-base">Spreading Redness / Heat</p>
                      <p className="text-xs text-slate-500 mt-0.5">Skin is very hot to touch or red area growing.</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Medication Adherence */}
            {currentStep === 3 && (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setMedicationsTaken(true)}
                    className={`p-5 rounded-2xl border-2 text-center transition min-h-[64px] ${
                      medicationsTaken === true
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-xl block mb-1">✅</span>
                    <span className="text-base font-bold block">Yes, All Taken</span>
                    <span className="text-xs text-slate-500">As scheduled</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMedicationsTaken(false)}
                    className={`p-5 rounded-2xl border-2 text-center transition min-h-[64px] ${
                      medicationsTaken === false
                        ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-xl block mb-1">⚠️</span>
                    <span className="text-base font-bold block">No / Missed Dose</span>
                    <span className="text-xs text-slate-500">Skipped or side effects</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMedicationsTaken(null)}
                    className={`p-5 rounded-2xl border-2 text-center transition min-h-[64px] ${
                      medicationsTaken === null
                        ? 'border-sky-500 bg-sky-50 text-sky-900 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-xl block mb-1">❓</span>
                    <span className="text-base font-bold block">I'm Not Sure</span>
                    <span className="text-xs text-slate-500">Need help from family</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <strong>Current Prescriptions:</strong> Enoxaparin (Lovenox) 40mg, Acetaminophen 1000mg, Celecoxib 200mg.
                </div>
              </div>
            )}

            {/* Step 4: Mobility Rating */}
            {currentStep === 4 && (
              <div className="space-y-3 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setMobilityRating('normal')}
                    className={`p-5 rounded-2xl border-2 text-center transition min-h-[64px] ${
                      mobilityRating === 'normal'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-xl block mb-1">🚶‍♂️</span>
                    <span className="text-base font-bold block">Walking Normally</span>
                    <span className="text-xs text-slate-500">Using walker or cane</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMobilityRating('reduced')}
                    className={`p-5 rounded-2xl border-2 text-center transition min-h-[64px] ${
                      mobilityRating === 'reduced'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-xl block mb-1">🦽</span>
                    <span className="text-base font-bold block">Reduced Mobility</span>
                    <span className="text-xs text-slate-500">Difficulty standing</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMobilityRating('unable_to_walk')}
                    className={`p-5 rounded-2xl border-2 text-center transition min-h-[64px] ${
                      mobilityRating === 'unable_to_walk'
                        ? 'border-red-500 bg-red-50 text-red-900 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-xl block mb-1">🛑</span>
                    <span className="text-base font-bold block">Unable To Walk</span>
                    <span className="text-xs text-slate-500">Cannot bear weight</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Calf Signs & Notes */}
            {currentStep === 5 && (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <p className="font-bold text-sm text-slate-900">Do you notice any of these symptoms today?</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={calfTenderness || false}
                        onChange={(e) => setCalfTenderness(e.target.checked)}
                        className="rounded text-sky-600 w-4 h-4"
                      />
                      <span className="font-medium text-slate-800">Calf tightness, tenderness or localized warmth</span>
                    </label>

                    <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feverReported || false}
                        onChange={(e) => setFeverReported(e.target.checked)}
                        className="rounded text-sky-600 w-4 h-4"
                      />
                      <span className="font-medium text-slate-800">Fever or shivering chills</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Anything else you want Dr. Chen to know? (Optional)
                  </label>
                  <textarea
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    placeholder="e.g., Felt a bit dizzy after breakfast, or sleeping comfortably on two pillows..."
                    rows={3}
                    className="w-full text-sm p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons (Min 56px height for older patients) */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="h-14 px-6 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center gap-2 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="h-14 px-8 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-md shadow-sky-600/20 flex items-center gap-2 transition"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="h-14 px-8 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-md shadow-teal-600/20 flex items-center gap-2 transition"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Today's Check-In</span>
                </button>
              )}
            </div>

            {/* Accessible Emergency & Nurse Call Button */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  setAssistanceRequested(true);
                  alert("Nurse Coordinator Miller has been alerted to call your registered phone: (555) 234-8910");
                }}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold flex items-center justify-center gap-2 transition"
              >
                <PhoneCall className="w-4 h-4 text-amber-600" />
                <span>Need Assistance? Call Care Team Now</span>
              </button>

              <span className="text-slate-400 text-center">
                Emergency? Call <strong>911</strong> immediately.
              </span>
            </div>

          </form>
        ) : (
          /* Confirmation Screen */
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Thank you, {patient.name}!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your Day {patient.daysPostOp} follow-up responses have been securely received by <strong>{patient.primarySurgeon}</strong> and the surgical recovery team.
              </p>
            </div>

            {/* Generated alert explanation if any */}
            {generatedAlert ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-left text-xs text-amber-950 space-y-2 max-w-md mx-auto">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Important Notice Sent to Dr. Sarah Chen</span>
                </div>
                <p>
                  Because you reported an increased pain level ({painScore}/10) or calf tightness, your care team has received an alert to review your progress promptly.
                </p>
                <p className="font-semibold text-amber-900 pt-1 border-t border-amber-200">
                  If pain worsens or you develop chest discomfort or shortness of breath, please call 911 or go to the nearest emergency room immediately.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs text-emerald-950 max-w-md mx-auto">
                <p className="font-bold text-emerald-900 mb-1">Routine Recovery Confirmed</p>
                <p>Your responses are within normal recovery milestones for Day {patient.daysPostOp}. Your next scheduled check-in is tomorrow at 09:00 AM.</p>
              </div>
            )}

            {/* Response Summary Pill */}
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Pain Score</span>
                <span className="font-bold text-slate-800">{painScore}/10</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Incision</span>
                <span className="font-bold text-slate-800">{incisionStatus.replace('_', ' ')}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Meds</span>
                <span className="font-bold text-slate-800">{medicationsTaken ? 'Taken' : 'Missed'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/dashboard"
                className="px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <span>Switch to Doctor View to See Incoming Alert</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
                className="px-5 py-3.5 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition"
              >
                Retake / Edit Check-In
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
