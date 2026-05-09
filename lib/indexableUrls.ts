import { locationPages } from "@/data/locationPages";
import { guidePages } from "@/data/guidePages";
import { localSeoPages } from "@/data/localSeoPages";
import { shops } from "@/data/shops";
import { SITE_URL } from "@/lib/site";
import { getShopProfilePath } from "@/lib/shopRoutes";

export type IndexableUrlEntry = {
  url: string;
  changeFrequency: "daily" | "weekly";
  priority: number;
};

export function getIndexableUrlEntries(): IndexableUrlEntry[] {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${SITE_URL}/locations`,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/nc`,
      changeFrequency: "weekly",
      priority: 0.78
    },
    {
      url: `${SITE_URL}/for-shops/get-more-haircut-customers`,
      changeFrequency: "weekly",
      priority: 0.72
    },
    ...guidePages.map((page) => ({
      url: `${SITE_URL}${page.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.68
    })),
    ...localSeoPages.map((page) => ({
      url: `${SITE_URL}${page.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.86
    })),
    ...locationPages.map((page) => ({
      url: `${SITE_URL}${page.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.85
    })),
    ...shops.map((shop) => ({
      url: `${SITE_URL}${getShopProfilePath(shop)}`,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}

export function getIndexableUrls() {
  return getIndexableUrlEntries().map((entry) => entry.url);
}
