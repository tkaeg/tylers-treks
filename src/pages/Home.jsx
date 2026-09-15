import { Link } from 'react-router-dom'
import CaliforniaMap from '../components/CaliforniaMap'
import { trips } from '../data/trips'
import { imageUrl } from '../data/imageUrl'

export default function Home() {
  return (
    <main className="pt-14">
      {/* Hero */}
      <section className="relative bg-card overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imageUrl('images/20260103/mosaic_canyon_2.jpg')}
            alt="Mosaic Canyon, Death Valley"
            className="w-full h-full object-cover object-[center_60%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-paper" />
        </div>
        <div className="relative z-10 text-center py-16 md:py-24 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-accent mb-3 tracking-tight">
            Tyler's Treks
          </h1>
          <p className="text-ink text-lg md:text-xl mb-2">California National Parks — 2026</p>
          <p className="text-muted text-sm max-w-lg mx-auto leading-relaxed">
            Exploring every national park in California. In 2026, I've made a goal of going to all of the national parks in California.
          I made this site to document my trips and share my experiences. They're in no way advice as I have no idea what I'm doin. It'll often be filled with random things that happened on the trip that have no relevance to the park itself so feel free to just look at the pictures. I hope you enjoy following along on my adventures.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 py-8 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-ink mb-1">Trip Map</h2>
        <p className="text-muted text-sm mb-3">Tap a marker to jump to that stop</p>
        <div className="h-[320px] md:h-[520px] rounded-xl overflow-hidden border border-line">
          <CaliforniaMap />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-3">
          {trips.map(trip => (
            <div key={trip.slug} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: { 'december-2025': '#f59e0b', 'january-2026': '#60a5fa', 'may-2026': '#34d399', 'june-2026': '#a78bfa', 'august-2026': '#f472b6', 'september-2026': '#2dd4bf' }[trip.slug] || '#fff' }}
              />
              <span className="text-muted text-xs">{trip.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* National Parks link */}
      <section className="px-4 pb-6 max-w-5xl mx-auto">
        <Link
          to="/national-parks"
          className="flex items-center justify-between bg-card rounded-xl border border-line px-5 py-4 active:border-accent/50 transition-colors"
        >
          <div>
            <h2 className="font-semibold text-ink text-base">National Parks</h2>
            <p className="text-muted text-sm mt-0.5">All park visits in one view</p>
          </div>
          <span className="text-accent text-lg">→</span>
        </Link>
      </section>

      {/* Trip cards */}
      <section className="px-4 pb-16 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-ink mb-4">All Trips</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {trips.map(trip => (
            <Link
              key={trip.slug}
              to={`/${trip.slug}`}
              className="block bg-card rounded-xl overflow-hidden border border-line active:border-accent/50 transition-colors group"
            >
              {trip.homePreviewImage && (
                <div className="w-full aspect-[16/9] bg-line overflow-hidden">
                  <img
                    src={imageUrl(trip.homePreviewImage)}
                    alt={trip.homePreviewAlt || trip.label}
                    className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                    onLoad={e => e.currentTarget.classList.remove('opacity-0')}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-ink text-base">{trip.label}</h3>
                <p className="text-muted text-sm mt-1">
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
