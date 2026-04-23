import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SiteFooter } from "@/components/SiteFooter";
import {
  liveCities,
  liveCityPages,
  liveCoverageAreas,
  liveShopCount,
  liveZipCodes,
  nationalExpansionPrinciples,
  priorityNorthCarolinaMarkets
} from "@/data/coverage";

export const metadata: Metadata = {
  title: "ChairRadar Coverage | Find Haircut Shops Near You",
  description:
    "See where ChairRadar currently has real haircut shop coverage and how the lightweight haircut discovery model can expand market by market."
};

export default function LocationsPage() {
  return (
    <main>
      <Header />

      <section className="px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              ChairRadar coverage
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
              Find haircut shops by area.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
              ChairRadar is built to expand nationally, but local pages should stay useful. Current live coverage starts with real public shop listings around Lake Norman.
            </p>
            <div className="mt-8 max-w-3xl">
              <SearchBar buttonLabel="Search current coverage" />
            </div>
          </div>

          <div className="rounded-[36px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Live today
            </p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[24px] bg-[color:var(--panel-strong)] p-5">
                <p className="text-3xl font-semibold">{liveShopCount}</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">Real local shop listings</p>
              </div>
              <div className="rounded-[24px] bg-[color:var(--panel-strong)] p-5">
                <p className="text-3xl font-semibold">{liveCities.length}</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">Live cities and towns</p>
              </div>
              <div className="rounded-[24px] bg-[color:var(--panel-strong)] p-5">
                <p className="text-3xl font-semibold">{liveZipCodes.length}</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">Covered ZIP codes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)] lg:p-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Current live coverage
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Start where ChairRadar already has real listings.
              </h2>
            </div>
            <Link
              href="/nc"
              className="inline-flex w-fit rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white"
            >
              View North Carolina
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {liveCoverageAreas.map((area) => (
              <Link
                key={area.id}
                href={area.href}
                className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-5 transition hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {area.statusLabel}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{area.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{area.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Popular live city searches
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Local pages with real public shop data
            </h2>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {liveCityPages.map((page) => (
              <Link
                key={page.id}
                href={page.href}
                className="rounded-[26px] border border-[color:var(--line)] bg-white/82 p-5 shadow-[0_14px_38px_rgba(44,30,18,0.05)] transition hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {page.areaName}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{page.metaTitle}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[36px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)] lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Built for national scale
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Expand broadly without publishing empty pages.
            </h2>
            <div className="mt-5 grid gap-3">
              {nationalExpansionPrinciples.map((principle) => (
                <p key={principle} className="rounded-[22px] bg-[color:var(--panel-strong)] p-4 text-sm leading-6 text-[color:var(--muted)]">
                  {principle}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-[color:var(--line)] bg-[color:var(--foreground)] p-6 text-white shadow-[var(--shadow)] lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
              Expansion candidates
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Next NC markets to add once listings are ready
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {priorityNorthCarolinaMarkets.map((market) => (
                <span key={market} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                  {market}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
