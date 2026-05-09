import { getDefaultIndexNowUrls, isIndexNowConfigured, submitIndexNowUrls } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

const responseHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive"
};

function getAdminKey() {
  return process.env.CHAIRRADAR_ADMIN_KEY?.trim() || "";
}

function getIndexNowKey() {
  return process.env.INDEXNOW_KEY?.trim() || "";
}

function getSuppliedKey(request: Request) {
  const { searchParams } = new URL(request.url);
  return (searchParams.get("key") ?? searchParams.get("adminKey") ?? "").trim();
}

export async function GET(request: Request) {
  const adminKey = getAdminKey();
  const indexNowKey = getIndexNowKey();
  const suppliedKey = getSuppliedKey(request);
  const authorized = Boolean(
    suppliedKey &&
      ((adminKey && suppliedKey === adminKey) || (indexNowKey && suppliedKey === indexNowKey))
  );

  if (!authorized) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "A valid admin key or IndexNow key is required."
      }),
      {
        status: 401,
        headers: responseHeaders
      }
    );
  }

  if (!isIndexNowConfigured()) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "INDEXNOW_KEY is not configured."
      }),
      {
        status: 503,
        headers: responseHeaders
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get("limit") ?? "0");
  const defaultUrls = getDefaultIndexNowUrls();
  const urls =
    Number.isFinite(limitParam) && limitParam > 0
      ? defaultUrls.slice(0, Math.min(limitParam, defaultUrls.length))
      : defaultUrls;

  const result = await submitIndexNowUrls(urls);

  return new Response(
    JSON.stringify({
      ok: true,
      submitted: result.submitted,
      sampleUrls: urls.slice(0, 5)
    }),
    {
      status: 200,
      headers: responseHeaders
    }
  );
}
