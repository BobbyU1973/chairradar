import {
  getLocationPageShops,
  locationPages,
  type LocationPage
} from "@/data/locationPages";
import { shops, type Shop } from "@/data/shops";
import type { FAQItem } from "@/lib/structuredData";

export type LocalSeoIntent =
  | "haircuts"
  | "barbers"
  | "walk-in-haircuts"
  | "kids-haircuts"
  | "barbers-open-now";

export type LocalSeoMarket = {
  id: string;
  market: string;
  shortName: string;
  areaName: string;
  searchLocation: string;
  cityNames: string[];
  zipCodes: string[];
  sourceLocationPageId?: string;
  browseHref: string;
  browseLabel: string;
};

export type LocalSeoUseCase = {
  title: string;
  description: string;
};

export type LocalSeoPageStats = {
  totalShops: number;
  walkInCount: number;
  bookableCount: number;
  openNowCount: number;
  barberCount: number;
  kidsCount: number;
  cityList: string[];
  zipList: string[];
  featuredShopNames: string[];
  neighborhoodList: string[];
};

export type LocalSeoPage = {
  intent: LocalSeoIntent;
  market: string;
  href: string;
  areaName: string;
  marketShortName: string;
  searchLocation: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  ctaLabel: string;
  faq: FAQItem[];
  relatedHrefs: string[];
  browseHref: string;
  browseLabel: string;
  quickAnswer: string;
  shopSectionHeading: string;
  shopSectionDescription: string;
  coverageSummary: string;
  pageTypeSummary: string;
  useCases: LocalSeoUseCase[];
  relatedShopIds: string[];
  stats: LocalSeoPageStats;
};

export type LocalSeoBrowseGroup = {
  market: LocalSeoMarket;
  pages: LocalSeoPage[];
  summary: string;
  featuredShopIds: string[];
};

type LocalSeoMarketSeed = {
  id: string;
  market: string;
  shortName: string;
  areaName: string;
  searchLocation: string;
  cityNames: string[];
  zipCodes?: string[];
  sourceLocationPageId?: string;
  browseHref?: string;
  browseLabel?: string;
};

const localSeoIntents: LocalSeoIntent[] = [
  "haircuts",
  "barbers",
  "walk-in-haircuts",
  "kids-haircuts",
  "barbers-open-now"
];

const localSeoMarketSeeds: LocalSeoMarketSeed[] = [
  {
    id: "mooresville",
    market: "mooresville-nc",
    shortName: "Mooresville",
    areaName: "Mooresville, NC",
    searchLocation: "Mooresville, NC",
    cityNames: ["Mooresville"],
    sourceLocationPageId: "mooresville-haircuts"
  },
  {
    id: "cornelius",
    market: "cornelius-nc",
    shortName: "Cornelius",
    areaName: "Cornelius, NC",
    searchLocation: "Cornelius, NC",
    cityNames: ["Cornelius"],
    sourceLocationPageId: "cornelius-haircuts"
  },
  {
    id: "huntersville",
    market: "huntersville-nc",
    shortName: "Huntersville",
    areaName: "Huntersville, NC",
    searchLocation: "Huntersville, NC",
    cityNames: ["Huntersville"],
    sourceLocationPageId: "huntersville-haircuts"
  },
  {
    id: "denver",
    market: "denver-nc",
    shortName: "Denver",
    areaName: "Denver, NC",
    searchLocation: "Denver, NC",
    cityNames: ["Denver"],
    sourceLocationPageId: "denver-haircuts"
  },
  {
    id: "sherrills-ford",
    market: "sherrills-ford-nc",
    shortName: "Sherrills Ford",
    areaName: "Sherrills Ford, NC",
    searchLocation: "Sherrills Ford, NC",
    cityNames: ["Sherrills Ford"],
    zipCodes: ["28673"],
    sourceLocationPageId: "lake-norman-haircuts",
    browseHref: "/nc/lake-norman/haircuts",
    browseLabel: "View Lake Norman page"
  },
  {
    id: "raleigh",
    market: "raleigh-nc",
    shortName: "Raleigh",
    areaName: "Raleigh, NC",
    searchLocation: "Raleigh, NC",
    cityNames: ["Raleigh"],
    sourceLocationPageId: "raleigh-haircuts"
  },
  {
    id: "charlotte",
    market: "charlotte-nc",
    shortName: "Charlotte",
    areaName: "Charlotte, NC",
    searchLocation: "Charlotte, NC",
    cityNames: ["Charlotte"],
    sourceLocationPageId: "charlotte-haircuts"
  },
  {
    id: "lake-norman",
    market: "lake-norman-nc",
    shortName: "Lake Norman",
    areaName: "Lake Norman, NC",
    searchLocation: "Lake Norman",
    cityNames: ["Mooresville", "Cornelius", "Huntersville", "Denver", "Sherrills Ford"],
    sourceLocationPageId: "lake-norman-haircuts"
  }
];

