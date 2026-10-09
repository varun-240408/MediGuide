import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const DoctorLayout: React.FC = () => {
  return (
    <div className="flex-1 flex min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Fixed/Sticky Left Sidebar */}
      <Sidebar />

      {/* Main Content Pane */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
