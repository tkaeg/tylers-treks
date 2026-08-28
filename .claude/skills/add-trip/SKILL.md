---
name: add-trip
description: Add a new trip/month section to Tyler's Treks from a journal markdown file plus a zip/folder of photos and videos. Use when Tyler says "add a trip", "new section", "add <month> <year>", or hands over trip photos + a journal entry. Covers EXIF-based photo sorting, WebP conversion, trips.js data, content markdown, page/route/navbar/map wiring, RSS, R2 upload, and a review branch.
---

# Add a trip to Tyler's Treks

End-to-end workflow for turning a journal entry + a pile of trip media into a
live month section. Follow the steps in order. Do not skip validation.

## Inputs you need from Tyler

- **A journal markdown file** with date-headed entries (e.g. `6/25/26`, `6/26/26`).
  One trip = one month. Multiple dates in the file become multiple stops.
- **Photos/videos** as a `.zip` or a folder. iPhone exports: `.HEIC`/`.heic`,
  `.JPEG`, `.MOV`/`.mov`. Live-photo/`__MACOSX` junk is normal — ignore it.
- If either is missing, ask for it before starting.

## Conventions (do not deviate)

| Thing | Rule |
|---|---|
| Trip slug | `<month>-<year>` lowercase, e.g. `june-2026` |
| Home base for routes | Los Angeles, `[-118.24, 34.05]` (`[lng, lat]` order everywhere) |
| Image folders | `images/YYYYMMDD/` — one folder per calendar date, flat |
| Image file names | `<substop_slug>_<n>.webp` (or `.mov`), n starting at 1 |
| `trips.js` image `src` / `coverImage` | reference as `.jpg` — `imageUrl()` rewrites `.jpg`→`.webp` at runtime |
| `trips.js` `homePreviewImage` | reference as `.webp` directly |
| Videos in `trips.js` | reference as `.mov` — passed through unchanged, Carousel detects it |
| Media storage | Cloudflare R2 bucket (`VITE_R2_URL` in `.env`). `images/` is gitignored — never commit media |
| National Parks page grouping | driven by `stop.nationalPark`; use Tyler's preferred label verbatim (e.g. "Sequoia and Kings National Parks", not the official "Sequoia & Kings Canyon") |

## Step 1 — Fix spelling in the journal, nothing else

Copy the journal file into the repo root if it isn't there. Fix **only
unambiguous misspellings** (`amont`→`amount`, `compsite`→`campsite`,
`shouldve`→`should've`). Do **not** touch wording, grammar, casing, slang, or
sentence fragments — even if they look wrong. When unsure, leave it.

## Step 2 — Extract media and read EXIF

```bash
mkdir -p <scratch>/extract && cd <scratch>/extract && unzip -o <the>.zip
```

Run the bundled reader on every image (HEIC + JPEG):

```bash
python3 .claude/skills/add-trip/scripts/read_exif.py <scratch>/extract/**/*.HEIC <scratch>/extract/**/*.JPEG
```

It prints `filename <TAB> DateTimeOriginal <TAB> (lat, lon, alt)`.
`.MOV` files have no usable EXIF here — order them by filename number and file
mtime, and place them by surrounding context.

## Step 3 — Match every photo to a stop and sub-stop

- **Which day (stop):** the `DateTimeOriginal` date maps to a journal date
  heading. Photos from the evening before / morning after a campground night
  still belong to that day's stop.
- **Which sub-stop:** cluster by GPS. Look up the lat/lon of trailheads and
  landmarks named in the journal (web search or known coords) and assign each
  GPS cluster to the nearest named location. Note the representative
  `[lng, lat]` for each sub-stop and for the stop overall.
- Produce a plan: for each date, an ordered `IMG_XXXX -> <substop_slug>_<n>`
  mapping. Trim obvious duplicate frames but keep the section image-heavy.

## Step 4 — Convert and organize images

Write a `plan.json` (see `scripts/plan.example.json`) and run:

```bash
python3 .claude/skills/add-trip/scripts/build_trip_images.py <scratch>/plan.json
```

This does HEIC/JPEG → WebP (q80, long edge capped at 2560px, EXIF orientation
applied) and copies `.MOV` → `.mov`, writing into `images/YYYYMMDD/`. It prints a
per-file line and a final count — confirm the count equals your plan.

## Step 5 — Add the trip to `src/data/trips.js`

Append one trip object to the `trips` array. Shape (copy an existing month and
adapt):

