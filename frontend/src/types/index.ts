export interface ShortenUrlRequest {
  originalUrl: string;
}

export interface ShortenUrlResponse {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  expiresAt: string;
}

/** Discriminated union describing every state the shortening flow can be in. */
export type ShortenStatus = "idle" | "loading" | "success" | "error";

export interface ApiErrorShape {
  status: number;
  message: string;
}

export interface AnalyticsRow {
  shortUrl: string;
  originalUrl: string;
  totalClicks: number;
  createdAt: string;
  expiresAt: string;
  lastAccessed: string | null;
}
