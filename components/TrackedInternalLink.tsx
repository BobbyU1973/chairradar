"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type EventParams = Record<string, string | number | boolean | null | undefined>;

type TrackedInternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  eventName: string;
  eventParams?: EventParams;
};

export function TrackedInternalLink({
  href,
  children,
  className,
  eventName,
  eventParams = {}
}: TrackedInternalLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </Link>
  );
}
