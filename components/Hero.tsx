import { SearchBar } from "@/components/SearchBar";
import { liveCoverageAreas } from "@/data/coverage";
import { shops } from "@/data/shops";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-18 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Find local haircut options
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
            Find a haircut near you today.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
            ChairRadar helps you find barbershops, salons, and haircut providers near you with walk-in options, same-day availability, online haircut booking links, phone numbers, hours, and location details.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--muted)]">
            Search haircut near me, barber near me, barbershop open now, walk-in haircut, same-day haircut, or kids haircut near me without digging through a dozen tabs.
          </p>

          <div className="mt-8">
            <SearchBar buttonLabel="Find nearby haircut shops" />
          </div>

          <p className="mt-5 text-sm font-semibold text-[color:var(--muted)]">
            Lightweight discovery only: real public shop pages, real phone numbers, no fake availability counters.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/78 px-5 py-5">
              <p className="text-2xl font-semibold">{shops.length}</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Real local listings</p>
            </div>
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/78 px-5 py-5">
              <p className="text-2xl font-semibold">{liveCoverageAreas.length}</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Live NC markets</p>
            </div>
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/78 px-5 py-5">
              <p className="text-2xl font-semibold">Call</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Book or get directions</p>
            </div>
          </div>
        </div>

        <div className="rounded-[34px] border border-[color:var(--line)] bg-[rgba(255,250,243,0.92)] p-5 shadow-[var(--shadow)] sm:p-6">
          <div className="rounded-[30px] bg-[color:var(--foreground)] p-6 text-white sm:p-7">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">
              Real local haircut options
            </p>
            <div className="mt-6 space-y-4">
              {[
                ["Great Clips Falls Pointe", "Walk-ins + booking page", "27615"],
                ["Sport Clips Haircuts of Blakeney", "Check in online", "28277"],
                ["Diesel Barbershop", "Walk-ins + online booking", "28117"]
              ].map(([name, slot, distance]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-[22px] bg-white/10 px-4 py-4"
                >
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-white/65">{slot}</p>
                  </div>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{distance}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[28px] bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Why it helps
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
              <p>Start with nearby shops, then call, open the shop website, use a booking link, or get directions.</p>
              <p>ChairRadar stays lightweight by helping users discover and contact shops fast.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
