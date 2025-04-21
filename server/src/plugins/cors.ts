import { FastifyPluginAsync } from 'fastify'
import fastifyCors from '@fastify/cors'

export const corsPlugin: FastifyPluginAsync = async (app) => {
  await app.register(fastifyCors, {
    origin: '*',
  })
}
