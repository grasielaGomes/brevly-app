import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import supertest from 'supertest'
import { buildServer } from '@/index'
import prisma from '@/plugins/prisma'
import type { FastifyInstance } from 'fastify'

let app: FastifyInstance
let request: ReturnType<typeof supertest>

beforeAll(async () => {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "Link" RESTART IDENTITY CASCADE;`
  )
  app = await buildServer()
  await app.listen({ port: 0 })
  request = supertest(app.server)
})

afterAll(async () => {
  await app.close()
  await prisma.$disconnect()
})

describe('Link Routes Integration', () => {
  let createdShortUrl: string

  it('should create a new link', async () => {
    const payload = { originalUrl: 'https://example.com', shortUrl: 'ex123' }
    const res = await request.post('/links').send(payload)
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({
      originalUrl: payload.originalUrl,
      shortUrl: payload.shortUrl,
    })
    createdShortUrl = res.body.shortUrl
  })

  it('should list links', async () => {
    const res = await request.get('/links')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should get original URL', async () => {
    const res = await request.get(`/links/${createdShortUrl}`)
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({
      originalUrl: 'https://example.com',
    })
  })

  it('should delete a link by shortUrl', async () => {
    const res = await request.delete(`/links/${createdShortUrl}`)
    expect(res.status).toBe(204)
  })

  it('should return 404 for deleted shortUrl', async () => {
    const res = await request.get(`/links/${createdShortUrl}`)
    expect(res.status).toBe(404)
  })

  it('should export links as CSV', async () => {
    await request
      .post('/links')
      .send({ originalUrl: 'https://a.com', shortUrl: 'a1' })
    await request
      .post('/links')
      .send({ originalUrl: 'https://b.com', shortUrl: 'b2' })

    const res = await request.get('/links/export')
    expect(res.status).toBe(200)
    expect(typeof res.body.url).toBe('string')
    expect(typeof res.body.filename).toBe('string')
    expect(res.body.url).toContain(res.body.filename)
  })
})
