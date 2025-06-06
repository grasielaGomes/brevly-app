import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().transform(Number).default('3333'),
  DATABASE_URL: z.string().url().startsWith('postgres://'),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
