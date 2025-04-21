import { jsonSchemaTransform } from 'fastify-type-provider-zod'
import type { FastifySchema } from 'fastify'

export function transformZodSchema(
  schemaDef: FastifySchema & Record<string, any>
): FastifySchema {
  const { schema } = jsonSchemaTransform({ schema: schemaDef, url: '' })
  return schema as FastifySchema
}
