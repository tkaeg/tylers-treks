// Runs at build time via `npm run build` to generate public/rss.xml from trip data.
// Update BASE_URL once the site is live on Vercel.
import { writeFileSync } from 'fs'
import { trips } from '../src/data/trips.js'

const BASE_URL = process.env.SITE_URL || 'https://tylerstreks.vercel.app'

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, '')
}

const items = trips
  .flatMap(trip =>
    trip.stops.map(stop => {
      const url = `${BASE_URL}/${trip.slug}#${stop.id}`
      const description = stripHtml(stop.text[0] || '')
      return `
  <item>
    <title>${escapeXml(stop.date)} — ${escapeXml(stop.location)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description><![CDATA[${description}]]></description>
  </item>`
    })
  )
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tyler's Treks</title>
    <link>${BASE_URL}</link>
    <description>Exploring every California national park in 2026, camping out of a truck.</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

writeFileSync('./public/rss.xml', rss, 'utf-8')
console.log('RSS feed written to public/rss.xml')
