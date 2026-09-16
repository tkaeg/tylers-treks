import { useEffect } from 'react'

export default function Lightbox({ src, alt, onClose, onPrev, onNext, hasMultiple }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 overflow-auto"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="fixed top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/75 text-white rounded-full text-2xl leading-none transition-colors"
        aria-label="Close"
      >
        ×
      </button>
      {hasMultiple && (
        <>
          <button
            onClick={e => { e.stopPropagation(); onPrev() }}
            className="fixed left-1 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-black/75 text-white rounded-full text-xl transition-colors"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={e => { e.stopPropagation(); onNext() }}
            className="fixed right-1 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-black/75 text-white rounded-full text-xl transition-colors"
            aria-label="Next"
          >
            ›
          </button>
        </>
      )}
      <div className="min-h-full flex">
        <img
          src={src}
          alt={alt}
          className="m-auto w-auto h-auto max-w-[95vw] max-h-[95vh]"
          onClick={e => e.stopPropagation()}
          draggable={false}
        />
      </div>
    </div>
  )
}
