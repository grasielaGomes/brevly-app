import { FastifyPluginAsync } from 'fastify'
import 'zod-openapi/extend'
import { createDocument } from 'zod-openapi'
import ScalarUI from '@scalar/fastify-api-reference'
import {
  CreateLinkSchema,
  ShortUrlParamSchema,
  ListLinksResponseSchema,
  ErrorResponseSchema,
  ExportCsvResponseSchema,
  OriginalUrlResponseSchema,
  LinkResponseSchema,
} from '@/validations/linkSchemas'

export const docsPlugin: FastifyPluginAsync = async (app) => {
  const openApiSpec = createDocument({
    openapi: '3.1.0',
    info: {
      title: 'Brev.ly API',
      version: '0.1.0',
      description: 'API for the Brev.ly URL shortening service',
    },
    paths: {
      '/links': {
        post: {
          summary: 'Create a new shortened link',
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: CreateLinkSchema },
            },
          },
          responses: {
            '201': {
              description: 'Link created successfully',
              content: { 'application/json': { schema: LinkResponseSchema } },
            },
            '400': {
              description: 'Invalid request body',
              content: {
                'application/json': {
                  schema: ErrorResponseSchema,
                },
              },
            },
            '409': {
              description: 'Short URL already exists',
              content: {
                'application/json': {
                  schema: ErrorResponseSchema,
                },
              },
            },
          },
        },
        get: {
          summary: 'List all shortened links',
          responses: {
            '200': {
              description: 'List of shortened links',
              content: {
                'application/json': {
                  schema: ListLinksResponseSchema,
                },
              },
            },
          },
        },
      },

      '/links/{shortUrl}': {
        get: {
          summary: 'Get original URL',
          parameters: [ShortUrlParamSchema],
          responses: {
            '200': {
              description: 'Original URL found',
              content: {
                'application/json': { schema: OriginalUrlResponseSchema },
              },
            },
            '404': { description: 'Short URL not found' },
          },
        },
        delete: {
          summary: 'Delete a link by short URL',
          parameters: [ShortUrlParamSchema],
          responses: {
            '204': { description: 'Link deleted successfully' },
            '404': { description: 'Link not found' },
          },
        },
      },
      '/links/export': {
        get: {
          summary: 'Export all links as CSV',
          responses: {
            '200': {
              description: 'CSV export URL',
              content: {
                'application/json': {
                  schema: ExportCsvResponseSchema,
                },
              },
            },
          },
        },
      },
    },
  })

  app.get('/openapi.json', async (_req, reply) => {
    reply.send(openApiSpec)
  })

  await app.register(ScalarUI, {
    routePrefix: '/docs',
    configuration: {
      url: '/openapi.json',
    },
  })
}
