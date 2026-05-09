import type { FAQItem } from "@/lib/structuredData";

export type GuidePage = {
  slug: string;
  href: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
  faq: FAQItem[];
  relatedHrefs: string[];
};

export const guidePages: GuidePage[] = [
  {
    slug: "find-same-day-haircut",
    href: "/guides/find-same-day-haircut",
    metaTitle: "How to Find a Same-Day Haircut",
    metaDescription:
      "Need a haircut today? Use ChairRadar to compare nearby shops, walk-in options, booking links, phone numbers, hours, and directions.",
    eyebrow: "Same-day haircut guide",
    heading: "How to find a same-day haircut without overthinking it",
    intro:
      "If you need a haircut today, keep the search simple: find nearby shops, confirm they are open, then call or use the shop's booking link.",
    sections: [
      {
        title: "Start with nearby options",
        body:
          "Search by city, ZIP, or near me. A same-day haircut is usually about reducing friction, not finding the perfect listing."
      },
      {
        title: "Check the fastest contact path",
        body:
          "Use the phone number when timing matters. Use online booking or check-in when the shop makes it available.",
        bullets: ["Call first near closing time", "Use booking links for appointment salons", "Use directions after you choose the shop"]
      },
      {
        title: "Be flexible on provider type",
        body:
          "Barbershops, salons, chain haircut shops, and independent providers can all solve the same urgent job: getting cleaned up today."
      }
    ],
    faq: [
      {
        question: "Does ChairRadar show live appointment inventory?",
        answer:
          "No. ChairRadar links to shop booking pages, websites, phone numbers, and directions. It does not connect to live salon scheduling systems yet."
      },
      {
        question: "What is the fastest way to confirm same-day availability?",
        answer:
          "Call the shop or use its official online booking/check-in link if one is listed."
      }
    ],
    relatedHrefs: ["/walk-in-haircuts/mooresville-nc", "/barbers-open-now/mooresville-nc"]
  },
  {
    slug: "walk-in-haircuts-vs-online-booking",
    href: "/guides/walk-in-haircuts-vs-online-booking",
    metaTitle: "Walk-In Haircuts vs Online Booking",
    metaDescription:
      "Compare walk-in haircuts and online booking so you can choose the fastest route for today's haircut.",
    eyebrow: "Walk-in vs booking",
    heading: "Walk-in haircuts vs online booking",
    intro:
      "Both can work. The best choice depends on how soon you need the cut, how flexible you are, and how the shop manages its waitlist.",
    sections: [
      {
        title: "Walk-ins are best when you are flexible",
        body:
          "Walk-ins can be fast, but the wait can change by the hour. Calling first is still smart."
      },
      {
        title: "Online booking is best when timing matters",
        body:
          "If a shop has a booking page, use it to check the calendar or check-in flow before driving over."
      },
      {
        title: "ChairRadar keeps both paths visible",
        body:
          "Listings can show walk-in signals, booking links, phone numbers, websites, hours, and directions in one place."
      }
    ],
    faq: [
      {
        question: "Is online booking always an appointment?",
        answer:
          "No. Some shops use online check-in, some use appointment booking, and some simply link to a shop page."
      },
      {
        question: "Should I call even if a shop says walk-ins are welcome?",
        answer:
          "Yes, if you are in a hurry. Walk-in friendly does not guarantee a short wait."
      }
    ],
    relatedHrefs: ["/walk-in-haircuts/mooresville-nc", "/guides/find-same-day-haircut"]
  },
  {
    slug: "find-barber-open-now",
    href: "/guides/find-barber-open-now",
    metaTitle: "How to Find a Barber Open Now",
    metaDescription:
      "Find barbers open now by checking hours, calling first, and using booking or directions links from ChairRadar listings.",
    eyebrow: "Open-now barber guide",
    heading: "How to find a barber open now",
    intro:
      "Open-now searches are urgent. ChairRadar helps you move from search to call, booking link, or directions quickly.",
    sections: [
      {
        title: "Use open-now pages as a starting point",
        body:
          "Open-now signals help narrow the list, but posted hours can change for holidays, staffing, or early closings."
      },
      {
        title: "Call before you drive",
        body:
          "A 20-second call can confirm whether a barber is taking walk-ins, running behind, or appointment-only today."
      },
      {
        title: "Keep a backup nearby",
        body:
          "If the first barber is full, check nearby shops with booking links or walk-in info."
      }
    ],
    faq: [
      {
        question: "Can ChairRadar guarantee a barber is open right now?",
        answer:
          "No. ChairRadar shows public listing details and open-now signals, but you should call or use the shop link to confirm."
      },
      {
        question: "What should I ask when I call?",
        answer:
          "Ask whether they are taking walk-ins today and how long the current wait is."
      }
    ],
    relatedHrefs: ["/barbers-open-now/mooresville-nc", "/barbers/mooresville-nc"]
  },
  {
    slug: "kids-haircuts-near-me",
    href: "/guides/kids-haircuts-near-me",
    metaTitle: "Finding Kids Haircuts Near Me",
    metaDescription:
      "Find kids haircuts near you with ChairRadar by comparing nearby shops, family-friendly services, booking links, phone numbers, and directions.",
    eyebrow: "Kids haircut guide",
    heading: "Finding kids haircuts near me",
    intro:
      "For kids cuts, the best shop is often the one that can handle the timing, comfort level, and location without turning it into a project.",
    sections: [
      {
        title: "Look for kids cuts or boys cuts",
        body:
          "ChairRadar listings show services and specialties when they are available from public shop details."
      },
      {
        title: "Call if your child needs extra time",
        body:
          "A quick call helps confirm whether the shop is a good fit for younger kids, sensory needs, or first haircuts."
      },
      {
        title: "Keep the trip short",
        body:
          "Use directions from the listing after you choose a shop so you do not bounce between apps."
      }
    ],
    faq: [
      {
        question: "Does ChairRadar only list children's salons?",
        answer:
          "No. It can include barbershops, salons, and haircut shops that publicly list kids cuts or family-friendly services."
      },
      {
        question: "Should I book kids haircuts ahead?",
        answer:
          "If timing matters, yes. Use the shop booking link or call ahead."
      }
    ],
    relatedHrefs: ["/kids-haircuts/mooresville-nc", "/haircuts/mooresville-nc"]
  }
];

export function getGuidePage(slug: string) {
  return guidePages.find((page) => page.slug === slug);
}
