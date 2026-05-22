import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useHashScroll() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    // Small delay lets the page finish rendering before scrolling
    const id = setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
    return () => clearTimeout(id)
  }, [hash])
}
