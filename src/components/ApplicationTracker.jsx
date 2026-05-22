'use client';

import { useState } from 'react';

const COLUMNS = [
  { id: 'applied', title: 'Applied', color: 'border-indigo-500/20 text-indigo-300 bg-indigo-500/5', dot: 'bg-indigo-400' },
  { id: 'review', title: 'In Review', color: 'border-blue-500/20 text-blue-300 bg-blue-500/5', dot: 'bg-blue-400' },
  { id: 'interview', title: 'Interviewing', color: 'border-amber-500/20 text-amber-300 bg-amber-500/5', dot: 'bg-amber-400' },
  { id: 'offer', title: 'Offers Received', color: 'border-emerald-500/20 text-emerald-300 bg-emerald-500/5', dot: 'bg-emerald-400' },
  { id: 'closed', title: 'Closed / Rejected', color: 'border-rose-500/20 text-rose-300 bg-rose-500/5', dot: 'bg-rose-400' },
];

export default function ApplicationTracker({ applications = [], onUpdateApplication, onRemoveApplication }) {
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  // Calculate statistics
  const totalCount = applications.length;
  const interviewCount = applications.filter(a => a.status === 'interview').length;
  const offerCount = applications.filter(a => a.status === 'offer').length;
  const closedCount = applications.filter(a => a.status === 'closed').length;
  
  const activeCount = totalCount - closedCount;
  const interviewRate = totalCount > 0 
    ? Math.round(((interviewCount + offerCount) / totalCount) * 100) 
    : 0;

  const handleStatusChange = (appId, nextStatus) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    onUpdateApplication({
      ...app,
      status: nextStatus
    });
  };

  const handleNotesSave = (appId) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    onUpdateApplication({
      ...app,
      notes: tempNotes
    });
    setEditingNotesId(null);
  };

  const handleInterviewDateTimeChange = (appId, date, time) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    onUpdateApplication({
      ...app,
      interviewDate: date,
      interviewTime: time
    });
  };

  return (
    <div className="space-y-6">
      {/* Tracker Statistics Dashboard */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Tracked</p>
          <p className="mt-1 text-2xl font-black text-white">{totalCount}</p>
          <p className="mt-0.5 text-[10px] text-slate-400">{activeCount} active applications</p>
        </div>
        <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Interview Stage</p>
          <p className="mt-1 text-2xl font-black text-amber-400">{interviewCount}</p>
          <p className="mt-0.5 text-[10px] text-slate-400">Preparation required</p>
        </div>
        <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Offers Secured</p>
          <p className="mt-1 text-2xl font-black text-emerald-400">🎉 {offerCount}</p>
          <p className="mt-0.5 text-[10px] text-slate-400">Keep it up!</p>
        </div>
        <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Interview Rate</p>
          <p className="mt-1 text-2xl font-black text-indigo-400">{interviewRate}%</p>
          <p className="mt-0.5 text-[10px] text-slate-400">Shortlisted conversion</p>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {COLUMNS.map((col) => {
          const colApps = applications.filter((app) => app.status === col.id);

          return (
            <div 
              key={col.id}
              className="flex w-72 shrink-0 flex-col rounded-2xl border border-white/[0.04] bg-white/[0.01] p-3"
            >
              {/* Column Header */}
              <div className={`mb-3 flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider ${col.color}`}>
                <span className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
                  {col.title}
                </span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white">
                  {colApps.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[60vh] pr-1 custom-scrollbar">
                {colApps.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.04] bg-white/[0.005] py-8 text-center">
                    <p className="text-[10px] text-slate-500">No applications</p>
                  </div>
                ) : (
                  colApps.map((app) => {
                    const locations = app.internship.location_names?.length
                      ? app.internship.location_names
                      : app.internship.work_from_home
                        ? ['Remote']
                        : ['Not specified'];

                    return (
                      <div 
                        key={app.id}
                        className="group relative rounded-xl border border-white/[0.06] bg-[#0c0c14]/90 p-4 transition-all duration-300 hover:border-indigo-500/20 hover:bg-[#0f0f1c]/90 hover:shadow-lg hover:shadow-indigo-500/5"
                      >
                        {/* Title and Company */}
                        <div>
                          <h4 className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                            {app.internship.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                            {app.internship.company_name}
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-slate-400 border border-white/5">
                            {app.internship.profile_name}
                          </span>
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-slate-400 border border-white/5 truncate max-w-[100px]">
                            📍 {locations[0]}
                          </span>
                        </div>

                        {/* Stipend & Duration info */}
                        <div className="mt-2.5 border-t border-white/[0.04] pt-2 text-[10px] text-slate-500 flex justify-between">
                          <span>💰 {app.internship.stipend?.salary || 'Unpaid'}</span>
                          <span>⏳ {app.internship.duration}</span>
                        </div>

                        {/* Applied Date */}
                        <div className="mt-1 text-[9px] text-slate-600">
                          Applied: {app.appliedDate}
                        </div>

                        {/* Conditional Interview Scheduler */}
                        {col.id === 'interview' && (
                          <div className="mt-3 rounded-lg bg-amber-500/5 border border-amber-500/10 p-2 space-y-1">
                            <p className="text-[9px] font-bold text-amber-300 uppercase tracking-wider">Interview Details</p>
                            <div className="grid grid-cols-2 gap-1">
                              <input 
                                type="date"
                                value={app.interviewDate || ''}
                                onChange={(e) => handleInterviewDateTimeChange(app.id, e.target.value, app.interviewTime || '')}
                                className="rounded border border-white/[0.06] bg-white/[0.03] px-1 py-0.5 text-[9px] text-white outline-none"
                              />
                              <input 
                                type="time"
                                value={app.interviewTime || ''}
                                onChange={(e) => handleInterviewDateTimeChange(app.id, app.interviewDate || '', e.target.value)}
                                className="rounded border border-white/[0.06] bg-white/[0.03] px-1 py-0.5 text-[9px] text-white outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* Private Notes Field */}
                        <div className="mt-3 border-t border-white/[0.04] pt-2 space-y-1">
                          {editingNotesId === app.id ? (
                            <div className="space-y-1">
                              <textarea
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                placeholder="Add private notes (e.g. contact person, tasks, preparation strategy)"
                                className="w-full rounded border border-white/[0.06] bg-white/[0.04] p-1.5 text-[10px] text-slate-200 outline-none placeholder-slate-600 resize-none h-14"
                              />
                              <div className="flex gap-1 justify-end">
                                <button 
                                  onClick={() => setEditingNotesId(null)}
                                  className="rounded bg-white/5 hover:bg-white/10 px-2 py-0.5 text-[9px] text-slate-400"
                                >
                                  Cancel
                                </button>
                                <button 
                                  onClick={() => handleNotesSave(app.id)}
                                  className="rounded bg-indigo-500 hover:bg-indigo-600 px-2 py-0.5 text-[9px] font-bold text-white"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              onClick={() => {
                                setEditingNotesId(app.id);
                                setTempNotes(app.notes || '');
                              }}
                              className="group/notes cursor-pointer rounded bg-white/[0.01] hover:bg-white/[0.03] p-1.5 text-[10px] transition-all"
                            >
                              {app.notes ? (
                                <p className="text-slate-400 text-[10px] break-words line-clamp-2">
                                  📝 {app.notes}
                                </p>
                              ) : (
                                <p className="text-slate-600 group-hover/notes:text-slate-400 text-[10px] italic">
                                  + Click to write private notes
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Column Navigation Controls */}
                        <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-2">
                          <select 
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className="rounded border border-white/[0.06] bg-[#0a0a12] px-2 py-1 text-[9px] text-slate-400 outline-none hover:text-white transition-colors"
                          >
                            <option value="applied">Applied</option>
                            <option value="review">In Review</option>
                            <option value="interview">Interviewing</option>
                            <option value="offer">Offer Secured</option>
                            <option value="closed">Closed / Rejected</option>
                          </select>

                          <button
                            onClick={() => onRemoveApplication(app.id)}
                            className="flex h-5 w-5 items-center justify-center rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Remove from tracking"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
