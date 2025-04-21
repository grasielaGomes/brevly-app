import { CreateLinkService } from '@/services'
import { ApplicationError } from '@/errors/ApplicationError'
import { FakeLinkRepository } from '@/services/test/mocks'

describe('CreateLinkService', () => {
  let repo: FakeLinkRepository
  let service: CreateLinkService

  beforeEach(() => {
    repo = new FakeLinkRepository()
    repo.clear()
    service = new CreateLinkService(repo)
  })

  it('should create a new link', async () => {
    const link = await service.execute({
      originalUrl: 'https://example.com',
      shortUrl: 'ex',
    })
    expect(link).toMatchObject({
      originalUrl: 'https://example.com',
      shortUrl: 'ex',
      accessCount: 0,
    })
    expect(typeof link.id).toBe('number')
  })

  it('should throw if shortUrl already exists', async () => {
    await service.execute({
      originalUrl: 'https://example.com',
      shortUrl: 'ex',
    })
    await expect(() =>
      service.execute({
        originalUrl: 'https://example.com',
        shortUrl: 'ex',
      })
    ).rejects.toBeInstanceOf(ApplicationError)
  })
})
