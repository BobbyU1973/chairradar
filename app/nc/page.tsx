import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SiteFooter } from "@/components/SiteFooter";
import {
  liveCityPages,
  liveCoverageAreas,
  liveShopCount,
  liveZipPages,
  priorityNorthCarolinaMarkets
} from "@/data/coverage";

export const metadata: Metadata = {
  title: "Haircut Shops in North Carolina | ChairRadar",
  description:
    "Find North Carolina haircut shops with real public phone numbers, booking links, walk-in info, and directions. Current live coverage starts around Lake Norman."
};

export default function NorthCarolinaPage() {
  return (
    <main>
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
              ChairRadar is expanding North Carolina market by market. Current live pages focus on real public listings around Lake Norman so users can call, book, visit a shop website, or get directions quickly.
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <SearchBar defaultLocation="Lake Norman" buttonLabel="Search NC shops" />
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
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  Live city pages
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Start with current NC coverage
                </h2>
              </div>
              <Link
                href="/locations"
                className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold"
              >
                View all coverage
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {liveCityPages.map((page) => (
                <Link
                  key={page.id}
                  href={page.href}
                  className="rounded-[24px] bg-[color:var(--panel-strong)] p-5 transition hover:-translate-y-1"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {page.areaName}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{page.heading}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-[36px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)] lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Live ZIP searches
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Search by nearby ZIP
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {liveZipPages.map((page) => (
                <Link
                  key={page.id}
                  href={page.href}
                  className="rounded-[22px] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold transition hover:-translate-y-1"
                >
                  {page.heading}
                </Link>
              ))}
            </div>
          </div>

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

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto rounded-[36px] border border-[color:var(--line)] bg-[color:var(--foreground)] p-6 text-white shadow-[var(--shadow)] lg:max-w-7xl lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
            Expansion candidates
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">
            More North Carolina markets can be added once real listings are ready.
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
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
