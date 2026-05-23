export default function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border-theme bg-card px-6 py-16 text-center animate-fade-in shadow-sm">
      {/* Empty illustration */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-accent-bg">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#emptyGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="emptyGrad" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="var(--accent-color)" />
              <stop offset="100%" stopColor="var(--accent-hover)" />
            </linearGradient>
          </defs>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M8 11h6" />
        </svg>
      </div>

      <h3 className="mb-2 text-lg font-bold text-text-main">
        No internships found
      </h3>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-text-sub">
        We couldn&apos;t find any internships matching your current filters. Try
        adjusting your search criteria or clear all filters.
      </p>

      <button
        onClick={onClearFilters}
        className="rounded-xl bg-accent hover:bg-accent-hover px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent/15 transition-all hover:shadow-xl hover:shadow-accent/25 active:scale-[0.98] cursor-pointer"
      >
        Clear All Filters
      </button>
    </div>
  );
}

