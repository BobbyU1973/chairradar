export function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[rgba(255,252,248,0.86)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight">OpenChair</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[color:var(--muted)]">
            Live MVP for helping people discover nearby haircut shops and reach them fast.
          </p>
        </div>
        <div className="text-sm text-[color:var(--muted)]">
          <p>Public booking links and call-first discovery around 28117.</p>
          <p className="mt-1">OpenChair © 2026</p>
        </div>
      </div>
    </footer>
  );
}
