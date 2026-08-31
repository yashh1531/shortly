/**
 * Ambient, decorative background: thin concentric rings and soft
 * capsule forms that echo the product's core action — collapsing
 * something long into something short — without illustrating it
 * literally. Purely visual, so it is hidden from assistive tech
 * and never intercepts pointer events.
 */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Concentric rings, upper right, partially off-canvas */}
      <div
        className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-[var(--color-line)]"
        style={{ animation: "ring-spin 140s linear infinite" }}
      >
        <div className="absolute inset-16 rounded-full border border-[var(--color-line)]" />
        <div className="absolute inset-32 rounded-full border border-[var(--color-line)]" />
      </div>

      {/* Soft capsule cluster, lower left */}
      <div
        className="absolute -bottom-24 -left-16 flex items-end gap-5 opacity-90"
        style={{ animation: "drift 16s ease-in-out infinite" }}
      >
        <span
          className="block h-64 w-16 rounded-full bg-gradient-to-b from-white to-[var(--color-mist)]"
          style={{ boxShadow: "var(--shadow-soft)" }}
        />
        <span
          className="mb-10 block h-40 w-16 rounded-full bg-gradient-to-b from-white to-[var(--color-mist)]"
          style={{ boxShadow: "var(--shadow-soft)", animation: "drift 12s ease-in-out infinite" }}
        />
        <span
          className="mb-20 block h-24 w-16 rounded-full bg-gradient-to-b from-white to-[var(--color-mist)]"
          style={{ boxShadow: "var(--shadow-soft)", animation: "drift 18s ease-in-out infinite" }}
        />
      </div>

      {/* Single mid-canvas ring for depth on wide screens */}
      <div className="absolute left-1/2 top-1/3 hidden h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-[var(--color-line)] opacity-60 lg:block" />
    </div>
  );
}
