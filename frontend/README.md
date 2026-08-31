# Shortly — frontend

A premium, minimalist URL shortener frontend built with React, TypeScript, and Vite, designed to connect to a Java/Spring Boot backend (Base62 short codes, 6-month link expiry, PostgreSQL + Redis at scale).

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router

## Getting started

```bash
npm install
cp .env.example .env   # then set VITE_API_BASE_URL to your backend
npm run dev
```

Open the printed local URL in your browser.

## Project structure

```
src/
  components/   Reusable presentational components (form, results, states, nav)
  pages/        Route-level views: Home, Analytics, About
  layouts/      Shared page chrome (nav, footer, background)
  services/     API client (fetch wrapper for the Spring Boot backend)
  hooks/        useShortenUrl (request state machine), useReducedMotion
  types/        Shared TypeScript interfaces
  utils/        URL validation, mock analytics data
```

## Backend contract

The frontend expects:

```
POST {VITE_API_BASE_URL}/api/urls
Body:     { "url": "https://example.com/very/long/url" }
Response: { "shortCode": "aB72xQ", "shortUrl": "https://shortly.com/aB72xQ", "expiresAt": "2027-02-28T12:00:00Z" }
```

Handled status codes: `201` success, `400` validation, `404`, `429` rate limit, `500` server error, plus network failure.

The redirect itself (`GET /{shortCode}` → `302`) is served entirely by the backend; this frontend does not implement redirect logic.

## Design notes

Monochrome palette (off-white → white → light gray → medium gray → ink), Fraunces for display type, Inter for body copy, IBM Plex Mono for short codes and data. Background rings and capsule forms are pure CSS/SVG, respect `prefers-reduced-motion`, and never intercept pointer events. Analytics page renders against `mockAnalyticsRows` (shaped exactly like the eventual API response) until a real endpoint exists.
