import { S3Client } from '@aws-sdk/client-s3'
import { env } from '@/env'

const bucketName = env.CLOUDFLARE_BUCKET
const endpoint = `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`
const publicUrl = env.CLOUDFLARE_PUBLIC_URL

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
  forcePathStyle: true,
})

export { storageClient, bucketName, publicUrl }
