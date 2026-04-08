"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type SearchBarProps = {
  defaultLocation?: string;
  compact?: boolean;
};

export function SearchBar({
  defaultLocation = "Near me",
  compact = false
}: SearchBarProps) {
  const [location, setLocation] = useState(
    defaultLocation === "Near me" ? "" : defaultLocation
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const normalizedLocation = location.trim();

    trackEvent("search_submitted", {
      query: "Haircut",
      location: normalizedLocation,
      search_mode: /^\d{5}$/.test(normalizedLocation) ? "zip" : "city_or_area"
    });
  };

  return (
    <form
      action="/search"
      onSubmit={handleSubmit}
      className={[
        "grid gap-3 rounded-[30px] border border-[color:var(--line)] bg-white/92 p-3 shadow-[var(--shadow)] backdrop-blur",
        compact ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[1fr_auto]"
      ].join(" ")}
    >
      <input name="query" type="hidden" value="Haircut" />

      <label className="flex flex-col gap-2 rounded-[22px] border border-transparent bg-[color:var(--panel-strong)] px-4 py-3 transition focus-within:border-[color:var(--accent)]">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
          ZIP or city
        </span>
        <input
          name="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="bg-transparent text-base font-medium outline-none"
          placeholder="ZIP or city"
          type="text"
        />
      </label>

      <button
        className="w-full rounded-[22px] bg-[color:var(--accent)] px-6 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(191,90,42,0.28)] transition hover:bg-[color:var(--accent-dark)] md:w-auto"
        type="submit"
      >
        Find shops fast
      </button>
    </form>
  );
}
