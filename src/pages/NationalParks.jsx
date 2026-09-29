import { useState } from 'react'
import StopSection from '../components/StopSection'
import AnchorLink from '../components/AnchorLink'
import { trips } from '../data/trips'
import { useHashScroll } from '../hooks/useHashScroll'

const slugify = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const npStops = trips
  .flatMap(t => t.stops)
  .filter(s => s.nationalPark)

function groupByPark(stops) {
  const grouped = stops.reduce((acc, stop) => {
    const key = stop.nationalPark
    if (!acc[key]) acc[key] = []
    acc[key].push(stop)
    return acc
  }, {})
  return Object.entries(grouped)
}

const californiaStops = npStops.filter(s => s.inCaliforniaGoal !== false)
const allStops = npStops

// Every anchor id that exists under the California filter (park headings,
// stops, and sub-stops). Used to detect a deep link to a park/stop that
// only exists under "All" so we can switch the filter before the
// hash-scroll effect runs and comes up empty.
function collectIds(stops) {
  const ids = new Set()
  for (const [parkName, parkStops] of groupByPark(stops)) {
    ids.add(slugify(parkName))
    for (const stop of parkStops) {
      ids.add(stop.id)
      stop.subStops?.forEach(sub => ids.add(sub.id))
    }
  }
  return ids
}

const californiaIds = collectIds(californiaStops)

export default function NationalParks() {
  useHashScroll()
  const [filter, setFilter] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    return hash && !californiaIds.has(hash) ? 'all' : 'california'
  })

  const stops = filter === 'california' ? californiaStops : allStops
  const parks = groupByPark(stops)

  const jumpTo = (e, slug) => {
    e.preventDefault()
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="pt-20 pb-16 max-w-2xl mx-auto px-4 md:px-6">
      <h1 className="text-3xl font-bold text-accent mb-1">National Parks</h1>
      <div className="flex items-center justify-between mb-10">
        <p className="text-muted text-sm">{parks.length} parks visited</p>
        <div className="flex text-sm border border-line rounded-full overflow-hidden">
          <button
            onClick={() => setFilter('california')}
            className={`px-3 py-1 transition-colors ${filter === 'california' ? 'bg-accent text-white' : 'text-muted hover:text-ink'}`}
          >
            California
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 transition-colors ${filter === 'all' ? 'bg-accent text-white' : 'text-muted hover:text-ink'}`}
          >
            All
          </button>
        </div>
      </div>

      <nav aria-label="Jump to park" className="flex flex-wrap gap-2 mb-10">
        {parks.map(([parkName]) => (
          <a
            key={parkName}
            href={`#${slugify(parkName)}`}
            onClick={e => jumpTo(e, slugify(parkName))}
            className="text-sm px-3 py-1.5 rounded-full border border-line text-muted hover:text-accent hover:border-accent/50 transition-colors no-underline"
          >
            {parkName}
          </a>
        ))}
      </nav>

      {parks.map(([parkName, stops]) => (
        <section key={parkName} id={slugify(parkName)} className="scroll-mt-16 mb-16">
          <h2 className="text-xl font-semibold text-ink mb-8 pb-2 border-b border-line flex items-center gap-2">
            {parkName}
            <AnchorLink id={slugify(parkName)} label={parkName} />
          </h2>
          {stops.map(stop => (
            <StopSection key={stop.id} stop={stop} />
          ))}
        </section>
      ))}
    </main>
  )
}
