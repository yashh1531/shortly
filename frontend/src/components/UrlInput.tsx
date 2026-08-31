import type { ChangeEvent } from "react";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
}

export function UrlInput({ value, onChange, disabled, invalid, describedBy }: UrlInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  return (
    <div className="flex-1">
      <label htmlFor="url-input" className="sr-only">
        Paste your long URL
      </label>
      <input
        id="url-input"
        name="url"
        type="text"
        inputMode="url"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        placeholder="Paste your long URL"
        value={value}
        disabled={disabled}
        onChange={handleChange}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="w-full bg-transparent px-6 py-5 text-base text-[var(--color-ink)] placeholder:text-[var(--color-stone)] focus:outline-none disabled:opacity-60 sm:text-lg"
      />
    </div>
  );
}
