import { useState } from 'react'
import StopSection from '../components/StopSection'
import { trips } from '../data/trips'
import { useHashScroll } from '../hooks/useHashScroll'

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

export default function NationalParks() {
  useHashScroll()
  const [filter, setFilter] = useState('california')

  const stops = filter === 'california' ? californiaStops : allStops
  const parks = groupByPark(stops)

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

      {parks.map(([parkName, stops]) => (
        <section key={parkName} className="mb-16">
          <h2 className="text-xl font-semibold text-ink mb-8 pb-2 border-b border-line">
            {parkName}
          </h2>
          {stops.map(stop => (
            <StopSection key={stop.id} stop={stop} />
          ))}
        </section>
      ))}
    </main>
  )
}
