import Link from "next/link";
import type { Shop } from "@/data/shops";

type ShopCardProps = {
  shop: Shop;
};

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <Link
      href={`/shops/${shop.id}`}
      className="block rounded-[30px] border border-[color:var(--line)] bg-white/88 p-5 shadow-[var(--shadow)] transition hover:-translate-y-1 sm:p-6"
    >
      <article>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold tracking-tight">{shop.name}</h3>
              {shop.sponsored ? (
                <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--accent-dark)]">
                  Sponsored
                </span>
              ) : null}
              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  shop.openNow
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-stone-200 text-stone-700"
                ].join(" ")}
              >
                {shop.openNow ? "Open now" : "Opens later"}
              </span>
            </div>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {shop.city}, {shop.state} {shop.zip} | {shop.neighborhood}
            </p>
          </div>

          <div className="rounded-[22px] bg-[color:var(--accent-soft)] px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
              {shop.priceFrom ? "From" : "Contact"}
            </p>
            <p className="text-xl font-semibold">
              {shop.priceFrom ? `$${shop.priceFrom}` : "Call"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
          {shop.rating ? (
            <>
              <span className="font-semibold text-[color:var(--foreground)]">{shop.rating.toFixed(1)}</span>
              <span>({shop.reviewCount ?? 0} reviews)</span>
              <span>|</span>
            </>
          ) : null}
          <span>{shop.availabilitySummary}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {shop.specialties.map((specialty) => (
            <span
              key={specialty}
              className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-3 py-2 text-sm text-[color:var(--muted)]"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[color:var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[color:var(--success)]">
            {shop.claimed ? "Claimed profile" : "Unclaimed profile"}
          </p>
          <span className="inline-flex w-fit rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            View booking options
          </span>
        </div>
      </article>
    </Link>
  );
}
