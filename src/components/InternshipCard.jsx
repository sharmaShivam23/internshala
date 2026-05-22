'use client';

import { useState } from 'react';
import { calculateMatchScore } from '@/utils/filters';

export default function InternshipCard({ 
  internship, 
  isFavorite, 
  onToggleFavorite,
  skills = [],
  trackedStatus,
  onTrackApplication,
  onRemoveTrackedApplication
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const stipendText = internship.stipend?.salary || 'Unpaid';
  const locations = internship.location_names?.length
    ? internship.location_names
    : internship.work_from_home
      ? ['Work from Home']
      : ['Not specified'];

  const logoUrl = internship.company_logo
    ? `https://internshala.com/uploads/logo/${internship.company_logo}`
    : null;

  const detailUrl = `https://internshala.com/internship/detail/${internship.url}`;

  const postedTypeColors = {
    success: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    info: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  // Compute Skill Match details
  const { score, matchingSkills, missingSkills } = calculateMatchScore(internship, skills);

  // Get color for match score
  const getMatchScoreColor = (pct) => {
    if (pct >= 70) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/35 shadow-emerald-500/5';
    if (pct >= 35) return 'text-amber-400 bg-amber-500/10 border-amber-500/35 shadow-amber-500/5';
    return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/35 shadow-indigo-500/5';
  };

  const statusLabels = {
    applied: { text: 'Applied 📝', style: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/35' },
    review: { text: 'In Review 🔍', style: 'text-blue-400 bg-blue-500/10 border-blue-500/35' },
    interview: { text: 'Interviewing 🗓️', style: 'text-amber-400 bg-amber-500/10 border-amber-500/35 animate-pulse' },
    offer: { text: 'Offer Secured! 🎉', style: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/35 shadow-emerald-500/10' },
    closed: { text: 'Closed 🛑', style: 'text-slate-400 bg-white/5 border-white/10' }
  };

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 ${
        isHovered
          ? 'border-indigo-500/25 bg-white/[0.04] shadow-xl shadow-indigo-500/5 -translate-y-0.5'
          : 'border-white/[0.06] bg-white/[0.015]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium badge */}
      {internship.is_premium && (
        <div className="absolute -top-px left-6 h-1 w-12 rounded-b-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-md shadow-indigo-500/20" />
      )}

      <div className="p-5">
        {/* Header: Logo + Company + Match Score + Favorite */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={internship.company_name}
                className="h-11 w-11 shrink-0 rounded-xl border border-white/[0.06] bg-white/[0.04] object-contain p-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className={`h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-sm font-bold text-indigo-300 ${
                logoUrl ? 'hidden' : 'flex'
              }`}
            >
              {internship.company_name?.charAt(0) || '?'}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                {internship.title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-400 truncate">
                {internship.company_name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Match Score Indicator */}
            <span className={`rounded-xl border px-2 py-1 text-[10px] font-black uppercase tracking-wider transition-all shadow-sm ${getMatchScoreColor(score)}`}>
              ⚡ {score}% Match
            </span>

            {/* Favorite button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite?.(internship.id);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] transition-all hover:border-red-500/30 hover:bg-red-500/10 active:scale-90"
              aria-label={isFavorite ? 'Remove from saved' : 'Save internship'}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={isFavorite ? '#ef4444' : 'none'}
                stroke={isFavorite ? '#ef4444' : '#64748b'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-all ${isFavorite ? 'scale-110' : ''}`}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/15">
            {internship.profile_name}
          </span>
          {locations.slice(0, 2).map((loc, i) => (
            <span
              key={i}
              className="rounded-full bg-white/[0.03] px-2.5 py-1 text-xs text-slate-400 border border-white/[0.05]"
            >
              <span className="mr-1">📍</span>
              {loc}
            </span>
          ))}
          {locations.length > 2 && (
            <span className="rounded-full bg-white/[0.03] px-2.5 py-1 text-xs text-slate-400 border border-white/[0.05]">
              +{locations.length - 2} more
            </span>
          )}
          {internship.work_from_home && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/15">
              🏠 Remote
            </span>
          )}
        </div>

        {/* Info Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/[0.01] p-2.5 border border-white/[0.04] text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Stipend</p>
            <p className="mt-0.5 text-xs font-bold text-white truncate">{stipendText}</p>
          </div>
          <div className="rounded-xl bg-white/[0.01] p-2.5 border border-white/[0.04] text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Duration</p>
            <p className="mt-0.5 text-xs font-bold text-white truncate">{internship.duration}</p>
          </div>
          <div className="rounded-xl bg-white/[0.01] p-2.5 border border-white/[0.04] text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Start Date</p>
            <p className="mt-0.5 text-xs font-bold text-white truncate">{internship.start_date}</p>
          </div>
        </div>

        {/* Collapsible Skills Analyzer Panel */}
        <div className="mt-4 border-t border-white/[0.04] pt-3">
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>📊</span>
            {showInsights ? 'Hide Skill Match Details' : 'View Skill Match Details'}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`transition-transform duration-200 ${showInsights ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {showInsights && (
            <div className="mt-3 space-y-2.5 rounded-xl border border-white/[0.04] bg-white/[0.005] p-3 text-xs animate-fade-in">
              {/* Matched skills */}
              {matchingSkills.length > 0 && (
                <div className="space-y-1">
                  <p className="font-bold text-emerald-400 flex items-center gap-1">
                    <span>✓</span> Matching Skills ({matchingSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {matchingSkills.map(s => (
                      <span key={s} className="rounded bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing skills / skills to learn */}
              {missingSkills.length > 0 && (
                <div className="space-y-1">
                  <p className="font-bold text-amber-400 flex items-center gap-1">
                    <span>💡</span> Recommended to Learn / List ({missingSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {missingSkills.map(s => (
                      <span key={s} className="rounded bg-amber-500/5 border border-amber-500/20 px-2 py-0.5 text-[10px] text-amber-300">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[9px] text-slate-500 italic mt-1 leading-relaxed">
                    💡 Highlighting these on your resume improves selection odds!
                  </p>
                </div>
              )}

              {matchingSkills.length === 0 && missingSkills.length === 0 && (
                <p className="text-[10px] text-slate-500 italic">No specific skills mapping available for this generic profile.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer: Posting Label & Details Split button */}
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-4">
          <span
            className={`rounded-lg border px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
              postedTypeColors[internship.posted_by_label_type] || postedTypeColors.info
            }`}
          >
            {internship.posted_by_label}
          </span>

          <div className="flex items-center gap-2">
            {/* Kanban Pipeline Tracking Button */}
            {trackedStatus ? (
              <div className="flex items-center gap-1">
                <span className={`rounded-xl border px-3 py-1.5 text-xs font-bold ${statusLabels[trackedStatus]?.style}`}>
                  {statusLabels[trackedStatus]?.text}
                </span>
                <button
                  onClick={() => onRemoveTrackedApplication?.(internship.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all hover:scale-105 active:scale-95"
                  title="Stop tracking application"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onTrackApplication?.(internship)}
                className="rounded-xl bg-white/[0.03] hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-300 border border-white/[0.06] hover:border-indigo-500/30 px-3.5 py-1.5 text-xs font-bold transition-all hover:shadow-lg hover:shadow-indigo-500/5 active:scale-95"
              >
                Track App 📋
              </button>
            )}

            {/* External Link */}
            <a
              href={detailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.97]"
            >
              Apply
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

