import { S3Client } from '@aws-sdk/client-s3'
import { env } from '@/env'
/**
 * Plugin for Cloudflare R2 storage client.
 * Reads configuration from environment variables and exports a configured S3Client instance.
 */

const bucketName = env.CLOUDFLARE_BUCKET
const endpoint = `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`
const publicUrl = env.CLOUDFLARE_PUBLIC_URL

// Create the S3-compatible client for R2
enum R2Clients {
  storage = 'storage',
}

const storageClient = new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // required for R2 compatibility
})

export { storageClient, bucketName, publicUrl }
