'use client';

import { useState } from 'react';
import SkillProfileDrawer from './SkillProfileDrawer';

export default function Header({ 
  activeView, 
  onChangeView, 
  favoriteCount = 0, 
  onToggleFavorites,
  skills = [],
  onSaveSkills
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showFavs, setShowFavs] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#05050a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white select-none">
              Intern<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Hub</span>
            </h1>
          </div>

          {/* Sliding Tab Switcher in Center */}
          <div className="hidden md:flex rounded-xl bg-white/[0.03] border border-white/[0.06] p-1">
            <button
              onClick={() => {
                onChangeView?.('explore');
                if (showFavs) {
                  setShowFavs(false);
                  onToggleFavorites?.(false);
                }
              }}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                activeView === 'explore' && !showFavs
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Explore Internships
            </button>
            <button
              onClick={() => {
                onChangeView?.('tracker');
                if (showFavs) {
                  setShowFavs(false);
                  onToggleFavorites?.(false);
                }
              }}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                activeView === 'tracker' && !showFavs
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Application Tracker
            </button>
          </div>

          {/* Action Buttons on Right */}
          <div className="flex items-center gap-2">
            {/* Skills Profile Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="group flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/5 hover:text-white"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">My Skills</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/30 px-1 text-[10px] font-bold text-indigo-300 transition-all group-hover:bg-indigo-500 group-hover:text-white">
                {skills.length}
              </span>
            </button>

            {/* Favorites Badge */}
            <button
              onClick={() => {
                const next = !showFavs;
                setShowFavs(next);
                onToggleFavorites?.(next);
                if (next) {
                  onChangeView?.('explore'); // Reset to list view if looking at favorites
                }
              }}
              className="group relative flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={showFavs ? '#ef4444' : 'none'}
                stroke={showFavs ? '#ef4444' : 'currentColor'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all group-hover:scale-115"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="hidden sm:inline">Saved</span>
              {favoriteCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/30 px-1 text-[10px] font-bold text-red-400">
                  {favoriteCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden border-t border-white/[0.04] bg-white/[0.005] p-1.5 justify-around">
          <button
            onClick={() => {
              onChangeView?.('explore');
              if (showFavs) {
                setShowFavs(false);
                onToggleFavorites?.(false);
              }
            }}
            className={`flex-1 text-center py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeView === 'explore' && !showFavs
                ? 'bg-white/[0.04] border border-white/[0.06] text-white'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => {
              onChangeView?.('tracker');
              if (showFavs) {
                setShowFavs(false);
                onToggleFavorites?.(false);
              }
            }}
            className={`flex-1 text-center py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeView === 'tracker' && !showFavs
                ? 'bg-white/[0.04] border border-white/[0.06] text-white'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Tracker
          </button>
        </div>
      </header>

      {/* Embedded Skill Drawer */}
      <SkillProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        skills={skills}
        onSaveSkills={onSaveSkills}
      />
    </>
  );
}

