# OpenChair

OpenChair is a simple MVP for helping people find nearby haircut availability fast.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Local mock data

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Analytics setup

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_SITE_URL=https://openchair-six.vercel.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
UPSTASH_REDIS_REST_URL=https://example-upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=example-upstash-token
KV_REST_API_URL=https://example-vercel-kv-url.upstash.io
KV_REST_API_TOKEN=example-vercel-kv-token
OPENCHAIR_ADMIN_KEY=replace-with-a-long-private-admin-key
```

This app uses:

- Vercel Analytics for traffic overview
- Google Analytics 4 for search, detail-view, call-click, booking-click, and website-click events
- Upstash Redis REST for persistent outbound click tracking on Vercel

The outbound tracking code supports either Upstash env var naming:

- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- `KV_REST_API_URL` and `KV_REST_API_TOKEN`

## Outbound click tracking

Outbound action buttons route through `/api/outbound` before sending users to the shop phone, booking page, website, or directions link. The route looks up the destination from the local shop data, stores a real click event in Upstash Redis when configured, and then redirects the user.

Tracked actions:

- Call Shop
- Book on Website
- Visit Website
- Get Directions

The hidden internal report is available at:

```text
/internal/outbound-clicks?key=YOUR_OPENCHAIR_ADMIN_KEY
```

The report is not indexed and requires `OPENCHAIR_ADMIN_KEY`. If Upstash is not configured, no fake metrics are shown.
