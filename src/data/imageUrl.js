const R2_BASE = 'https://pub-dce4080a497c4defbee66c219e94855e.r2.dev'

// VITE_R2_URL overrides the hardcoded base (useful if the bucket URL ever changes).
const BASE = import.meta.env.VITE_R2_URL || R2_BASE

export function imageUrl(path) {
  if (!path) return ''
  return `${BASE}/${path}`
}
