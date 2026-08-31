import type { ShortenUrlRequest, ShortenUrlResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Maps a failed response to a user-facing message, matching the
 * status codes the Spring Boot backend is expected to return.
 */
function messageForStatus(status: number): string {
  switch (status) {
    case 400:
      return "Please enter a valid URL.";
    case 404:
      return "That link couldn't be found.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    case 500:
      return "Unable to create the short link. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export async function shortenUrl(url: string): Promise<ShortenUrlResponse> {
  const payload: ShortenUrlRequest = {
    originalUrl: url,
  };

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/urls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // fetch itself throws on network failure / CORS / DNS issues.
    throw new ApiError(0, "Something went wrong. Please try again.");
  }

  if (!response.ok) {
    throw new ApiError(response.status, messageForStatus(response.status));
  }

  return (await response.json()) as ShortenUrlResponse;
}
