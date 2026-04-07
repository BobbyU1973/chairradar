import { SearchBar } from "@/components/SearchBar";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-18 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Launch-ready OpenChair demo
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
            Find nearby haircut availability fast.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
            OpenChair gives people a fast, trustworthy way to see open barber and salon appointments nearby, compare the best options, and move straight to booking.
          </p>

          <div className="mt-8">
            <SearchBar />
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[color:var(--muted)]">
            <span className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2">Nearby shops only</span>
            <span className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2">Today&apos;s openings first</span>
            <span className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2">Simple demo-ready flow</span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/78 px-5 py-5">
              <p className="text-2xl font-semibold">6</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Nearby openings now</p>
            </div>
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/78 px-5 py-5">
              <p className="text-2xl font-semibold">14 min</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Average next slot</p>
            </div>
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/78 px-5 py-5">
              <p className="text-2xl font-semibold">4.8</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Average shop rating</p>
            </div>
          </div>
        </div>

        <div className="rounded-[34px] border border-[color:var(--line)] bg-[rgba(255,250,243,0.92)] p-5 shadow-[var(--shadow)] sm:p-6">
          <div className="rounded-[30px] bg-[color:var(--foreground)] p-6 text-white sm:p-7">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">
              Fastest nearby openings
            </p>
            <div className="mt-6 space-y-4">
              {[
                ["OpenChair Studio", "12:15 PM", "0.4 mi"],
                ["Northside Fade House", "1:00 PM", "0.9 mi"],
                ["Main Street Barbers", "2:30 PM", "1.3 mi"]
              ].map(([name, slot, distance]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-[22px] bg-white/10 px-4 py-4"
                >
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-white/65">Next available {slot}</p>
                  </div>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{distance}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[28px] bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Why it feels trustworthy
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
              <p>Clear local results with pricing, ratings, and next available times up front.</p>
              <p>No cluttered marketplace flow. OpenChair keeps the path from search to booking simple.</p>
              <p>Strong mobile layout for quick decision-making when people need a cut today.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
