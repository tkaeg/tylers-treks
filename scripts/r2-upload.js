#!/usr/bin/env node
/**
 * Upload local files/folders to the R2 bucket, preserving their path
 * relative to the repo root — so `images/20260625/foo.webp` on disk
 * uploads to the key `images/20260625/foo.webp`, matching exactly what
 * trips.js references through imageUrl().
 *
 * Usage:
 *   node scripts/r2-upload.js images/20260625 images/20260822
 *   node scripts/r2-upload.js images/20260625/tunnel_log_1.webp
 *   node scripts/r2-upload.js --dry-run images/           # preview only, no credentials needed
 *
 * Requires R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY,
 * R2_BUCKET_NAME in .env — see .env.example.
 */
import { readdirSync, statSync, readFileSync } from 'fs'
import { join, relative, extname, sep } from 'path'

const USAGE = 'Usage: node scripts/r2-upload.js [--dry-run] <file-or-dir> [...]'

const CONTENT_TYPES = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mov': 'video/quicktime',
  '.mp4': 'video/mp4',
}
const CONCURRENCY = 6

function walk(path, out = []) {
  const stat = statSync(path)
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path).sort()) {
      if (entry.startsWith('.') || entry === '__MACOSX') continue
      walk(join(path, entry), out)
    }
  } else {
    out.push(path)
  }
  return out
}

function toKey(path) {
  return relative('.', path).split(sep).join('/')
}

async function uploadOne(s3, PutObjectCommand, BUCKET, file) {
  const key = toKey(file)
  const contentType = CONTENT_TYPES[extname(file).toLowerCase()] || 'application/octet-stream'
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: readFileSync(file),
    ContentType: contentType,
  }))
  return key
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const targets = args.filter(a => a !== '--dry-run')

  if (targets.length === 0) {
    console.error(USAGE)
    process.exit(1)
  }

  const files = targets.flatMap(t => walk(t))
  if (files.length === 0) {
    console.log('Nothing to upload.')
    return
  }

  if (dryRun) {
    console.log(`[dry run] Would upload ${files.length} file(s):\n`)
    for (const f of files) {
      const key = toKey(f)
      const type = CONTENT_TYPES[extname(f).toLowerCase()] || 'application/octet-stream'
      console.log(`  ${key}  (${type})`)
    }
    return
  }

  const { PutObjectCommand } = await import('@aws-sdk/client-s3')
  const { getClient, BUCKET } = await import('./r2-client.js')
  const s3 = getClient()

  console.log(`Uploading ${files.length} file(s) to bucket "${BUCKET}"...\n`)

  let ok = 0, fail = 0
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY)
    const results = await Promise.allSettled(batch.map(f => uploadOne(s3, PutObjectCommand, BUCKET, f)))
    results.forEach((r, idx) => {
      if (r.status === 'fulfilled') {
        console.log(`  ✓  ${r.value}`)
        ok++
      } else {
        console.error(`  ✗  ${toKey(batch[idx])} — ${r.reason?.message || r.reason}`)
        fail++
      }
    })
  }

  console.log(`\nDone. ${ok} uploaded, ${fail} failed.`)
  if (fail > 0) process.exit(1)
}

main()
