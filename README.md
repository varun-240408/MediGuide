# MediGuide — AI-Powered Proactive Patient Monitoring Web Application

> **Clinical Decision-Support & Post-Operative Follow-Up Platform**  
> Built with React 19, Vite, TypeScript, Tailwind CSS, Lucide Icons, and Recharts.

---

## 🌟 Executive Summary

**MediGuide** is an AI-powered proactive patient follow-up web application designed for patients recovering after surgery. Rather than waiting passively for complications to manifest in readmission or ER visits, MediGuide initiates scheduled check-ins, collects structured recovery indicators, compares responses against personal clinical baselines, retrieves curated medical guidelines via RAG (Retrieval-Augmented Generation), and escalates concerning changes to attending healthcare professionals.

### 🛡️ Core Safety Principles
* **Human-Supervised Care:** Licensed clinicians review all flagged alerts and decide the next clinical action.
* **No Independent Diagnosis:** MediGuide assists care teams as a decision-support system and never diagnoses or prescribes independently.
* **Emergency Routing:** Acute symptoms (e.g., chest pain, shortness of breath, heavy bleeding) prompt immediate instructions to contact 911/ER.
* **Never Assume Healthy:** Missed check-ins or uncertain answers are proactively flagged for outreach.

---

## 🚀 Live Demo & Navigation Guide

The application is running locally at **`http://localhost:5173/`**.

### 1. Landing Page (`/`)
* **Hero Banner:** *"Better Recovery Starts With Regular Follow-Ups."*
* **Interactive Tri-Entity Illustration:** Visualizes real-time cooperation between Patient (Robert Taylor), AI Decision Engine (RAG comparison), and Doctor (Dr. Sarah Chen, MD).
* **4 Core Feature Cards:** Personalized Follow-Ups, AI-Powered Health Context, Early Warning Alerts, Doctor-Supervised Care.
* **5-Step Care Pathway:** From hospital discharge to supervised intervention.
* **Trust & Safety Section:** Explains ethics, clinical guardrails, and data protection.
* **Quick Persona Switcher:** Switch between Doctor and Patient personas with one click.

### 2. Authentication (`/login`)
* **Dual Role Support:** Doctor / Healthcare Professional vs. Patient.
* **One-Click Instant Evaluator Login:**
  * Click *"Enter as Dr. Sarah Chen, MD (Attending Surgeon)"* to test the clinical side.
  * Click *"Enter as Robert Taylor (Day 4 Knee Patient)"* to test patient check-ins.
* Clear demo disclaimer that fictional demo credentials are used without touching real patient PHI.

### 3. Doctor Dashboard (`/dashboard`)
* **KPI Metrics:** Total Monitored Patients (48), Requiring Attention (5), Follow-Ups Scheduled Today (18), Awaiting Doctor Review (3).
* **Cohort Recovery Trend Chart:** Interactive Recharts area graph tracking reported pain decline vs expected trajectory.
* **Live Patient Activity Stream:** Real-time feed of patient check-in updates.
* **Surgical Follow-Up Alerts Table:** Filterable by Red/Amber/Green severity with search and one-click triage review.

### 4. Patient Management Registry (`/dashboard/patients`)
* Complete searchable directory with procedure filters, post-op day counter, and alert status tags.
* **Split-Screen Detailed Profile:**
  * Clinical demographics, emergency contacts, primary surgeon, allergies.
  * Prescriptions entered by care team with adherence rates (e.g. Enoxaparin 100%).
  * Individual patient recovery trajectory charts (Pain 0-10 & Temperature over time).
  * Check-in logs timeline.
* **Add Patient Modal:** Form validation to enroll new patients into the monitoring registry.

### 5. Monitoring Profile Configuration (`/dashboard/profiles`)
* Personalized plan configuration per patient.
* Pre-set clinical protocols for 1-click loading:
  * **Orthopedic Joint Protocol** (TKA/THR)
  * **Abdominal Surgery Protocol** (Laparoscopic Cholecystectomy)
  * **Cardiac Surgical Protocol** (CABG)
* Customizable questions (Pain, Incision site drainage, Temperature, Medication adherence, Mobility, Calf tenderness).
* Warning thresholds (Pain score $\ge$ 7, Temperature $\ge$ 100.4°F, Consecutive missed checks).
* Stores configuration in local demo state with instant visual confirmation.

