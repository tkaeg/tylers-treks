import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Try again later.')
    }
  }

  if (status === 'done') {
    return (
      <p className="text-sm text-accent">
        You're subscribed — you'll get an email whenever a new trip goes up.
      </p>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm">
        <label htmlFor="subscribe-email" className="sr-only">Email address</label>
        <input
          id="subscribe-email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 min-w-0 bg-paper border border-line rounded-lg px-3 h-11 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-11 px-4 rounded-lg bg-accent text-paper text-sm font-medium active:bg-accent-dark transition-colors disabled:opacity-60 flex-shrink-0"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && <p className="text-xs text-accent mt-2">{error}</p>}
    </div>
  )
}
