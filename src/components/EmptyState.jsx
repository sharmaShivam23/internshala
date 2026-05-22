export default function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-16 text-center">
      {/* Empty illustration */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#emptyGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="emptyGrad" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M8 11h6" />
        </svg>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">
        No internships found
      </h3>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
        We couldn&apos;t find any internships matching your current filters. Try
        adjusting your search criteria or clear all filters.
      </p>

      <button
        onClick={onClearFilters}
        className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.98]"
      >
        Clear All Filters
      </button>
    </div>
  );
}
