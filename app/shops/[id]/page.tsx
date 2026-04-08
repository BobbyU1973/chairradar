import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { shops } from "@/data/shops";

type ShopDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ShopDetailPage({ params }: ShopDetailPageProps) {
  const { id } = await params;
  const shop = shops.find((item) => item.id === id);

  if (!shop) {
    notFound();
  }

  return (
    <main>
      <Header />

      <section className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/search"
            className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-4 py-2 text-sm font-medium shadow-[0_10px_25px_rgba(44,30,18,0.06)]"
          >
            Back to results
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[0.62fr_0.38fr]">
            <div className="rounded-[34px] border border-[color:var(--line)] bg-white/88 p-6 shadow-[var(--shadow)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                OpenChair shop profile
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{shop.name}</h1>
                <span
                  className={[
                    "rounded-full px-3 py-1 text-sm font-semibold",
                    shop.openNow ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-700"
                  ].join(" ")}
                >
                  {shop.openNow ? "Open now" : "Closed right now"}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-[color:var(--muted)]">
                {shop.rating ? (
                  <>
                    <p className="text-lg">
                      <span className="font-semibold text-[color:var(--foreground)]">{shop.rating.toFixed(1)}</span> rating
                    </p>
                    <p>{shop.reviewCount ?? 0} reviews</p>
                  </>
                ) : (
                  <p>Public rating not listed on the primary source</p>
                )}
                <p>{shop.city}, {shop.state} {shop.zip}</p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] bg-[color:var(--panel-strong)] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Address
                  </p>
                  <p className="mt-3 text-lg font-medium">
                    {shop.address}
                    <br />
                    {shop.city}, {shop.state} {shop.zip}
                  </p>
                </div>
                <div className="rounded-[28px] bg-[color:var(--panel-strong)] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Booking path
                  </p>
                  <p className="mt-3 text-lg font-medium">{shop.availabilitySummary}</p>
                </div>
              </div>

              <div className="mt-8 rounded-[28px] bg-[color:var(--panel-strong)] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  Hours
                </p>
                <div className="mt-4 grid gap-3 text-sm">
                  {shop.hoursSummary.map((line) => (
                    <p key={line} className="text-[color:var(--muted)]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-[28px] bg-[color:var(--panel-strong)] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  Walk-in status
                </p>
                <p className="mt-3 text-lg font-medium">
                  {shop.walkInsAvailable ? "Walk-ins welcome" : "Appointment recommended"}
                </p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  Specialty services: {shop.specialties.join(", ")}
                </p>
              </div>
            </div>

            <aside className="h-fit rounded-[34px] border border-[color:var(--line)] bg-[rgba(255,250,243,0.94)] p-6 shadow-[var(--shadow)] sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Reserve directly
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">{shop.availabilitySummary}</p>
              <p className="mt-3 text-[color:var(--muted)]">
                {shop.priceFrom
                  ? `Haircuts start around $${shop.priceFrom}.`
                  : "Pricing is listed on the shop site or available by phone."}{" "}
                OpenChair sends people straight to the shop to reserve.
              </p>

              {shop.bookingUrl ? (
                <a
                  href={shop.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 flex w-full items-center justify-center rounded-[22px] bg-[color:var(--accent)] px-6 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(191,90,42,0.26)] transition hover:bg-[color:var(--accent-dark)]"
                >
                  {shop.bookingLabel}
                </a>
              ) : null}

              <a
                href={shop.callUrl}
                className="mt-4 flex w-full items-center justify-center rounded-[22px] border border-[color:var(--line)] bg-white px-6 py-4 text-base font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--panel-strong)]"
              >
                Call {shop.phone}
              </a>

              <div className="mt-6 space-y-4 rounded-[28px] bg-white px-5 py-5">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[color:var(--muted)]">Status</span>
                  <span className="font-semibold">
                    {shop.openNow ? "Open now" : "Closed"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[color:var(--muted)]">Walk-ins</span>
                  <span className="font-semibold">
                    {shop.walkInsAvailable ? "Available" : "Limited"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[color:var(--muted)]">Neighborhood</span>
                  <span className="font-semibold">{shop.neighborhood}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[color:var(--muted)]">Phone</span>
                  <span className="font-semibold">{shop.phone}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
