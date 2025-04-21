import Fastify from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { corsPlugin } from '@/plugins/cors'
import { docsPlugin } from '@/plugins/docs'
import { linkRoutes } from '@/routes/linkRoutes'

export async function buildServer() {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

  await app.register(corsPlugin)
  await app.register(docsPlugin)
  await app.register(linkRoutes)

  app.get('/', async () => ({ message: 'Server is up and running!' }))

  return app
}

if (require.main === module) {
  buildServer()
    .then((app) => app.listen({ port: 3333 }))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
