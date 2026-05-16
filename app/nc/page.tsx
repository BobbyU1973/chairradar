import type { Metadata } from "next";
import Link from "next/link";
import { BrowseByLocationSection } from "@/components/BrowseByLocationSection";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SiteFooter } from "@/components/SiteFooter";
import {
  liveCoverageAreas,
  liveShopCount,
  priorityNorthCarolinaMarkets,
  prioritySoutheastMarkets
} from "@/data/coverage";
import { localSeoBrowseGroups } from "@/data/localSeoPages";
import { SITE_URL } from "@/lib/site";
import {
  getBreadcrumbStructuredData,
  getCollectionPageStructuredData
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Haircut Shops in North Carolina | ChairRadar",
  description:
    "Find North Carolina haircut shops with real public phone numbers, booking links, walk-in info, and directions. Current live coverage includes Raleigh, Charlotte, Lake Norman, and fast-growing local markets across the state.",
  alternates: {
    canonical: `${SITE_URL}/nc`
  },
  openGraph: {
    title: "Haircut Shops in North Carolina | ChairRadar",
    description:
      "Find North Carolina haircut shops with phone numbers, booking links, walk-in info, and directions.",
    url: `${SITE_URL}/nc`,
    siteName: "ChairRadar",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Haircut Shops in North Carolina | ChairRadar",
    description:
      "Find North Carolina haircut shops with phone numbers, booking links, walk-in info, and directions."
  }
};

export default function NorthCarolinaPage() {
  const pageUrl = `${SITE_URL}/nc`;
  const structuredData = [
    getCollectionPageStructuredData({
      name: "Haircut Shops in North Carolina",
      description:
        "Browse ChairRadar's main North Carolina haircut pages with real public shop listings, booking links, walk-in info, and directions.",
      url: pageUrl,
      items: localSeoBrowseGroups.flatMap((group) =>
        group.pages.map((page) => ({
          name: page.metaTitle,
          url: `${SITE_URL}${page.href}`
        }))
      )
    }),
    getBreadcrumbStructuredData([
      { name: "ChairRadar", url: SITE_URL },
      { name: "North Carolina", url: pageUrl }
    ])
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <section className="px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              North Carolina haircut guide
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
              Find haircut shops in North Carolina.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
              ChairRadar is expanding North Carolina market by market. Current live pages include Raleigh, Charlotte, Lake Norman, Mooresville, Cornelius, Huntersville, Denver, and Sherrills Ford so users can call, book, visit a shop website, or get directions quickly.
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <SearchBar defaultLocation="Raleigh, NC" buttonLabel="Search NC shops" />
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[36px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)] lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Live now
            </p>
            <p className="mt-4 text-5xl font-semibold">{liveShopCount}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Real public shop listings in the current North Carolina coverage area.
            </p>
            <div className="mt-6 grid gap-3">
              {liveCoverageAreas.map((area) => (
                <Link
                  key={area.id}
                  href={area.href}
                  className="rounded-[22px] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold transition hover:-translate-y-1"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </aside>

          <div className="rounded-[36px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)] lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Before you go
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Check the practical details first
            </h2>
            <div className="mt-6 grid gap-3">
              {[
                "Call or use the shop's booking link to confirm today's availability.",
                "Check whether walk-ins are welcome or whether online check-in is available.",
                "Use directions last so you are heading to the right location."
              ].map((item) => (
                <p key={item} className="rounded-[22px] bg-[color:var(--panel-strong)] p-4 text-sm leading-6 text-[color:var(--muted)]">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BrowseByLocationSection
        eyebrow="Browse North Carolina"
        title="Main NC market pages with real shop data"
        description="These are the current ChairRadar city and category pages that should carry the North Carolina indexing work: haircut, barber, walk-in, kids, and open-now searches tied to live listings."
        groups={localSeoBrowseGroups}
        ctaHref="/locations"
        ctaLabel="View all coverage"
      />

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto rounded-[36px] border border-[color:var(--line)] bg-[color:var(--foreground)] p-6 text-white shadow-[var(--shadow)] lg:max-w-7xl lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
            Expansion queue
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">
            More North Carolina markets can be added once real listings are ready, then the same system can fan out across the Southeast.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
            These are not fake coverage pages. They are the logical next places to build real shop data for statewide reach.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {priorityNorthCarolinaMarkets.map((market) => (
              <span key={market} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                {market}
              </span>
            ))}
          </div>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
            Southeast after North Carolina
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {prioritySoutheastMarkets.map((market) => (
              <span key={market} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                {market}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
