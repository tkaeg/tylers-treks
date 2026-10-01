# Tyler's Treks

A personal travel blog documenting a 2026 goal of visiting every California National Park, camping from a truck with a camper shell.

## Stack

- **React 18 + Vite** — frontend framework and build tool
- **React Router v6** — one route per trip month (`/december-2025`, `/january-2026`, ...)
- **Tailwind CSS** — mobile-first styling
- **Mapbox GL JS** via `react-map-gl` — interactive California map with driving routes and stop markers
- **Cloudflare R2** — image and video storage (zero egress)
- **Vercel** — hosting with auto-deploys from git

## Local Development

```bash
npm install
npm run dev
```

Requires a `.env` file (see `.env.example`):

```
VITE_MAPBOX_TOKEN=...
VITE_R2_URL=...
```

## Build

```bash
npm run build   # generates rss.xml then bundles with Vite
```

## Uploading media to R2

New trip photos/videos are converted locally into `images/YYYYMMDD/` (see the
`add-trip` skill), then pushed to the R2 bucket via the API — no manual
dashboard upload needed:

```bash
npm run r2:upload -- images/20260625 images/20260822   # upload folder(s) or file(s)
npm run r2:upload -- --dry-run images/                 # preview keys, no credentials needed
npm run r2:delete -- images/20260625/old_name.webp      # clean up after a rename
```

Requires a **separate, write-scoped** R2 API token (`R2_ACCOUNT_ID`,
`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME` in `.env` — see
`.env.example`). This is different from `VITE_R2_URL`, which is just the
public read URL the site fetches images from. Create the token at Cloudflare
dashboard → R2 → **Manage R2 API Tokens** → Create API Token, with **Object
Read & Write** permission scoped to this bucket.

## Email subscriptions

Visitors can subscribe (footer form on every page, via `/api/subscribe`) to
get an email whenever a new trip stop goes live. Built on
[Resend](https://resend.com):

- **Signup** — `api/subscribe.js` is a Vercel serverless function that adds
  the email as a Resend contact in a segment.
- **Sending** — `.github/workflows/notify-subscribers.yml` runs
  `scripts/notify-subscribers.js` on every push to `main` that touches
  `src/data/trips.js`. It diffs the current stop list against
  `.notified-stops.json` (committed to the repo) and sends one broadcast
  covering whatever stops are new — so routine commits (styling, perf,
  config) never email anyone, only actual new trip content does.

One-time setup:

1. Verify a sending domain at [resend.com/domains](https://resend.com/domains).
2. Create a Segment at [resend.com/audience](https://resend.com/audience) —
   new subscribers are added to it, and broadcasts are sent to it. Copy its id.
3. Set in **Vercel** project env vars: `RESEND_API_KEY`, `RESEND_SEGMENT_ID`
   (needed by `api/subscribe.js`).
4. Set in **GitHub** repo secrets: `RESEND_API_KEY`, `RESEND_SEGMENT_ID`,
   `RESEND_FROM_EMAIL` (needed by the workflow). Optionally set `SITE_URL`
   as a repo variable if it differs from the production default.

To manually trigger a send (e.g. to test, or re-send after a failure):

```bash
npm run notify
```

It's a no-op if every stop in `trips.js` is already in `.notified-stops.json`.

## Project Structure

```
src/
  data/        # trips.js — single source of truth for stops, coords, image lists
  pages/       # one component per month (December2025.jsx, January2026.jsx, ...)
  components/  # shared UI: carousel, image grid, map, subscribe form
  hooks/       # custom React hooks
api/           # subscribe.js — Vercel serverless function for email signup
images/        # local images organized by date (YYYYMMDD/)
scripts/       # generate-rss.js, notify-subscribers.js, r2-upload.js, r2-delete.js, r2-client.js
public/        # static assets
```

## Trips

| Date | Location |
|------|----------|
| Dec 11, 2025 | White Cross WWI Memorial, Nipton CA |
| Dec 13, 2025 | Hole-in-the-Wall Campground, Essex CA (Mojave NP) |
| Jan 1, 2026 | Trona Pinnacles, Trona CA |
| Jan 2–4, 2026 | Death Valley NP (Stovepipe Wells, Mosaic Canyon, Badwater Basin, Artist's Palette) |
