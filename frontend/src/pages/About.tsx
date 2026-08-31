const PRINCIPLES = [
  {
    title: "Fast redirects",
    body: "Every short link resolves through a cache built for scale, so the redirect lands before you notice the click.",
  },
  {
    title: "6-character links",
    body: "Each URL becomes a compact, Base62-encoded code — short enough to say out loud, long enough to stay unique.",
  },
  {
    title: "6-month expiry",
    body: "Links stay live for six months from creation, then retire automatically. Nothing to clean up.",
  },
  {
    title: "Reliable storage",
    body: "Every link is written durably the moment it's created, so it resolves the same way today and six months from now.",
  },
];

export function About() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-12 sm:pt-20">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-stone)]">About</p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-[var(--color-ink)] sm:text-5xl">
        Shortly turns long URLs into compact, shareable links.
      </h1>
      <p className="mt-6 text-lg text-[var(--color-graphite)]">
        No accounts required to start, no clutter once you're in. Paste a URL, get back something you'd
        actually want to send.
      </p>

      <dl className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {PRINCIPLES.map((item) => (
          <div key={item.title} className="border-t border-[var(--color-line)] pt-5">
            <dt className="font-display text-xl text-[var(--color-ink)]">{item.title}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-[var(--color-graphite)]">{item.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
