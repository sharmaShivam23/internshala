export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-border-theme bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-bg-page" />
          <div className="space-y-2">
            <div className="h-4 w-36 rounded-lg bg-bg-page" />
            <div className="h-3 w-24 rounded-lg bg-bg-page/70" />
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg bg-bg-page/70" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-6 w-20 rounded-full bg-bg-page/70" />
        <div className="h-6 w-16 rounded-full bg-bg-page/70" />
        <div className="h-6 w-24 rounded-full bg-bg-page/70" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="space-y-1.5 rounded-xl bg-bg-page/40 p-3">
          <div className="h-3 w-12 rounded bg-bg-page" />
          <div className="h-4 w-16 rounded bg-bg-page/70" />
        </div>
        <div className="space-y-1.5 rounded-xl bg-bg-page/40 p-3">
          <div className="h-3 w-14 rounded bg-bg-page" />
          <div className="h-4 w-20 rounded bg-bg-page/70" />
        </div>
        <div className="space-y-1.5 rounded-xl bg-bg-page/40 p-3">
          <div className="h-3 w-10 rounded bg-bg-page" />
          <div className="h-4 w-14 rounded bg-bg-page/70" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-bg-page/70" />
        <div className="h-8 w-24 rounded-lg bg-bg-page/70" />
      </div>
    </div>
  );
}

