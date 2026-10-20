import { useEffect, useRef, useState } from 'react'

const NAME_KEY = 'comment-name'

function loadSavedName() {
  try {
    return localStorage.getItem(NAME_KEY) || ''
  } catch {
    return ''
  }
}

function saveName(name) {
  try {
    localStorage.setItem(NAME_KEY, name)
  } catch {
    // Private browsing etc. — remembering the name is just a convenience.
  }
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const UNITS = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
]

function timeAgo(iso) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}

export default function Comments({ stopId }) {
  const sectionRef = useRef(null)
  const [comments, setComments] = useState(null) // null until loaded
  const [loadError, setLoadError] = useState('')
  const [name, setName] = useState(loadSavedName)
  const [body, setBody] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [error, setError] = useState('')

  // Only fetch once the section is close to scrolling into view, so a long
  // month page doesn't fire a request per stop on load.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let cancelled = false
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        fetch(`/api/comments?stop=${encodeURIComponent(stopId)}`)
          .then(async res => {
            const data = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error(data.error || 'Could not load comments.')
            if (!cancelled) setComments(data.comments)
          })
          .catch(err => {
            if (!cancelled) setLoadError(err.message || 'Could not load comments.')
          })
      },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [stopId])

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stop: stopId, name, body, website }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      if (data.comment) setComments(prev => [...(prev || []), data.comment])
      saveName(name.trim())
      setBody('')
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Try again later.')
    }
  }

  const inputClass =
    'w-full bg-paper border border-line rounded-lg px-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent'

  return (
    <section ref={sectionRef} className="mt-10">
      <h3 className="text-base font-semibold text-ink mb-4">
        Comments{comments?.length > 0 && ` (${comments.length})`}
      </h3>

      {loadError && <p className="text-sm text-muted mb-4">{loadError}</p>}

      {comments?.length > 0 && (
        <ul className="space-y-4 mb-6">
          {comments.map(c => (
            <li key={c.id} className="bg-card rounded-lg px-4 py-3">
              <p className="text-sm mb-1">
                <span className="font-semibold text-ink">{c.name}</span>
                <span className="text-muted"> · {timeAgo(c.created_at)}</span>
              </p>
              <p className="text-sm text-ink whitespace-pre-line break-words">{c.body}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor={`comment-name-${stopId}`} className="sr-only">Name</label>
        <input
          id={`comment-name-${stopId}`}
          type="text"
          required
          maxLength={60}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          className={`${inputClass} h-11`}
        />
        <label htmlFor={`comment-body-${stopId}`} className="sr-only">Comment</label>
        <textarea
          id={`comment-body-${stopId}`}
          required
          maxLength={2000}
          rows={3}
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Leave a comment"
          className={`${inputClass} py-2 resize-y`}
        />
        {/* Honeypot — hidden from people, bots fill it in. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={e => setWebsite(e.target.value)}
          className="absolute -left-[9999px] w-px h-px opacity-0"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-11 px-4 rounded-lg bg-accent text-paper text-sm font-medium active:bg-accent-dark transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Posting…' : 'Post comment'}
        </button>
        {status === 'error' && <p className="text-xs text-accent">{error}</p>}
      </form>
    </section>
  )
}
