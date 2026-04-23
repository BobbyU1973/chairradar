import { shops, type Shop } from "@/data/shops";

export type ShopFilter = "all" | "walkIns" | "openNow" | "kids" | "mens" | "bookable";

export type LocationPage = {
  id: string;
  segments: string[];
  href: string;
  areaName: string;
  eyebrow: string;
  heading: string;
  description: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  searchLocation: string;
  zipCodes: string[];
  cityNames: string[];
  shopFilter: ShopFilter;
  lastUpdatedLabel: string;
  relatedPageIds: string[];
};

const lakeNormanZipCodes = ["28117", "28115", "28031", "28078", "28037", "28673"];
const lakeNormanCities = ["Mooresville", "Cornelius", "Huntersville", "Denver", "Sherrills Ford"];
const charlotteZipCodes = ["28209", "28213", "28216", "28226", "28262", "28273", "28277", "28278"];
const charlotteCities = ["Charlotte"];
const currentUpdate = "Updated April 2026";

export const locationPages: LocationPage[] = [
  {
    id: "mooresville-haircuts",
    segments: ["mooresville", "haircuts"],
    href: "/nc/mooresville/haircuts",
    areaName: "Mooresville, NC",
    eyebrow: "Mooresville haircut guide",
    heading: "Haircut availability in Mooresville, NC",
    description:
      "Find Mooresville haircut shops with direct call buttons, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar helps people in Mooresville compare nearby haircut options quickly, then call, check in, book, or get directions from one place.",
    metaTitle: "Haircut Availability in Mooresville, NC",
    metaDescription:
      "Find haircut shops in Mooresville, NC. Compare walk-in options, direct booking links, phone numbers, and directions with ChairRadar.",
    searchLocation: "Mooresville, NC",
    zipCodes: ["28117", "28115"],
    cityNames: ["Mooresville"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["mooresville-walk-in-haircuts", "mooresville-open-now-haircuts", "mooresville-28117"]
  },
  {
    id: "mooresville-walk-in-haircuts",
    segments: ["mooresville", "walk-in-haircuts"],
    href: "/nc/mooresville/walk-in-haircuts",
    areaName: "Mooresville, NC",
    eyebrow: "Walk-in haircut guide",
    heading: "Walk-in haircuts in Mooresville, NC",
    description:
      "Compare Mooresville shops that publicly signal walk-ins, online check-in, or same-day haircut access.",
    intro:
      "When a haircut cannot wait, ChairRadar highlights Mooresville shops with walk-in friendly signals and direct ways to call or check in.",
    metaTitle: "Walk-In Haircuts in Mooresville, NC",
    metaDescription:
      "Looking for walk-in haircuts in Mooresville, NC? See nearby shops, phone numbers, check-in links, and directions on ChairRadar.",
    searchLocation: "Mooresville, NC",
    zipCodes: ["28117", "28115"],
    cityNames: ["Mooresville"],
    shopFilter: "walkIns",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["mooresville-haircuts", "mooresville-open-now-haircuts", "lake-norman-walk-in-haircuts"]
  },
  {
    id: "mooresville-open-now-haircuts",
    segments: ["mooresville", "open-now-haircuts"],
    href: "/nc/mooresville/open-now-haircuts",
    areaName: "Mooresville, NC",
    eyebrow: "Open-now haircut guide",
    heading: "Open-now haircut shops in Mooresville, NC",
    description:
      "Find Mooresville haircut shops marked open now with direct phone, website, booking, and directions links.",
    intro:
      "ChairRadar keeps the open-now view simple for Mooresville shoppers who need to move fast from search to a real shop.",
    metaTitle: "Open-Now Haircuts in Mooresville, NC",
    metaDescription:
      "Need a haircut now in Mooresville, NC? Compare open-now shops, call directly, check in online, or get directions.",
    searchLocation: "Mooresville, NC",
    zipCodes: ["28117", "28115"],
    cityNames: ["Mooresville"],
    shopFilter: "openNow",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["mooresville-haircuts", "mooresville-walk-in-haircuts", "mooresville-28117"]
  },
  {
    id: "mooresville-kids-haircuts",
    segments: ["mooresville", "kids-haircuts"],
    href: "/nc/mooresville/kids-haircuts",
    areaName: "Mooresville, NC",
    eyebrow: "Kids haircut guide",
    heading: "Kids haircut options in Mooresville, NC",
    description:
      "Compare Mooresville shops that publicly list kids cuts or family-friendly haircut options.",
    intro:
      "For last-minute school photos, sports, or family weekends, ChairRadar helps parents find Mooresville shops that list kids haircut options.",
    metaTitle: "Kids Haircuts in Mooresville, NC",
    metaDescription:
      "Find kids haircut options in Mooresville, NC with direct call buttons, booking links, and directions on ChairRadar.",
    searchLocation: "Mooresville, NC",
    zipCodes: ["28117", "28115"],
    cityNames: ["Mooresville"],
    shopFilter: "kids",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["mooresville-haircuts", "mooresville-walk-in-haircuts", "lake-norman-kids-haircuts"]
  },
  {
    id: "mooresville-mens-haircuts",
    segments: ["mooresville", "mens-haircuts"],
    href: "/nc/mooresville/mens-haircuts",
    areaName: "Mooresville, NC",
    eyebrow: "Men's haircut guide",
    heading: "Men's haircuts and barbers in Mooresville, NC",
    description:
      "Find Mooresville barbershops and haircut shops that publicly list men's cuts, fades, beard services, or walk-ins.",
    intro:
      "ChairRadar groups Mooresville barber and men's grooming options so users can call, book, or get directions without digging across multiple sites.",
    metaTitle: "Men's Haircuts and Barbers in Mooresville, NC",
    metaDescription:
      "Compare men's haircut and barber options in Mooresville, NC. See phone numbers, booking links, walk-ins, and directions.",
    searchLocation: "Mooresville, NC",
    zipCodes: ["28117", "28115"],
    cityNames: ["Mooresville"],
    shopFilter: "mens",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["mooresville-haircuts", "mooresville-walk-in-haircuts", "lake-norman-mens-haircuts"]
  },
  {
    id: "mooresville-28117",
    segments: ["mooresville", "28117"],
    href: "/nc/mooresville/28117",
    areaName: "28117",
    eyebrow: "28117 haircut guide",
    heading: "Haircut shops near 28117",
    description:
      "Find haircut shops near 28117 with phone numbers, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar is starting with real public haircut listings around 28117 so people nearby can move from search to action fast.",
    metaTitle: "Haircut Shops Near 28117",
    metaDescription:
      "Find haircut shops near 28117. Compare phone numbers, booking links, walk-in options, and directions with ChairRadar.",
    searchLocation: "28117",
    zipCodes: ["28117"],
    cityNames: ["Mooresville"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["mooresville-haircuts", "mooresville-28115", "lake-norman-haircuts"]
  },
  {
    id: "mooresville-28115",
    segments: ["mooresville", "28115"],
    href: "/nc/mooresville/28115",
    areaName: "28115",
    eyebrow: "28115 haircut guide",
    heading: "Haircut shops near 28115",
    description:
      "Find haircut shops near 28115 with public phone numbers, booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar highlights Mooresville-area shops near 28115 so users can quickly compare public contact and reservation paths.",
    metaTitle: "Haircut Shops Near 28115",
    metaDescription:
      "Find haircut shops near 28115. Compare phone numbers, booking links, walk-in signals, and directions with ChairRadar.",
    searchLocation: "28115",
    zipCodes: ["28115"],
    cityNames: ["Mooresville"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["mooresville-haircuts", "mooresville-28117", "mooresville-walk-in-haircuts"]
  },
  {
    id: "cornelius-haircuts",
    segments: ["cornelius", "haircuts"],
    href: "/nc/cornelius/haircuts",
    areaName: "Cornelius, NC",
    eyebrow: "Cornelius haircut guide",
    heading: "Haircut availability in Cornelius, NC",
    description:
      "Find Cornelius haircut shops with direct call buttons, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar helps Cornelius users compare nearby haircut shops quickly, including chain check-in pages and local salon appointment paths.",
    metaTitle: "Haircut Availability in Cornelius, NC",
    metaDescription:
      "Find haircut shops in Cornelius, NC. Compare direct phone numbers, booking links, walk-in options, and directions.",
    searchLocation: "Cornelius, NC",
    zipCodes: ["28031"],
    cityNames: ["Cornelius"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["cornelius-walk-in-haircuts", "cornelius-28031", "lake-norman-haircuts"]
  },
  {
    id: "cornelius-walk-in-haircuts",
    segments: ["cornelius", "walk-in-haircuts"],
    href: "/nc/cornelius/walk-in-haircuts",
    areaName: "Cornelius, NC",
    eyebrow: "Cornelius walk-in guide",
    heading: "Walk-in haircuts in Cornelius, NC",
    description:
      "Find Cornelius shops with public walk-in or online check-in signals and direct ways to call or get directions.",
    intro:
      "For same-day haircut needs near Cornelius, ChairRadar filters the local list toward shops that publicly signal walk-ins or check-in access.",
    metaTitle: "Walk-In Haircuts in Cornelius, NC",
    metaDescription:
      "Need a walk-in haircut in Cornelius, NC? Compare shops, call directly, check in online, or get directions.",
    searchLocation: "Cornelius, NC",
    zipCodes: ["28031"],
    cityNames: ["Cornelius"],
    shopFilter: "walkIns",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["cornelius-haircuts", "cornelius-28031", "lake-norman-walk-in-haircuts"]
  },
  {
    id: "cornelius-28031",
    segments: ["cornelius", "28031"],
    href: "/nc/cornelius/28031",
    areaName: "28031",
    eyebrow: "28031 haircut guide",
    heading: "Haircut shops near 28031",
    description:
      "Find haircut shops near 28031 with direct phone numbers, booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar gives 28031 users a quick way to compare nearby haircut options and move straight to a call, booking page, or map.",
    metaTitle: "Haircut Shops Near 28031",
    metaDescription:
      "Find haircut shops near 28031. Compare phone numbers, booking links, walk-in options, and directions with ChairRadar.",
    searchLocation: "28031",
    zipCodes: ["28031"],
    cityNames: ["Cornelius"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["cornelius-haircuts", "cornelius-walk-in-haircuts", "lake-norman-haircuts"]
  },
  {
    id: "huntersville-haircuts",
    segments: ["huntersville", "haircuts"],
    href: "/nc/huntersville/haircuts",
    areaName: "Huntersville, NC",
    eyebrow: "Huntersville haircut guide",
    heading: "Haircut availability in Huntersville, NC",
    description:
      "Find Huntersville haircut shops with direct calls, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar helps Huntersville users compare chain check-in options, salons, and barber-style listings from one phone-friendly page.",
    metaTitle: "Haircut Availability in Huntersville, NC",
    metaDescription:
      "Find haircut shops in Huntersville, NC. Compare phone numbers, direct booking links, walk-ins, and directions.",
    searchLocation: "Huntersville, NC",
    zipCodes: ["28078"],
    cityNames: ["Huntersville"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["huntersville-walk-in-haircuts", "huntersville-28078", "lake-norman-haircuts"]
  },
  {
    id: "huntersville-walk-in-haircuts",
    segments: ["huntersville", "walk-in-haircuts"],
    href: "/nc/huntersville/walk-in-haircuts",
    areaName: "Huntersville, NC",
    eyebrow: "Huntersville walk-in guide",
    heading: "Walk-in haircuts in Huntersville, NC",
    description:
      "Find Huntersville haircut shops with public walk-in or online check-in signals, direct calls, and directions.",
    intro:
      "For urgent haircut needs in Huntersville, ChairRadar highlights shops that publicly list walk-ins or same-day check-in paths.",
    metaTitle: "Walk-In Haircuts in Huntersville, NC",
    metaDescription:
      "Need a walk-in haircut in Huntersville, NC? Compare shops, call directly, check in online, or get directions.",
    searchLocation: "Huntersville, NC",
    zipCodes: ["28078"],
    cityNames: ["Huntersville"],
    shopFilter: "walkIns",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["huntersville-haircuts", "huntersville-28078", "lake-norman-walk-in-haircuts"]
  },
  {
    id: "huntersville-28078",
    segments: ["huntersville", "28078"],
    href: "/nc/huntersville/28078",
    areaName: "28078",
    eyebrow: "28078 haircut guide",
    heading: "Haircut shops near 28078",
    description:
      "Find haircut shops near 28078 with phone numbers, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar gives 28078 users a quick comparison page for nearby haircut shops, salons, and check-in options.",
    metaTitle: "Haircut Shops Near 28078",
    metaDescription:
      "Find haircut shops near 28078. Compare phone numbers, booking links, walk-in options, and directions with ChairRadar.",
    searchLocation: "28078",
    zipCodes: ["28078"],
    cityNames: ["Huntersville"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["huntersville-haircuts", "huntersville-walk-in-haircuts", "lake-norman-haircuts"]
  },
  {
    id: "denver-haircuts",
    segments: ["denver", "haircuts"],
    href: "/nc/denver/haircuts",
    areaName: "Denver, NC",
    eyebrow: "Denver haircut guide",
    heading: "Haircut availability in Denver, NC",
    description:
      "Find Denver haircut shops with direct call buttons, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar helps Denver-area users compare nearby haircut shops quickly, including chain check-in options and local salon contact paths.",
    metaTitle: "Haircut Availability in Denver, NC",
    metaDescription:
      "Find haircut shops in Denver, NC. Compare phone numbers, booking links, walk-in options, and directions with ChairRadar.",
    searchLocation: "Denver, NC",
    zipCodes: ["28037"],
    cityNames: ["Denver"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["denver-walk-in-haircuts", "denver-28037", "lake-norman-haircuts"]
  },
  {
    id: "denver-walk-in-haircuts",
    segments: ["denver", "walk-in-haircuts"],
    href: "/nc/denver/walk-in-haircuts",
    areaName: "Denver, NC",
    eyebrow: "Denver walk-in guide",
    heading: "Walk-in haircuts in Denver, NC",
    description:
      "Find Denver shops with public walk-in or online check-in signals and direct ways to call or get directions.",
    intro:
      "For same-day haircut needs around Denver, ChairRadar filters toward shops that publicly signal walk-ins or online check-in access.",
    metaTitle: "Walk-In Haircuts in Denver, NC",
    metaDescription:
      "Need a walk-in haircut in Denver, NC? Compare shops, call directly, check in online, or get directions.",
    searchLocation: "Denver, NC",
    zipCodes: ["28037"],
    cityNames: ["Denver"],
    shopFilter: "walkIns",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["denver-haircuts", "denver-28037", "lake-norman-walk-in-haircuts"]
  },
  {
    id: "denver-28037",
    segments: ["denver", "28037"],
    href: "/nc/denver/28037",
    areaName: "28037",
    eyebrow: "28037 haircut guide",
    heading: "Haircut shops near 28037",
    description:
      "Find haircut shops near 28037 with direct phone numbers, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar gives 28037 users a fast way to compare Denver-area haircut shops and act from one mobile-friendly page.",
    metaTitle: "Haircut Shops Near 28037",
    metaDescription:
      "Find haircut shops near 28037. Compare phone numbers, booking links, walk-in options, and directions with ChairRadar.",
    searchLocation: "28037",
    zipCodes: ["28037"],
    cityNames: ["Denver"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["denver-haircuts", "denver-walk-in-haircuts", "lake-norman-haircuts"]
  },
  {
    id: "charlotte-haircuts",
    segments: ["charlotte", "haircuts"],
    href: "/nc/charlotte/haircuts",
    areaName: "Charlotte, NC",
    eyebrow: "Charlotte haircut guide",
    heading: "Haircut availability in Charlotte, NC",
    description:
      "Find Charlotte haircut shops with direct call buttons, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar helps Charlotte users compare nearby chain check-in pages and public shop listings quickly, then call, check in, book, or get directions from one page.",
    metaTitle: "Haircut Availability in Charlotte, NC",
    metaDescription:
      "Find haircut shops in Charlotte, NC. Compare walk-in options, direct booking links, phone numbers, and directions with ChairRadar.",
    searchLocation: "Charlotte, NC",
    zipCodes: charlotteZipCodes,
    cityNames: charlotteCities,
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["charlotte-walk-in-haircuts", "charlotte-mens-haircuts", "charlotte-28277"]
  },
  {
    id: "charlotte-walk-in-haircuts",
    segments: ["charlotte", "walk-in-haircuts"],
    href: "/nc/charlotte/walk-in-haircuts",
    areaName: "Charlotte, NC",
    eyebrow: "Charlotte walk-in guide",
    heading: "Walk-in haircuts in Charlotte, NC",
    description:
      "Compare Charlotte shops with public walk-in or online check-in signals, direct call buttons, and directions.",
    intro:
      "For same-day haircut needs in Charlotte, ChairRadar filters toward shops that publicly signal walk-ins, online check-in, or quick call access.",
    metaTitle: "Walk-In Haircuts in Charlotte, NC",
    metaDescription:
      "Need a walk-in haircut in Charlotte, NC? Compare shops, call directly, check in online, or get directions from ChairRadar.",
    searchLocation: "Charlotte, NC",
    zipCodes: charlotteZipCodes,
    cityNames: charlotteCities,
    shopFilter: "walkIns",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["charlotte-haircuts", "charlotte-28277", "charlotte-28209"]
  },
  {
    id: "charlotte-kids-haircuts",
    segments: ["charlotte", "kids-haircuts"],
    href: "/nc/charlotte/kids-haircuts",
    areaName: "Charlotte, NC",
    eyebrow: "Charlotte kids haircut guide",
    heading: "Kids haircut options in Charlotte, NC",
    description:
      "Compare Charlotte shops that publicly list kids cuts or family-friendly haircut options.",
    intro:
      "ChairRadar helps parents find Charlotte haircut shops that list kids cuts, then call, check in, or get directions quickly.",
    metaTitle: "Kids Haircuts in Charlotte, NC",
    metaDescription:
      "Find kids haircut options in Charlotte, NC with direct call buttons, booking links, and directions on ChairRadar.",
    searchLocation: "Charlotte, NC",
    zipCodes: charlotteZipCodes,
    cityNames: charlotteCities,
    shopFilter: "kids",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["charlotte-haircuts", "charlotte-walk-in-haircuts", "charlotte-28277"]
  },
  {
    id: "charlotte-mens-haircuts",
    segments: ["charlotte", "mens-haircuts"],
    href: "/nc/charlotte/mens-haircuts",
    areaName: "Charlotte, NC",
    eyebrow: "Charlotte men's haircut guide",
    heading: "Men's haircuts and barbers in Charlotte, NC",
    description:
      "Find Charlotte men's haircut shops and barbershop-style options with public phone, check-in, booking, and directions links.",
    intro:
      "ChairRadar groups Charlotte men's haircut and boys cut options so users can compare public check-in, phone, and directions links fast.",
    metaTitle: "Men's Haircuts and Barbers in Charlotte, NC",
    metaDescription:
      "Compare men's haircut and barber-style options in Charlotte, NC. See phone numbers, booking links, walk-ins, and directions.",
    searchLocation: "Charlotte, NC",
    zipCodes: charlotteZipCodes,
    cityNames: charlotteCities,
    shopFilter: "mens",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["charlotte-haircuts", "charlotte-walk-in-haircuts", "charlotte-28209"]
  },
  {
    id: "charlotte-28277",
    segments: ["charlotte", "28277"],
    href: "/nc/charlotte/28277",
    areaName: "28277",
    eyebrow: "28277 haircut guide",
    heading: "Haircut shops near 28277",
    description:
      "Find haircut shops near 28277 with direct phone numbers, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar gives 28277 users a quick way to compare nearby Charlotte haircut options and move straight to a call, check-in page, or map.",
    metaTitle: "Haircut Shops Near 28277",
    metaDescription:
      "Find haircut shops near 28277. Compare phone numbers, booking links, walk-in options, and directions with ChairRadar.",
    searchLocation: "28277",
    zipCodes: ["28277"],
    cityNames: ["Charlotte"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["charlotte-haircuts", "charlotte-walk-in-haircuts", "charlotte-mens-haircuts"]
  },
  {
    id: "charlotte-28209",
    segments: ["charlotte", "28209"],
    href: "/nc/charlotte/28209",
    areaName: "28209",
    eyebrow: "28209 haircut guide",
    heading: "Haircut shops near 28209",
    description:
      "Find haircut shops near 28209 with public phone numbers, check-in links, walk-in signals, and directions.",
    intro:
      "ChairRadar helps 28209 users compare South End and Park Road-area haircut options with direct phone and public check-in links.",
    metaTitle: "Haircut Shops Near 28209",
    metaDescription:
      "Find haircut shops near 28209. Compare phone numbers, check-in links, walk-in options, and directions with ChairRadar.",
    searchLocation: "28209",
    zipCodes: ["28209"],
    cityNames: ["Charlotte"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["charlotte-haircuts", "charlotte-walk-in-haircuts", "charlotte-mens-haircuts"]
  },
  {
    id: "charlotte-28216",
    segments: ["charlotte", "28216"],
    href: "/nc/charlotte/28216",
    areaName: "28216",
    eyebrow: "28216 haircut guide",
    heading: "Haircut shops near 28216",
    description:
      "Find haircut shops near 28216 with direct phone numbers, public check-in links, walk-in signals, and directions.",
    intro:
      "ChairRadar helps 28216 users compare nearby haircut shops around Riverbend, Northlake, and surrounding Charlotte neighborhoods.",
    metaTitle: "Haircut Shops Near 28216",
    metaDescription:
      "Find haircut shops near 28216. Compare phone numbers, booking links, walk-in options, and directions with ChairRadar.",
    searchLocation: "28216",
    zipCodes: ["28216"],
    cityNames: ["Charlotte"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["charlotte-haircuts", "charlotte-walk-in-haircuts", "charlotte-28273"]
  },
  {
    id: "charlotte-28273",
    segments: ["charlotte", "28273"],
    href: "/nc/charlotte/28273",
    areaName: "28273",
    eyebrow: "28273 haircut guide",
    heading: "Haircut shops near 28273",
    description:
      "Find haircut shops near 28273 with direct phone numbers, public booking links, walk-in signals, and directions.",
    intro:
      "ChairRadar gives 28273 users a fast way to compare Rivergate and Steele Creek haircut options from one mobile-friendly page.",
    metaTitle: "Haircut Shops Near 28273",
    metaDescription:
      "Find haircut shops near 28273. Compare phone numbers, booking links, walk-in options, and directions with ChairRadar.",
    searchLocation: "28273",
    zipCodes: ["28273"],
    cityNames: ["Charlotte"],
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["charlotte-haircuts", "charlotte-walk-in-haircuts", "charlotte-28216"]
  },
  {
    id: "lake-norman-haircuts",
    segments: ["lake-norman", "haircuts"],
    href: "/nc/lake-norman/haircuts",
    areaName: "Lake Norman",
    eyebrow: "Lake Norman haircut guide",
    heading: "Haircut availability near Lake Norman",
    description:
      "Compare haircut shops in the current Lake Norman coverage area with direct call, booking, website, and directions links.",
    intro:
      "ChairRadar is building a Lake Norman haircut discovery layer for people who need a nearby shop quickly and want to act from their phone.",
    metaTitle: "Haircut Availability Near Lake Norman",
    metaDescription:
      "Find haircut availability near Lake Norman. Compare nearby shops, walk-in signals, phone numbers, booking links, and directions.",
    searchLocation: "Lake Norman",
    zipCodes: lakeNormanZipCodes,
    cityNames: lakeNormanCities,
    shopFilter: "all",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["lake-norman-walk-in-haircuts", "lake-norman-open-now-haircuts", "mooresville-haircuts"]
  },
  {
    id: "lake-norman-walk-in-haircuts",
    segments: ["lake-norman", "walk-in-haircuts"],
    href: "/nc/lake-norman/walk-in-haircuts",
    areaName: "Lake Norman",
    eyebrow: "Lake Norman walk-in guide",
    heading: "Walk-in haircuts near Lake Norman",
    description:
      "Find Lake Norman-area haircut shops with walk-in friendly signals, direct phone links, online check-in, and directions.",
    intro:
      "For urgent haircut needs around Lake Norman, ChairRadar surfaces shops with public walk-in or same-day access signals first.",
    metaTitle: "Walk-In Haircuts Near Lake Norman",
    metaDescription:
      "Need a walk-in haircut near Lake Norman? Compare nearby shops, call directly, check in online, or get directions from ChairRadar.",
    searchLocation: "Lake Norman",
    zipCodes: lakeNormanZipCodes,
    cityNames: lakeNormanCities,
    shopFilter: "walkIns",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["lake-norman-haircuts", "lake-norman-open-now-haircuts", "mooresville-walk-in-haircuts"]
  },
  {
    id: "lake-norman-open-now-haircuts",
    segments: ["lake-norman", "open-now-haircuts"],
    href: "/nc/lake-norman/open-now-haircuts",
    areaName: "Lake Norman",
    eyebrow: "Lake Norman open-now guide",
    heading: "Open-now haircut shops near Lake Norman",
    description:
      "Find Lake Norman-area haircut shops marked open now with direct call, booking, website, and directions links.",
    intro:
      "ChairRadar keeps open-now haircut options around Lake Norman in one place so users can call, check in, or get directions quickly.",
    metaTitle: "Open-Now Haircuts Near Lake Norman",
    metaDescription:
      "Need a haircut now near Lake Norman? Compare open-now shops, phone numbers, booking links, and directions.",
    searchLocation: "Lake Norman",
    zipCodes: lakeNormanZipCodes,
    cityNames: lakeNormanCities,
    shopFilter: "openNow",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["lake-norman-haircuts", "lake-norman-walk-in-haircuts", "mooresville-open-now-haircuts"]
  },
  {
    id: "lake-norman-kids-haircuts",
    segments: ["lake-norman", "kids-haircuts"],
    href: "/nc/lake-norman/kids-haircuts",
    areaName: "Lake Norman",
    eyebrow: "Lake Norman kids haircut guide",
    heading: "Kids haircut options near Lake Norman",
    description:
      "Compare Lake Norman shops that publicly list kids cuts or family-friendly haircut options.",
    intro:
      "ChairRadar helps parents around Lake Norman find nearby kids haircut options with direct call, booking, and directions links.",
    metaTitle: "Kids Haircuts Near Lake Norman",
    metaDescription:
      "Find kids haircut options near Lake Norman. Compare phone numbers, booking links, walk-ins, and directions.",
    searchLocation: "Lake Norman",
    zipCodes: lakeNormanZipCodes,
    cityNames: lakeNormanCities,
    shopFilter: "kids",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["lake-norman-haircuts", "mooresville-kids-haircuts", "lake-norman-walk-in-haircuts"]
  },
  {
    id: "lake-norman-mens-haircuts",
    segments: ["lake-norman", "mens-haircuts"],
    href: "/nc/lake-norman/mens-haircuts",
    areaName: "Lake Norman",
    eyebrow: "Lake Norman men's haircut guide",
    heading: "Men's haircuts and barbers near Lake Norman",
    description:
      "Find Lake Norman barbershops and haircut shops that publicly list men's cuts, fades, beard services, or walk-ins.",
    intro:
      "ChairRadar groups Lake Norman men's haircut and barber options so users can compare public booking, phone, and directions links fast.",
    metaTitle: "Men's Haircuts and Barbers Near Lake Norman",
    metaDescription:
      "Compare men's haircut and barber options near Lake Norman. See phone numbers, booking links, walk-ins, and directions.",
    searchLocation: "Lake Norman",
    zipCodes: lakeNormanZipCodes,
    cityNames: lakeNormanCities,
    shopFilter: "mens",
    lastUpdatedLabel: currentUpdate,
    relatedPageIds: ["lake-norman-haircuts", "mooresville-mens-haircuts", "lake-norman-walk-in-haircuts"]
  }
];

export function getLocationPageBySegments(segments: string[]) {
  return locationPages.find((page) => page.segments.join("/") === segments.join("/"));
}

function shopMatchesFilter(shop: Shop, filter: ShopFilter) {
  if (filter === "walkIns") {
    return shop.walkInsAvailable;
  }

  if (filter === "openNow") {
    return shop.openNow;
  }

  if (filter === "kids") {
    return shop.specialties.some((specialty) => specialty.toLowerCase().includes("kids"));
  }

  if (filter === "mens") {
    return shop.specialties.some((specialty) => {
      const normalized = specialty.toLowerCase();
      return (
        normalized.includes("men") ||
        normalized.includes("barber") ||
        normalized.includes("beard") ||
        normalized.includes("fade") ||
        normalized.includes("boys")
      );
    });
  }

  if (filter === "bookable") {
    return Boolean(shop.bookingUrl);
  }

  return true;
}

export function getLocationPageShops(page: LocationPage) {
  const matchingShops = shops.filter((shop) => {
    const locationMatches =
      page.zipCodes.includes(shop.zip) || page.cityNames.includes(shop.city);

    return locationMatches && shopMatchesFilter(shop, page.shopFilter);
  });

  return matchingShops.length > 0 ? matchingShops : shops.filter((shop) => shopMatchesFilter(shop, page.shopFilter));
}

export function getRelatedLocationPages(page: LocationPage) {
  return page.relatedPageIds
    .map((pageId) => locationPages.find((item) => item.id === pageId))
    .filter((item): item is LocationPage => Boolean(item));
}

export function getShopLocationSummary(shopList: Shop[]) {
  const cities = Array.from(new Set(shopList.map((shop) => shop.city)));
  const zips = Array.from(new Set(shopList.map((shop) => shop.zip)));

  return {
    cities,
    zips
  };
}
