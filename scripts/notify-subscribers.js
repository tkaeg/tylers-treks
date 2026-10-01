#!/usr/bin/env node
/**
 * Run by .github/workflows/notify-subscribers.yml on every push to main that
 * touches src/data/trips.js. Diffs the current stop list against
 * .notified-stops.json (committed to the repo) to find stops that haven't
 * been emailed yet, sends one Resend broadcast covering all of them, then
 * rewrites .notified-stops.json so the same stop never gets announced twice.
 *
 * Mirrors generate-rss.js: one entry per top-level stop. subStops share
 * their parent stop's page/anchor, so they aren't announced separately.
 *
 * Usage: node scripts/notify-subscribers.js
 * Requires RESEND_API_KEY, RESEND_SEGMENT_ID, RESEND_FROM_EMAIL — see .env.example.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { Resend } from 'resend'
import { marked } from 'marked'
import { trips } from '../src/data/trips.js'

const BASE_URL = process.env.SITE_URL || 'https://www.tylers-treks.com'
const NOTIFIED_PATH = fileURLToPath(new URL('../.notified-stops.json', import.meta.url))

function loadMarkdown(contentKey) {
  if (!contentKey) return ''
  const path = `./src/content/${contentKey}.md`
  return existsSync(path) ? readFileSync(path, 'utf-8') : ''
}

function teaser(contentKey) {
  const firstParagraph = loadMarkdown(contentKey).split('\n\n')[0] || ''
  return firstParagraph ? marked.parseInline(firstParagraph) : ''
}

const allStops = trips.flatMap(trip =>
  trip.stops.map(stop => ({
    key: `${trip.slug}#${stop.id}`,
    tripLabel: trip.label,
    date: stop.date,
    location: stop.location,
    url: `${BASE_URL}/${trip.slug}#${stop.id}`,
    teaser: teaser(stop.contentKey),
  }))
)

const notified = existsSync(NOTIFIED_PATH) ? JSON.parse(readFileSync(NOTIFIED_PATH, 'utf-8')) : []
const notifiedSet = new Set(notified)
const newStops = allStops.filter(s => !notifiedSet.has(s.key))

if (newStops.length === 0) {
  console.log('notify-subscribers: no new stops since last notification, nothing to send.')
  process.exit(0)
}

const { RESEND_API_KEY, RESEND_SEGMENT_ID, RESEND_FROM_EMAIL } = process.env
if (!RESEND_API_KEY || !RESEND_SEGMENT_ID || !RESEND_FROM_EMAIL) {
  console.error('notify-subscribers: missing RESEND_API_KEY, RESEND_SEGMENT_ID, or RESEND_FROM_EMAIL')
  process.exit(1)
}

const resend = new Resend(RESEND_API_KEY)

const subject = newStops.length === 1
  ? `New stop: ${newStops[0].location}`
  : `${newStops.length} new stops on Tyler's Treks`

const body = newStops
  .map(s => `
    <div style="margin-bottom:28px;">
      <p style="margin:0 0 4px;font-size:13px;color:#8a7561;">${s.date} — ${s.tripLabel}</p>
      <h2 style="margin:0 0 8px;font-size:18px;"><a href="${s.url}" style="color:#c1622f;text-decoration:none;">${s.location}</a></h2>
      ${s.teaser ? `<div style="font-size:14px;line-height:1.5;color:#3a2a1e;">${s.teaser}</div>` : ''}
      <p style="margin:8px 0 0;"><a href="${s.url}" style="font-size:13px;color:#c1622f;">Read the full post →</a></p>
    </div>`)
  .join('\n')

const html = `
  <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:24px 16px;">
    <h1 style="font-size:20px;color:#c1622f;margin:0 0 20px;">Tyler's Treks</h1>
    ${body}
    <p style="margin-top:32px;font-size:12px;color:#8a7561;">
      You're getting this because you subscribed at ${BASE_URL}.
      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8a7561;">Unsubscribe</a>
    </p>
  </div>
`

const { data: broadcast, error: createError } = await resend.broadcasts.create({
  segmentId: RESEND_SEGMENT_ID,
  from: RESEND_FROM_EMAIL,
  subject,
  html,
})
if (createError) {
  console.error('notify-subscribers: failed to create broadcast', createError)
  process.exit(1)
}

const { error: sendError } = await resend.broadcasts.send(broadcast.id)
if (sendError) {
  console.error('notify-subscribers: failed to send broadcast', sendError)
  process.exit(1)
}

console.log(`notify-subscribers: sent broadcast for ${newStops.length} new stop(s): ${newStops.map(s => s.key).join(', ')}`)

// Mark every currently-known stop (not just the new ones) as notified, so
// editing or reordering an already-announced stop doesn't re-trigger it.
writeFileSync(NOTIFIED_PATH, JSON.stringify(allStops.map(s => s.key), null, 2) + '\n', 'utf-8')
