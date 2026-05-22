# Tyler's Treks — Project Context

## What This Is

A personal travel blog documenting Tyler's 2026 goal of visiting every California National Park, camping out of a truck with a camper shell. The site combines trip narratives, photo/video galleries, and an interactive California map showing driving routes.

## Current Stack (Legacy)

- Plain HTML/CSS/JS
- Custom carousel in `carousel.js`
- All images stored locally in `images/` organized by date (`YYYYMMDD/`)
- No build system, no framework

## Target Stack (Migration In Progress)

- **Framework:** React 18 + Vite
- **Routing:** React Router v6 — one route per trip month (e.g. `/december-2025`, `/january-2026`)
- **Styling:** Tailwind CSS — mobile-first
- **Map:** Mapbox GL JS via `react-map-gl` — interactive California map with driving routes and clickable stop markers
- **Media Storage:** Cloudflare R2 (free tier, zero egress) for images, videos, and timelapses
- **Hosting:** Vercel (free tier, auto-deploys from git)

## Route Structure

```
/                    → Home — California map + hero
/about               → About Tyler + truck setup story
/december-2025       → December 2025 trips
/january-2026        → January 2026 trips
/<month>-<year>      → Future months follow same pattern
```

Each month page has anchor sections per stop (e.g. `#nipton`, `#hole-in-the-wall`) that the map markers deep-link into.

## Trip Data (Current)

### December 2025
- **Dec 11** — White Cross WWI Memorial, Nipton CA (first night in camper shell)
- **Dec 13** — Hole-in-the-Wall Campground, Essex CA (Mojave NP)

### January 2026
- **Jan 1** — Pinnacle Road, Trona CA (New Year's, Trona Pinnacles)
- **Jan 2** — Trona → Ridgecrest (got stuck in mud, rescued by American Towing) → Stovepipe Wells, Death Valley
- **Jan 3** — Death Valley: Mosaic Canyon, Golden Canyon, Mesquite Flat Sand Dunes
- **Jan 4** — Badwater Road: Badwater Basin, Lake Manly, Artist's Palette

## Image Organization

Images are in `images/YYYYMMDD/filename.jpg`. When migrating to R2, maintain this date-based folder structure. A manifest or data file (JSON or JS module) maps each trip stop to its image list — do not hard-code image paths in component JSX.

## Media Types

The site stores photos (JPGs), and will add videos and timelapses as trips continue.

## Map Requirements

- California-scoped map (no need for full US)
- Polylines showing driving routes between stops
- Markers at each stop — clicking navigates to `/<month-year>#<stop-anchor>`
- Trip data for the map (coordinates, links) lives in a central data file, not scattered in components

## Key Design Constraints

- **Mobile-first** — most visitors will be on phones
- **Image-heavy** — lazy loading is essential, use proper `loading="lazy"` and consider blur-up placeholders
- **No over-engineering** — this is a personal blog, not an enterprise app. Keep the data layer simple (static JSON/JS config files, not a database)
- **RSS feed** — the current `rss.xml` should be regenerated or maintained as new trips are added

## Conventions

- Trip data (stops, coords, descriptions, image lists) lives in `src/data/trips.js` — single source of truth
- Month page components live in `src/pages/` (e.g. `December2025.jsx`, `January2026.jsx`)
- Shared UI (carousel, image grid, map) lives in `src/components/`
- Mapbox token goes in `.env` as `VITE_MAPBOX_TOKEN` — never committed to git
- Cloudflare R2 bucket URL goes in `.env` as `VITE_R2_URL`
