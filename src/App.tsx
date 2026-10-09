import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DoctorLayout } from './layouts/DoctorLayout';
import { DashboardOverview } from './pages/doctor/DashboardOverview';
import { PatientsList } from './pages/doctor/PatientsList';
import { MonitoringProfiles } from './pages/doctor/MonitoringProfiles';
import { FollowUpSchedule } from './pages/doctor/FollowUpSchedule';
import { AlertsCenter } from './pages/doctor/AlertsCenter';
import { AIMonitoringPipeline } from './pages/doctor/AIMonitoringPipeline';
import { ReportsAnalytics } from './pages/doctor/ReportsAnalytics';
import { DoctorSettings } from './pages/doctor/DoctorSettings';
import { PatientCheckIn } from './pages/patient/PatientCheckIn';

const AppContent: React.FC = () => {
  const { isHighContrast } = useApp();

  return (
    <div className={`min-h-screen flex flex-col ${isHighContrast ? 'contrast-125 saturate-125' : ''}`}>
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Routes>
          {/* Public Landing & Auth */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Patient Follow-Up Interface */}
          <Route path="/patient/checkin" element={<PatientCheckIn />} />

          {/* Doctor Portal Routes */}
          <Route path="/dashboard" element={<DoctorLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="patients" element={<PatientsList />} />
            <Route path="profiles" element={<MonitoringProfiles />} />
            <Route path="schedule" element={<FollowUpSchedule />} />
            <Route path="alerts" element={<AlertsCenter />} />
            <Route path="pipeline" element={<AIMonitoringPipeline />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="settings" element={<DoctorSettings />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
