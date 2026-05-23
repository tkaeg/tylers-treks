import { marked } from 'marked'

const raw = import.meta.glob('../content/**/*.md', { query: '?raw', eager: true, import: 'default' })

// Build a map of 'slug/stop-id' -> rendered HTML
const content = {}
for (const [path, text] of Object.entries(raw)) {
  // '../content/december-2025/nipton.md' -> 'december-2025/nipton'
  const key = path.replace('../content/', '').replace('.md', '')
  content[key] = marked.parse(text || '')
}

export default content
