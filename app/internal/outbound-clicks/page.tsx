import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { outboundActionLabels } from "@/lib/outboundActions";
import { getOutboundClickStats } from "@/lib/outboundTracking";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Outbound Click Report",
  robots: {
    index: false,
    follow: false
  }
};

type OutboundClicksPageProps = {
  searchParams?: Promise<{
    key?: string;
  }>;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default async function OutboundClicksPage({
  searchParams
}: OutboundClicksPageProps) {
  const params = (await searchParams) ?? {};
  const adminKey = process.env.OPENCHAIR_ADMIN_KEY;

  if (!adminKey || params.key !== adminKey) {
    notFound();
  }

  const stats = await getOutboundClickStats();

  return (
    <main>
      <Header />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Internal report
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            OpenChair outbound clicks
          </h1>
          <p className="mt-4 max-w-3xl text-[color:var(--muted)]">
            This hidden report shows only real outbound clicks stored from tracked call,
            booking, website, and directions actions. No fake counters are shown.
          </p>

          {!stats.storageConfigured ? (
            <div className="mt-8 rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow)]">
              <h2 className="text-2xl font-semibold">Persistent storage is not configured yet</h2>
              <p className="mt-3 text-[color:var(--muted)]">
                Add Upstash Redis REST environment variables in Vercel to start storing real
                outbound click data: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ["Total outbound clicks", stats.totalClicks],
                  ["Last 7 days", stats.last7DaysClicks],
                  ["Last 30 days", stats.last30DaysClicks]
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow)]"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      {label}
                    </p>
                    <p className="mt-3 text-4xl font-semibold">
                      {formatNumber(Number(value))}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <section className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow)]">
                  <h2 className="text-2xl font-semibold">Clicks by listing</h2>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Last 30 days</p>
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <thead className="text-[color:var(--muted)]">
                        <tr>
                          <th className="border-b border-[color:var(--line)] py-3 pr-4">Listing</th>
                          <th className="border-b border-[color:var(--line)] py-3 pr-4">Location</th>
                          <th className="border-b border-[color:var(--line)] py-3 text-right">Clicks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.byListingLast30Days.length > 0 ? (
                          stats.byListingLast30Days.map((item) => (
                            <tr key={item.shopId}>
                              <td className="border-b border-[color:var(--line)] py-3 pr-4 font-medium">
                                {item.shopName}
                              </td>
                              <td className="border-b border-[color:var(--line)] py-3 pr-4 text-[color:var(--muted)]">
                                {item.city}, {item.state} {item.zip}
                              </td>
                              <td className="border-b border-[color:var(--line)] py-3 text-right font-semibold">
                                {formatNumber(item.count)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="py-4 text-[color:var(--muted)]" colSpan={3}>
                              No outbound clicks tracked yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[var(--shadow)]">
                  <h2 className="text-2xl font-semibold">Clicks by action</h2>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Last 30 days</p>
                  <div className="mt-5 space-y-3">
                    {Object.entries(outboundActionLabels).map(([action, label]) => {
                      const actionStats = stats.byActionLast30Days.find(
                        (item) => item.action === action
                      );

                      return (
                        <div
                          key={action}
                          className="flex items-center justify-between gap-4 rounded-[20px] bg-[color:var(--panel-strong)] px-4 py-4"
                        >
                          <span className="font-medium">{label}</span>
                          <span className="text-xl font-semibold">
                            {formatNumber(actionStats?.count ?? 0)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
