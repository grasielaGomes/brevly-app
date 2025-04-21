import { FakeLinkRepository } from '@/services/test/mocks'
import { ListLinksService } from '@/services'
import { Link } from '@/domain/models'

describe('ListLinksService', () => {
  let repo: FakeLinkRepository
  let service: ListLinksService

  beforeEach(() => {
    repo = new FakeLinkRepository()
    repo.clear()
    service = new ListLinksService(repo)
  })

  it('returns all links when repository has data', async () => {
    const sample: Link = {
      id: 1,
      originalUrl: 'a',
      shortUrl: 'b',
      accessCount: 0,
      createdAt: new Date(),
    }
    repo['links'] = [sample]
    const result = await service.execute()
    expect(result).toEqual([sample])
  })

  it('returns empty array when repository is empty', async () => {
    const result = await service.execute()
    expect(result).toEqual([])
  })
})
