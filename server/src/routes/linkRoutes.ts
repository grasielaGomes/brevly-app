import { FastifyInstance } from 'fastify'
import { LinkController } from '@/controllers/LinkController'
import { transformZodSchema } from '@/utils/transformZodSchema'
import {
  CreateLinkSchema,
  ShortUrlParamsSchema,
  ListLinksResponseSchema,
  ExportCsvResponseSchema,
} from '@/validations/linkSchemas'

export async function linkRoutes(app: FastifyInstance) {
  const controller = new LinkController()

  app.post(
    '/links',
    {
      schema: transformZodSchema({
        body: CreateLinkSchema,
        response: { 201: CreateLinkSchema },
      }),
    },
    controller.create
  )

  app.get(
    '/links',
    {
      schema: transformZodSchema({
        response: { 200: ListLinksResponseSchema },
      }),
    },
    controller.list
  )

  app.delete(
    '/links/:shortUrl',
    {
      schema: transformZodSchema({
        params: ShortUrlParamsSchema,
      }),
    },
    controller.remove
  )

  app.get(
    '/links/:shortUrl',
    {
      schema: transformZodSchema({
        params: ShortUrlParamsSchema,
      }),
    },
    controller.redirect
  )

  app.get(
    '/links/export',
    {
      schema: transformZodSchema({
        response: { 200: ExportCsvResponseSchema },
      }),
    },
    controller.exportCsv
  )
}
