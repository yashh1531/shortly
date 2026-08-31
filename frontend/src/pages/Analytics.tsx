import { AnalyticsTable } from "../components/AnalyticsTable";
import { mockAnalyticsRows } from "../utils/mockAnalytics";

export function Analytics() {
  const rows = mockAnalyticsRows;
  const totalClicks = rows.reduce((sum, row) => sum + row.totalClicks, 0);

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-12 sm:pt-20">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-stone)]">Analytics</p>
      <h1 className="mt-4 font-display text-4xl font-medium text-[var(--color-ink)] sm:text-5xl">
        Your links, at a glance.
      </h1>
      <p className="mt-4 max-w-lg text-[var(--color-graphite)]">
        A quiet view of what people are clicking — shown here with sample data until your account is
        connected.
      </p>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-4">
        <div className="bg-[var(--color-surface)] p-6">
          <dt className="text-xs uppercase tracking-[0.08em] text-[var(--color-stone)]">Active links</dt>
          <dd className="mt-2 font-display text-3xl text-[var(--color-ink)]">{rows.length}</dd>
        </div>
        <div className="bg-[var(--color-surface)] p-6">
          <dt className="text-xs uppercase tracking-[0.08em] text-[var(--color-stone)]">Total clicks</dt>
          <dd className="mt-2 font-display text-3xl text-[var(--color-ink)]">
            {totalClicks.toLocaleString()}
          </dd>
        </div>
        <div className="bg-[var(--color-surface)] p-6">
          <dt className="text-xs uppercase tracking-[0.08em] text-[var(--color-stone)]">Avg. per link</dt>
          <dd className="mt-2 font-display text-3xl text-[var(--color-ink)]">
            {Math.round(totalClicks / rows.length).toLocaleString()}
          </dd>
        </div>
        <div className="bg-[var(--color-surface)] p-6">
          <dt className="text-xs uppercase tracking-[0.08em] text-[var(--color-stone)]">Link lifespan</dt>
          <dd className="mt-2 font-display text-3xl text-[var(--color-ink)]">6 mo</dd>
        </div>
      </dl>

      <div className="mt-8">
        <AnalyticsTable rows={rows} />
      </div>
    </section>
  );
}
