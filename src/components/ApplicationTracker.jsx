'use client';

import { useState } from 'react';

const COLUMNS = [
  { 
    id: 'applied', 
    title: 'Applied', 
    color: 'border-accent-border text-accent bg-accent-bg dark:border-indigo-500/20 dark:text-indigo-300 dark:bg-indigo-500/5', 
    dot: 'bg-accent' 
  },
  { 
    id: 'review', 
    title: 'In Review', 
    color: 'border-blue-200 text-blue-600 bg-blue-50/50 dark:border-blue-500/20 dark:text-blue-300 dark:bg-blue-500/5', 
    dot: 'bg-blue-500' 
  },
  { 
    id: 'interview', 
    title: 'Interviewing', 
    color: 'border-amber-200 text-amber-600 bg-amber-50/50 dark:border-amber-500/20 dark:text-amber-300 dark:bg-amber-500/5', 
    dot: 'bg-amber-500' 
  },
  { 
    id: 'offer', 
    title: 'Offers Received', 
    color: 'border-emerald-200 text-emerald-600 bg-emerald-50/50 dark:border-emerald-500/20 dark:text-emerald-300 dark:bg-emerald-500/5', 
    dot: 'bg-emerald-500' 
  },
  { 
    id: 'closed', 
    title: 'Closed / Rejected', 
    color: 'border-rose-200 text-rose-600 bg-rose-50/50 dark:border-rose-500/20 dark:text-rose-300 dark:bg-rose-500/5', 
    dot: 'bg-rose-500' 
  },
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
        <div className="rounded-2xl border border-border-theme bg-card p-4 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Total Tracked</p>
          <p className="mt-1 text-2xl font-black text-text-main">{totalCount}</p>
          <p className="mt-0.5 text-[10px] text-text-sub">{activeCount} active applications</p>
        </div>
        <div className="rounded-2xl border border-border-theme bg-card p-4 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Interview Stage</p>
          <p className="mt-1 text-2xl font-black text-amber-500">{interviewCount}</p>
          <p className="mt-0.5 text-[10px] text-text-sub">Preparation required</p>
        </div>
        <div className="rounded-2xl border border-border-theme bg-card p-4 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Offers Secured</p>
          <p className="mt-1 text-2xl font-black text-emerald-500">🎉 {offerCount}</p>
          <p className="mt-0.5 text-[10px] text-text-sub">Keep it up!</p>
        </div>
        <div className="rounded-2xl border border-border-theme bg-card p-4 text-center shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Interview Rate</p>
          <p className="mt-1 text-2xl font-black text-accent">{interviewRate}%</p>
          <p className="mt-0.5 text-[10px] text-text-sub">Shortlisted conversion</p>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {COLUMNS.map((col) => {
          const colApps = applications.filter((app) => app.status === col.id);

          return (
            <div 
              key={col.id}
              className="flex w-72 shrink-0 flex-col rounded-2xl border border-border-theme bg-card/40 p-3 backdrop-blur-sm"
            >
              {/* Column Header */}
              <div className={`mb-3 flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider ${col.color}`}>
                <span className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
                  {col.title}
                </span>
                <span className="rounded bg-black/5 dark:bg-white/10 px-1.5 py-0.5 text-[10px] text-text-main">
                  {colApps.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[60vh] pr-1 custom-scrollbar">
                {colApps.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-theme bg-bg-page/50 py-8 text-center">
                    <p className="text-[10px] text-text-muted font-bold">No applications</p>
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
                        className="group relative rounded-xl border border-border-theme bg-card p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-md hover:shadow-accent/5"
                      >
                        {/* Title and Company */}
                        <div>
                          <h4 className="text-xs font-bold text-text-main group-hover:text-accent transition-colors truncate">
                            {app.internship.title}
                          </h4>
                          <p className="text-[10px] text-text-sub mt-0.5 truncate">
                            {app.internship.company_name}
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          <span className="rounded bg-bg-page px-1.5 py-0.5 text-[9px] text-text-sub border border-border-theme">
                            {app.internship.profile_name}
                          </span>
                          <span className="rounded bg-bg-page px-1.5 py-0.5 text-[9px] text-text-sub border border-border-theme truncate max-w-[120px]">
                            📍 {locations[0]}
                          </span>
                        </div>

                        {/* Stipend & Duration info */}
                        <div className="mt-2.5 border-t border-border-theme pt-2 text-[10px] text-text-muted flex justify-between">
                          <span>💰 {app.internship.stipend?.salary || 'Unpaid'}</span>
                          <span>⏳ {app.internship.duration}</span>
                        </div>

                        {/* Applied Date */}
                        <div className="mt-1 text-[9px] text-text-muted">
                          Applied: {app.appliedDate}
                        </div>

                        {/* Conditional Interview Scheduler */}
                        {col.id === 'interview' && (
                          <div className="mt-3 rounded-lg bg-amber-500/5 border border-amber-500/10 p-2 space-y-1">
                            <p className="text-[9px] font-bold text-amber-600 dark:text-amber-300 uppercase tracking-wider">Interview Details</p>
                            <div className="grid grid-cols-2 gap-1">
                              <input 
                                type="date"
                                value={app.interviewDate || ''}
                                onChange={(e) => handleInterviewDateTimeChange(app.id, e.target.value, app.interviewTime || '')}
                                className="rounded border border-border-theme bg-bg-page px-1.5 py-0.5 text-[9px] text-text-main outline-none focus:border-accent"
                              />
                              <input 
                                type="time"
                                value={app.interviewTime || ''}
                                onChange={(e) => handleInterviewDateTimeChange(app.id, app.interviewDate || '', e.target.value)}
                                className="rounded border border-border-theme bg-bg-page px-1.5 py-0.5 text-[9px] text-text-main outline-none focus:border-accent"
                              />
                            </div>
                          </div>
                        )}

                        {/* Private Notes Field */}
                        <div className="mt-3 border-t border-border-theme pt-2 space-y-1">
                          {editingNotesId === app.id ? (
                            <div className="space-y-1">
                              <textarea
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                placeholder="Add private notes (e.g. contact person, tasks, preparation strategy)"
                                className="w-full rounded border border-border-theme bg-bg-page p-1.5 text-[10px] text-text-main outline-none placeholder-text-muted resize-none h-14 focus:border-accent"
                              />
                              <div className="flex gap-1 justify-end">
                                <button 
                                  onClick={() => setEditingNotesId(null)}
                                  className="rounded bg-bg-page border border-border-theme hover:bg-card px-2 py-0.5 text-[9px] text-text-sub cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <button 
                                  onClick={() => handleNotesSave(app.id)}
                                  className="rounded bg-accent hover:bg-accent-hover px-2 py-0.5 text-[9px] font-bold text-white cursor-pointer"
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
                              className="group/notes cursor-pointer rounded bg-bg-page/50 hover:bg-bg-page p-1.5 text-[10px] transition-all border border-border-theme"
                            >
                              {app.notes ? (
                                <p className="text-text-sub text-[10px] break-words line-clamp-2">
                                  📝 {app.notes}
                                </p>
                              ) : (
                                <p className="text-text-muted group-hover/notes:text-text-sub text-[10px] italic">
                                  + Click to write private notes
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Column Navigation Controls */}
                        <div className="mt-3 flex items-center justify-between border-t border-border-theme pt-2">
                          <select 
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className="rounded border border-border-theme bg-card px-2 py-1 text-[9px] text-text-sub outline-none hover:text-text-main transition-colors cursor-pointer"
                          >
                            <option value="applied">Applied</option>
                            <option value="review">In Review</option>
                            <option value="interview">Interviewing</option>
                            <option value="offer">Offer Secured</option>
                            <option value="closed">Closed / Rejected</option>
                          </select>

                          <button
                            onClick={() => onRemoveApplication(app.id)}
                            className="flex h-5 w-5 items-center justify-center rounded bg-red-500/10 hover:bg-red-500/25 text-red-500 transition-colors cursor-pointer"
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

