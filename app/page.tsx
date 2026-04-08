import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
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

      <Footer />
    </main>
  );
}
