'use client';

import { useState } from 'react';

const STIPEND_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: '₹0 - 5K', value: '0-5000' },
  { label: '₹5K - 10K', value: '5000-10000' },
  { label: '₹10K - 20K', value: '10000-20000' },
  { label: '₹20K - 50K', value: '20000-50000' },
  { label: '₹50K+', value: '50000+' },
];

function FilterSection({ title, icon, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/[0.04] pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-slate-200 transition-colors hover:text-white"
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
}

function CheckboxGroup({ options, selected, onChange }) {
  return (
    <div className="max-h-40 space-y-1 overflow-y-auto pr-1 custom-scrollbar">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-white"
        >
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => {
                const next = selected.includes(option)
                  ? selected.filter((s) => s !== option)
                  : [...selected, option];
                onChange(next);
              }}
              className="peer h-4 w-4 appearance-none rounded border border-white/20 bg-white/[0.04] transition-all checked:border-indigo-500 checked:bg-indigo-500"
            />
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-[3px] hidden peer-checked:block"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <span className="truncate">{option}</span>
        </label>
      ))}
    </div>
  );
}

export default function FilterSidebar({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
  searchValue,
  onSearchChange,
  mobileOpen,
  onMobileClose,
}) {
  const hasActiveFilters =
    searchValue ||
    filters.profile?.length > 0 ||
    filters.location?.length > 0 ||
    filters.duration?.length > 0 ||
    (filters.stipend && filters.stipend !== 'all') ||
    filters.workFromHome;

  const sidebarContent = (
    <>
      {/* Search */}
      <div className="relative">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search by title, company..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-indigo-500/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-indigo-500/20"
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] py-2 text-sm font-medium text-slate-300 transition-all hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-400"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Clear All Filters
        </button>
      )}

      {/* Profile */}
      <FilterSection
        title="Profile"
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
      >
        <CheckboxGroup
          options={filterOptions.profiles}
          selected={filters.profile || []}
          onChange={(val) => onFilterChange({ ...filters, profile: val })}
        />
      </FilterSection>

      {/* Location */}
      <FilterSection
        title="Location"
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        }
      >
        <CheckboxGroup
          options={filterOptions.locations}
          selected={filters.location || []}
          onChange={(val) => onFilterChange({ ...filters, location: val })}
        />
      </FilterSection>

      {/* Duration */}
      <FilterSection
        title="Duration"
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        }
      >
        <CheckboxGroup
          options={filterOptions.durations}
          selected={filters.duration || []}
          onChange={(val) => onFilterChange({ ...filters, duration: val })}
        />
      </FilterSection>

      {/* Stipend */}
      <FilterSection
        title="Stipend Range"
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        }
      >
        <div className="grid grid-cols-2 gap-1.5">
          {STIPEND_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                onFilterChange({ ...filters, stipend: opt.value })
              }
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                filters.stipend === opt.value || (!filters.stipend && opt.value === 'all')
                  ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-300'
                  : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/10 hover:text-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Work from Home Toggle */}
      <div className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
        <span className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <span>🏠</span>
          Work from Home
        </span>
        <button
          onClick={() =>
            onFilterChange({ ...filters, workFromHome: !filters.workFromHome })
          }
          className={`relative h-6 w-11 rounded-full transition-all ${
            filters.workFromHome
              ? 'bg-gradient-to-r from-indigo-500 to-violet-500'
              : 'bg-white/10'
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
              filters.workFromHome ? 'left-[22px]' : 'left-0.5'
            }`}
          />
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20 space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Filters
          </h2>
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-[#0e0e18] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Filters
              </h2>
              <button
                onClick={onMobileClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-slate-400 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">{sidebarContent}</div>
          </div>
        </div>
      )}
    </>
  );
}
