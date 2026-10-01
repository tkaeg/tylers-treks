// Vercel serverless function: POST /api/subscribe
// Adds an email to the Resend segment that gets notified whenever a new
// trip stop goes live (see scripts/notify-subscribers.js for the sending
// side). Requires RESEND_API_KEY and RESEND_SEGMENT_ID — see .env.example.
import { Resend } from 'resend'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' })
  }

  const { RESEND_API_KEY, RESEND_SEGMENT_ID } = process.env
  if (!RESEND_API_KEY || !RESEND_SEGMENT_ID) {
    console.error('subscribe: missing RESEND_API_KEY or RESEND_SEGMENT_ID')
    return res.status(500).json({ error: 'Subscriptions are temporarily unavailable.' })
  }

  const resend = new Resend(RESEND_API_KEY)
  const contact = { email, unsubscribed: false, segments: [{ id: RESEND_SEGMENT_ID }] }

  const { error: createError } = await resend.contacts.create(contact)
  if (createError) {
    // Most likely cause: this email is already a contact (e.g. they
    // subscribed before, possibly unsubscribed since). Re-apply the same
    // fields via update instead of surfacing an error for what is, from the
    // visitor's side, a perfectly normal "subscribe again".
    const { error: updateError } = await resend.contacts.update(contact)
    if (updateError) {
      console.error('subscribe: Resend error', createError, updateError)
      return res.status(502).json({ error: 'Could not subscribe right now — try again later.' })
    }
  }

  return res.status(200).json({ ok: true })
}