### 6. Patient Follow-Up Interface (`/patient/checkin`)
* **Accessible UX for Older Adults:**
  * Large, high-contrast buttons (min 56px height) and clean typography.
  * Progress stepper: One question at a time.
  * **Voice Text-to-Speech (TTS):** Reads each question aloud using the Web Speech API.
  * Multilingual support (English, Spanish, French).
  * Pain scale with expressive facial icons ($0 = 😊$ to $10 = 😫$).
  * Easy options: "Yes", "No", "I'm Not Sure", "I Need Help".
  * Accessible *"Need Assistance? Call Care Team Now"* button.
  * **Interactive Tester Quick-Fills:**
    * *Simulate DVT Warning:* Automatically populates pain 8/10 and calf warmth, generating an urgent Red alert on Dr. Sarah Chen's dashboard.
    * *Simulate Infection Flag:* Populates fever 101.2°F and incision drainage.

### 7. AI Monitoring & Explainable Analysis (`/dashboard/pipeline`)
* **Interactive 7-Step Visual Pipeline Diagram:** Profile Setup $\rightarrow$ Scheduled Follow-Up $\rightarrow$ Patient Response $\rightarrow$ RAG Knowledge Retrieval $\rightarrow$ Baseline Comparison $\rightarrow$ Explainable AI Triage $\rightarrow$ Doctor Action.
* **Run Pipeline Simulation:** Animate through the 7 steps in real-time.
* **Patient Baseline Comparison Card:** Shows previous baseline, current reported condition, notable clinical deviations, and confidence score.
* **RAG Knowledge Inspector:** Inspect retrieved clinical chunks with similarity scores from AAOS, CDC, and ACS guidelines.

### 8. Alerts & Triage Center (`/dashboard/alerts`)
* Categorized into **Red (High Priority)**, **Amber (Caution)**, and **Green (Routine)**.
* **Triage Drawer/Modal:**
  * Inspect full clinical history, reported changes, and previous baselines.
  * Read attached RAG medical literature citations.
  * Add reviewer notes (Dr. Sarah Chen, MD) and update status (*Under Review*, *Escalate*, *Mark Resolved*).

### 9. Reports & Adherence Analytics (`/dashboard/reports`)
* Cohort follow-up completion rate ($94.2\%$).
* Missed check-in trends and average doctor response time.
* Weekly volume bar chart and alert severity distribution donut chart.
* Comparative pain recovery curves by surgical procedure (Arthroplasty vs Laparoscopy vs CABG).
* Demo CSV export button.

### 10. Platform Settings & Architecture (`/dashboard/settings`)
* Doctor profile configuration.
* Clinical notification channels (Urgent push, audible chime, daily digest, SMS).
* Accessibility settings (High contrast mode toggle).
* **Architecture Blueprint:** Detailed integration specs for Supabase, ElizaOS, Scaleway, and pgvector.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript |
| **Build & Tooling** | Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Icons & Visuals** | Lucide React |
| **Data Visualization** | Recharts (Area, Line, Bar, Pie charts) |
| **Routing** | React Router v7 (`react-router-dom`) |
| **State & Persistence** | React Context API with LocalStorage caching |
| **Accessibility & Voice** | Web Speech API (`SpeechSynthesisUtterance`) |

---

## 🔌 Architecture & Future Backend Integration

```
[ Patient Interface / Voice / SMS ] 
                │ (Check-In Responses)
                ▼
      [ Supabase Backend ] ◄──── (RLS & Clinician Tenant Isolation)
                │
                ├─────► [ ElizaOS Autonomous Scheduling Agent ] (on Scaleway Cloud)
                │
                └─────► [ RAG Knowledge Engine ]
                              ├── pgvector Dense Index
                              ├── AAOS / CDC / ACS Guidelines
                              └── Patient EHR Baseline Trajectory
                                        │
                                        ▼
                         [ Clinician Triage Queue ]
                                        │
                         [ Attending Doctor Decision ]
```

---

## 💻 Local Development Setup

To run or build MediGuide locally:

```bash
# 1. Navigate to the project directory
cd C:\Users\rakes\.gemini\antigravity\scratch\mediguide

# 2. Install dependencies (already installed)
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:5173/

# 5. Production Build
npm run build
```

---

## 📄 License & Clinical Disclaimer

*MediGuide is created as an assistive clinical triage and post-operative monitoring demo. It does not provide medical diagnoses or independent treatments. Fictional patient data only.*
