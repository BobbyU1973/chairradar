import { type NextRequest } from "next/server";
import { shops } from "@/data/shops";
import {
  isOutboundAction
} from "@/lib/outboundActions";
import { recordOutboundClick } from "@/lib/outboundTracking";

export const dynamic = "force-dynamic";

const outboundHeaders = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow"
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shopId = searchParams.get("shopId");
  const action = searchParams.get("action");
  const sourcePage = searchParams.get("source") ?? "unknown";

  return new Response(
    `Legacy outbound tracking URLs are gone. Use direct shop links instead. shopId=${shopId ?? "unknown"} action=${action ?? "unknown"} source=${sourcePage}`,
    {
      status: 410,
      headers: outboundHeaders
    }
  );
}

export async function POST(request: NextRequest) {
  let payload: {
    shopId?: string;
    action?: string;
    sourcePage?: string;
  };

  try {
    payload = (await request.json()) as {
      shopId?: string;
      action?: string;
      sourcePage?: string;
    };
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON payload." },
      {
        status: 400,
        headers: outboundHeaders
      }
    );
  }

  const shopId = payload.shopId ?? null;
  const action = payload.action ?? null;
  const sourcePage = payload.sourcePage ?? "unknown";

  if (!shopId || !isOutboundAction(action)) {
    return Response.json(
      { ok: false, error: "Outbound action not found." },
      {
        status: 404,
        headers: outboundHeaders
      }
    );
  }

  const shop = shops.find((item) => item.id === shopId);

  if (!shop) {
    return Response.json(
      { ok: false, error: "Shop not found." },
      {
        status: 404,
        headers: outboundHeaders
      }
    );
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

  return Response.json(
    { ok: true },
    {
      status: 202,
      headers: outboundHeaders
    }
  );
}
