/**
 * Client-side validation for the URL shortening form.
 * Intentionally conservative: only http/https URLs with a real host
 * are considered valid, so the submit action never reaches the API
 * with something that is obviously not a URL.
 */
export function isValidUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    // Allow "example.com/path" style input by assuming https.
    candidate = `https://${candidate}`;
  }

  try {
    const parsed = new URL(candidate);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    // Host must contain at least one dot and no spaces, e.g. "example.com".
    if (!/^[^\s]+\.[^\s]{2,}$/.test(parsed.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

/** Normalizes user input into a fully-qualified URL before it is sent to the API. */
export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