function getLocationPageById(pageId?: string) {
  if (!pageId) {
    return undefined;
  }

  return locationPages.find((page) => page.id === pageId);
}

function formatList(items: string[]) {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

function getSeedZipCodes(seed: LocalSeoMarketSeed) {
  if (seed.zipCodes && seed.zipCodes.length > 0) {
    return seed.zipCodes;
  }

  const sourcePage = getLocationPageById(seed.sourceLocationPageId);

  if (sourcePage) {
    return sourcePage.zipCodes;
  }

  return Array.from(
    new Set(
      shops
        .filter((shop) => seed.cityNames.includes(shop.city))
        .map((shop) => shop.zip)
    )
  ).sort();
}

function getDefaultBrowseHref(seed: LocalSeoMarketSeed) {
  const sourcePage = getLocationPageById(seed.sourceLocationPageId);

  if (seed.browseHref) {
    return seed.browseHref;
  }

  if (sourcePage) {
    return sourcePage.href;
  }

  return `/search?query=Haircut&location=${encodeURIComponent(seed.searchLocation)}`;
}

function getDefaultBrowseLabel(seed: LocalSeoMarketSeed) {
  if (seed.browseLabel) {
    return seed.browseLabel;
  }

  return `View full ${seed.shortName} page`;
}

function buildIntentHref(intent: LocalSeoIntent, market: string) {
  return `/${intent}/${market}`;
}

function buildRelatedHrefs(intent: LocalSeoIntent, market: string) {
  return localSeoIntents
    .filter((item) => item !== intent)
    .map((item) => buildIntentHref(item, market));
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

function supportsKidsCuts(shop: Shop) {
  return shop.specialties.some((specialty) => {
    const normalized = specialty.toLowerCase();
    return normalized.includes("kids") || normalized.includes("boys");
  });
}

export const localSeoMarkets: LocalSeoMarket[] = localSeoMarketSeeds.map((seed) => ({
  id: seed.id,
  market: seed.market,
  shortName: seed.shortName,
  areaName: seed.areaName,
  searchLocation: seed.searchLocation,
  cityNames: seed.cityNames,
  zipCodes: getSeedZipCodes(seed),
  sourceLocationPageId: seed.sourceLocationPageId,
  browseHref: getDefaultBrowseHref(seed),
  browseLabel: getDefaultBrowseLabel(seed)
}));

function getMarketBaseShops(market: LocalSeoMarket) {
  const sourcePage = getLocationPageById(market.sourceLocationPageId);

  if (sourcePage) {
    return getLocationPageShops(sourcePage);
  }

  return shops.filter((shop) => {
    return market.cityNames.includes(shop.city) || market.zipCodes.includes(shop.zip);
  });
}

function filterShopsForIntent(intent: LocalSeoIntent, marketShops: Shop[]) {
  if (intent === "barbers") {
    return marketShops.filter((shop) => isBarberLike(shop));
  }

  if (intent === "walk-in-haircuts") {
    return marketShops.filter((shop) => shop.walkInsAvailable);
  }

  if (intent === "kids-haircuts") {
    return marketShops.filter((shop) => supportsKidsCuts(shop));
  }

  if (intent === "barbers-open-now") {
    return marketShops.filter((shop) => shop.openNow && isBarberLike(shop));
  }

  return marketShops;
}

function buildPageStats(marketShops: Shop[], pageShops: Shop[]): LocalSeoPageStats {
  const cityList = Array.from(new Set(marketShops.map((shop) => shop.city))).sort();
  const zipList = Array.from(new Set(marketShops.map((shop) => shop.zip))).sort();

  return {
    totalShops: pageShops.length,
    walkInCount: marketShops.filter((shop) => shop.walkInsAvailable).length,
    bookableCount: marketShops.filter((shop) => Boolean(shop.bookingUrl)).length,
    openNowCount: marketShops.filter((shop) => shop.openNow).length,
    barberCount: marketShops.filter((shop) => isBarberLike(shop)).length,
    kidsCount: marketShops.filter((shop) => supportsKidsCuts(shop)).length,
    cityList,
    zipList,
    featuredShopNames: pageShops.slice(0, 3).map((shop) => shop.name),
    neighborhoodList: Array.from(
      new Set(pageShops.map((shop) => shop.neighborhood))
    ).slice(0, 3)
  };
}

function buildCoverageSummary(market: LocalSeoMarket, stats: LocalSeoPageStats) {
  const coverageMarkets =
    stats.cityList.length > 1 ? formatList(stats.cityList) : market.shortName;
  const zipPreview = stats.zipList.slice(0, 4);
  const zipText =
    zipPreview.length > 0 ? ` Key ZIP coverage includes ${formatList(zipPreview)}.` : "";

  return `Current ChairRadar coverage in ${market.areaName} includes ${stats.totalShops} ${pluralize(
    stats.totalShops,
    "shop listing",
    "shop listings"
  )} across ${coverageMarkets}.${zipText} ${stats.walkInCount} show walk-in or check-in signals, ${stats.bookableCount} include booking links, and ${stats.openNowCount} currently show open-now status.`;
}

function buildUseCases(market: LocalSeoMarket, stats: LocalSeoPageStats): LocalSeoUseCase[] {
  return [
    {
      title: "Walk-in haircut",
      description: `${stats.walkInCount} ${pluralize(
        stats.walkInCount,
        "listing currently shows",
        "listings currently show"
      )} walk-in or check-in access in ${market.shortName}. Start there when time matters.`
    },
    {
      title: "Same-day haircut",
      description:
        `Use the local call buttons first, especially near closing time. ChairRadar keeps the same-day path focused on public shop details instead of fake inventory.`
    },
    {
      title: "Booking links",
      description: `${stats.bookableCount} ${pluralize(
        stats.bookableCount,
        "listing includes",
        "listings include"
      )} an online booking or check-in path so you can confirm the next available slot on the shop's own page.`
    },
    {
      title: "Open now",
      description: `${stats.openNowCount} ${pluralize(
        stats.openNowCount,
        "listing currently shows",
        "listings currently show"
      )} open-now status, but a quick call is still the safest last check before you drive over.`
    }
  ];
}

function buildFaq(
  intent: LocalSeoIntent,
  market: LocalSeoMarket,
  stats: LocalSeoPageStats
): FAQItem[] {
  if (intent === "walk-in-haircuts") {
    return [
      {
        question: `How do I find a walk-in haircut in ${market.areaName} without wasting time?`,
        answer:
          `Start with shops that publicly show walk-ins or check-in access, then call to confirm the current wait. ChairRadar currently shows ${stats.walkInCount} walk-in friendly options in the ${market.shortName} coverage area.`
      },
      {
        question: `Does walk-in friendly in ${market.shortName} mean no wait?`,
        answer:
          "No. Walk-in friendly means the public listing signals walk-ins or check-in access. It does not guarantee an open chair right now."
      },
      {
        question: `Can I book instead if the wait is long?`,
        answer:
          `Yes. ${stats.bookableCount} local listings currently include a booking or check-in link, so you can switch from walk-in mode to the shop's own booking path quickly.`
      }
    ];
  }

  if (intent === "kids-haircuts") {
    return [
      {
        question: `How many kid-friendly haircut options does ChairRadar show in ${market.areaName}?`,
        answer:
          `The current ${market.shortName} coverage includes ${stats.kidsCount} listings that publicly mention kids cuts, boys cuts, or family-friendly services.`
      },
      {
        question: `Should I call before bringing my child in?`,
        answer:
          "Yes, especially for first haircuts, sensory needs, or a tight schedule. A quick call helps confirm timing and fit."
      },
      {
        question: `Does ChairRadar book kids haircuts directly?`,
        answer:
          "No. ChairRadar is a discovery directory. Use the shop phone number, website, or booking link shown on the listing."
      }
    ];
  }

  if (intent === "barbers-open-now") {
    return [
      {
        question: `What is the fastest way to find a barber open now in ${market.areaName}?`,
        answer:
          "Use the open-now list as a first pass, then call before you leave. Hours can shift for staffing, holidays, or a full chair schedule."
      },
      {
        question: `How many open-now listings are in the current ${market.shortName} coverage area?`,
        answer:
          `ChairRadar currently shows ${stats.openNowCount} listings marked open now in the broader ${market.shortName} coverage area.`
      },
      {
        question: `Can I still use a booking link on an open-now page?`,
        answer:
          `Yes. ${stats.bookableCount} local listings include a booking or check-in link, which can be faster than guessing from hours alone.`
      }
    ];
  }

  if (intent === "barbers") {
    return [
      {
        question: `What kinds of barber services does this ${market.shortName} page help with?`,
        answer:
          "Use it for fades, beard trims, lineups, men's cuts, and general barbershop searches tied to public local listing details."
      },
      {
        question: `How many barber-friendly listings does ChairRadar currently show in ${market.areaName}?`,
        answer:
          `The current ${market.shortName} coverage includes ${stats.barberCount} listings with barber, men's haircut, beard, boys cut, or fade signals.`
      },
      {
        question: `Does ChairRadar show live appointment inventory for barbers?`,
        answer:
          "No. It links you to the barber's public phone number, website, booking page, and directions instead of acting like a booking platform."
      }
    ];
  }

  return [
    {
      question: `How does ChairRadar help me find a haircut in ${market.areaName}?`,
      answer:
        `ChairRadar keeps ${stats.totalShops} local listings for ${market.shortName} in one place so you can compare public hours, phone numbers, booking links, walk-in signals, and directions quickly.`
    },
    {
      question: `Can I book a haircut directly on ChairRadar?`,
      answer:
        "Not yet. ChairRadar is a lightweight discovery directory. Use the shop's booking link, website, or phone number from the listing."
    },
    {
      question: `What should I check first for a same-day haircut in ${market.shortName}?`,
      answer:
        "Start with walk-in or open-now signals, then call the shop or use its booking link to confirm today's availability."
    }
  ];
}

function buildPageCopy(
  intent: LocalSeoIntent,
  market: LocalSeoMarket,
  stats: LocalSeoPageStats
) {
  const featuredShopsText =
    stats.featuredShopNames.length > 0
      ? ` Current local coverage includes ${formatList(stats.featuredShopNames)}.`
      : "";
  const neighborhoodText =
    stats.neighborhoodList.length > 0
      ? ` Common local pickup areas include ${formatList(stats.neighborhoodList)}.`
      : "";

  if (intent === "barbers") {
    return {
      eyebrow: `${market.shortName} barber guide`,
      metaTitle: `Barbers in ${market.areaName}`,
      metaDescription:
        `Find barbers in ${market.areaName} with public phone numbers, booking links, walk-in info, hours, and directions. ChairRadar keeps ${stats.barberCount} barber-friendly local listings in one place.`,
      heading: `Barbers in ${market.areaName}`,
      intro:
        `ChairRadar helps you compare barber-friendly haircut options in ${market.areaName} without bouncing between tabs. Use this page for fades, beard trims, boys cuts, and same-day men's haircut needs.${featuredShopsText}${neighborhoodText}`,
      ctaLabel: `Search ${market.shortName} barbers`,
      quickAnswer:
        `${stats.barberCount} current local listings in ${market.shortName} show barber, men's cut, beard, or fade signals.`,
      shopSectionHeading: `Barbers and men's haircut shops in ${market.shortName}`,
      shopSectionDescription:
        "Compare public phone numbers, booking links, walk-in notes, services, hours, and directions. Call ahead when timing matters.",
      pageTypeSummary:
        `This ${market.shortName} barber page is built for faster men's haircut decisions, whether you want a neighborhood barbershop, a chain check-in page, or a same-day beard cleanup.`
    };
  }

  if (intent === "walk-in-haircuts") {
    return {
      eyebrow: `${market.shortName} walk-in guide`,
      metaTitle: `Walk-In Haircuts in ${market.areaName}`,
      metaDescription:
        `Need a walk-in haircut in ${market.areaName}? Compare nearby shops with walk-in signals, phone numbers, booking links, hours, and directions on ChairRadar.`,
      heading: `Walk-in haircuts in ${market.areaName}`,
      intro:
        `When you need a haircut today, this ${market.shortName} page narrows the list to local shops that publicly show walk-ins or check-in access. That makes it easier to go from search to call, booking link, or directions without overthinking it.${featuredShopsText}`,
      ctaLabel: `Find walk-in haircuts in ${market.shortName}`,
      quickAnswer:
        `${stats.walkInCount} listings in the broader ${market.shortName} coverage area currently show walk-in or check-in signals.`,
      shopSectionHeading: `Walk-in friendly shops in ${market.shortName}`,
      shopSectionDescription:
        "Start with shops that publicly signal walk-ins or check-in access, then call before you drive if timing is tight.",
      pageTypeSummary:
        `Use this page when the haircut is urgent and you want the fastest likely options in ${market.areaName}, not a long directory scroll.`
    };
  }

  if (intent === "kids-haircuts") {
    return {
      eyebrow: `${market.shortName} kids haircut guide`,
      metaTitle: `Kids Haircuts in ${market.areaName}`,
      metaDescription:
        `Find kids haircuts in ${market.areaName}. Compare family-friendly haircut shops with phone numbers, booking links, walk-in info, and directions on ChairRadar.`,
      heading: `Kids haircuts in ${market.areaName}`,
      intro:
        `ChairRadar helps parents in ${market.areaName} find haircut listings that publicly mention kids cuts, boys cuts, or family-friendly services. The point is to get to the right phone number, booking link, or directions fast.${featuredShopsText}`,
      ctaLabel: `Search kids haircuts in ${market.shortName}`,
      quickAnswer:
        `${stats.kidsCount} local listings in the current ${market.shortName} coverage mention kids cuts or family-friendly services.`,
      shopSectionHeading: `Family-friendly haircut shops in ${market.shortName}`,
      shopSectionDescription:
        "Compare public phone numbers, booking links, kids-cut signals, hours, and directions before you head out.",
      pageTypeSummary:
        `This page is useful when you need a quick kids haircut in ${market.shortName} and want to filter toward shops that look more family-ready from their public details.`
    };
  }

  if (intent === "barbers-open-now") {
    return {
      eyebrow: `${market.shortName} open-now barber guide`,
      metaTitle: `Barbers Open Now in ${market.areaName}`,
      metaDescription:
        `Find barbers and haircut shops open now in ${market.areaName} with phone numbers, booking links, hours, walk-in info, and directions on ChairRadar.`,
      heading: `Barbers open now in ${market.areaName}`,
      intro:
        `For last-minute cuts, this ${market.shortName} page focuses on barbers and haircut listings that currently show open-now status. Use it as the fast path to a call, booking link, or directions, then confirm the hours before you leave.${featuredShopsText}`,
      ctaLabel: `Find barbers open now in ${market.shortName}`,
      quickAnswer:
        `${stats.openNowCount} local listings in the broader ${market.shortName} coverage area currently show open-now status.`,
      shopSectionHeading: `Open-now barber options in ${market.shortName}`,
      shopSectionDescription:
        "Focus on open-now options first, then confirm the current hours before you leave.",
      pageTypeSummary:
        `This page is meant for urgent haircut searches in ${market.areaName}, especially when you need an open chair soon and want a barber-leaning results set.`
    };
  }

  return {
    eyebrow: `${market.shortName} haircut guide`,
    metaTitle: `Haircuts in ${market.areaName}`,
    metaDescription:
      `Find haircuts in ${market.areaName} with ChairRadar. Compare nearby barbershops and salons with walk-in info, booking links, phone numbers, hours, and directions.`,
    heading: `Haircuts in ${market.areaName}`,
    intro:
      `ChairRadar helps you quickly compare haircuts in ${market.areaName} with walk-in options, same-day signals, online booking links, phone numbers, hours, and location details. The goal is to answer where you can get a haircut today without turning the page into a booking platform.${featuredShopsText}${neighborhoodText}`,
    ctaLabel: `Search ${market.shortName} haircuts`,
    quickAnswer:
      `Use this page for haircut near me, barber near me, walk-in haircut, same-day haircut, kids haircut near me, and online haircut booking searches in ${market.shortName}.`,
    shopSectionHeading: `Nearby shops in ${market.shortName}`,
    shopSectionDescription:
      "Compare public phone numbers, booking links, walk-in notes, services, hours, and directions. Call ahead when timing matters.",
    pageTypeSummary:
      `This is the main ChairRadar haircut page for ${market.areaName}. It is built for quick local discovery, not for pretending to manage live appointment inventory.`
  };
}

function buildRelatedShopIds(pageShops: Shop[], marketShops: Shop[]) {
  return Array.from(new Map([...pageShops, ...marketShops].map((shop) => [shop.id, shop])).values())
    .slice(0, 4)
    .map((shop) => shop.id);
}

function buildLocalSeoPage(intent: LocalSeoIntent, market: LocalSeoMarket): LocalSeoPage {
  const marketShops = getMarketBaseShops(market);
  const filteredShops = filterShopsForIntent(intent, marketShops);
  const pageShops = filteredShops.length > 0 ? filteredShops : marketShops;
  const stats = buildPageStats(marketShops, pageShops);
  const copy = buildPageCopy(intent, market, stats);
  const browseHref =
    intent === "haircuts" ? "/locations" : buildIntentHref("haircuts", market.market);
  const browseLabel =
    intent === "haircuts"
      ? "Browse all local pages"
      : `View all ${market.shortName} haircuts`;

  return {
    intent,
    market: market.market,
    href: buildIntentHref(intent, market.market),
    areaName: market.areaName,
    marketShortName: market.shortName,
    searchLocation: market.searchLocation,
    eyebrow: copy.eyebrow,
    metaTitle: copy.metaTitle,
    metaDescription: copy.metaDescription,
    heading: copy.heading,
    intro: copy.intro,
    ctaLabel: copy.ctaLabel,
    faq: buildFaq(intent, market, stats),
    relatedHrefs: buildRelatedHrefs(intent, market.market),
    browseHref,
    browseLabel,
    quickAnswer: copy.quickAnswer,
    shopSectionHeading: copy.shopSectionHeading,
    shopSectionDescription: copy.shopSectionDescription,
    coverageSummary: buildCoverageSummary(market, stats),
    pageTypeSummary: copy.pageTypeSummary,
    useCases: buildUseCases(market, stats),
    relatedShopIds: buildRelatedShopIds(pageShops, marketShops),
    stats
  };
}

export const localSeoPages: LocalSeoPage[] = localSeoMarkets.flatMap((market) =>
  localSeoIntents.map((intent) => buildLocalSeoPage(intent, market))
);

export function getLocalSeoMarket(market: string) {
  return localSeoMarkets.find((item) => item.market === market);
}

export function getLocalSeoPage(intent: string, market: string) {
  return localSeoPages.find((page) => page.intent === intent && page.market === market);
}

export function getLocalSeoPageByHref(href: string) {
  return localSeoPages.find((page) => page.href === href);
}

export function getLocalSeoMarketShops(market: string) {
  const marketDefinition = getLocalSeoMarket(market);

  if (!marketDefinition) {
    return [];
  }

  return getMarketBaseShops(marketDefinition);
}

export function getLocalSeoPagesForMarket(market: string) {
  return localSeoPages.filter((page) => page.market === market);
}

export function getLocalSeoPageShops(page: LocalSeoPage) {
  const market = getLocalSeoMarket(page.market);

  if (!market) {
    return [];
  }

  const marketShops = getMarketBaseShops(market);
  const filteredShops = filterShopsForIntent(page.intent, marketShops);

  return filteredShops.length > 0 ? filteredShops : marketShops;
}

export function getLocalSeoPageFeaturedShops(page: LocalSeoPage, limit = 4) {
  const pageShops = getLocalSeoPageShops(page);
  const byId = new Map(pageShops.map((shop) => [shop.id, shop]));
  const selected = page.relatedShopIds
    .map((shopId) => byId.get(shopId) ?? shops.find((shop) => shop.id === shopId))
    .filter((shop): shop is Shop => Boolean(shop));

  return Array.from(new Map([...selected, ...pageShops].map((shop) => [shop.id, shop])).values()).slice(
    0,
    limit
  );
}

export const localSeoBrowseGroups: LocalSeoBrowseGroup[] = localSeoMarkets.map((market) => {
  const pages = getLocalSeoPagesForMarket(market.market);
  const primaryPage = pages.find((page) => page.intent === "haircuts") ?? pages[0];
  const featuredShopIds = primaryPage
    ? getLocalSeoPageFeaturedShops(primaryPage, 2).map((shop) => shop.id)
    : [];

  return {
    market,
    pages,
    summary: primaryPage?.coverageSummary ?? "",
    featuredShopIds
  };
});

function getLegacyMarketSlug(page: LocationPage) {
  const prefixes = [
    ["lake-norman", "lake-norman-nc"],
    ["mooresville", "mooresville-nc"],
    ["cornelius", "cornelius-nc"],
    ["huntersville", "huntersville-nc"],
    ["denver", "denver-nc"],
    ["raleigh", "raleigh-nc"],
    ["charlotte", "charlotte-nc"]
  ] as const;

  const match = prefixes.find(([prefix]) => page.id.startsWith(prefix));
  return match?.[1] ?? null;
}

function getIntentForLocationPage(page: LocationPage): LocalSeoIntent {
  if (page.shopFilter === "walkIns") {
    return "walk-in-haircuts";
  }

  if (page.shopFilter === "kids") {
    return "kids-haircuts";
  }

  if (page.shopFilter === "mens") {
    return "barbers";
  }

  if (page.shopFilter === "openNow") {
    return "barbers-open-now";
  }

  return "haircuts";
}

export function getCanonicalLocalSeoHrefForLocationPage(page: LocationPage) {
  const market = getLegacyMarketSlug(page);

  if (!market) {
    return null;
  }

  return buildIntentHref(getIntentForLocationPage(page), market);
}

export function getPrimaryLocalSeoPageForMarket(market: string) {
  return getLocalSeoPage("haircuts", market);
}

export function getLocalSeoPagesForShop(shop: Shop) {
  const exactMatch = localSeoMarkets.find((market) => market.cityNames.includes(shop.city));
  const zipMatch = localSeoMarkets.find((market) => market.zipCodes.includes(shop.zip));
  const lakeNormanMarket =
    ["Mooresville", "Cornelius", "Huntersville", "Denver", "Sherrills Ford"].includes(shop.city) ||
    ["28117", "28115", "28031", "28078", "28037", "28673"].includes(shop.zip)
      ? getLocalSeoMarket("lake-norman-nc")
      : null;

  const orderedMarkets = Array.from(
    new Map(
      [exactMatch, zipMatch, lakeNormanMarket]
        .filter((market): market is LocalSeoMarket => Boolean(market))
        .map((market) => [market.market, market])
    ).values()
  );

  const hrefs = orderedMarkets.flatMap((market, index) => {
    const pages = [buildIntentHref("haircuts", market.market)];

    if (index === 0 && shop.walkInsAvailable) {
      pages.push(buildIntentHref("walk-in-haircuts", market.market));
    }

    if (index === 0 && isBarberLike(shop)) {
      pages.push(buildIntentHref("barbers", market.market));
    }

    if (index === 0 && supportsKidsCuts(shop)) {
      pages.push(buildIntentHref("kids-haircuts", market.market));
    }

    if (index === 0 && shop.openNow) {
      pages.push(buildIntentHref("barbers-open-now", market.market));
    }

    return pages;
  });

  return Array.from(new Set(hrefs))
    .map((href) => getLocalSeoPageByHref(href))
    .filter((page): page is LocalSeoPage => Boolean(page))
    .slice(0, 4);
}

export function getPrimaryLocalSeoPageForShop(shop: Shop) {
  return getLocalSeoPagesForShop(shop).find((page) => page.intent === "haircuts") ?? null;
}
