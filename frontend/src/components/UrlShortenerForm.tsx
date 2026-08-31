import { useState, type FormEvent } from "react";
import { UrlInput } from "./UrlInput";
import { LoadingState } from "./LoadingState";
import { ErrorMessage } from "./ErrorMessage";
import { ShortenedUrlResult } from "./ShortenedUrlResult";
import { useShortenUrl } from "../hooks/useShortenUrl";
import { isValidUrl } from "../utils/validateUrl";

const ERROR_ID = "url-input-error";

export function UrlShortenerForm() {
  const [value, setValue] = useState("");
  const { status, result, errorMessage, submit, reset } = useShortenUrl();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;
    submit(value);
  };

  const handleShortenAnother = () => {
    setValue("");
    reset();
  };

  const isDisabled = status === "loading";
  // The submit button stays inert for input that is obviously not a URL yet,
  // without flashing an error before the person has finished typing.
  const canSubmit = value.trim().length > 0 && isValidUrl(value) && !isDisabled;

  if (status === "success" && result) {
    return <ShortenedUrlResult result={result} onReset={handleShortenAnother} />;
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} noValidate>
        <div
          className={`flex flex-col items-stretch overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-[var(--shadow-soft)] transition-colors focus-within:border-[var(--color-ink)] sm:flex-row sm:items-center ${
            status === "error" ? "border-[var(--color-ink)]" : "border-[var(--color-line)]"
          }`}
        >
          <UrlInput
            value={value}
            onChange={setValue}
            disabled={isDisabled}
            invalid={status === "error"}
            describedBy={status === "error" ? ERROR_ID : undefined}
          />
          <div className="p-2 sm:pl-0">
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl bg-[var(--color-ink)] px-6 py-4 text-sm font-medium text-[var(--color-canvas)] transition-all hover:-translate-y-px hover:bg-[var(--color-graphite)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[var(--color-mist)] disabled:text-[var(--color-stone)] sm:w-auto"
            >
              Shorten URL
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 min-h-[3rem]">
        {status === "loading" && <LoadingState />}
        {status === "error" && errorMessage && <ErrorMessage id={ERROR_ID} message={errorMessage} />}
      </div>
    </div>
  );
}
