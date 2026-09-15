import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'

const tripLinks = [
  { to: '/september-2026', label: 'September 2026' },
  { to: '/august-2026', label: 'August 2026' },
  { to: '/june-2026', label: 'June 2026' },
  { to: '/may-2026', label: 'May 2026' },
  { to: '/january-2026', label: 'January 2026' },
  { to: '/december-2025', label: 'December 2025' },
]

const topLinks = [
  { to: '/', label: 'Home' },
  { to: '/national-parks', label: 'National Parks' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [tripsOpen, setTripsOpen] = useState(false)
  const [mobileTripsOpen, setMobileTripsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    if (!tripsOpen) return
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTripsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [tripsOpen])

  const closeAll = () => {
    setMenuOpen(false)
    setTripsOpen(false)
    setMobileTripsOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="font-bold text-accent text-lg tracking-tight" onClick={closeAll}>
            Tyler's Treks
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {topLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeAll}
                className={({ isActive }) =>
                  `text-sm transition-colors ${isActive ? 'text-accent' : 'text-muted hover:text-ink'}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Trips dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setTripsOpen(o => !o)}
                className="flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors"
              >
                Trips
                <span className={`text-xs transition-transform duration-200 ${tripsOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {tripsOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-card border border-line rounded-lg shadow-xl overflow-hidden">
                  {tripLinks.map(link => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={closeAll}
                      className={({ isActive }) =>
                        `flex items-center px-4 h-11 text-sm transition-colors ${
                          isActive ? 'text-accent bg-line' : 'text-ink hover:bg-line hover:text-ink'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://www.alltrails.com/members/tyler-kaegi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              AllTrails
            </a>

            <a href="/rss.xml" className="text-sm text-muted hover:text-ink transition-colors">
              RSS
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center text-muted active:text-ink transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="text-2xl leading-none">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" onClick={closeAll} aria-hidden />
          <div className="fixed top-14 left-0 right-0 z-40 bg-paper border-b border-line shadow-xl">
            {topLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeAll}
                className={({ isActive }) =>
                  `flex items-center px-5 h-14 text-base border-b border-line transition-colors ${
                    isActive ? 'text-accent bg-card' : 'text-ink active:bg-card'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Mobile Trips accordion */}
            <button
              onClick={() => setMobileTripsOpen(o => !o)}
              className="flex items-center justify-between w-full px-5 h-14 text-base text-ink border-b border-line active:bg-card transition-colors"
            >
              Trips
              <span className={`text-xs text-muted transition-transform duration-200 ${mobileTripsOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {mobileTripsOpen && (
              <div className="bg-card/60">
                {tripLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={closeAll}
                    className={({ isActive }) =>
                      `flex items-center pl-9 pr-5 h-12 text-sm border-b border-line/60 transition-colors ${
                        isActive ? 'text-accent' : 'text-muted active:text-ink'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}

            <a
              href="https://www.alltrails.com/members/tyler-kaegi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeAll}
              className="flex items-center px-5 h-14 text-base border-b border-line text-ink active:bg-card transition-colors"
            >
              AllTrails
            </a>

            <a
              href="/rss.xml"
              className="flex items-center px-5 h-14 text-base text-ink active:bg-card transition-colors"
            >
              RSS
            </a>
          </div>
        </>
      )}
    </>
  )
}
