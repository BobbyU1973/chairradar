import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ShopCard } from "@/components/ShopCard";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getLocationPageShops,
  locationPages
} from "@/data/locationPages";
import type { Shop } from "@/data/shops";
import {
  getLocalSeoPage,
  getLocalSeoPageByHref,
  localSeoPages
} from "@/data/localSeoPages";
import { SITE_URL } from "@/lib/site";
import { getShopProfilePath } from "@/lib/shopRoutes";
import {
  getBreadcrumbStructuredData,
  getFAQStructuredData
} from "@/lib/structuredData";

type LocalSeoRouteProps = {
  params: Promise<{
    intent: string;
    market: string;
  }>;
};

function getLocationPage(locationPageId: string) {
  return locationPages.find((page) => page.id === locationPageId);
}

function isBarberLike(shop: Shop) {
  return shop.specialties.some((specialty) => {
    const normalized = specialty.toLowerCase();
    return (
      normalized.includes("barber") ||
      normalized.includes("men") ||
      normalized.includes("boys") ||
      normalized.includes("beard") ||
      normalized.includes("fade")
    );
  });
}

function refineLocalShops(intent: string, shops: Shop[]) {
  if (intent === "barbers-open-now") {
    const barberShops = shops.filter((shop) => shop.openNow && isBarberLike(shop));
    return barberShops.length > 0 ? barberShops : shops;
  }

  return shops;
}

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

  const sourceLocationPage = getLocationPage(page.locationPageId);

  if (!sourceLocationPage) {
    notFound();
  }

  const pageShops = refineLocalShops(page.intent, getLocationPageShops(sourceLocationPage));
  const pageUrl = `${SITE_URL}${page.href}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      name: page.metaTitle,
      description: page.metaDescription,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "ChairRadar",
        url: SITE_URL
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: pageShops.slice(0, 30).map((shop, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: shop.name,
          url: `${SITE_URL}${getShopProfilePath(shop)}`
        }))
      }
    },
    getBreadcrumbStructuredData([
      { name: "ChairRadar", url: SITE_URL },
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
              This is a lightweight discovery page, not a live booking platform. Use the listing to call, open a shop website, check online haircut booking, or get directions.
            </p>
            <div className="mt-8 max-w-3xl">
              <SearchBar
                defaultLocation={sourceLocationPage.searchLocation}
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
              Start here for haircut near me, barber near me, barbershop open now, walk-in haircut, same-day haircut, kids haircut near me, and online haircut booking searches in Mooresville.
            </p>
            <Link
              href={`/search?query=Haircut&location=${encodeURIComponent(sourceLocationPage.searchLocation)}`}
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
                Nearby shops in Mooresville
              </h2>
              <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
                Compare public phone numbers, booking links, walk-in notes, services, hours, and directions. Call ahead when timing matters.
              </p>
            </div>
            <Link
              href={sourceLocationPage.href}
              className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold"
            >
              View full local page
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
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