```js
{
  slug: 'june-2026',
  label: 'June 2026',
  month: 'June',
  year: 2026,
  homePreviewImage: 'images/YYYYMMDD/<hero>.webp',
  homePreviewAlt: '<short alt>',
  routes: [
    // one array per driving leg; start and end at LA [-118.24, 34.05]
    [ [-118.24, 34.05], /* ...waypoints... */, [-118.24, 34.05] ],
  ],
  stops: [
    {
      id: '<stop-id>',                 // anchor + map link; kebab-case
      date: 'June 25, 2026',           // "Month D, YYYY"
      nationalPark: '<label>',         // omit if the stop isn't in a NP
      location: '<human readable>, California',
      coords: [lng, lat],
      coverImage: 'images/YYYYMMDD/<pic>.jpg',
      coverAlt: '<short alt>',
      contentKey: '<slug>/<stop-id>',  // -> src/content/<slug>/<stop-id>.md
      subStops: [
        {
          id: '<substop-id>',
          name: '<Display Name>',
          coords: [lng, lat],
          images: [
            { src: 'images/YYYYMMDD/<substop_slug>_1.jpg', alt: '<name>', caption: '' },
            // ...
          ],
        },
      ],
    },
  ],
}
```

A stop with no distinct sub-locations uses a top-level `images: [...]` instead of
`subStops`. Captions are usually `''`; add one only where the journal gives a
specific line worth surfacing.

## Step 6 — Write the narrative content

One file per stop at `src/content/<slug>/<stop-id>.md` (matching each
`contentKey`). Content is the journal text for that date, **verbatim** (same
spelling-only rule as Step 1), split by date. Wrap trail/hike names in markdown
links to AllTrails or Google Maps, matching the style of existing
`src/content/**/*.md` files. `content.js` auto-discovers new folders via glob —
no registration needed.

## Step 7 — Wire up the page

1. `src/pages/<Month><Year>.jsx` — copy `src/pages/May2026.jsx` verbatim and
   change only the `slug` passed to `trips.find(...)` and the component name.
2. `src/App.jsx` — add the import and
   `<Route path="/<slug>" element={<Component />} />`.
3. `src/components/Navbar.jsx` — add `{ to: '/<slug>', label: '<Label>' }` to the
   top of `tripLinks` (newest first).
4. `src/components/CaliforniaMap.jsx` — add `'<slug>': '#hex'` to `TRIP_COLORS`.
5. `src/pages/Home.jsx` — add the **same** `'<slug>': '#hex'` to the inline color
   map in the legend. Pick an unused Tailwind 400-level colour
   (used so far: amber `#f59e0b`, blue `#60a5fa`, emerald `#34d399`,
   violet `#a78bfa`, pink `#f472b6`).

## Step 8 — Regenerate RSS and validate

```bash
node scripts/generate-rss.js
npx vite build
```

Both must succeed. Then cross-check that every image path in the new trip
resolves to a file on disk:

```bash
grep -oE "images/(YYYYMMDD|...)/[a-z0-9_]+\.(jpg|mov)" src/data/trips.js \
  | sed 's/\.jpg$/.webp/' | sort -u > /tmp/refs.txt
find images -type f | sort > /tmp/actual.txt
comm -23 /tmp/refs.txt /tmp/actual.txt   # must be empty (nothing missing)
```

## Step 9 — Upload media to R2

The new `images/YYYYMMDD/` folders must be uploaded to the Cloudflare R2 bucket
by Tyler (same folder layout). This step is manual — tell Tyler which folders to
upload. Afterwards verify:

```bash
BASE=$(grep VITE_R2_URL .env | cut -d= -f2)
while read -r f; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/${f#./}")
  [ "$code" = 200 ] || echo "MISSING $code $f"
done < <(cd images && find . -type f | sed 's|^\./|images/|')
```

No output = every file is live.

## Step 10 — Review branch

```bash
git checkout -b trips/<short-name>
git add <the source files + journal .md>   # NOT images/ (gitignored)
git commit && git push -u origin trips/<short-name>
```

Then offer to launch the dev server (`npm run dev`, background) and point Tyler
at `/<slug>`, `/national-parks`, and `/` (map legend + route).

## Checklist

- [ ] Journal spelling fixed, wording untouched
- [ ] Every photo placed by EXIF time + GPS
- [ ] `images/YYYYMMDD/` folders created, count matches plan
- [ ] Trip object in `trips.js` (routes start/end at LA)
- [ ] `src/content/<slug>/*.md` for every `contentKey`
- [ ] Page component + route + navbar link
- [ ] Trip colour in **both** `CaliforniaMap.jsx` and `Home.jsx`
- [ ] `generate-rss.js` + `vite build` pass
- [ ] Image-path cross-check clean
- [ ] R2 upload done and verified with curl
- [ ] Pushed to `trips/<name>` branch
