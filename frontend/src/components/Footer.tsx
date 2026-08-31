export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-[var(--color-stone)] sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span className="font-display text-[var(--color-graphite)]">SHORTLY</span>
        <p>Links expire after 6 months. Built for reliable, fast redirects.</p>
        <span>© {new Date().getFullYear()} Shortly</span>
      </div>
    </footer>
  );
}
