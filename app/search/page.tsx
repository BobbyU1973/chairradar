import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SiteFooter } from "@/components/SiteFooter";
import { ShopCard } from "@/components/ShopCard";
import { TrackEvent } from "@/components/TrackEvent";
import { regionalSearchTerms, shops } from "@/data/shops";

export const metadata: Metadata = {
  title: "Search Haircut Shops",
  description:
    "Search OpenChair for nearby haircut shops, walk-in options, and public booking links in the current North Carolina launch coverage area.",
  robots: {
    index: false,
    follow: true
  }
};

type SearchPageProps = {
  searchParams?: Promise<{
    query?: string;
    location?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = params.query?.trim() || "Haircut";
  const location = params.location?.trim() || "Near me";

  const normalizedQuery = query.toLowerCase();
  const normalizedLocation = location.toLowerCase();
  const isZipSearch = /^\d{5}$/.test(normalizedLocation);
  const isRegionalSearch =
    normalizedLocation.length === 0 ||
    normalizedLocation === "near me" ||
    isZipSearch ||
    regionalSearchTerms.some((term) => normalizedLocation.includes(term));

  const matchesQuery = (shopName: string, specialties: string[]) =>
    normalizedQuery.length === 0 ||
    shopName.toLowerCase().includes(normalizedQuery) ||
    specialties.some((specialty) => specialty.toLowerCase().includes(normalizedQuery)) ||
    normalizedQuery.includes("haircut");

  const queryMatchedShops = shops.filter((shop) => matchesQuery(shop.name, shop.specialties));

  const locationMatchedShops = queryMatchedShops.filter((shop) => {
    return (
      normalizedLocation.length === 0 ||
      normalizedLocation === "near me" ||
      shop.neighborhood.toLowerCase().includes(normalizedLocation) ||
      shop.address.toLowerCase().includes(normalizedLocation) ||
      shop.city.toLowerCase().includes(normalizedLocation) ||
      shop.zip.includes(normalizedLocation)
    );
  });

  const filteredShops = isRegionalSearch
    ? queryMatchedShops
    : locationMatchedShops.length > 0
      ? locationMatchedShops
      : queryMatchedShops;

  const isFallbackLocationResult =
    normalizedLocation.length > 0 &&
    normalizedLocation !== "near me" &&
    !isRegionalSearch &&
    locationMatchedShops.length === 0 &&
    queryMatchedShops.length > 0;

  return (
    <main>
      <TrackEvent
        eventName="search_results_viewed"
        params={{
          query,
          location,
          results_count: filteredShops.length
        }}
      />
      <TrackEvent
        eventName="zip_search"
        params={{
          query,
          location,
          results_count: filteredShops.length
        }}
        enabled={isZipSearch}
      />
      <TrackEvent
        eventName="zero_results_viewed"
        params={{
          query,
          location
        }}
        enabled={filteredShops.length === 0}
      />
      <Header />

      <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Search results
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Find nearby haircut availability fast
            </h1>
            <p className="mt-4 text-lg text-[color:var(--muted)]">
              Showing real public shop options for <span className="font-semibold text-[color:var(--foreground)]">{query}</span> in{" "}
              <span className="font-semibold text-[color:var(--foreground)]">{location}</span>.
            </p>
          </div>

          <div className="mt-8">
            <SearchBar defaultLocation={location} compact />
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.32fr_0.68fr]">
          <div className="order-1">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[color:var(--muted)]">
                {filteredShops.length} real shops in the current NC coverage set
              </p>
              <p className="inline-flex w-fit rounded-full bg-white/80 px-4 py-2 text-sm font-medium">
                Tap to call or book
              </p>
            </div>

            {filteredShops.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-[color:var(--line)] bg-white/70 px-6 py-12 text-center">
                <p className="text-xl font-semibold">No exact matches yet</p>
                <p className="mt-3 text-[color:var(--muted)]">
                  Try a broader search like "haircut" or use "Near me" to see all nearby OpenChair results.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredShops.map((shop) => (
                  <ShopCard key={shop.id} shop={shop} />
                ))}
              </div>
            )}
          </div>

          <aside className="order-2 h-fit rounded-[32px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Why these show up first
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
              <p>These are real public-facing shop listings from the current North Carolina launch coverage area.</p>
              <p>Each result highlights booking access, phone, walk-ins, and specialties at a glance.</p>
              <p>Users can click through to the shop site or call directly to reserve a slot.</p>
              {isFallbackLocationResult ? (
                <p>
                  No exact match for "{location}" in the current coverage area, so OpenChair is showing the nearest available Lake Norman-area options.
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
