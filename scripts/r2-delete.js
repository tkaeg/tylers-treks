#!/usr/bin/env node
/**
 * Delete one or more object keys from the R2 bucket — for cleaning up
 * stale files after a rename (e.g. a mislabeled photo).
 *
 * Usage:
 *   node scripts/r2-delete.js images/20260625/moro_rock_1.webp
 *   node scripts/r2-delete.js --dry-run images/20260625/big_baldy_1.webp images/20260625/big_baldy_2.webp
 *
 * Requires the same R2_* env vars as r2-upload.js — see .env.example.
 */
const USAGE = 'Usage: node scripts/r2-delete.js [--dry-run] <key> [...]'

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const keys = args.filter(a => a !== '--dry-run')

  if (keys.length === 0) {
    console.error(USAGE)
    process.exit(1)
  }

  if (dryRun) {
    console.log(`[dry run] Would delete ${keys.length} key(s):\n`)
    keys.forEach(k => console.log(`  ${k}`))
    return
  }

  const { DeleteObjectsCommand } = await import('@aws-sdk/client-s3')
  const { getClient, BUCKET } = await import('./r2-client.js')
  const s3 = getClient()

  console.log(`Deleting ${keys.length} key(s) from bucket "${BUCKET}"...\n`)

  let deleted = 0
  for (let i = 0; i < keys.length; i += 1000) { // API max 1000 keys/request
    const chunk = keys.slice(i, i + 1000)
    const res = await s3.send(new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: { Objects: chunk.map(Key => ({ Key })), Quiet: false },
    }))
    for (const d of res.Deleted || []) {
      console.log(`  ✓  ${d.Key}`)
      deleted++
    }
    for (const e of res.Errors || []) {
      console.error(`  ✗  ${e.Key} — ${e.Code} ${e.Message}`)
    }
  }

  console.log(`\nDone. ${deleted} deleted.`)
}

main()
