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
    success: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-500/5',
    info: 'text-accent bg-accent-bg border-accent-border',
    warning: 'text-amber-600 bg-amber-500/10 border-amber-500/20 dark:text-amber-400 dark:bg-amber-500/5',
  };

  // Compute Skill Match details
  const { score, matchingSkills, missingSkills } = calculateMatchScore(internship, skills);

  // Get color for match score
  const getMatchScoreColor = (pct) => {
    if (pct >= 70) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/35 dark:text-emerald-400 dark:bg-emerald-500/5';
    if (pct >= 35) return 'text-amber-600 bg-amber-500/10 border-amber-500/35 dark:text-amber-400 dark:bg-amber-500/5';
    return 'text-accent bg-accent-bg border-accent-border';
  };

  const statusLabels = {
    applied: { text: 'Applied 📝', style: 'text-accent bg-accent-bg border-accent-border' },
    review: { text: 'In Review 🔍', style: 'text-blue-500 bg-blue-500/10 border-blue-500/30 dark:text-blue-400 dark:bg-blue-500/5' },
    interview: { text: 'Interviewing 🗓️', style: 'text-amber-600 bg-amber-500/10 border-amber-500/30 dark:text-amber-400 dark:bg-amber-500/5 animate-pulse' },
    offer: { text: 'Offer Secured! 🎉', style: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/5 shadow-sm shadow-emerald-500/10' },
    closed: { text: 'Closed 🛑', style: 'text-text-muted bg-bg-page border-border-theme' }
  };

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 ${
        isHovered
          ? 'border-accent/25 bg-card shadow-lg shadow-accent/5 -translate-y-0.5'
          : 'border-border-theme bg-card'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium badge */}
      {internship.is_premium && (
        <div className="absolute -top-px left-6 h-[2px] w-12 rounded-b-full bg-accent shadow-md shadow-accent/20" />
      )}

      <div className="p-5">
        {/* Header: Logo + Company + Match Score + Favorite */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={internship.company_name}
                className="h-11 w-11 shrink-0 rounded-xl border border-border-theme bg-bg-page object-contain p-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className={`h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-hover/20 text-sm font-bold text-accent ${
                logoUrl ? 'hidden' : 'flex'
              }`}
            >
              {internship.company_name?.charAt(0) || '?'}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-text-main group-hover:text-accent transition-colors truncate">
                {internship.title}
              </h3>
              <p className="mt-0.5 text-xs text-text-sub truncate">
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
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-theme bg-card text-text-sub hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-500 transition-all active:scale-90 cursor-pointer"
              aria-label={isFavorite ? 'Remove from saved' : 'Save internship'}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill={isFavorite ? '#ef4444' : 'none'}
                stroke={isFavorite ? '#ef4444' : 'currentColor'}
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
          <span className="rounded-full bg-accent-bg px-2.5 py-1 text-xs font-semibold text-accent border border-accent-border">
            {internship.profile_name}
          </span>
          {locations.slice(0, 2).map((loc, i) => (
            <span
              key={i}
              className="rounded-full bg-bg-page px-2.5 py-1 text-xs text-text-sub border border-border-theme"
            >
              <span className="mr-1">📍</span>
              {loc}
            </span>
          ))}
          {locations.length > 2 && (
            <span className="rounded-full bg-bg-page px-2.5 py-1 text-xs text-text-sub border border-border-theme">
              +{locations.length - 2} more
            </span>
          )}
          {internship.work_from_home && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-500/15">
              🏠 Remote
            </span>
          )}
        </div>

        {/* Info Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-bg-page p-2.5 border border-border-theme text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Stipend</p>
            <p className="mt-0.5 text-xs font-bold text-text-main truncate">{stipendText}</p>
          </div>
          <div className="rounded-xl bg-bg-page p-2.5 border border-border-theme text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Duration</p>
            <p className="mt-0.5 text-xs font-bold text-text-main truncate">{internship.duration}</p>
          </div>
          <div className="rounded-xl bg-bg-page p-2.5 border border-border-theme text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Start Date</p>
            <p className="mt-0.5 text-xs font-bold text-text-main truncate">{internship.start_date}</p>
          </div>
        </div>

        {/* Collapsible Skills Analyzer Panel */}
        <div className="mt-4 border-t border-border-theme pt-3">
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors cursor-pointer"
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
            <div className="mt-3 space-y-2.5 rounded-xl border border-border-theme bg-bg-page p-3 text-xs animate-fade-in">
              {/* Matched skills */}
              {matchingSkills.length > 0 && (
                <div className="space-y-1">
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span>✓</span> Matching Skills ({matchingSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {matchingSkills.map(s => (
                      <span key={s} className="rounded bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing skills / skills to learn */}
              {missingSkills.length > 0 && (
                <div className="space-y-1">
                  <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <span>💡</span> Recommended to Learn / List ({missingSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {missingSkills.map(s => (
                      <span key={s} className="rounded bg-amber-500/5 border border-amber-500/20 px-2 py-0.5 text-[10px] text-amber-600 dark:text-amber-300">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[9px] text-text-muted italic mt-1 leading-relaxed">
                    💡 Highlighting these on your resume improves selection odds!
                  </p>
                </div>
              )}

              {matchingSkills.length === 0 && missingSkills.length === 0 && (
                <p className="text-[10px] text-text-muted italic">No specific skills mapping available for this generic profile.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer: Posting Label & Details Split button */}
        <div className="mt-4 flex items-center justify-between border-t border-border-theme pt-4">
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
                className="rounded-xl bg-card hover:bg-accent-bg text-text-sub hover:text-accent border border-border-theme hover:border-accent-border px-3.5 py-1.5 text-xs font-bold transition-all hover:shadow-md hover:shadow-accent/5 active:scale-95 cursor-pointer"
              >
                Track App 📋
              </button>
            )}

            {/* External Link */}
            <a
              href={detailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-xl bg-accent hover:bg-accent-hover px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-accent/15 transition-all hover:shadow-xl hover:shadow-accent/25 hover:brightness-110 active:scale-[0.97]"
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


