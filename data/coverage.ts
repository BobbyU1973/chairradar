import { locationPages, type LocationPage } from "@/data/locationPages";
import { shops } from "@/data/shops";

export type CoverageArea = {
  id: string;
  name: string;
  stateCode: string;
  stateName: string;
  href: string;
  statusLabel: string;
  description: string;
  pageIds: string[];
};

const liveCityPageIds = [
  "mooresville-haircuts",
  "cornelius-haircuts",
  "huntersville-haircuts",
  "denver-haircuts",
  "lake-norman-haircuts"
];

const liveZipPageIds = [
  "mooresville-28117",
  "mooresville-28115",
  "cornelius-28031",
  "huntersville-28078",
  "denver-28037"
];

export const liveCoverageAreas: CoverageArea[] = [
  {
    id: "lake-norman",
    name: "Lake Norman, NC",
    stateCode: "NC",
    stateName: "North Carolina",
    href: "/nc/lake-norman/haircuts",
    statusLabel: "Live coverage",
    description:
      "Real public haircut listings across Mooresville, Cornelius, Huntersville, Denver, Sherrills Ford, and nearby ZIPs.",
    pageIds: [...liveCityPageIds, ...liveZipPageIds]
  }
];

export const priorityNorthCarolinaMarkets = [
  "Charlotte",
  "Raleigh",
  "Durham",
  "Greensboro",
  "Winston-Salem",
  "Cary",
  "Wilmington",
  "Asheville",
  "Fayetteville",
  "Concord",
  "Gastonia",
  "Chapel Hill"
];

export const nationalExpansionPrinciples = [
  "Add real public shop listings before publishing local pages.",
  "Keep call, website, booking, and directions clicks as the core action.",
  "Avoid fake availability counters or empty nationwide city pages."
];

export const liveShopCount = shops.length;
export const liveCities = Array.from(new Set(shops.map((shop) => shop.city))).sort();
export const liveZipCodes = Array.from(new Set(shops.map((shop) => shop.zip))).sort();

export function getPagesByIds(pageIds: string[]): LocationPage[] {
  return pageIds
    .map((pageId) => locationPages.find((page) => page.id === pageId))
    .filter((page): page is LocationPage => Boolean(page));
}

export const liveCityPages = getPagesByIds(liveCityPageIds);
export const liveZipPages = getPagesByIds(liveZipPageIds);
export const liveCoveragePages = getPagesByIds(
  Array.from(new Set(liveCoverageAreas.flatMap((area) => area.pageIds)))
);
