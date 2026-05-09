import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { TrackEvent } from "@/components/TrackEvent";
import { locationPages } from "@/data/locationPages";
import { shops, type Shop } from "@/data/shops";
import { getOutboundHref } from "@/lib/outboundActions";
import { SITE_URL } from "@/lib/site";
import {
  getShopBySlug,
  getShopProfilePath,
  getShopSlug
} from "@/lib/shopRoutes";
import {
  getBreadcrumbStructuredData,
  getShopStructuredData
} from "@/lib/structuredData";

const SHOP_PROFILE_LAST_UPDATED = "Last updated May 2026";

type ShopDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getShopSummary(shop: Shop) {
  const action = shop.bookingUrl
    ? `Use ${shop.bookingLabel.toLowerCase()} or call the shop directly.`
    : "Call the shop directly or visit the website before you go.";

  return `${shop.name} is a ${shop.city}, ${shop.state} haircut option in the ${shop.neighborhood} area. ChairRadar shows the public phone number, address, walk-in signal, booking path, and directions so you can decide quickly. ${action}`;
}

function getBestForItems(shop: Shop) {
  const items = [...shop.specialties.slice(0, 3)];

  if (shop.walkInsAvailable && !items.some((item) => item.toLowerCase().includes("walk"))) {
    items.push("Walk-in friendly");
  }

  if (shop.bookingUrl && items.length < 4) {
    items.push("Online booking or check-in");
  }

  return items.slice(0, 4);
}

function getBeforeYouGoItems(shop: Shop) {
  return [
    shop.walkInsAvailable
      ? "Walk-ins are listed as available, but calling first can help avoid a wait."
      : "Appointments are recommended based on the available public listing details.",
    shop.bookingUrl
      ? `Open ${shop.bookingLabel.toLowerCase()} to check the shop's current booking or check-in path.`
      : "Use the phone number or website to confirm same-day availability.",
    "Confirm today's hours before driving, especially near closing time or on weekends."
  ];
}

function getRelatedSearchPages(shop: Shop) {
  const directMatches = locationPages.filter((page) => {
    return page.cityNames.includes(shop.city) || page.zipCodes.includes(shop.zip);
  });
  const broaderMatches = locationPages.filter((page) => page.id.startsWith("lake-norman"));

  return Array.from(new Map([...directMatches, ...broaderMatches].map((page) => [page.id, page])).values()).slice(0, 4);
}

export async function generateMetadata({
  params
}: ShopDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const shop = getShopBySlug(slug);

  if (!shop) {
    return {
      title: "Shop not found"
    };
  }

  const description = `${shop.name} in ${shop.city}, ${shop.state}. See phone, address, hours, walk-in status, booking or website links, and directions on ChairRadar.`;
  const url = `${SITE_URL}${getShopProfilePath(shop)}`;

  return {
    title: `${shop.name} in ${shop.city}, ${shop.state}`,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${shop.name} | ChairRadar`,
      description,
      url,
      siteName: "ChairRadar",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${shop.name} | ChairRadar`,
      description
    }
  };
}

export async function generateStaticParams() {
  return shops.map((shop) => ({
    slug: getShopSlug(shop)
  }));
}

