import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/may-2026', label: 'May 2026' },
  { to: '/january-2026', label: 'January 2026' },
  { to: '/december-2025', label: 'December 2025' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-sm border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="font-bold text-amber-400 text-lg tracking-tight" onClick={close}>
            Tyler's Treks
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm transition-colors ${isActive ? 'text-amber-400' : 'text-stone-400 hover:text-stone-100'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a href="/rss.xml" className="text-sm text-stone-400 hover:text-stone-100 transition-colors">
              RSS
            </a>
          </div>

          {/* Hamburger — 44x44 tap target */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center text-stone-400 active:text-stone-100 transition-colors"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="text-2xl leading-none">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu with backdrop */}
      {open && (
        <>
          {/* Backdrop dismisses on tap */}
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={close}
            aria-hidden
          />
          <div className="fixed top-14 left-0 right-0 z-40 bg-stone-950 border-b border-stone-800 shadow-xl">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center px-5 h-14 text-base border-b border-stone-800 transition-colors ${
                    isActive ? 'text-amber-400 bg-stone-900' : 'text-stone-300 active:bg-stone-900'
                  }`
                }
                onClick={close}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="/rss.xml"
              className="flex items-center px-5 h-14 text-base text-stone-300 active:bg-stone-900 transition-colors"
            >
              RSS
            </a>
          </div>
        </>
      )}
    </>
  )
}
