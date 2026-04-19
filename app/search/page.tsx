import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SiteFooter } from "@/components/SiteFooter";
import { ShopCard } from "@/components/ShopCard";
import { TrackEvent } from "@/components/TrackEvent";
import { regionalSearchTerms, shops, type Shop } from "@/data/shops";

export const metadata: Metadata = {
  title: "Search Haircut Shops",
  description:
    "Search ChairRadar for nearby haircut shops, walk-in options, and public booking links in the current North Carolina launch coverage area.",
  robots: {
    index: false,
    follow: true
  }
};

type SearchPageProps = {
  searchParams?: Promise<{
    query?: string;
    location?: string;
    filter?: string;
  }>;
};

type FilterKey = "all" | "open" | "walkins" | "bookable" | "chains";

const filterKeys: FilterKey[] = ["all", "open", "walkins", "bookable", "chains"];

function isFilterKey(value: string): value is FilterKey {
  return filterKeys.includes(value as FilterKey);
}

function isChainShop(shop: Shop) {
  return (
    shop.name.includes("Great Clips") ||
    shop.name.includes("Sport Clips") ||
    shop.name.includes("Supercuts") ||
    shop.name.includes("Ulta")
  );
}

function matchesFilter(shop: Shop, filter: FilterKey) {
  if (filter === "open") {
    return shop.openNow;
  }

  if (filter === "walkins") {
    return shop.walkInsAvailable;
  }

  if (filter === "bookable") {
    return Boolean(shop.bookingUrl);
  }

  if (filter === "chains") {
    return isChainShop(shop);
  }

  return true;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = params.query?.trim() || "Haircut";
  const location = params.location?.trim() || "Near me";
  const requestedFilter = params.filter?.trim() || "all";
  const activeFilter = isFilterKey(requestedFilter) ? requestedFilter : "all";

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
  const resultShops = filteredShops.filter((shop) => matchesFilter(shop, activeFilter));
  const filterOptions: Array<{
    key: FilterKey;
    label: string;
    count: number;
  }> = [
    { key: "all", label: "All shops", count: filteredShops.length },
    {
      key: "open",
      label: "Open now",
      count: filteredShops.filter((shop) => matchesFilter(shop, "open")).length
    },
    {
      key: "walkins",
      label: "Walk-ins",
      count: filteredShops.filter((shop) => matchesFilter(shop, "walkins")).length
    },
    {
      key: "bookable",
      label: "Book online",
      count: filteredShops.filter((shop) => matchesFilter(shop, "bookable")).length
    },
    {
      key: "chains",
      label: "Chains",
      count: filteredShops.filter((shop) => matchesFilter(shop, "chains")).length
    }
  ];
  const buildFilterHref = (filter: FilterKey) => {
    const nextParams = new URLSearchParams({
      query,
      location
    });

    if (filter !== "all") {
      nextParams.set("filter", filter);
    }

    return `/search?${nextParams.toString()}`;
  };

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
          filter: activeFilter,
          results_count: resultShops.length
        }}
      />
      <TrackEvent
        eventName="zip_search"
        params={{
          query,
          location,
          filter: activeFilter,
          results_count: resultShops.length
        }}
        enabled={isZipSearch}
      />
      <TrackEvent
        eventName="zero_results_viewed"
        params={{
          query,
          location,
          filter: activeFilter
        }}
        enabled={resultShops.length === 0}
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
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="order-1">
            <div className="mb-5 rounded-[28px] border border-[color:var(--line)] bg-white/82 p-4 shadow-[0_14px_38px_rgba(44,30,18,0.05)] sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[color:var(--muted)]">
                  {resultShops.length} of {filteredShops.length} real shops in the current NC coverage set
                </p>
                <p className="inline-flex w-fit rounded-full bg-[color:var(--panel-strong)] px-4 py-2 text-sm font-medium">
                  Tap to call, book, or get directions
                </p>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {filterOptions.map((filter) => {
                  const isActive = filter.key === activeFilter;

                  return (
                    <Link
                      key={filter.key}
                      href={buildFilterHref(filter.key)}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                        isActive
                          ? "border-[color:var(--foreground)] bg-[color:var(--foreground)] text-white"
                          : "border-[color:var(--line)] bg-white text-[color:var(--foreground)] hover:bg-[color:var(--panel-strong)]"
                      ].join(" ")}
                    >
                      {filter.label} <span className={isActive ? "text-white/70" : "text-[color:var(--muted)]"}>{filter.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {resultShops.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-[color:var(--line)] bg-white/70 px-6 py-12 text-center">
                <p className="text-xl font-semibold">No matching shops yet</p>
                <p className="mt-3 text-[color:var(--muted)]">
                  Try all shops, a broader search like "haircut", or use "Near me" to see more ChairRadar results.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 xl:grid-cols-2">
                {resultShops.map((shop) => (
                  <ShopCard key={shop.id} shop={shop} sourcePage="search_results" />
                ))}
              </div>
            )}
          </div>

          <aside className="order-2 h-fit rounded-[32px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)] xl:sticky xl:top-24">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Why these show up first
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
              <p>These are real public-facing shop listings from the current North Carolina launch coverage area.</p>
              <p>Each result highlights booking access, phone, walk-ins, and specialties at a glance.</p>
              <p>Users can click through to the shop site or call directly to reserve a slot.</p>
              {isFallbackLocationResult ? (
                <p>
                  No exact match for "{location}" in the current coverage area, so ChairRadar is showing the nearest available Lake Norman-area options.
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