export default async function ShopDetailPage({ params }: ShopDetailPageProps) {
  const { slug } = await params;
  const shop = getShopBySlug(slug);

  if (!shop) {
    notFound();
  }

  const listingType = shop.sponsored ? "sponsored" : "organic";
  const isChain =
    shop.name.includes("Great Clips") ||
    shop.name.includes("Sport Clips") ||
    shop.name.includes("Supercuts") ||
    shop.name.includes("Ulta") ||
    shop.name.includes("Fantastic Sams");
  const baseEventParams = {
    shop_id: shop.id,
    shop_name: shop.name,
    location_zip: shop.zip,
    listing_type: listingType,
    is_chain: isChain,
    source_surface: "detail"
  };
  const showWebsiteButton = shop.websiteUrl !== shop.bookingUrl;
  const bookingHref = getOutboundHref(shop.id, "book_on_website", "detail_primary_booking");
  const callHref = getOutboundHref(shop.id, "call_shop", "detail_call_button");
  const websiteHref = getOutboundHref(shop.id, "visit_website", "detail_website_button");
  const directionsHref = getOutboundHref(shop.id, "get_directions", "detail_directions_button");
  const phoneRowHref = getOutboundHref(shop.id, "call_shop", "detail_phone_row");
  const claimHref = getOutboundHref(shop.id, "claim_listing", "detail_claim_listing");
  const shopSummary = getShopSummary(shop);
  const bestForItems = getBestForItems(shop);
  const beforeYouGoItems = getBeforeYouGoItems(shop);
  const relatedSearchPages = getRelatedSearchPages(shop);
  const structuredData = [
    getShopStructuredData(shop),
    getBreadcrumbStructuredData([
      { name: "ChairRadar", url: SITE_URL },
      { name: "Haircut shops", url: `${SITE_URL}/nc/lake-norman/haircuts` },
      { name: shop.name, url: `${SITE_URL}${getShopProfilePath(shop)}` }
    ])
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TrackEvent
        eventName="shop_detail_viewed"
        params={{
          shop_id: shop.id,
          shop_name: shop.name,
          location_zip: shop.zip,
          listing_type: shop.sponsored ? "sponsored" : "organic"
        }}
      />
      <Header />

      <section className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/search"
            className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-4 py-2 text-sm font-medium shadow-[0_10px_25px_rgba(44,30,18,0.06)]"
          >
            Back to results
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[0.62fr_0.38fr]">
            <div className="rounded-[34px] border border-[color:var(--line)] bg-white/88 p-6 shadow-[var(--shadow)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                ChairRadar shop profile
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{shop.name}</h1>
                <span
                  className={[
                    "rounded-full px-3 py-1 text-sm font-semibold",
                    shop.openNow ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-700"
                  ].join(" ")}
                >
                  {shop.openNow ? "Open now" : "Closed right now"}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-[color:var(--muted)]">
                {shop.rating ? (
                  <>
                    <p className="text-lg">
                      <span className="font-semibold text-[color:var(--foreground)]">{shop.rating.toFixed(1)}</span> rating
                    </p>
                    <p>{shop.reviewCount ?? 0} reviews</p>
                  </>
                ) : (
                  <p>Public rating not listed on the primary source</p>
                )}
                <p>{shop.city}, {shop.state} {shop.zip}</p>
              </div>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                {shopSummary}
              </p>
              <p className="mt-4 inline-flex rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold text-[color:var(--muted)]">
                {SHOP_PROFILE_LAST_UPDATED}. Public details can change, so call or use the shop link before you go.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] bg-[color:var(--panel-strong)] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Address
                  </p>
                  <p className="mt-3 text-lg font-medium">
                    {shop.address}
                    <br />
                    {shop.city}, {shop.state} {shop.zip}
                  </p>
                </div>
                <div className="rounded-[28px] bg-[color:var(--panel-strong)] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Booking path
                  </p>
                  <p className="mt-3 text-lg font-medium">{shop.availabilitySummary}</p>
                </div>
              </div>

              <div className="mt-8 rounded-[28px] bg-[color:var(--panel-strong)] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  Hours
                </p>
                <div className="mt-4 grid gap-3 text-sm">
                  {shop.hoursSummary.map((line) => (
                    <p key={line} className="text-[color:var(--muted)]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-[28px] bg-[color:var(--panel-strong)] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  Walk-in status
                </p>
                <p className="mt-3 text-lg font-medium">
                  {shop.walkInsAvailable ? "Walk-ins welcome" : "Appointment recommended"}
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  Specialty services: {shop.specialties.join(", ")}
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] bg-[color:var(--panel-strong)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Best for
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {bestForItems.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[color:var(--line)] bg-white px-3 py-2 text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] bg-[color:var(--panel-strong)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Before you go
                  </p>
                  <div className="mt-4 grid gap-3 text-sm leading-6 text-[color:var(--muted)]">
                    {beforeYouGoItems.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="order-first h-fit rounded-[34px] border border-[color:var(--line)] bg-[rgba(255,250,243,0.94)] p-6 shadow-[var(--shadow)] sm:p-7 lg:order-none lg:sticky lg:top-24">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Take action
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">Call, book, or get directions</p>
              <p className="mt-3 text-[color:var(--muted)]">
                ChairRadar sends you straight to the shop's public phone, booking path, website, or map.
              </p>

              {shop.bookingUrl ? (
                <TrackedExternalLink
                  href={bookingHref}
                  target="_blank"
                  rel="noreferrer"
                  eventName="booking_click"
                  eventParams={baseEventParams}
                  className="mt-8 flex w-full items-center justify-center rounded-[22px] bg-[color:var(--accent)] px-6 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(191,90,42,0.26)] transition hover:bg-[color:var(--accent-dark)]"
                >
                  {shop.bookingLabel}
                </TrackedExternalLink>
              ) : null}

              <TrackedExternalLink
                href={callHref}
                eventName="call_click"
                eventParams={baseEventParams}
                className="mt-4 flex w-full items-center justify-center rounded-[22px] bg-[color:var(--foreground)] px-6 py-4 text-base font-semibold text-white transition hover:opacity-90"
              >
                Call {shop.phone}
              </TrackedExternalLink>

              {showWebsiteButton ? (
                <TrackedExternalLink
                  href={websiteHref}
                  target="_blank"
                  rel="noreferrer"
                  eventName="website_click"
                  eventParams={baseEventParams}
                  className="mt-4 flex w-full items-center justify-center rounded-[22px] border border-[color:var(--line)] bg-white px-6 py-4 text-base font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--panel-strong)]"
                >
                  Visit website
                </TrackedExternalLink>
              ) : null}

              <TrackedExternalLink
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                eventName="directions_click"
                eventParams={baseEventParams}
                className="mt-4 flex w-full items-center justify-center rounded-[22px] border border-[color:var(--line)] bg-white px-6 py-4 text-base font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--panel-strong)]"
              >
                Get directions
              </TrackedExternalLink>

              <div className="mt-6 space-y-4 rounded-[28px] bg-white px-5 py-5">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[color:var(--muted)]">Status</span>
                  <span className="font-semibold">
                    {shop.openNow ? "Open now" : "Closed"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[color:var(--muted)]">Walk-ins</span>
                  <span className="font-semibold">
                    {shop.walkInsAvailable ? "Available" : "Limited"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[color:var(--muted)]">Neighborhood</span>
                  <span className="font-semibold">{shop.neighborhood}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[color:var(--muted)]">Phone</span>
                  <TrackedExternalLink
                    href={phoneRowHref}
                    eventName="call_click"
                    eventParams={{
                      ...baseEventParams,
                      source_surface: "detail_phone_row"
                    }}
                    className="font-semibold"
                  >
                    {shop.phone}
                  </TrackedExternalLink>
                </div>
              </div>

              <div className="mt-6 rounded-[28px] border border-dashed border-[color:var(--line)] bg-white px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  Own this listing?
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  Claim your listing
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  Claim your ChairRadar listing so customers can find your haircut services, hours, booking link, phone number, and walk-in information.
                </p>
                <TrackedExternalLink
                  href={claimHref}
                  eventName="claim_listing_click"
                  eventParams={{
                    ...baseEventParams,
                    source_surface: "detail_claim_listing"
                  }}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-[20px] bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Claim listing
                </TrackedExternalLink>
              </div>
            </aside>
          </div>

          <div className="mt-8 rounded-[34px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] sm:p-8">
            <h2 className="text-3xl font-semibold tracking-tight">
              Related haircut searches near {shop.city}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedSearchPages.map((page) => (
                <Link
                  key={page.id}
                  href={page.href}
                  className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-5 transition hover:-translate-y-1"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {page.areaName}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{page.metaTitle}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
