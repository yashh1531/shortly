import { UrlShortenerForm } from "../components/UrlShortenerForm";
import { CompressionMark } from "../components/CompressionMark";

export function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-12 text-center sm:pt-20">
      <p className="animate-rise text-xs uppercase tracking-[0.2em] text-[var(--color-stone)]">
        Links that expire in 6 months, redirects that never lag
      </p>

      <h1
        className="animate-rise mt-6 text-balance font-display text-5xl font-medium leading-[1.05] text-[var(--color-ink)] sm:text-6xl md:text-7xl"
        style={{ animationDelay: "0.05s" }}
      >
        Make every
        <br />
        link shorter.
      </h1>

      <p
        className="animate-rise mt-6 max-w-md text-balance text-lg text-[var(--color-graphite)]"
        style={{ animationDelay: "0.12s" }}
      >
        Turn long URLs into clean, shareable links.
      </p>

      <div className="animate-rise mt-10 w-full max-w-xl" style={{ animationDelay: "0.2s" }}>
        <UrlShortenerForm />
      </div>

      <CompressionMark className="animate-rise mt-14 hidden sm:flex" />
    </section>
  );
}
