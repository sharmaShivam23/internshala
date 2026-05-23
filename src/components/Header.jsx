'use client';

import { useState } from 'react';
import SkillProfileDrawer from './SkillProfileDrawer';

export default function Header({ 
  activeView, 
  onChangeView, 
  favoriteCount = 0, 
  onToggleFavorites,
  skills = [],
  onSaveSkills,
  theme,
  onToggleTheme
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showFavs, setShowFavs] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border-theme bg-card/85 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover shadow-lg shadow-accent/25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-text-main select-none">
              Intern<span className="text-accent">Hub</span>
            </h1>
          </div>

          {/* Sliding Tab Switcher in Center */}
          <div className="hidden md:flex rounded-xl bg-bg-page border border-border-theme p-1">
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
                  ? 'bg-accent text-white shadow-md shadow-accent/15'
                  : 'text-text-sub hover:text-text-main'
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
                  ? 'bg-accent text-white shadow-md shadow-accent/15'
                  : 'text-text-sub hover:text-text-main'
              }`}
            >
              Application Tracker
            </button>
          </div>

          {/* Action Buttons on Right */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-theme bg-card hover:bg-bg-page text-text-sub hover:text-text-main transition-all active:scale-[0.9] cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                // Sun Icon
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                // Moon Icon
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            {/* Skills Profile Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="group flex items-center gap-2 rounded-xl border border-border-theme bg-card px-3 py-2 text-xs font-semibold text-text-sub transition-all hover:border-accent/30 hover:bg-accent-bg hover:text-text-main cursor-pointer"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">My Skills</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-lg bg-accent-bg border border-accent-border px-1 text-[10px] font-bold text-accent transition-all group-hover:bg-accent group-hover:text-white">
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
              className="group relative flex items-center gap-2 rounded-xl border border-border-theme bg-card px-3 py-2 text-xs font-semibold text-text-sub transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:text-text-main cursor-pointer"
            >
              <svg
                width="13"
                height="13"
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
                <span className="flex h-5 min-w-5 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/30 px-1 text-[10px] font-bold text-red-500">
                  {favoriteCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden border-t border-border-theme bg-card p-1.5 justify-around">
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
                ? 'bg-bg-page border border-border-theme text-text-main'
                : 'text-text-muted hover:text-text-sub'
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
                ? 'bg-bg-page border border-border-theme text-text-main'
                : 'text-text-muted hover:text-text-sub'
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


