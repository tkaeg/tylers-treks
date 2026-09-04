// Shared R2 (S3-compatible) client for the upload/delete scripts.
// Requires write-scoped R2 API credentials in .env — see .env.example.
// These are plain process.env vars (no VITE_ prefix) so they never end up
// in the client bundle.
import { config } from 'dotenv'
import { S3Client } from '@aws-sdk/client-s3'

config({ quiet: true })

const REQUIRED = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME']

export function assertConfigured() {
  const missing = REQUIRED.filter(k => !process.env[k])
  if (missing.length) {
    console.error(`Missing from .env: ${missing.join(', ')}`)
    console.error('See .env.example — you need a write-scoped R2 API token, not the public bucket URL.')
    process.exit(1)
  }
}

export const BUCKET = process.env.R2_BUCKET_NAME

let _client
export function getClient() {
  if (!_client) {
    assertConfigured()
    _client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    })
  }
  return _client
}
