import type { AnalyticsRow } from "../types";

/**
 * Placeholder data shaping the analytics page until the real
 * GET /api/urls (or similar) endpoint exists. Structured to match
 * AnalyticsRow exactly so swapping in a live fetch is a drop-in change.
 */
export const mockAnalyticsRows: AnalyticsRow[] = [
  {
    shortUrl: "shortly.com/aB72xQ",
    originalUrl: "https://www.notion.so/product/roadmap/q1-2027-planning-doc",
    totalClicks: 4821,
    createdAt: "2026-02-14",
    expiresAt: "2026-08-14",
    lastAccessed: "2026-08-27",
  },
  {
    shortUrl: "shortly.com/k9Lm3P",
    originalUrl: "https://github.com/orgs/example/projects/12/views/3",
    totalClicks: 1204,
    createdAt: "2026-05-02",
    expiresAt: "2026-11-02",
    lastAccessed: "2026-08-26",
  },
  {
    shortUrl: "shortly.com/qz8VwE",
    originalUrl: "https://docs.google.com/spreadsheets/d/1a2b3c4d5e/edit",
    totalClicks: 312,
    createdAt: "2026-06-19",
    expiresAt: "2026-12-19",
    lastAccessed: "2026-08-20",
  },
  {
    shortUrl: "shortly.com/rT4nYb",
    originalUrl: "https://www.figma.com/file/xyz987/shortly-marketing-site",
    totalClicks: 58,
    createdAt: "2026-08-01",
    expiresAt: "2027-02-01",
    lastAccessed: null,
  },
];
