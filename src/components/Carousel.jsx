import { useState, useCallback, useRef } from 'react'
import { imageUrl } from '../data/imageUrl'
import Lightbox from './Lightbox'

const VIDEO_EXT = /\.(mov|mp4|webm|MOV|MP4|WEBM|hevc)$/i

function MediaItem({ src, alt, className, onClick }) {
  if (VIDEO_EXT.test(src)) {
    return (
      <video
        src={src}
        className={className}
        controls
        playsInline
        preload="metadata"
      />
    )
  }
  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={`${className} opacity-0 transition-opacity duration-500 ${onClick ? 'cursor-zoom-in' : ''}`}
      onLoad={e => e.currentTarget.classList.remove('opacity-0')}
      onClick={onClick}
      loading="lazy"
      draggable={false}
    />
  )
}

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const prev = useCallback(() => {
    setCurrent(i => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setCurrent(i => (i + 1) % images.length)
  }, [images.length])

  const handleTouchStart = (e) => {
    // Native <video> controls (scrub bar, fullscreen button, etc.) live in a
    // shadow root, so a tap on them retargets here as the <video> itself.
    // Don't hijack that as a swipe, or a slight finger drift while tapping
    // fullscreen flips `current` and yanks the video out mid-request.
    if (e.target.tagName === 'VIDEO') {
      touchStartX.current = null
      touchStartY.current = null
      return
    }
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  if (!images || images.length === 0) return null

  const image = images[current]
  const resolvedSrc = imageUrl(image.src)

  return (
    <div className="relative w-full select-none">
      <div
        className="relative aspect-[4/3] md:aspect-video bg-card overflow-hidden rounded-lg touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <MediaItem
          src={resolvedSrc}
          alt={image.alt}
          className="w-full h-full object-contain"
          onClick={VIDEO_EXT.test(resolvedSrc) ? undefined : () => setLightboxOpen(true)}
        />
        {image.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
            <p className="text-white text-sm leading-snug">{image.caption}</p>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/50 active:bg-black/75 text-white rounded-full text-xl transition-colors"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/50 active:bg-black/75 text-white rounded-full text-xl transition-colors"
            aria-label="Next"
          >
            ›
          </button>
          <div className="flex justify-center gap-1 mt-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-8 h-8 flex items-center justify-center"
                aria-label={`Go to ${i + 1}`}
              >
                <span className={`block w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-accent' : 'bg-line'}`} />
              </button>
            ))}
          </div>
        </>
      )}

      {lightboxOpen && (
        <Lightbox
          src={resolvedSrc}
          alt={image.alt}
          onClose={() => setLightboxOpen(false)}
          onPrev={prev}
          onNext={next}
          hasMultiple={images.length > 1}
        />
      )}
    </div>
  )
}
