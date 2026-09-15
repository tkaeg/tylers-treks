import StopSection from '../components/StopSection'
import { trips } from '../data/trips'
import { useHashScroll } from '../hooks/useHashScroll'

const npStops = trips
  .flatMap(t => t.stops)
  .filter(s => s.nationalPark)

const grouped = npStops.reduce((acc, stop) => {
  const key = stop.nationalPark
  if (!acc[key]) acc[key] = []
  acc[key].push(stop)
  return acc
}, {})

const parks = Object.entries(grouped)

export default function NationalParks() {
  useHashScroll()

  return (
    <main className="pt-20 pb-16 max-w-2xl mx-auto px-4 md:px-6">
      <h1 className="text-3xl font-bold text-accent mb-1">National Parks</h1>
      <p className="text-muted text-sm mb-10">{parks.length} parks visited</p>

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
