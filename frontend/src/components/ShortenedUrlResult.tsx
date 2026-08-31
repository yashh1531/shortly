import { CopyButton } from "./CopyButton";
import type { ShortenUrlResponse } from "../types";

interface ShortenedUrlResultProps {
  result: ShortenUrlResponse;
  onReset: () => void;
}

function formatExpiry(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "in 6 months";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export function ShortenedUrlResult({ result, onReset }: ShortenedUrlResultProps) {
  return (
    <div className="animate-rise rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-lift)] sm:p-8">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-stone)]">
        Your shortened link
      </p>

      <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={result.shortUrl}
          target="_blank"
          rel="noreferrer"
          className="truncate font-mono text-lg font-medium text-[var(--color-ink)] underline decoration-[var(--color-line)] decoration-2 underline-offset-4 hover:decoration-[var(--color-ink)] sm:text-xl"
        >
          {result.shortUrl}
        </a>
        <CopyButton value={result.shortUrl} />
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-[var(--color-line)] pt-5 text-sm text-[var(--color-stone)] sm:flex-row sm:items-center sm:justify-between">
        <span>Expires {formatExpiry(result.expiresAt)}</span>
        <button
          type="button"
          onClick={onReset}
          className="text-left font-medium text-[var(--color-graphite)] underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-ink)] sm:text-right"
        >
          Shorten another
        </button>
      </div>
    </div>
  );
}
