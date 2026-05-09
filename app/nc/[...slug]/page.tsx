import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ShopCard } from "@/components/ShopCard";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getLocationPageBySegments,
  getLocationPageShops,
  getRelatedLocationPages,
  getShopLocationSummary,
  locationPages
} from "@/data/locationPages";
import { SITE_URL } from "@/lib/site";
import { getLocationPageStructuredData } from "@/lib/structuredData";

type LocationLandingPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

function getIntentSummary(page: (typeof locationPages)[number]) {
  if (page.shopFilter === "walkIns") {
    return "walk-in friendly shops, online check-in options, and same-day call paths";
  }

  if (page.shopFilter === "openNow") {
    return "shops marked open now with quick call, booking, website, and directions links";
  }

  if (page.shopFilter === "kids") {
    return "shops that publicly list kids cuts or family-friendly haircut options";
  }

  if (page.shopFilter === "mens") {
    return "barbershops, fades, beard services, and men's haircut options";
  }

  return "nearby haircut shops with public phone, booking, website, and directions links";
}

function getBeforeYouGoItems(page: (typeof locationPages)[number]) {
  return [
    {
      title: "Confirm today's hours",
      text: "Shop hours and online check-in windows can change. Call or open the shop page before driving."
    },
    {
      title: page.shopFilter === "walkIns" ? "Ask about walk-ins" : "Choose the fastest next step",
      text:
        page.shopFilter === "walkIns"
          ? "Walk-in friendly does not always mean no wait. A quick call can save a wasted trip."
          : "If you are in a hurry, call first. If booking is available, use the shop link to check the current calendar."
    },
    {
      title: "Use directions last",
      text: "Once you choose a shop, open directions from ChairRadar so the trip starts from the listing you selected."
    }
  ];
}

export function generateStaticParams() {
  return locationPages.map((page) => ({
    slug: page.segments
  }));
}

export async function generateMetadata({
  params
}: LocationLandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocationPageBySegments(slug);

  if (!page) {
    return {
      title: "Location not found"
    };
  }

  const url = `${SITE_URL}${page.href}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${page.metaTitle} | ChairRadar`,
      description: page.metaDescription,
      url,
      siteName: "ChairRadar",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | ChairRadar`,
      description: page.metaDescription
    }
  };
}

export default async function LocationLandingPage({
  params
}: LocationLandingPageProps) {
  const { slug } = await params;
  const page = getLocationPageBySegments(slug);

  if (!page) {
    notFound();
  }

  const pageShops = getLocationPageShops(page);
  const relatedPages = getRelatedLocationPages(page);
  const summary = getShopLocationSummary(pageShops);
  const structuredData = getLocationPageStructuredData(page, pageShops);
  const intentSummary = getIntentSummary(page);
  const beforeYouGoItems = getBeforeYouGoItems(page);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <section className="px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {page.heading}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
              {page.description}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              Use this page to compare {intentSummary} in {page.areaName}, then pick the fastest way to contact the shop.
            </p>
            <p className="mt-4 inline-flex rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold text-[color:var(--muted)]">
              {page.lastUpdatedLabel}
            </p>
            <div className="mt-8 max-w-3xl">
              <SearchBar defaultLocation={page.searchLocation} />
            </div>
          </div>

          <aside className="rounded-[34px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              ChairRadar coverage
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              {pageShops.length} real listings
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              {page.intro}
            </p>
            <div className="mt-5 rounded-[24px] bg-[color:var(--panel-strong)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Best for
              </p>
              <p className="mt-2 text-sm font-medium leading-6">{intentSummary}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              Coverage includes {summary.cities.join(", ")}. Listings use public shop pages,
              phone numbers, and booking links where available.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {summary.zips.map((zip) => (
                <span
                  key={zip}
                  className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-2 text-sm font-medium"
                >
                  {zip}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Nearby haircut options
              </h2>
              <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
                Start with the listing, then call, book on the shop site, visit the website, or get directions.
                No fake availability counters are shown.
              </p>
            </div>
            <Link
              href={`/search?query=Haircut&location=${encodeURIComponent(page.searchLocation)}`}
              className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold shadow-[0_10px_25px_rgba(44,30,18,0.06)]"
            >
              Open search results
            </Link>
          </div>

          <div className="mt-8 grid gap-6">
            {pageShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                sourcePage={`seo_${page.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[34px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Before you go
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Quick checks before choosing a haircut shop
            </h2>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {beforeYouGoItems.map((item) => (
              <div key={item.title} className="rounded-[26px] bg-[color:var(--panel-strong)] p-5">
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[34px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            Related haircut searches near {page.areaName}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedPages.map((relatedPage) => (
              <Link
                key={relatedPage.id}
                href={relatedPage.href}
                className="rounded-[26px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-5 transition hover:-translate-y-1"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {relatedPage.areaName}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {relatedPage.heading}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
