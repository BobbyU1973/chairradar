"use client";

import Link from "next/link";
import type { Shop } from "@/data/shops";
import { trackEvent } from "@/lib/analytics";

type ShopCardProps = {
  shop: Shop;
};

export function ShopCard({ shop }: ShopCardProps) {
  const primaryExternalUrl = shop.bookingUrl ?? shop.websiteUrl;
  const showWebsiteButton = shop.websiteUrl !== primaryExternalUrl;
  const listingType = shop.sponsored ? "sponsored" : "organic";
  const isChain =
    shop.name.includes("Great Clips") ||
    shop.name.includes("Sport Clips") ||
    shop.name.includes("Supercuts");

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
                href={`/shops/${shop.id}`}
                onClick={() =>
                  trackEvent("shop_detail_clicked", {
                    ...baseEventParams,
                    source_surface: "results_name"
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
            <a
              href={shop.callUrl}
              onClick={() =>
                trackEvent("call_click", {
                  ...baseEventParams,
                  source_surface: "results_inline_phone"
                })
              }
              className="mt-2 inline-flex text-sm font-medium text-[color:var(--foreground)] underline decoration-[color:var(--line)] underline-offset-4"
            >
              {shop.phone}
            </a>
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

        <div className="mt-4 rounded-[22px] bg-[color:var(--panel-strong)] px-4 py-3 text-sm font-medium text-[color:var(--foreground)]">
          {shop.availabilitySummary}
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
            <a
              href={shop.callUrl}
              onClick={() =>
                trackEvent("call_click", {
                  ...baseEventParams,
                  source_surface: "results_call_button"
                })
              }
              className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(191,90,42,0.18)] transition hover:bg-[color:var(--accent-dark)] sm:w-fit"
            >
              Call shop
            </a>
            <a
              href={primaryExternalUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent(shop.bookingUrl ? "booking_click" : "website_click", {
                  ...baseEventParams,
                  source_surface: "results_primary_link"
                })
              }
              className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--panel-strong)] sm:w-fit"
            >
              {shop.bookingUrl ? shop.bookingLabel : "Visit website"}
            </a>
            {showWebsiteButton ? (
              <a
                href={shop.websiteUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("website_click", {
                    ...baseEventParams,
                    source_surface: "results_secondary_website"
                  })
                }
                className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--panel-strong)] sm:w-fit"
              >
                Website
              </a>
            ) : null}
            <Link
              href={`/shops/${shop.id}`}
              onClick={() =>
                trackEvent("shop_detail_clicked", {
                  ...baseEventParams,
                  source_surface: "results_details_button"
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
