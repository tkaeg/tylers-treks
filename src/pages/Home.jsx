import { Link } from 'react-router-dom'
import CaliforniaMap from '../components/CaliforniaMap'
import { trips } from '../data/trips'
import { imageUrl } from '../data/imageUrl'

export default function Home() {
  return (
    <main className="pt-14">
      {/* Hero */}
      <section className="relative bg-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imageUrl('images/20260103/mosaic_canyon_2.jpg')}
            alt="Mosaic Canyon, Death Valley"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-stone-950" />
        </div>
        <div className="relative z-10 text-center py-16 md:py-24 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-3 tracking-tight">
            Tyler's Treks
          </h1>
          <p className="text-stone-300 text-lg md:text-xl mb-2">California National Parks — 2026</p>
          <p className="text-stone-400 text-sm max-w-xs mx-auto leading-relaxed">
            Exploring every national park in California, camping out of a truck.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 py-8 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-stone-200 mb-1">Trip Map</h2>
        <p className="text-stone-500 text-sm mb-3">Tap a marker to jump to that stop</p>
        <div className="h-[320px] md:h-[520px] rounded-xl overflow-hidden border border-stone-800">
          <CaliforniaMap />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-3">
          {trips.map(trip => (
            <div key={trip.slug} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: { 'december-2025': '#f59e0b', 'january-2026': '#60a5fa', 'may-2026': '#34d399' }[trip.slug] || '#fff' }}
              />
              <span className="text-stone-400 text-xs">{trip.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trip cards */}
      <section className="px-4 pb-16 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-stone-200 mb-4">All Trips</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {trips.map(trip => (
            <Link
              key={trip.slug}
              to={`/${trip.slug}`}
              className="block bg-stone-900 rounded-xl overflow-hidden border border-stone-800 active:border-amber-500/50 transition-colors group"
            >
              {trip.stops[0]?.coverImage && (
                <div className="w-full aspect-[16/9] bg-stone-800 overflow-hidden">
                  <img
                    src={imageUrl(trip.stops[0].coverImage)}
                    alt={trip.label}
                    className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                    onLoad={e => e.currentTarget.classList.remove('opacity-0')}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-stone-100 text-base">{trip.label}</h3>
                <p className="text-stone-500 text-sm mt-1">
                  {trip.stops.length} stop{trip.stops.length !== 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
