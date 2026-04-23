import Link from "next/link";
import { liveCityPages } from "@/data/coverage";
import { locationPages } from "@/data/locationPages";

const footerPageIds = [
  "mooresville-haircuts",
  "mooresville-walk-in-haircuts",
  "cornelius-haircuts",
  "huntersville-haircuts",
  "denver-haircuts",
  "lake-norman-haircuts",
  "lake-norman-open-now-haircuts",
  "lake-norman-kids-haircuts"
];

const footerPages = footerPageIds
  .map((pageId) => locationPages.find((page) => page.id === pageId))
  .filter((page): page is (typeof locationPages)[number] => Boolean(page));

const liveFooterPages = liveCityPages.slice(0, 4);

export function SiteFooter() {
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

        <div className="grid gap-8 md:grid-cols-2">
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
              {liveFooterPages.map((page) => (
                <Link
                  key={page.id}
                  href={page.href}
                  className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
                >
                  {page.areaName}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Popular searches
            </p>
            <div className="mt-4 grid gap-3">
              {footerPages.slice(0, 4).map((page) => (
                <Link
                  key={page.id}
                  href={page.href}
                  className="text-sm font-medium text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
                >
                  {page.metaTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
