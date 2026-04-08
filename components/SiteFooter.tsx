import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[rgba(255,252,248,0.86)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight">OpenChair</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[color:var(--muted)]">
            Yelp/OpenTable for haircut availability, monetized through self-serve promotion and demand capture instead of cold-calling shops.
          </p>
        </div>
        <div className="text-sm text-[color:var(--muted)]">
          <p>Shops should be able to discover OpenChair, claim their page, connect a booking link, and pay without talking to anyone.</p>
          <p className="mt-1">OpenChair &copy; 2026</p>
          <Link href="/#for-shops" className="mt-3 inline-block font-semibold text-[color:var(--foreground)]">
            For shops
          </Link>
        </div>
      </div>
    </footer>
  );
}
