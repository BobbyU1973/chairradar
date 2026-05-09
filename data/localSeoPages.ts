import { getLocationPageShops, locationPages } from "@/data/locationPages";
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

function buildFaq(areaName: string): FAQItem[] {
  return [
    {
      question: "Can I book a haircut directly on ChairRadar?",
      answer:
        "Not yet. ChairRadar is a lightweight discovery directory. Use the shop's booking link, website, phone number, or directions from the listing."
    },
    {
      question: "Does walk-in available mean there is no wait?",
      answer:
        "No. Walk-in friendly means the public listing signals walk-ins or check-in access. Call first if timing matters."
    },
    {
      question: `How should I find a same-day haircut in ${areaName}?`,
      answer:
        "Start with open-now or walk-in pages, then call the shop or use its online booking or check-in link to confirm today's availability."
    }
  ];
}

function buildIntentHref(intent: LocalSeoIntent, market: string) {
  return `/${intent}/${market}`;
}

function buildRelatedHrefs(intent: LocalSeoIntent, market: string) {
  return localSeoIntents
    .filter((item) => item !== intent)
    .map((item) => buildIntentHref(item, market));
}

function buildPageCopy(intent: LocalSeoIntent, market: LocalSeoMarket) {
  if (intent === "barbers") {
    return {
      eyebrow: `${market.shortName} barber guide`,
      metaTitle: `Barbers in ${market.areaName}`,
      metaDescription:
        `Find barbers in ${market.areaName} with phone numbers, booking links, walk-in info, hours, services, and directions on ChairRadar.`,
      heading: `Barbers in ${market.areaName}`,
      intro:
        `Compare ${market.shortName} barbershops and men's haircut providers, then call, open the shop website, use a booking link, or get directions.`,
      ctaLabel: `Search ${market.shortName} barbers`,
      quickAnswer:
        `Use this page for barber near me, men's haircut, fade, beard trim, and barbershop searches in ${market.shortName}.`,
      shopSectionHeading: `Barbers and men's haircut shops in ${market.shortName}`,
      shopSectionDescription:
        "Compare public phone numbers, booking links, walk-in notes, services, hours, and directions. Call ahead when timing matters."
    };
  }

  if (intent === "walk-in-haircuts") {
    return {
      eyebrow: `${market.shortName} walk-in guide`,
      metaTitle: `Walk-In Haircuts in ${market.areaName}`,
      metaDescription:
        `Need a walk-in haircut in ${market.areaName}? Compare nearby shops with walk-in signals, call buttons, booking links, hours, and directions.`,
      heading: `Walk-in haircuts in ${market.areaName}`,
      intro:
        `When you need a haircut today, ChairRadar surfaces ${market.shortName} shops with walk-in friendly signals and direct ways to call, check in, book, or drive there.`,
      ctaLabel: `Find walk-in haircuts in ${market.shortName}`,
      quickAnswer:
        `Use this page when you need a walk-in haircut or same-day haircut in ${market.shortName} without bouncing between multiple shop sites.`,
      shopSectionHeading: `Walk-in friendly shops in ${market.shortName}`,
      shopSectionDescription:
        "Start with shops that publicly signal walk-ins or check-in access, then call before you drive if timing is tight."
    };
  }

  if (intent === "kids-haircuts") {
    return {
      eyebrow: `${market.shortName} kids haircut guide`,
      metaTitle: `Kids Haircuts in ${market.areaName}`,
      metaDescription:
        `Find kids haircuts in ${market.areaName}. Compare family-friendly haircut shops with phone numbers, booking links, walk-in info, and directions.`,
      heading: `Kids haircuts in ${market.areaName}`,
      intro:
        `ChairRadar helps parents find ${market.shortName} shops that publicly list kids cuts or family-friendly haircut options, then move quickly to a call, booking link, or map.`,
      ctaLabel: `Search kids haircuts in ${market.shortName}`,
      quickAnswer:
        `Use this page when you need a kids haircut near me in ${market.shortName} and want to get to the right shop fast.`,
      shopSectionHeading: `Family-friendly haircut shops in ${market.shortName}`,
      shopSectionDescription:
        "Compare public phone numbers, booking links, kids-cut signals, hours, and directions before you head out."
    };
  }

  if (intent === "barbers-open-now") {
    return {
      eyebrow: `${market.shortName} open-now barber guide`,
      metaTitle: `Barbers Open Now in ${market.areaName}`,
      metaDescription:
        `Find barbers and haircut shops open now in ${market.areaName} with call buttons, booking links, hours, walk-in info, and directions.`,
      heading: `Barbers open now in ${market.areaName}`,
      intro:
        `For last-minute cuts, ChairRadar keeps the open-now ${market.shortName} list action-focused: confirm hours, call the shop, use booking links, or get directions.`,
      ctaLabel: `Find barbers open now in ${market.shortName}`,
      quickAnswer:
        `Use this page when you need a barber open now, a same-day haircut, or a fast local option in ${market.shortName}.`,
      shopSectionHeading: `Open-now barber options in ${market.shortName}`,
      shopSectionDescription:
        "Focus on open-now options first, then confirm the current hours before you leave."
    };
  }

  return {
    eyebrow: `${market.shortName} haircut guide`,
    metaTitle: `Haircuts in ${market.areaName}`,
    metaDescription:
      `Find haircuts in ${market.areaName} with ChairRadar. Compare nearby barbershops and salons with walk-in info, booking links, phone numbers, hours, and directions.`,
    heading: `Haircuts in ${market.areaName}`,
    intro:
      `ChairRadar helps you quickly compare ${market.shortName} haircut providers with walk-in options, same-day signals, online booking links, phone numbers, hours, and location details.`,
    ctaLabel: `Search ${market.shortName} haircuts`,
    quickAnswer:
      `Start here for haircut near me, barber near me, walk-in haircut, same-day haircut, kids haircut near me, and online haircut booking searches in ${market.shortName}.`,
    shopSectionHeading: `Nearby shops in ${market.shortName}`,
    shopSectionDescription:
      "Compare public phone numbers, booking links, walk-in notes, services, hours, and directions. Call ahead when timing matters."
  };
}

function buildLocalSeoPage(intent: LocalSeoIntent, market: LocalSeoMarket): LocalSeoPage {
  const copy = buildPageCopy(intent, market);

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
    faq: buildFaq(market.areaName),
    relatedHrefs: buildRelatedHrefs(intent, market.market),
    browseHref: market.browseHref,
    browseLabel: market.browseLabel,
    quickAnswer: copy.quickAnswer,
    shopSectionHeading: copy.shopSectionHeading,
    shopSectionDescription: copy.shopSectionDescription
  };
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

export function getLocalSeoPageShops(page: LocalSeoPage) {
  const market = getLocalSeoMarket(page.market);

  if (!market) {
    return [];
  }

  const marketShops = getMarketBaseShops(market);
  const filteredShops = filterShopsForIntent(page.intent, marketShops);

  return filteredShops.length > 0 ? filteredShops : marketShops;
}
