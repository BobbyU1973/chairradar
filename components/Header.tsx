import Link from "next/link";

const navItems = [
  { href: "/search", label: "Search" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#popular-nearby", label: "Nearby shops" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--line)] bg-[rgba(252,248,242,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--foreground)] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(31,23,17,0.18)]">
            OC
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight">OpenChair</p>
            <p className="hidden text-sm text-[color:var(--muted)] sm:block">
              Find haircut availability fast
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[color:var(--muted)] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[color:var(--foreground)]">
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="rounded-full bg-[color:var(--foreground)] px-4 py-2 text-white transition hover:opacity-90"
          >
            Find shops
          </Link>
        </nav>
      </div>
    </header>
  );
}
