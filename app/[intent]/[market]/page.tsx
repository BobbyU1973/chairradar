import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ShopCard } from "@/components/ShopCard";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getLocalSeoPage,
  getLocalSeoPageByHref,
  getLocalSeoPageFeaturedShops,
  getLocalSeoPageShops,
  localSeoPages
} from "@/data/localSeoPages";
import { SITE_URL } from "@/lib/site";
import { getShopProfilePath } from "@/lib/shopRoutes";
import {
  getCollectionPageStructuredData,
  getBreadcrumbStructuredData,
  getFAQStructuredData
} from "@/lib/structuredData";

type LocalSeoRouteProps = {
  params: Promise<{
    intent: string;
    market: string;
  }>;
};

export function generateStaticParams() {
  return localSeoPages.map((page) => ({
    intent: page.intent,
    market: page.market
  }));
}

export async function generateMetadata({
  params
}: LocalSeoRouteProps): Promise<Metadata> {
  const { intent, market } = await params;
  const page = getLocalSeoPage(intent, market);

  if (!page) {
    return {
      title: "Local haircut page not found"
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

export default async function LocalSeoRoute({ params }: LocalSeoRouteProps) {
  const { intent, market } = await params;
  const page = getLocalSeoPage(intent, market);

  if (!page) {
    notFound();
  }

  const pageShops = getLocalSeoPageShops(page);
  const featuredShopPages = getLocalSeoPageFeaturedShops(page, 4);
  const pageUrl = `${SITE_URL}${page.href}`;
  const structuredData = [
    getCollectionPageStructuredData({
      name: page.metaTitle,
      description: page.metaDescription,
      url: pageUrl,
      items: pageShops.slice(0, 30).map((shop) => ({
        name: shop.name,
        url: `${SITE_URL}${getShopProfilePath(shop)}`
      }))
    }),
    getBreadcrumbStructuredData([
      { name: "ChairRadar", url: SITE_URL },
      { name: "Browse by location", url: `${SITE_URL}/locations` },
      { name: page.metaTitle, url: pageUrl }
    ]),
    getFAQStructuredData(page.faq)
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <section className="px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.66fr_0.34fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {page.heading}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
              {page.intro}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              {page.coverageSummary}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              {page.pageTypeSummary} ChairRadar stays lightweight here too: use the listing to call, open a shop website, check online haircut booking, or get directions.
            </p>
            <div className="mt-8 max-w-3xl">
              <SearchBar
                defaultLocation={page.searchLocation}
                buttonLabel={page.ctaLabel}
              />
            </div>
          </div>

          <aside className="rounded-[30px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Quick answer
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              {pageShops.length} local options
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              {page.quickAnswer}
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              {page.stats.bookableCount} include booking links, {page.stats.walkInCount} show walk-in or check-in access, and {page.stats.openNowCount} currently show open-now status in the broader coverage area.
            </p>
            <Link
              href={`/search?query=Haircut&location=${encodeURIComponent(page.searchLocation)}`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white"
            >
              Browse shops
            </Link>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                {page.shopSectionHeading}
              </h2>
              <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
                {page.shopSectionDescription}
              </p>
            </div>
            <Link
              href={page.browseHref}
              className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold"
            >
              {page.browseLabel}
            </Link>
          </div>

          <div className="mt-8 grid gap-6">
            {pageShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} sourcePage={`local_${page.intent}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[30px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              How to use this page
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Built for real haircut decisions in {page.marketShortName}
            </h2>
            <p className="mt-3 text-[color:var(--muted)]">
              Whether you need a walk-in haircut, same-day cleanup, booking link, or a shop that looks open right now, this page keeps those use cases in one local view.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {page.useCases.map((item) => (
              <div key={item.title} className="rounded-[24px] bg-[color:var(--panel-strong)] p-5">
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[30px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                Shop pages
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Featured shop profiles in {page.marketShortName}
              </h2>
              <p className="mt-3 text-[color:var(--muted)]">
                These shop pages carry the direct call, website, booking, and directions actions for the local listings shown above.
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold"
            >
              Browse by location
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredShopPages.map((shop) => (
              <Link
                key={shop.id}
                href={getShopProfilePath(shop)}
                className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-5 transition hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {shop.city}, {shop.state} {shop.zip}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {shop.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {shop.availabilitySummary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.65fr_0.35fr]">
          <div className="rounded-[30px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] sm:p-8">
            <h2 className="text-3xl font-semibold tracking-tight">
              Common questions
            </h2>
            <div className="mt-6 grid gap-4">
              {page.faq.map((item) => (
                <div key={item.question} className="rounded-[24px] bg-[color:var(--panel-strong)] p-5">
                  <h3 className="text-lg font-semibold tracking-tight">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[30px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Related local searches
            </h2>
            <div className="mt-5 grid gap-3">
              {page.relatedHrefs.map((href) => {
                const related = getLocalSeoPageByHref(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-[22px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold transition hover:-translate-y-1"
                  >
                    {related?.metaTitle ?? href}
                  </Link>
                );
              })}
              {page.nearbyHrefs.map((href) => {
                const nearby = getLocalSeoPageByHref(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-[22px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold transition hover:-translate-y-1"
                  >
                    {nearby?.metaTitle ?? href}
                  </Link>
                );
              })}
              <Link
                href="/guides/find-same-day-haircut"
                className="rounded-[22px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold transition hover:-translate-y-1"
              >
                How to find a same-day haircut
              </Link>
              <Link
                href="/for-shops/get-more-haircut-customers"
                className="rounded-[22px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold transition hover:-translate-y-1"
              >
                Claim a ChairRadar listing
              </Link>
              <Link
                href="/locations"
                className="rounded-[22px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold transition hover:-translate-y-1"
              >
                Browse by location
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
