import { useState, useCallback, useRef } from 'react'
import Map, { Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl'
import { useNavigate } from 'react-router-dom'
import { trips } from '../data/trips'

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const TRIP_COLORS = {
  'december-2025': '#f59e0b', // amber
  'january-2026':  '#60a5fa', // blue-400
  'may-2026':      '#34d399', // emerald-400
  'june-2026':     '#a78bfa', // violet-400
  'august-2026':   '#f472b6', // pink-400
}

// Each trip has routes: an array of coordinate arrays (one per driving leg).
// Flatten into one GeoJSON Feature per leg so each can be styled independently.
const routeGeoJSON = {
  type: 'FeatureCollection',
  features: trips.flatMap(trip =>
    trip.routes.map(coords => ({
      type: 'Feature',
      properties: { slug: trip.slug, color: TRIP_COLORS[trip.slug] || '#fff' },
      geometry: { type: 'LineString', coordinates: coords },
    }))
  ),
}

// Bounding box over every route waypoint across every trip, so the map
// always frames the full extent driven so far — new trips (further north,
// further south, ...) never get silently clipped by a stale hardcoded view.
const ALL_ROUTE_COORDS = trips.flatMap(trip => trip.routes.flat())
const ROUTE_BOUNDS = ALL_ROUTE_COORDS.reduce(
  (b, [lng, lat]) => ({
    minLng: Math.min(b.minLng, lng),
    minLat: Math.min(b.minLat, lat),
    maxLng: Math.max(b.maxLng, lng),
    maxLat: Math.max(b.maxLat, lat),
  }),
  { minLng: Infinity, minLat: Infinity, maxLng: -Infinity, maxLat: -Infinity }
)
const INITIAL_VIEW_STATE = {
  longitude: (ROUTE_BOUNDS.minLng + ROUTE_BOUNDS.maxLng) / 2,
  latitude: (ROUTE_BOUNDS.minLat + ROUTE_BOUNDS.maxLat) / 2,
  zoom: 5.5,
}

export default function CaliforniaMap() {
  const navigate = useNavigate()
  const mapRef = useRef(null)
  const [popup, setPopup] = useState(null)

  const handleLoad = useCallback(() => {
    mapRef.current?.fitBounds(
      [
        [ROUTE_BOUNDS.minLng, ROUTE_BOUNDS.minLat],
        [ROUTE_BOUNDS.maxLng, ROUTE_BOUNDS.maxLat],
      ],
      { padding: 40, duration: 0 }
    )
  }, [])

  const handleMarkerClick = useCallback((e, stop, trip, sub) => {
    e.originalEvent?.stopPropagation()
    setPopup({ stop, trip, sub })
  }, [])

  const handleGoToStop = useCallback(() => {
    if (!popup) return
    const anchor = popup.sub ? popup.sub.id : popup.stop.id
    navigate(`/${popup.trip.slug}#${anchor}`)
    setPopup(null)
  }, [popup, navigate])

  if (!TOKEN) {
    return (
      <div className="w-full h-full bg-stone-900 flex flex-col items-center justify-center gap-2 rounded-lg">
        <p className="text-stone-400 text-sm">Map requires a Mapbox token.</p>
        <p className="text-stone-500 text-xs">Add <code className="text-amber-400">VITE_MAPBOX_TOKEN</code> to your <code className="text-amber-400">.env</code> file.</p>
      </div>
    )
  }

  return (
    <Map
      ref={mapRef}
      initialViewState={INITIAL_VIEW_STATE}
      onLoad={handleLoad}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken={TOKEN}
    >
      <NavigationControl position="top-right" />

      {/* Driving routes — one feature per leg */}
      <Source id="routes" type="geojson" data={routeGeoJSON}>
        <Layer
          id="routes-line"
          type="line"
          paint={{
            'line-color': ['get', 'color'],
            'line-width': 2,
            'line-dasharray': [2, 1.5],
            'line-opacity': 0.8,
          }}
        />
      </Source>

      {/* Stop markers — one per subStop if present, else one per stop */}
      {trips.flatMap(trip =>
        trip.stops.flatMap(stop => {
          if (stop.subStops) {
            return stop.subStops
              .filter(sub => sub.coords)
              .map(sub => (
                <Marker
                  key={`${trip.slug}-${sub.id}`}
                  longitude={sub.coords[0]}
                  latitude={sub.coords[1]}
                  onClick={e => handleMarkerClick(e, stop, trip, sub)}
                >
                  <div
                    title={sub.name}
                    className="w-3 h-3 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-125 transition-transform"
                    style={{ backgroundColor: TRIP_COLORS[trip.slug] || '#fff' }}
                  />
                </Marker>
              ))
          }
          return [
            <Marker
              key={`${trip.slug}-${stop.id}`}
              longitude={stop.coords[0]}
              latitude={stop.coords[1]}
              onClick={e => handleMarkerClick(e, stop, trip, null)}
            >
              <div
                title={stop.location}
                className="w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-125 transition-transform"
                style={{ backgroundColor: TRIP_COLORS[trip.slug] || '#fff' }}
              />
            </Marker>,
          ]
        })
      )}

      {popup && (
        <Popup
          longitude={popup.sub ? popup.sub.coords[0] : popup.stop.coords[0]}
          latitude={popup.sub ? popup.sub.coords[1] : popup.stop.coords[1]}
          anchor="bottom"
          offset={14}
          onClose={() => setPopup(null)}
          closeButton
        >
          <div className="min-w-[160px]">
            <p className="font-semibold text-stone-800 text-sm">{popup.stop.date}</p>
            <p className="text-stone-500 text-xs mb-2">
              {popup.sub ? popup.sub.name : popup.stop.location}
            </p>
            <button
              onClick={handleGoToStop}
              className="text-amber-600 hover:text-amber-800 text-xs font-medium underline"
            >
              Read more →
            </button>
          </div>
        </Popup>
      )}
    </Map>
  )
}
