import { z } from 'zod'

/**
 * Schema for creating a new link.
 * Validates the request body for POST /links.
 */
export const CreateLinkSchema = z.object({
  originalUrl: z.string().url('Invalid URL format'),
  shortUrl: z
    .string()
    .min(1, 'Short URL is required')
    .regex(
      /^[A-Za-z0-9_-]+$/,
      'Short URL can only contain alphanumeric characters, hyphens and underscores'
    ),
})

export const ShortUrlParamSchema = z
  .string()
  .min(1, 'Short URL parameter is required')
  .regex(
    /^[A-Za-z0-9_-]+$/,
    'Short URL can only contain alphanumeric characters, hyphens and underscores'
  )
  .openapi({
    param: {
      name: 'shortUrl',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: 'Short URL',
    },
  })

export const ShortUrlParamsSchema = z.object({
  shortUrl: ShortUrlParamSchema,
})

export const ListLinksResponseSchema = z.array(CreateLinkSchema).openapi({
  description: 'Array of shortened links',
})

export const ExportCsvResponseSchema = z.object({
  url: z.string().url(),
  filename: z.string(),
})

export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
})

export type CreateLinkInput = z.infer<typeof CreateLinkSchema>
export type ShortUrlParams = z.infer<typeof ShortUrlParamsSchema>
export type ListLinksResponse = z.infer<typeof ListLinksResponseSchema>
