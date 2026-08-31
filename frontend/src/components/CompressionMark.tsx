interface CompressionMarkProps {
  className?: string;
}

/**
 * The page's signature visual: the product's entire premise —
 * a long address becomes a short, precise one — rendered directly
 * as typography and a single collapsing line, rather than an
 * abstract 3D shape. Long text sits in mono at low contrast with a
 * dashed rule beneath it; the rule visually contracts into a solid
 * short segment that anchors the compact code.
 */
export function CompressionMark({ className = "" }: CompressionMarkProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex select-none items-center gap-4 font-mono text-[11px] tracking-tight text-[var(--color-stone)] ${className}`}
    >
      <span className="max-w-[220px] truncate border-b border-dashed border-[var(--color-line)] pb-1 sm:max-w-[320px]">
        https://example.com/campaigns/spring/newsletter?ref=partner-042
      </span>
      <span className="text-[var(--color-line)]">—▸</span>
      <span
        className="rounded-full border border-[var(--color-ink)] px-3 py-1 font-medium text-[var(--color-ink)]"
        style={{ animation: "rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
      >
        shortly.com/aB72xQ
      </span>
    </div>
  );
}
