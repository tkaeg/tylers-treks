// Vercel serverless function for per-stop comments.
//   GET  /api/comments?stop=<stop id>  -> visible comments, oldest first
//   POST /api/comments { stop, name, body, website }
// Stored in Supabase (see supabase/comments.sql). Requires SUPABASE_URL and
// SUPABASE_SECRET_KEY; optionally emails COMMENT_NOTIFY_EMAIL on each new
// comment via Resend — see .env.example.
import { createHash } from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { trips } from '../src/data/trips.js'

const BASE_URL = process.env.SITE_URL || 'https://www.tylers-treks.com'
const PUBLIC_FIELDS = 'id, name, body, created_at'

// Max posts per IP within the window, to keep a bot from flooding a thread.
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000

// stop id -> { stop, trip } for every top-level stop, so we only accept
// comments on stops that actually exist and can link back to them.
const stopsById = new Map(
  trips.flatMap(trip => trip.stops.map(stop => [stop.id, { stop, trip }]))
)

function clientIpHash(req) {
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  return createHash('sha256').update(`tylers-treks-comments:${ip}`).digest('hex')
}

async function notifyTyler({ stop, trip }, comment) {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, COMMENT_NOTIFY_EMAIL } = process.env
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !COMMENT_NOTIFY_EMAIL) return

  const link = `${BASE_URL}/${trip.slug}#${stop.id}`
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: RESEND_FROM_EMAIL,
    to: COMMENT_NOTIFY_EMAIL,
    subject: `New comment on ${stop.location} from ${comment.name}`,
    text: `${comment.name} wrote:\n\n${comment.body}\n\n${link}\n\nTo hide it, set hidden = true on comment #${comment.id} in Supabase.`,
  })
  // A failed notification shouldn't fail the comment itself.
  if (error) console.error('comments: notify email failed', error)
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.error('comments: missing SUPABASE_URL or SUPABASE_SECRET_KEY')
    return res.status(500).json({ error: 'Comments are temporarily unavailable.' })
  }
  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  })

  if (req.method === 'GET') {
    const stopId = typeof req.query.stop === 'string' ? req.query.stop : ''
    if (!stopsById.has(stopId)) return res.status(400).json({ error: 'Unknown stop.' })

    const { data, error } = await supabase
      .from('comments')
      .select(PUBLIC_FIELDS)
      .eq('stop_id', stopId)
      .eq('hidden', false)
      .order('created_at', { ascending: true })
    if (error) {
      console.error('comments: Supabase read error', error)
      return res.status(502).json({ error: 'Could not load comments.' })
    }
    return res.status(200).json({ comments: data })
  }

  const { stop: stopId, name: rawName, body: rawBody, website } = req.body || {}

  // Honeypot: the "website" field is hidden from people, so anything in it
  // came from a bot. Pretend it worked so the bot doesn't adapt.
  if (website) return res.status(200).json({ comment: null })

  const target = stopsById.get(stopId)
  if (!target) return res.status(400).json({ error: 'Unknown stop.' })

  const name = typeof rawName === 'string' ? rawName.trim() : ''
  const body = typeof rawBody === 'string' ? rawBody.trim() : ''
  if (!name || name.length > 60) {
    return res.status(400).json({ error: 'Enter a name (up to 60 characters).' })
  }
  if (!body || body.length > 2000) {
    return res.status(400).json({ error: 'Comments need to be 1–2000 characters.' })
  }

  const ipHash = clientIpHash(req)
  const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString()
  const { count, error: countError } = await supabase
    .from('comments')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', since)
  if (countError) {
    console.error('comments: Supabase rate-limit check error', countError)
    return res.status(502).json({ error: 'Could not post your comment — try again later.' })
  }
  if (count >= RATE_LIMIT) {
    return res.status(429).json({ error: "You're commenting a lot — try again in a few minutes." })
  }

  const { data: comment, error: insertError } = await supabase
    .from('comments')
    .insert({ stop_id: stopId, name, body, ip_hash: ipHash })
    .select(PUBLIC_FIELDS)
    .single()
  if (insertError) {
    console.error('comments: Supabase insert error', insertError)
    return res.status(502).json({ error: 'Could not post your comment — try again later.' })
  }

  await notifyTyler(target, comment)
  return res.status(200).json({ comment })
}
