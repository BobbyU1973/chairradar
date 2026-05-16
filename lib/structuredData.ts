import type { LocationPage } from "@/data/locationPages";
import type { Shop } from "@/data/shops";
import { SITE_URL } from "@/lib/site";
import { getShopProfilePath } from "@/lib/shopRoutes";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type ItemListItem = {
  name: string;
  url: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export function getHomeStructuredData() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: "ChairRadar",
      url: SITE_URL,
      description:
        "ChairRadar helps people quickly find nearby barbershops, salons, and haircut providers with walk-in options, same-day availability, booking links, phone numbers, hours, and location details.",
      areaServed: {
        "@type": "State",
        name: "North Carolina"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: "ChairRadar",
      description:
        "Find a haircut near you fast with nearby barbershops, salons, public booking links, call buttons, hours, and directions.",
      publisher: {
        "@id": organizationId
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?location={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
  ];
}

function formatTelephone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `+1${digits}` : phone;
}

export function getBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function getFAQStructuredData(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function getItemListStructuredData(
  items: ItemListItem[],
  listUrl?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: listUrl,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url
    }))
  };
}

export function getCollectionPageStructuredData({
  name,
  description,
  url,
  items
}: {
  name: string;
  description: string;
  url: string;
  items: ItemListItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "ChairRadar",
      url: SITE_URL
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url
      }))
    }
  };
}

function isBarberShop(shop: Shop) {
  return shop.specialties.some((specialty) => {
    const normalized = specialty.toLowerCase();
    return (
      normalized.includes("barber") ||
      normalized.includes("beard") ||
      normalized.includes("fade") ||
      normalized.includes("men")
    );
  });
}

export function getShopStructuredData(shop: Shop) {
  const shopUrl = `${SITE_URL}${getShopProfilePath(shop)}`;
  const sameAs = Array.from(new Set([shop.websiteUrl, shop.bookingUrl].filter(Boolean)));
  const businessTypes = isBarberShop(shop)
    ? ["LocalBusiness", "HairSalon", "BarberShop"]
    : ["LocalBusiness", "HairSalon"];

  return {
    "@context": "https://schema.org",
    "@type": businessTypes,
    "@id": `${shopUrl}#business`,
    name: shop.name,
    description: shop.availabilitySummary,
    url: shopUrl,
    telephone: formatTelephone(shop.phone),
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address,
      addressLocality: shop.city,
      addressRegion: shop.state,
      postalCode: shop.zip,
      addressCountry: "US"
    },
    areaServed: {
      "@type": "City",
      name: `${shop.city}, ${shop.state}`
    },
    priceRange: shop.priceFrom ? `From $${shop.priceFrom}` : undefined,
    sameAs,
    potentialAction: [
      shop.bookingUrl
        ? {
            "@type": "ReserveAction",
            target: shop.bookingUrl,
            name: shop.bookingLabel
          }
        : undefined,
      {
        "@type": "CommunicateAction",
        target: shop.callUrl,
        name: "Call shop"
      }
    ].filter(Boolean)
  };
}

export function getLocationPageStructuredData(page: LocationPage, pageShops: Shop[]) {
  const pageUrl = `${SITE_URL}${page.href}`;

  return [
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
      { name: page.areaName, url: pageUrl }
    ])
  ];
}
