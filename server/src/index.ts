import Fastify from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { docsPlugin } from '@/plugins/docs'
import { linkRoutes } from '@/routes/linkRoutes'
import fastifyCors from '@fastify/cors'

export async function buildServer() {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

  await app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  await app.register(docsPlugin)
  await app.register(linkRoutes)

  app.get('/', async () => ({ message: 'Server is up and running!' }))

  return app
}

if (require.main === module) {
  buildServer()
    .then((app) => app.listen({ port: 3333, host: '0.0.0.0' }))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
