type SearchBarProps = {
  defaultLocation?: string;
  compact?: boolean;
};

export function SearchBar({
  defaultLocation = "Near me",
  compact = false
}: SearchBarProps) {
  return (
    <form
      action="/search"
      className={[
        "grid gap-3 rounded-[30px] border border-[color:var(--line)] bg-white/92 p-3 shadow-[var(--shadow)] backdrop-blur",
        compact ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[1fr_auto]"
      ].join(" ")}
    >
      <input name="query" type="hidden" value="Haircut" />

      <label className="flex flex-col gap-2 rounded-[22px] border border-transparent bg-[color:var(--panel-strong)] px-4 py-3 transition focus-within:border-[color:var(--accent)]">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
          Location
        </span>
        <input
          name="location"
          defaultValue={defaultLocation}
          className="bg-transparent text-base font-medium outline-none"
          placeholder="Enter your city or neighborhood"
          type="text"
        />
      </label>

      <button
        className="rounded-[22px] bg-[color:var(--accent)] px-6 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(191,90,42,0.28)] transition hover:bg-[color:var(--accent-dark)]"
        type="submit"
      >
        Find openings fast
      </button>
    </form>
  );
}
