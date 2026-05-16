import Link from "next/link";
import {
  getLocalSeoPageByHref,
  localSeoBrowseGroups
} from "@/data/localSeoPages";

const featuredLocalFooterHrefs = [
  "/haircuts/raleigh-nc",
  "/haircuts/charlotte-nc",
  "/haircuts/mooresville-nc",
  "/haircuts/cornelius-nc",
  "/haircuts/huntersville-nc",
  "/haircuts/denver-nc",
  "/haircuts/sherrills-ford-nc",
  "/haircuts/lake-norman-nc",
  "/barbers-open-now/raleigh-nc",
  "/barbers-open-now/charlotte-nc"
];

const featuredLocalFooterPages = featuredLocalFooterHrefs
  .map((href) => getLocalSeoPageByHref(href))
  .filter((page): page is NonNullable<ReturnType<typeof getLocalSeoPageByHref>> => Boolean(page));

const guideLinks = [
  { href: "/guides/find-same-day-haircut", label: "Find a same-day haircut" },
  { href: "/guides/walk-in-haircuts-vs-online-booking", label: "Walk-ins vs booking" },
  { href: "/guides/find-barber-open-now", label: "Find a barber open now" },
  { href: "/for-shops/get-more-haircut-customers", label: "For shops" }
];

export function SiteFooter() {
  const liveFooterPages = localSeoBrowseGroups.slice(0, 4);

  return (
    <footer className="border-t border-[color:var(--line)] bg-[rgba(255,252,248,0.86)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight">ChairRadar</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[color:var(--muted)]">
            Find nearby haircut shops fast with direct call buttons, public booking links, and simple open-now signals.
          </p>
          <div className="mt-5 text-sm text-[color:var(--muted)]">
            <p>ChairRadar is built to expand market by market while keeping local pages tied to real public shop listings.</p>
            <p className="mt-1">ChairRadar &copy; 2026</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Coverage
            </p>
            <div className="mt-4 grid gap-3">
              <Link
                href="/locations"
                className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
              >
                ChairRadar coverage
              </Link>
              <Link
                href="/nc"
                className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
              >
                North Carolina haircuts
              </Link>
              {liveFooterPages.map((group) => (
                <Link
                  key={group.market.market}
                  href={`/haircuts/${group.market.market}`}
                  className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
                >
                  {group.market.areaName}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Popular searches
            </p>
            <div className="mt-4 grid gap-3">
              {featuredLocalFooterPages.slice(0, 6).map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
                >
                  {page.metaTitle}
                </Link>
              ))}
              <Link
                href="/walk-in-haircuts/raleigh-nc"
                className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
              >
                Walk-In Haircuts in Raleigh, NC
              </Link>
              <Link
                href="/kids-haircuts/charlotte-nc"
                className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
              >
                Kids Haircuts in Charlotte, NC
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Guides
            </p>
            <div className="mt-4 grid gap-3">
              {guideLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
