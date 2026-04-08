import Link from "next/link";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { ShopCard } from "@/components/ShopCard";
import { shops } from "@/data/shops";

export default function HomePage() {
  const featuredShops = shops.slice(0, 3);

  return (
    <main>
      <Header />
      <Hero />

      <section id="popular-nearby" className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Popular nearby
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Real haircut shops around 28117 that people can contact right now
              </h2>
              <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
                OpenChair now focuses on real local shop discovery with public booking pages and direct call links instead of fictional appointment slots.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex w-fit rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold shadow-[0_10px_25px_rgba(44,30,18,0.06)]"
            >
              Browse nearby shops
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[36px] border border-[color:var(--line)] bg-white/78 p-6 shadow-[var(--shadow)] lg:grid-cols-3 lg:p-10">
          {[
            {
              title: "Search by ZIP or city",
              text: "Enter 28117 or a nearby community and OpenChair will surface the launch market around Lake Norman."
            },
            {
              title: "Compare real public info",
              text: "See address, phone, booking access, walk-in status, and publicly listed pricing where available."
            },
            {
              title: "Reserve on the shop's terms",
              text: "OpenChair helps people click through or call the shop directly without adding a heavy booking system yet."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] bg-[color:var(--panel-strong)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                OpenChair
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="for-shops" className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-[color:var(--line)] bg-[rgba(255,250,243,0.94)] p-6 shadow-[var(--shadow)] sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              For shops
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Yelp/OpenTable for haircut availability, monetized through self-serve promotion and demand capture.
            </h2>
            <p className="mt-4 text-[color:var(--muted)]">
              OpenChair should help shops discover the platform on their own, claim their page, connect a booking link, and pay for promoted visibility without talking to anyone.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-4">
            {[
              {
                title: "Discover OpenChair",
                text: "A shop finds its page organically through search traffic or customer discovery."
              },
              {
                title: "Claim the profile",
                text: "The merchant verifies ownership and unlocks profile edits through a self-serve claim flow."
              },
              {
                title: "Capture demand",
                text: "They add or refine booking links, walk-in signals, and public availability cues to convert traffic."
              },
              {
                title: "Promote placement",
                text: "Sponsored listings and boosted visibility monetize the traffic without a sales-led model."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  Self-serve
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 leading-7 text-[color:var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-[28px] bg-[color:var(--foreground)] px-6 py-6 text-white lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
                Revenue stack
              </p>
              <p className="mt-2 text-lg text-white/90">
                Sponsored listings, self-serve profile claims, promoted placement, booking referral fees where supported, local ads, and optional premium alerts later.
              </p>
            </div>
            <div className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--foreground)]">
              Merchant tools layer next
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[36px] border border-[color:var(--line)] bg-[color:var(--foreground)] px-6 py-8 text-white shadow-[var(--shadow)] lg:flex-row lg:items-center lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
              Main call to action
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Find a real nearby haircut shop fast, then click or call to reserve.
            </h2>
          </div>
          <Link
            href="/search"
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--foreground)]"
          >
            Search real nearby shops
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
