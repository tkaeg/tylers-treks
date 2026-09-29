import { useEffect, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'

// Lazy-load every page so a route that never touches the map (e.g.
// /national-parks) doesn't have to download Home's mapbox-gl bundle
// (~275KB gzipped) before it can render anything.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const December2025 = lazy(() => import('./pages/December2025'))
const January2026 = lazy(() => import('./pages/January2026'))
const May2026 = lazy(() => import('./pages/May2026'))
const June2026 = lazy(() => import('./pages/June2026'))
const August2026 = lazy(() => import('./pages/August2026'))
const September2026 = lazy(() => import('./pages/September2026'))
const NationalParks = lazy(() => import('./pages/NationalParks'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/december-2025" element={<December2025 />} />
          <Route path="/january-2026" element={<January2026 />} />
          <Route path="/may-2026" element={<May2026 />} />
          <Route path="/june-2026" element={<June2026 />} />
          <Route path="/august-2026" element={<August2026 />} />
          <Route path="/september-2026" element={<September2026 />} />
          <Route path="/national-parks" element={<NationalParks />} />
        </Routes>
      </Suspense>
      <Analytics />
    </div>
  )
}
