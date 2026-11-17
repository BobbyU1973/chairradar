import type { MetadataRoute } from "next";
import { getIndexableUrlEntries } from "@/lib/indexableUrls";

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexableUrlEntries();
}
