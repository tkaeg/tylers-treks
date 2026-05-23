import Carousel from './Carousel'
import { imageUrl } from '../data/imageUrl'
import content from '../data/content'

export default function StopSection({ stop }) {
  const html = content[stop.contentKey] || ''

  return (
    <article id={stop.id} className="scroll-mt-16 mb-12 pb-12 border-b border-stone-800 last:border-b-0">
      <p className="text-amber-400 text-sm font-semibold mb-1">{stop.date}</p>
      <p className="text-stone-400 text-sm mb-5">📍 {stop.location}</p>

      {stop.coverImage && (
        <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-stone-800 rounded-lg mb-6 overflow-hidden">
          <img
            src={imageUrl(stop.coverImage)}
            alt={stop.coverAlt}
            className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
            onLoad={e => e.currentTarget.classList.remove('opacity-0')}
            loading="lazy"
          />
        </div>
      )}

      {html && (
        <div
          className="prose prose-invert prose-amber prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline max-w-none mb-8 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      {stop.subStops ? (
        stop.subStops.map(sub => (
          <div key={sub.id} id={sub.id} className="scroll-mt-16 mb-8">
            <h3 className="text-base font-semibold text-stone-300 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-amber-400 rounded-full inline-block" />
              {sub.name}
            </h3>
            {sub.images?.length > 0 && <Carousel images={sub.images} />}
          </div>
        ))
      ) : (
        stop.images?.length > 0 && <Carousel images={stop.images} />
      )}
    </article>
  )
}
