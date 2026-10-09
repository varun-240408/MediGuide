import React, { useState } from 'react';
import { 
  CalendarClock, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  Monitor, 
  Play, 
  User, 
  Sliders, 
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const FollowUpSchedule: React.FC = () => {
  const { patients, showToast, setSelectedPatientId } = useApp();
  const navigate = useNavigate();

  const [filterDay, setFilterDay] = useState<'today' | 'tomorrow' | 'week'>('today');

  const scheduleSlots = [
    {
      time: '08:00 AM',
      patientId: 'PAT-1083',
      patientName: 'Dorothy Parker',
      age: 79,
      surgery: 'Total Hip Replacement',
      channel: 'voice_call',
      status: 'completed',
      alertFlag: 'red',
      result: 'Completed (Fever & Drainage reported)',
    },
    {
      time: '08:30 AM',
      patientId: 'PAT-1082',
      patientName: 'Robert Taylor',
      age: 68,
      surgery: 'Total Knee Arthroplasty',
      channel: 'web_portal',
      status: 'completed',
      alertFlag: 'red',
      result: 'Completed (Calf tightness & Pain 8/10)',
    },
    {
      time: '09:00 AM',
      patientId: 'PAT-1086',
      patientName: 'Maria Gonzalez',
      age: 54,
      surgery: 'Laparoscopic Cholecystectomy',
      channel: 'text_sms',
      status: 'completed',
      alertFlag: 'green',
      result: 'Completed (Normal recovery, pain 1/10)',
    },
    {
      time: '09:15 AM',
      patientId: 'PAT-1084',
      patientName: 'James Wilson',
      age: 71,
      surgery: 'Lumbar Discectomy',
      channel: 'web_portal',
      status: 'completed',
      alertFlag: 'amber',
      result: 'Completed (Mild tingling in toe)',
    },
    {
      time: '02:00 PM',
      patientId: 'PAT-1087',
      patientName: 'David Kim',
      age: 45,
      surgery: 'Inguinal Hernia Repair',
      channel: 'web_portal',
      status: 'pending',
      alertFlag: 'none',
      result: 'Scheduled for this afternoon',
    },
    {
      time: '06:00 PM',
      patientId: 'PAT-1085',
      patientName: 'Eleanor Vance',
      age: 62,
      surgery: 'Coronary Artery Bypass (CABG)',
      channel: 'voice_call',
      status: 'pending',
      alertFlag: 'none',
      result: 'Evening medication check scheduled',
    },
  ];

  const handleTriggerNow = (patientName: string) => {
    showToast(`Initiating instant check-in prompt for ${patientName}...`);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'voice_call':
        return <span className="flex items-center gap-1 text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200"><Phone className="w-3 h-3" /> Voice Call</span>;
      case 'text_sms':
        return <span className="flex items-center gap-1 text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200"><MessageSquare className="w-3 h-3" /> SMS Check</span>;
      default:
        return <span className="flex items-center gap-1 text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200"><Monitor className="w-3 h-3" /> Web Portal</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Follow-Up Schedule</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated check-in timeslots, communication dispatches, and response delivery
          </p>
        </div>

        {/* Day toggle */}
        <div className="flex items-center text-xs bg-slate-100 p-1 rounded-xl border border-slate-200 font-medium">
          <button
            onClick={() => setFilterDay('today')}
            className={`px-3 py-1.5 rounded-lg ${filterDay === 'today' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
          >
            Today's Cadence
          </button>
          <button
            onClick={() => setFilterDay('tomorrow')}
            className={`px-3 py-1.5 rounded-lg ${filterDay === 'tomorrow' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
          >
            Tomorrow
          </button>
          <button
            onClick={() => setFilterDay('week')}
            className={`px-3 py-1.5 rounded-lg ${filterDay === 'week' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Schedule Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Total Scheduled Today</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">18 Sessions</h3>
          </div>
          <CalendarClock className="w-8 h-8 text-sky-600 opacity-80" />
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Completed & Triaged</p>
            <h3 className="text-xl font-extrabold text-emerald-600 mt-0.5">14 Completed</h3>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-600 opacity-80" />
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Pending Afternoon/Evening</p>
            <h3 className="text-xl font-extrabold text-amber-600 mt-0.5">4 Remaining</h3>
          </div>
          <Clock className="w-8 h-8 text-amber-600 opacity-80" />
        </div>
      </div>

      {/* Schedule Slots Timeline Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-600" />
            <span>Scheduled Cadence Timeslots</span>
          </h3>
          <span className="text-xs text-slate-400">Times synchronized with local timezone (EDT)</span>
        </div>

        <div className="divide-y divide-slate-100">
          {scheduleSlots.map((slot, index) => (
            <div key={index} className="p-4 hover:bg-slate-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 shrink-0 font-bold text-xs text-slate-700 bg-slate-100 py-1.5 px-2.5 rounded-lg text-center font-mono">
                  {slot.time}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-slate-900">{slot.patientName}</p>
                    <span className="text-xs text-slate-400">({slot.age}y)</span>
                    <span className="text-[10px] font-mono text-slate-400">{slot.patientId}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{slot.surgery}</p>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{slot.result}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                {getChannelIcon(slot.channel)}

                <span className={`px-2 py-0.5 rounded font-semibold ${
                  slot.status === 'completed' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {slot.status === 'completed' ? 'Completed' : 'Pending'}
                </span>

                {slot.status === 'pending' ? (
                  <button
                    onClick={() => handleTriggerNow(slot.patientName)}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <Play className="w-3 h-3" />
                    <span>Trigger Now</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedPatientId(slot.patientId);
                      navigate('/dashboard/patients');
                    }}
                    className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <span>View Record</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
