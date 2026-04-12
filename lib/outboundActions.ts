import type { Shop } from "@/data/shops";

export const outboundActionLabels = {
  call_shop: "Call Shop",
  book_on_website: "Book on Website",
  visit_website: "Visit Website",
  get_directions: "Get Directions"
} as const;

export type OutboundAction = keyof typeof outboundActionLabels;

export function isOutboundAction(action: string | null): action is OutboundAction {
  return Boolean(action && action in outboundActionLabels);
}

export function getDirectionsUrl(shop: Shop) {
  const destination = `${shop.address}, ${shop.city}, ${shop.state} ${shop.zip}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function getOutboundDestination(shop: Shop, action: OutboundAction) {
  if (action === "call_shop") {
    return shop.callUrl;
  }

  if (action === "book_on_website") {
    return shop.bookingUrl ?? shop.websiteUrl;
  }

  if (action === "visit_website") {
    return shop.websiteUrl;
  }

  return getDirectionsUrl(shop);
}

export function getOutboundHref(
  shopId: string,
  action: OutboundAction,
  sourcePage: string
) {
  const params = new URLSearchParams({
    shopId,
    action,
    source: sourcePage
  });

  return `/api/outbound?${params.toString()}`;
}
