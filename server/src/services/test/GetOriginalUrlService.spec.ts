import { FakeLinkRepository } from '@/services/test/mocks'
import { GetOriginalUrlService } from '@/services'
import { Link } from '@/domain/models'
import { ApplicationError } from '@/errors'

describe('GetOriginalUrlService', () => {
  let repo: FakeLinkRepository
  let service: GetOriginalUrlService

  beforeEach(() => {
    repo = new FakeLinkRepository()
    repo.clear()
    service = new GetOriginalUrlService(repo)
  })

  it('increments accessCount and returns the link when shortUrl exists', async () => {
    const sample: Link = {
      id: 1,
      originalUrl: 'https://example.com',
      shortUrl: 'abc123',
      accessCount: 0,
      createdAt: new Date(),
    }
    repo['links'] = [sample]

    await service.execute('abc123')

    expect(repo['links'][0].accessCount).toBe(1)
  })

  it('throws ApplicationError when shortUrl does not exist', async () => {
    await expect(service.execute('nonexistent')).rejects.toThrowError(
      new ApplicationError("Short URL 'nonexistent' not found.", 404)
    )
  })
})
