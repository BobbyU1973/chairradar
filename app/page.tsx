import Link from "next/link";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { ShopCard } from "@/components/ShopCard";
import { locationPages } from "@/data/locationPages";
import { shops } from "@/data/shops";

const popularSearchPageIds = [
  "mooresville-haircuts",
  "mooresville-walk-in-haircuts",
  "mooresville-28117",
  "cornelius-haircuts",
  "huntersville-haircuts",
  "denver-haircuts",
  "lake-norman-open-now-haircuts",
  "lake-norman-kids-haircuts"
];

const popularSearchPages = popularSearchPageIds
  .map((pageId) => locationPages.find((page) => page.id === pageId))
  .filter((page): page is (typeof locationPages)[number] => Boolean(page));

export default function HomePage() {
  const featuredShops = shops.slice(0, 3);

  return (
    <main>
      <Header />
      <Hero />

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-[color:var(--line)] bg-white/82 p-5 shadow-[var(--shadow)] sm:p-6 lg:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Popular haircut searches
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Start with the searches people use most.
              </h2>
            </div>
            <Link
              href="/nc/lake-norman/haircuts"
              className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold"
            >
              Browse Lake Norman
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularSearchPages.map((page) => (
              <Link
                key={page.id}
                href={page.href}
                className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 transition hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {page.areaName}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {page.metaTitle}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="popular-nearby" className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Popular nearby
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Nearby haircut shops to compare fast
              </h2>
              <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
                See real public shop pages, phone numbers, walk-in signals, booking links, websites, and directions before deciding where to go.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold shadow-[0_10px_25px_rgba(44,30,18,0.06)]"
            >
              Browse nearby shops
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} sourcePage="homepage_featured" />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] lg:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Coverage that can scale
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for statewide and national expansion, without fake local pages
            </h2>
            <p className="mt-3 text-[color:var(--muted)]">
              ChairRadar can expand market by market, but local pages should stay useful. Current live coverage includes Mooresville, Cornelius, Huntersville, Denver, Sherrills Ford, and nearby ZIPs.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/locations"
                className="inline-flex rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white"
              >
                View coverage
              </Link>
              <Link
                href="/nc"
                className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold"
              >
                North Carolina hub
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {popularSearchPages.slice(0, 4).map((page) => (
              <Link
                key={page.id}
                href={page.href}
                className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-5 transition hover:-translate-y-1"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {page.areaName}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {page.heading}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {page.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[36px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] lg:grid-cols-3 lg:p-10">
          {[
            {
              title: "Search by ZIP or city",
              text: "Enter a ZIP or city and ChairRadar surfaces nearby haircut shops from the current coverage area."
            },
            {
              title: "Compare real public info",
              text: "See address, phone, booking access, walk-in status, and public availability signals quickly."
            },
            {
              title: "Reserve on the shop's terms",
              text: "ChairRadar helps people click through or call the shop directly without adding a heavy booking system yet."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] bg-[color:var(--panel-strong)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                ChairRadar
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[36px] border border-[color:var(--line)] bg-[color:var(--foreground)] px-6 py-8 text-white shadow-[var(--shadow)] lg:flex-row lg:items-center lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
              Main call to action
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Find a real nearby haircut shop fast, then click or call to reserve.
            </h2>
          </div>
          <Link
            href="/search"
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--foreground)]"
          >
            Search real nearby shops
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
