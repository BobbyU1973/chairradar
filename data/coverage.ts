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

function getPageIdsByPrefix(prefixes: string[]) {
  return locationPages
    .filter((page) => prefixes.some((prefix) => page.id.startsWith(prefix)))
    .map((page) => page.id);
}

const liveCityPageIds = [
  "charlotte-haircuts",
  "raleigh-haircuts",
  "mooresville-haircuts",
  "cornelius-haircuts",
  "huntersville-haircuts",
  "denver-haircuts",
  "lake-norman-haircuts"
];

const liveZipPageIds = [
  "charlotte-28277",
  "charlotte-28209",
  "charlotte-28216",
  "charlotte-28273",
  "raleigh-27615",
  "raleigh-27617",
  "raleigh-27603",
  "raleigh-27609",
  "mooresville-28117",
  "mooresville-28115",
  "cornelius-28031",
  "huntersville-28078",
  "denver-28037"
];

export const liveCoverageAreas: CoverageArea[] = [
  {
    id: "charlotte",
    name: "Charlotte, NC",
    stateCode: "NC",
    stateName: "North Carolina",
    href: "/haircuts/charlotte-nc",
    statusLabel: "Live coverage",
    description:
      "Real public chain and shop listings across Charlotte with call, check-in, website, and directions links.",
    pageIds: getPageIdsByPrefix(["charlotte-"])
  },
  {
    id: "raleigh",
    name: "Raleigh, NC",
    stateCode: "NC",
    stateName: "North Carolina",
    href: "/haircuts/raleigh-nc",
    statusLabel: "Live coverage",
    description:
      "Real public chain and shop listings across Raleigh with call, check-in, website, and directions links.",
    pageIds: getPageIdsByPrefix(["raleigh-"])
  },
  {
    id: "mooresville",
    name: "Mooresville, NC",
    stateCode: "NC",
    stateName: "North Carolina",
    href: "/haircuts/mooresville-nc",
    statusLabel: "Live coverage",
    description:
      "Real public shop listings across Mooresville with walk-in signals, booking links, call buttons, and directions.",
    pageIds: getPageIdsByPrefix(["mooresville-"])
  },
  {
    id: "cornelius",
    name: "Cornelius, NC",
    stateCode: "NC",
    stateName: "North Carolina",
    href: "/haircuts/cornelius-nc",
    statusLabel: "Live coverage",
    description:
      "Real public haircut listings in Cornelius with direct phone numbers, walk-in signals, and public booking paths.",
    pageIds: getPageIdsByPrefix(["cornelius-"])
  },
  {
    id: "huntersville",
    name: "Huntersville, NC",
    stateCode: "NC",
    stateName: "North Carolina",
    href: "/haircuts/huntersville-nc",
    statusLabel: "Live coverage",
    description:
      "Real public haircut listings in Huntersville with phone numbers, check-in access, booking links, and directions.",
    pageIds: getPageIdsByPrefix(["huntersville-"])
  },
  {
    id: "denver",
    name: "Denver, NC",
    stateCode: "NC",
    stateName: "North Carolina",
    href: "/haircuts/denver-nc",
    statusLabel: "Live coverage",
    description:
      "Real public haircut listings in Denver with walk-in signals, booking links, phone numbers, and directions.",
    pageIds: getPageIdsByPrefix(["denver-"])
  },
  {
    id: "sherrills-ford",
    name: "Sherrills Ford, NC",
    stateCode: "NC",
    stateName: "North Carolina",
    href: "/haircuts/sherrills-ford-nc",
    statusLabel: "Live coverage",
    description:
      "Live public shop coverage for Sherrills Ford inside the Lake Norman footprint, with direct call and booking paths.",
    pageIds: ["lake-norman-haircuts"]
  },
  {
    id: "lake-norman",
    name: "Lake Norman, NC",
    stateCode: "NC",
    stateName: "North Carolina",
    href: "/haircuts/lake-norman-nc",
    statusLabel: "Live coverage",
    description:
      "Real public haircut listings across Mooresville, Cornelius, Huntersville, Denver, Sherrills Ford, and nearby ZIPs.",
    pageIds: getPageIdsByPrefix([
      "lake-norman-",
      "mooresville-",
      "cornelius-",
      "huntersville-",
      "denver-"
    ])
  }
];

export const priorityNorthCarolinaMarkets = [
  "Durham",
  "Greensboro",
  "Winston-Salem",
  "Fayetteville",
  "Cary",
  "Wilmington",
  "High Point",
  "Concord",
  "Greenville",
  "Gastonia",
  "Boone",
  "Rocky Mount",
  "Kitty Hawk",
  "Lenoir"
];

export const prioritySoutheastMarkets = [
  "Charleston, SC",
  "Columbia, SC",
  "Greenville-Spartanburg, SC",
  "Atlanta, GA",
  "Anderson, SC",
  "Myrtle Beach, SC",
  "North Myrtle Beach, SC",
  "Savannah, GA",
  "Augusta, GA",
  "Nashville, TN",
  "Knoxville, TN",
  "Chattanooga, TN",
  "Jacksonville, FL",
  "Orlando, FL",
  "Tampa, FL",
  "Birmingham, AL",
  "Huntsville, AL"
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
