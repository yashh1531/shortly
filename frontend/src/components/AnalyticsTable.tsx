import type { AnalyticsRow } from "../types";

interface AnalyticsTableProps {
  rows: AnalyticsRow[];
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function AnalyticsTable({ rows }: AnalyticsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-line)] px-6 py-16 text-center">
        <p className="font-display text-xl text-[var(--color-ink)]">No links yet</p>
        <p className="mt-2 text-sm text-[var(--color-stone)]">
          Shorten your first URL and its activity will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">Your shortened links and their activity</caption>
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.08em] text-[var(--color-stone)]">
              <th scope="col" className="px-6 py-4 font-medium">
                Short link
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Original URL
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Clicks
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Created
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Expires
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Last accessed
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.shortUrl}
                className="border-b border-[var(--color-line)] last:border-0 hover:bg-[var(--color-canvas)]"
              >
                <td className="px-6 py-4 font-mono text-[var(--color-ink)]">{row.shortUrl}</td>
                <td className="max-w-[280px] truncate px-6 py-4 text-[var(--color-graphite)]">
                  {row.originalUrl}
                </td>
                <td className="px-6 py-4 tabular-nums text-[var(--color-ink)]">
                  {row.totalClicks.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-[var(--color-stone)]">{formatDate(row.createdAt)}</td>
                <td className="px-6 py-4 text-[var(--color-stone)]">{formatDate(row.expiresAt)}</td>
                <td className="px-6 py-4 text-[var(--color-stone)]">{formatDate(row.lastAccessed)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
