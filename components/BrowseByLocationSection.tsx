import Link from "next/link";
import type { LocalSeoBrowseGroup } from "@/data/localSeoPages";
import { shops } from "@/data/shops";
import { getShopProfilePath } from "@/lib/shopRoutes";

type BrowseByLocationSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  groups: LocalSeoBrowseGroup[];
  ctaHref?: string;
  ctaLabel?: string;
  showShopLinks?: boolean;
};

export function BrowseByLocationSection({
  eyebrow,
  title,
  description,
  groups,
  ctaHref,
  ctaLabel,
  showShopLinks = true
}: BrowseByLocationSectionProps) {
  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[36px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)] lg:p-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {title}
            </h2>
            <p className="mt-3 text-[color:var(--muted)]">
              {description}
            </p>
          </div>
          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {groups.map((group) => (
            <article
              key={group.market.market}
              className="rounded-[30px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {group.market.areaName}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Browse {group.market.shortName}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {group.summary}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {group.pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-[20px] border border-[color:var(--line)] bg-white px-4 py-4 text-sm font-semibold transition hover:-translate-y-1"
                  >
                    {page.metaTitle}
                  </Link>
                ))}
              </div>

              {showShopLinks ? (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Shop pages
                  </p>
                  <div className="mt-3 grid gap-3">
                    {group.featuredShopIds.map((shopId) => {
                      const shop = shops.find((item) => item.id === shopId);

                      if (!shop) {
                        return null;
                      }

                      return (
                        <Link
                          key={shop.id}
                          href={getShopProfilePath(shop)}
                          className="rounded-[20px] border border-[color:var(--line)] bg-white px-4 py-4 text-sm font-semibold transition hover:-translate-y-1"
                        >
                          {shop.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
