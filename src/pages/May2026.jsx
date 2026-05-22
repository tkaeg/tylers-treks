import StopSection from '../components/StopSection'
import { trips } from '../data/trips'
import { useHashScroll } from '../hooks/useHashScroll'

const trip = trips.find(t => t.slug === 'may-2026')

export default function May2026() {
  useHashScroll()

  return (
    <main className="pt-20 pb-16 max-w-2xl mx-auto px-4 md:px-6">
      <h1 className="text-3xl font-bold text-amber-400 mb-1">{trip.label}</h1>
      <p className="text-stone-500 text-sm mb-10">{trip.stops.length} stops</p>
      {trip.stops.map(stop => (
        <StopSection key={stop.id} stop={stop} />
      ))}
    </main>
  )
}
