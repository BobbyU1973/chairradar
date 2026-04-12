import { shops } from "@/data/shops";
import { outboundActionLabels, type OutboundAction } from "@/lib/outboundActions";

const OUTBOUND_CLICKS_KEY = "openchair:outbound_clicks:v1";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export type OutboundClickEvent = {
  id: string;
  shopId: string;
  shopName: string;
  action: OutboundAction;
  actionLabel: string;
  timestamp: string;
  timestampMs: number;
  city: string;
  state: string;
  zip: string;
  sourcePage: string;
};

type RedisResult<T> = {
  result?: T;
  error?: string;
};

function getStorageConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

function createEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

async function redisCommand<T>(command: Array<string | number>) {
  const config = getStorageConfig();

  if (!config) {
    throw new Error("Persistent outbound tracking storage is not configured.");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Upstash Redis request failed with ${response.status}.`);
  }

  const data = (await response.json()) as RedisResult<T>;

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result as T;
}

export function isOutboundStorageConfigured() {
  return Boolean(getStorageConfig());
}

export async function recordOutboundClick(
  event: Omit<OutboundClickEvent, "id" | "timestamp" | "actionLabel">
) {
  if (!isOutboundStorageConfigured()) {
    console.warn("Outbound click was not stored because persistent storage is not configured.");
    return {
      stored: false,
      reason: "storage_not_configured"
    };
  }

  const fullEvent: OutboundClickEvent = {
    ...event,
    id: createEventId(),
    timestamp: new Date(event.timestampMs).toISOString(),
    actionLabel: outboundActionLabels[event.action]
  };

  await redisCommand<number>([
    "ZADD",
    OUTBOUND_CLICKS_KEY,
    fullEvent.timestampMs,
    JSON.stringify(fullEvent)
  ]);

  return {
    stored: true
  };
}

function parseEvent(value: string) {
  try {
    const event = JSON.parse(value) as OutboundClickEvent;
    return event;
  } catch {
    return null;
  }
}

function incrementMap<T extends { count: number }>(
  map: Map<string, T>,
  key: string,
  createValue: () => T
) {
  const existing = map.get(key);

  if (existing) {
    existing.count += 1;
    return;
  }

  map.set(key, createValue());
}

export async function getOutboundClickStats() {
  if (!isOutboundStorageConfigured()) {
    return {
      storageConfigured: false,
      totalClicks: 0,
      last7DaysClicks: 0,
      last30DaysClicks: 0,
      byListingLast30Days: [],
      byActionLast30Days: []
    };
  }

  const now = Date.now();
  const thirtyDaysAgo = now - THIRTY_DAYS_MS;
  const sevenDaysAgo = now - SEVEN_DAYS_MS;

  const [totalClicks, rawEvents] = await Promise.all([
    redisCommand<number>(["ZCOUNT", OUTBOUND_CLICKS_KEY, "-inf", "+inf"]),
    redisCommand<string[]>([
      "ZRANGEBYSCORE",
      OUTBOUND_CLICKS_KEY,
      thirtyDaysAgo,
      now,
      "LIMIT",
      0,
      5000
    ])
  ]);

  const events = rawEvents.map(parseEvent).filter((event): event is OutboundClickEvent =>
    Boolean(event)
  );
  const last7DaysClicks = events.filter((event) => event.timestampMs >= sevenDaysAgo).length;
  const byListing = new Map<
    string,
    {
      shopId: string;
      shopName: string;
      city: string;
      state: string;
      zip: string;
      count: number;
    }
  >();
  const byAction = new Map<
    string,
    {
      action: string;
      actionLabel: string;
      count: number;
    }
  >();

  events.forEach((event) => {
    const shop = shops.find((item) => item.id === event.shopId);
    incrementMap(byListing, event.shopId, () => ({
      shopId: event.shopId,
      shopName: shop?.name ?? event.shopName,
      city: shop?.city ?? event.city,
      state: shop?.state ?? event.state,
      zip: shop?.zip ?? event.zip,
      count: 1
    }));
    incrementMap(byAction, event.action, () => ({
      action: event.action,
      actionLabel: outboundActionLabels[event.action] ?? event.actionLabel,
      count: 1
    }));
  });

  return {
    storageConfigured: true,
    totalClicks,
    last7DaysClicks,
    last30DaysClicks: events.length,
    byListingLast30Days: Array.from(byListing.values()).sort((a, b) => b.count - a.count),
    byActionLast30Days: Array.from(byAction.values()).sort((a, b) => b.count - a.count)
  };
}
