"use client";

import Link from "next/link";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import type { Shop } from "@/data/shops";
import { trackEvent } from "@/lib/analytics";
import { getOutboundDestination } from "@/lib/outboundActions";
import { getShopProfilePath } from "@/lib/shopRoutes";

type ShopCardProps = {
  shop: Shop;
  sourcePage?: string;
};

export function ShopCard({ shop, sourcePage = "results" }: ShopCardProps) {
  const primaryExternalUrl = shop.bookingUrl ?? shop.websiteUrl;
  const showWebsiteButton = shop.websiteUrl !== primaryExternalUrl;
  const primaryAction = shop.bookingUrl ? "book_on_website" : "visit_website";
  const primaryHref = getOutboundDestination(shop, primaryAction);
  const callHref = getOutboundDestination(shop, "call_shop");
  const inlineCallHref = getOutboundDestination(shop, "call_shop");
  const websiteHref = getOutboundDestination(shop, "visit_website");
  const directionsHref = getOutboundDestination(shop, "get_directions");
  const profileHref = getShopProfilePath(shop);
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
    is_chain: isChain
  };

  return (
    <article className="rounded-[30px] border border-[color:var(--line)] bg-white/88 p-5 shadow-[var(--shadow)] transition hover:-translate-y-1 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={profileHref}
                onClick={() =>
                  trackEvent("shop_detail_clicked", {
                    ...baseEventParams,
                    source_surface: `${sourcePage}_name`
                  })
                }
                className="text-xl font-semibold tracking-tight transition hover:text-[color:var(--accent-dark)]"
              >
                {shop.name}
              </Link>
              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  shop.openNow
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-stone-200 text-stone-700"
                ].join(" ")}
              >
                {shop.openNow ? "Open now" : "Opens later"}
              </span>
            </div>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {shop.city}, {shop.state} {shop.zip} | {shop.neighborhood}
            </p>
            <TrackedExternalLink
              href={inlineCallHref}
              eventName="call_click"
              eventParams={{
                ...baseEventParams,
                source_surface: `${sourcePage}_inline_phone`
              }}
              outboundClick={{
                shopId: shop.id,
                action: "call_shop",
                sourcePage: `${sourcePage}_inline_phone`
              }}
              className="mt-2 inline-flex text-sm font-medium text-[color:var(--foreground)] underline decoration-[color:var(--line)] underline-offset-4"
            >
              {shop.phone}
            </TrackedExternalLink>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
          {shop.rating ? (
            <>
              <span className="font-semibold text-[color:var(--foreground)]">{shop.rating.toFixed(1)}</span>
              <span>({shop.reviewCount ?? 0} reviews)</span>
              <span>|</span>
            </>
          ) : null}
          <span>{shop.availabilitySummary}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {shop.specialties.map((specialty) => (
            <span
              key={specialty}
              className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-2 text-sm text-[color:var(--muted)]"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-[color:var(--line)] pt-5">
          <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-end">
            <TrackedExternalLink
              href={callHref}
              eventName="call_click"
              eventParams={{
                ...baseEventParams,
                source_surface: `${sourcePage}_call_button`
              }}
              outboundClick={{
                shopId: shop.id,
                action: "call_shop",
                sourcePage: `${sourcePage}_call_button`
              }}
              className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(191,90,42,0.18)] transition hover:bg-[color:var(--accent-dark)] sm:w-fit"
            >
              Call shop
            </TrackedExternalLink>
            <TrackedExternalLink
              href={primaryHref}
              target="_blank"
              eventName={shop.bookingUrl ? "booking_click" : "website_click"}
              eventParams={{
                ...baseEventParams,
                source_surface: `${sourcePage}_primary_link`
              }}
              outboundClick={{
                shopId: shop.id,
                action: primaryAction,
                sourcePage: `${sourcePage}_primary_link`
              }}
              className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--panel-strong)] sm:w-fit"
            >
              {shop.bookingUrl ? shop.bookingLabel : "Visit website"}
            </TrackedExternalLink>
            <TrackedExternalLink
              href={directionsHref}
              target="_blank"
              eventName="directions_click"
              eventParams={{
                ...baseEventParams,
                source_surface: `${sourcePage}_directions`
              }}
              outboundClick={{
                shopId: shop.id,
                action: "get_directions",
                sourcePage: `${sourcePage}_directions`
              }}
              className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--panel-strong)] sm:w-fit"
            >
              Directions
            </TrackedExternalLink>
            {showWebsiteButton ? (
              <TrackedExternalLink
                href={websiteHref}
                target="_blank"
                eventName="website_click"
                eventParams={{
                  ...baseEventParams,
                  source_surface: `${sourcePage}_secondary_website`
                }}
                outboundClick={{
                  shopId: shop.id,
                  action: "visit_website",
                  sourcePage: `${sourcePage}_secondary_website`
                }}
                className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--panel-strong)] sm:w-fit"
              >
                Website
              </TrackedExternalLink>
            ) : null}
            <Link
              href={profileHref}
              onClick={() =>
                trackEvent("shop_detail_clicked", {
                  ...baseEventParams,
                  source_surface: `${sourcePage}_details_button`
                })
              }
              className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--panel-strong)] sm:w-fit"
            >
              Details
            </Link>
          </div>
        </div>
      </article>
  );
}
