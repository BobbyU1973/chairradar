import type { OutboundAction } from "@/lib/outboundActions";

export type OutboundClickPayload = {
  shopId: string;
  action: OutboundAction;
  sourcePage: string;
};

const OUTBOUND_ENDPOINT = "/api/outbound";

export function sendOutboundClick(payload: OutboundClickPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    try {
      const beaconBody = new Blob([body], { type: "application/json" });

      if (navigator.sendBeacon(OUTBOUND_ENDPOINT, beaconBody)) {
        return;
      }
    } catch {
      // Fall through to fetch keepalive when sendBeacon is unavailable or rejects the payload.
    }
  }

  void fetch(OUTBOUND_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    keepalive: true,
    cache: "no-store"
  }).catch(() => undefined);
}
