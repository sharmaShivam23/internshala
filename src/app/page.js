'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import FilterSidebar from '@/components/FilterSidebar';
import InternshipList from '@/components/InternshipList';
import ApplicationTracker from '@/components/ApplicationTracker';
import { useInternships } from '@/hooks/useInternships';
import { useDebounce } from '@/utils/debounce';
import { filterInternships, extractFilterOptions } from '@/utils/filters';
import { 
  saveFilters, 
  loadFilters, 
  saveFavorites, 
  loadFavorites,
  saveUserSkills,
  loadUserSkills,
  saveApplications,
  loadApplications
} from '@/utils/storage';

const DEFAULT_FILTERS = {
  profile: [],
  location: [],
  duration: [],
  stipend: 'all',
  workFromHome: false,
};

export default function HomePage() {
  const { internships, loading, error } = useInternships();
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Custom interactive features state
  const [activeView, setActiveView] = useState('explore'); // 'explore' or 'tracker'
  const [skills, setSkills] = useState([]);
  const [trackedApplications, setTrackedApplications] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' is default (Internshala white style)

  const debouncedSearch = useDebounce(searchValue, 300);

  // Load persisted state on mount
  useEffect(() => {
    const savedFilters = loadFilters();
    const savedFavorites = loadFavorites();
    const savedSkills = loadUserSkills();
    const savedApps = loadApplications();
    const savedTheme = localStorage.getItem('internhub_theme') || 'light';

    if (savedFilters) {
      setFilters(savedFilters);
      setSearchValue(savedFilters._search || '');
    }
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
    if (savedSkills) {
      setSkills(savedSkills);
    }
    if (savedApps) {
      setTrackedApplications(savedApps);
    }
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setInitialized(true);
  }, []);

  // Persist filters on change
  useEffect(() => {
    if (!initialized) return;
    saveFilters({ ...filters, _search: debouncedSearch });
  }, [filters, debouncedSearch, initialized]);

  // Persist favorites on change
  useEffect(() => {
    if (!initialized) return;
    saveFavorites(favorites);
  }, [favorites, initialized]);

  // Persist skills on change
  useEffect(() => {
    if (!initialized) return;
    saveUserSkills(skills);
  }, [skills, initialized]);

  // Persist applications on change
  useEffect(() => {
    if (!initialized) return;
    saveApplications(trackedApplications);
  }, [trackedApplications, initialized]);

  // Persist theme changes
  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem('internhub_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, initialized]);

  // Extract dynamic filter options from data
  const filterOptions = useMemo(
    () => extractFilterOptions(internships),
    [internships]
  );

  // Apply filters
  const filteredInternships = useMemo(() => {
    let result = filterInternships(internships, {
      ...filters,
      search: debouncedSearch,
    });

    if (showFavoritesOnly) {
      result = result.filter((i) => favorites.includes(i.id));
    }

    return result;
  }, [internships, filters, debouncedSearch, showFavoritesOnly, favorites]);

  const handleToggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchValue('');
    setShowFavoritesOnly(false);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Skills tracker change handler
  const handleSaveSkills = useCallback((updatedSkills) => {
    setSkills(updatedSkills);
  }, []);

  // Theme toggle handler
  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Add application pipeline tracker handlers
  const handleTrackApplication = useCallback((internship) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    setTrackedApplications((prev) => {
      // Check duplicate
      if (prev.some(app => app.id === internship.id)) return prev;

      const newApp = {
        id: internship.id,
        internship,
        status: 'applied',
        appliedDate: formattedDate,
        notes: '',
        interviewDate: '',
        interviewTime: ''
      };

      return [...prev, newApp];
    });
  }, []);

  const handleUpdateApplication = useCallback((updatedApp) => {
    setTrackedApplications((prev) => 
      prev.map(app => app.id === updatedApp.id ? updatedApp : app)
    );
  }, []);

  const handleRemoveTrackedApplication = useCallback((id) => {
    setTrackedApplications((prev) => prev.filter(app => app.id !== id));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg-page transition-colors duration-300">
      <Header
        activeView={activeView}
        onChangeView={setActiveView}
        favoriteCount={favorites.length}
        onToggleFavorites={(show) => setShowFavoritesOnly(show)}
        skills={skills}
        onSaveSkills={handleSaveSkills}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Mobile filter toggle (Only show when exploring and not showing favorites) */}
      {activeView === 'explore' && !showFavoritesOnly && (
        <div className="sticky top-16 z-30 border-b border-border-theme bg-card/90 px-4 py-3 backdrop-blur-lg lg:hidden transition-colors duration-300">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-theme bg-card hover:bg-bg-page py-2.5 text-sm font-medium text-text-sub hover:text-text-main transition-all active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Filters
            {(filters.profile?.length > 0 ||
              filters.location?.length > 0 ||
              filters.duration?.length > 0 ||
              (filters.stipend && filters.stipend !== 'all') ||
              filters.workFromHome) && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-white">
                !
              </span>
            )}
          </button>
        </div>
      )}

      {/* Main content */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6 sm:px-6 min-h-[75vh]">
        {activeView === 'explore' ? (
          <>
            <FilterSidebar
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              mobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobileFilterOpen(false)}
            />

            <div className="flex-1 min-w-0">
              <InternshipList
                internships={filteredInternships}
                loading={loading}
                error={error}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onClearFilters={handleClearFilters}
                skills={skills}
                trackedApplications={trackedApplications}
                onTrackApplication={handleTrackApplication}
                onRemoveTrackedApplication={handleRemoveTrackedApplication}
              />
            </div>
          </>
        ) : (
          <div className="w-full min-w-0 animate-fade-in">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-text-main flex items-center gap-2 select-none">
                  <span>📋</span> Personal Application Pipeline
                </h2>
                <p className="text-xs text-text-sub mt-1">
                  Drag, drop, or select card status to advance your internship recruitment stages. Keep interview notes private.
                </p>
              </div>
              <button 
                onClick={() => setActiveView('explore')}
                className="self-start sm:self-center flex items-center gap-1.5 rounded-xl bg-card border border-border-theme hover:bg-bg-page px-4 py-2 text-xs font-semibold text-text-sub hover:text-text-main transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>🔍</span> Find More Internships
              </button>
            </div>
            
            <ApplicationTracker
              applications={trackedApplications}
              onUpdateApplication={handleUpdateApplication}
              onRemoveApplication={handleRemoveTrackedApplication}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border-theme bg-card py-6 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-[11px] text-text-muted">
            Built with ❤️ using Next.js &amp; Tailwind CSS v4 • Custom student-centered features for Internshala
          </p>
        </div>
      </footer>
    </div>
  );
}


