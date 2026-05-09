import type { FAQItem } from "@/lib/structuredData";

export type LocalSeoPage = {
  intent: string;
  market: string;
  href: string;
  locationPageId: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  ctaLabel: string;
  faq: FAQItem[];
  relatedHrefs: string[];
};

const mooresvilleFaq: FAQItem[] = [
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
    question: "How should I find a same-day haircut?",
    answer:
      "Start with open-now or walk-in pages, then call the shop or use its online booking/check-in link to confirm today's availability."
  }
];

export const localSeoPages: LocalSeoPage[] = [
  {
    intent: "haircuts",
    market: "mooresville-nc",
    href: "/haircuts/mooresville-nc",
    locationPageId: "mooresville-haircuts",
    eyebrow: "Mooresville haircut guide",
    metaTitle: "Haircuts in Mooresville, NC",
    metaDescription:
      "Find haircuts in Mooresville, NC with ChairRadar. Compare nearby barbershops and salons with walk-in info, booking links, phone numbers, hours, and directions.",
    heading: "Haircuts in Mooresville, NC",
    intro:
      "ChairRadar helps you quickly compare Mooresville haircut providers with walk-in options, same-day signals, online booking links, phone numbers, hours, and location details.",
    ctaLabel: "Search Mooresville haircuts",
    faq: mooresvilleFaq,
    relatedHrefs: [
      "/barbers/mooresville-nc",
      "/walk-in-haircuts/mooresville-nc",
      "/kids-haircuts/mooresville-nc"
    ]
  },
  {
    intent: "barbers",
    market: "mooresville-nc",
    href: "/barbers/mooresville-nc",
    locationPageId: "mooresville-mens-haircuts",
    eyebrow: "Mooresville barber guide",
    metaTitle: "Barbers in Mooresville, NC",
    metaDescription:
      "Find barbers in Mooresville, NC with phone numbers, booking links, walk-in info, hours, services, and directions on ChairRadar.",
    heading: "Barbers in Mooresville, NC",
    intro:
      "Compare Mooresville barbershops and men's haircut providers, then call, open the shop website, use a booking link, or get directions.",
    ctaLabel: "Search Mooresville barbers",
    faq: mooresvilleFaq,
    relatedHrefs: [
      "/haircuts/mooresville-nc",
      "/barbers-open-now/mooresville-nc",
      "/walk-in-haircuts/mooresville-nc"
    ]
  },
  {
    intent: "walk-in-haircuts",
    market: "mooresville-nc",
    href: "/walk-in-haircuts/mooresville-nc",
    locationPageId: "mooresville-walk-in-haircuts",
    eyebrow: "Mooresville walk-in guide",
    metaTitle: "Walk-In Haircuts in Mooresville, NC",
    metaDescription:
      "Need a walk-in haircut in Mooresville, NC? Compare nearby shops with walk-in signals, call buttons, booking links, hours, and directions.",
    heading: "Walk-in haircuts in Mooresville, NC",
    intro:
      "When you need a haircut today, ChairRadar surfaces Mooresville shops with walk-in friendly signals and direct ways to call, check in, book, or drive there.",
    ctaLabel: "Find walk-in haircuts",
    faq: mooresvilleFaq,
    relatedHrefs: [
      "/haircuts/mooresville-nc",
      "/barbers-open-now/mooresville-nc",
      "/kids-haircuts/mooresville-nc"
    ]
  },
  {
    intent: "kids-haircuts",
    market: "mooresville-nc",
    href: "/kids-haircuts/mooresville-nc",
    locationPageId: "mooresville-kids-haircuts",
    eyebrow: "Mooresville kids haircut guide",
    metaTitle: "Kids Haircuts in Mooresville, NC",
    metaDescription:
      "Find kids haircuts in Mooresville, NC. Compare family-friendly haircut shops with phone numbers, booking links, walk-in info, and directions.",
    heading: "Kids haircuts in Mooresville, NC",
    intro:
      "ChairRadar helps parents find Mooresville shops that publicly list kids cuts or family-friendly haircut options, then move quickly to a call, booking link, or map.",
    ctaLabel: "Search kids haircuts",
    faq: mooresvilleFaq,
    relatedHrefs: [
      "/haircuts/mooresville-nc",
      "/walk-in-haircuts/mooresville-nc",
      "/barbers/mooresville-nc"
    ]
  },
  {
    intent: "barbers-open-now",
    market: "mooresville-nc",
    href: "/barbers-open-now/mooresville-nc",
    locationPageId: "mooresville-open-now-haircuts",
    eyebrow: "Mooresville open-now barber guide",
    metaTitle: "Barbers Open Now in Mooresville, NC",
    metaDescription:
      "Find barbers and haircut shops open now in Mooresville, NC with call buttons, booking links, hours, walk-in info, and directions.",
    heading: "Barbers and haircut shops open now in Mooresville, NC",
    intro:
      "For last-minute cuts, ChairRadar keeps the open-now Mooresville list action-focused: confirm hours, call the shop, use booking links, or get directions.",
    ctaLabel: "Find barbers open now",
    faq: mooresvilleFaq,
    relatedHrefs: [
      "/barbers/mooresville-nc",
      "/walk-in-haircuts/mooresville-nc",
      "/haircuts/mooresville-nc"
    ]
  }
];

export function getLocalSeoPage(intent: string, market: string) {
  return localSeoPages.find((page) => page.intent === intent && page.market === market);
}

export function getLocalSeoPageByHref(href: string) {
  return localSeoPages.find((page) => page.href === href);
}
