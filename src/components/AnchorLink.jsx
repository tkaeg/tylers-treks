import { useState } from 'react'

// Small permalink icon for a heading. Renders a real <a href="#id"> so it
// works with right-click "Copy Link" / long-press on mobile even without JS,
// and also copies the full shareable URL to the clipboard on click.
export default function AnchorLink({ id, label }) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    navigator.clipboard?.writeText(url).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      },
      () => {}
    )
  }

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      aria-label={`Copy link to ${label || id}`}
      title={copied ? 'Copied!' : 'Copy link'}
      className="text-muted hover:text-accent transition-colors no-underline text-sm shrink-0"
    >
      {copied ? '✓' : '🔗'}
    </a>
  )
}
