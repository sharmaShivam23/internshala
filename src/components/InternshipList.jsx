import InternshipCard from './InternshipCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';

export default function InternshipList({
  internships,
  loading,
  error,
  favorites,
  onToggleFavorite,
  onClearFilters,
  skills = [],
  trackedApplications = [],
  onTrackApplication,
  onRemoveTrackedApplication,
}) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-16 text-center animate-fade-in">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-bold text-white">Something went wrong</h3>
        <p className="text-sm text-slate-400">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-40 animate-pulse rounded-lg bg-white/[0.04]" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!internships || internships.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Showing{' '}
          <span className="font-bold text-white">{internships.length}</span>{' '}
          internship{internships.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {internships.map((internship) => {
          const trackedApp = trackedApplications.find((a) => a.id === internship.id);
          return (
            <InternshipCard
              key={internship.id}
              internship={internship}
              isFavorite={favorites.includes(internship.id)}
              onToggleFavorite={onToggleFavorite}
              skills={skills}
              trackedStatus={trackedApp ? trackedApp.status : null}
              onTrackApplication={onTrackApplication}
              onRemoveTrackedApplication={onRemoveTrackedApplication}
            />
          );
        })}
      </div>
    </div>
  );
}

