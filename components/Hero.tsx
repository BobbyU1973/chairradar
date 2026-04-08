import { SearchBar } from "@/components/SearchBar";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-18 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Live OpenChair launch
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
            Find nearby haircut availability fast.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
            OpenChair helps people see real nearby haircut shops around Mooresville and Lake Norman, then click through or call the shop directly to reserve a spot.
          </p>

          <div className="mt-8">
            <SearchBar />
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[color:var(--muted)]">
            <span className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2">Real local shop links</span>
            <span className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2">Call or click to reserve</span>
            <span className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2">28117 and nearby communities</span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/78 px-5 py-5">
              <p className="text-2xl font-semibold">6</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Real local listings</p>
            </div>
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/78 px-5 py-5">
              <p className="text-2xl font-semibold">28117</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Primary launch ZIP</p>
            </div>
            <div className="rounded-[24px] border border-[color:var(--line)] bg-white/78 px-5 py-5">
              <p className="text-2xl font-semibold">Call</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Or click to reserve</p>
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
                ["Diesel Barbershop", "Walk-ins + online booking", "28117"],
                ["Datre Hair Co.", "Book online", "28117"],
                ["Shears and Beers", "Call or click through", "28117"]
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
              Why it feels trustworthy
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
              <p>Listings point to real public booking pages and shop phone numbers.</p>
              <p>OpenChair stays lightweight by helping users discover and contact shops fast.</p>
              <p>ZIP and nearby-community searches route people to the same launch market around 28117.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
