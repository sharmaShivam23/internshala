export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white/[0.06]" />
          <div className="space-y-2">
            <div className="h-4 w-36 rounded-lg bg-white/[0.06]" />
            <div className="h-3 w-24 rounded-lg bg-white/[0.04]" />
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg bg-white/[0.04]" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-6 w-20 rounded-full bg-white/[0.04]" />
        <div className="h-6 w-16 rounded-full bg-white/[0.04]" />
        <div className="h-6 w-24 rounded-full bg-white/[0.04]" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="space-y-1.5 rounded-xl bg-white/[0.02] p-3">
          <div className="h-3 w-12 rounded bg-white/[0.06]" />
          <div className="h-4 w-16 rounded bg-white/[0.04]" />
        </div>
        <div className="space-y-1.5 rounded-xl bg-white/[0.02] p-3">
          <div className="h-3 w-14 rounded bg-white/[0.06]" />
          <div className="h-4 w-20 rounded bg-white/[0.04]" />
        </div>
        <div className="space-y-1.5 rounded-xl bg-white/[0.02] p-3">
          <div className="h-3 w-10 rounded bg-white/[0.06]" />
          <div className="h-4 w-14 rounded bg-white/[0.04]" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-white/[0.04]" />
        <div className="h-8 w-24 rounded-lg bg-white/[0.04]" />
      </div>
    </div>
  );
}
