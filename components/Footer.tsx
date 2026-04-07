export function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[rgba(255,252,248,0.86)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight">OpenChair</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[color:var(--muted)]">
            Demo-ready MVP for helping people find nearby haircut availability fast.
          </p>
        </div>
        <div className="text-sm text-[color:var(--muted)]">
          <p>Simple mock data for launch demo use today.</p>
          <p className="mt-1">OpenChair © 2026</p>
        </div>
      </div>
    </footer>
  );
}
