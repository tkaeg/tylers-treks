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

## Project Structure

```
src/
  data/        # trips.js — single source of truth for stops, coords, image lists
  pages/       # one component per month (December2025.jsx, January2026.jsx, ...)
  components/  # shared UI: carousel, image grid, map
  hooks/       # custom React hooks
images/        # local images organized by date (YYYYMMDD/)
scripts/       # generate-rss.js, r2-upload.js, r2-delete.js, r2-client.js
public/        # static assets
```

## Trips

| Date | Location |
|------|----------|
| Dec 11, 2025 | White Cross WWI Memorial, Nipton CA |
| Dec 13, 2025 | Hole-in-the-Wall Campground, Essex CA (Mojave NP) |
| Jan 1, 2026 | Trona Pinnacles, Trona CA |
| Jan 2–4, 2026 | Death Valley NP (Stovepipe Wells, Mosaic Canyon, Badwater Basin, Artist's Palette) |
