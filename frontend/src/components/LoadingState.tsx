export function LoadingState() {
  return (
    <div
      role="status"
      className="animate-rise flex items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-5"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-stone)] opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-ink)]" />
      </span>
      <span className="text-sm text-[var(--color-graphite)]">Creating your short link…</span>
    </div>
  );
}
