"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  sendOutboundClick,
  type OutboundClickPayload
} from "@/lib/outboundClientTracking";

type EventParams = Record<string, string | number | boolean | null | undefined>;

type TrackedExternalLinkProps = ComponentPropsWithoutRef<"a"> & {
  eventName: string;
  eventParams?: EventParams;
  outboundClick?: OutboundClickPayload;
};

function mergeRel(rel?: string) {
  const values = new Set((rel ?? "").split(/\s+/).filter(Boolean));

  values.add("nofollow");
  values.add("noopener");

  return Array.from(values).join(" ");
}

export function TrackedExternalLink({
  eventName,
  eventParams = {},
  outboundClick,
  onClick,
  rel,
  target,
  ...props
}: TrackedExternalLinkProps) {
  const mergedRel = target === "_blank" || rel ? mergeRel(rel) : rel;

  return (
    <a
      {...props}
      target={target}
      rel={mergedRel}
      onClick={(event) => {
        onClick?.(event);
        if (outboundClick) {
          sendOutboundClick(outboundClick);
        }
        trackEvent(eventName, eventParams);
      }}
    />
  );
}
