import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifyCors from '@fastify/cors'
import ScalarUI from '@scalar/fastify-api-reference'

const app = Fastify({ logger: true })

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Brev.ly API',
      description: 'API documentation for the Brev.ly URL shortening service',
      version: '0.1.0',
    },
    host: 'localhost:3333',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
})

app.register(ScalarUI, {
  routePrefix: '/docs',
})

app.get('/', async (request, reply) => {
  return { message: 'Server is up and running!' }
})

const start = async () => {
  try {
    await app.listen({ port: 3333 })
    app.log.info('Server listening on port 3333')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
