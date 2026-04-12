import { type NextRequest } from "next/server";
import { shops } from "@/data/shops";
import {
  getOutboundDestination,
  isOutboundAction
} from "@/lib/outboundActions";
import { recordOutboundClick } from "@/lib/outboundTracking";

export const dynamic = "force-dynamic";

function redirectTo(destination: string) {
  return new Response(null, {
    status: 307,
    headers: {
      Location: destination,
      "Cache-Control": "no-store"
    }
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shopId = searchParams.get("shopId");
  const action = searchParams.get("action");
  const sourcePage = searchParams.get("source") ?? "unknown";

  if (!shopId || !isOutboundAction(action)) {
    return new Response("Outbound action not found.", { status: 404 });
  }

  const shop = shops.find((item) => item.id === shopId);

  if (!shop) {
    return new Response("Shop not found.", { status: 404 });
  }

  const destination = getOutboundDestination(shop, action);

  if (!destination) {
    return new Response("Destination not available.", { status: 404 });
  }

  try {
    await recordOutboundClick({
      shopId: shop.id,
      shopName: shop.name,
      action,
      timestampMs: Date.now(),
      city: shop.city,
      state: shop.state,
      zip: shop.zip,
      sourcePage
    });
  } catch (error) {
    console.error("Failed to store outbound click.", error);
  }

  return redirectTo(destination);
}
