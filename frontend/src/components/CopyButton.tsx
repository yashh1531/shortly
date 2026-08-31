import { useState } from "react";

interface CopyButtonProps {
  value: string;
}

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permissions can fail silently in some browsers;
      // the link text is still visible and selectable for the user.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
        copied
          ? "bg-[var(--color-mist)] text-[var(--color-ink)]"
          : "bg-[var(--color-ink)] text-[var(--color-canvas)] hover:bg-[var(--color-graphite)]"
      }`}
    >
      <span className="inline-flex items-center gap-1.5" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
