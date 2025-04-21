import { FakeLinkRepository } from '@/services/test/mocks'
import { DeleteLinkService } from '@/services'
import { RecordNotFoundError } from '@/errors'

describe('DeleteLinkService', () => {
  let repo: FakeLinkRepository
  let service: DeleteLinkService

  beforeEach(() => {
    repo = new FakeLinkRepository()
    repo.clear()
    service = new DeleteLinkService(repo)
  })

  it('deletes a link silently when the ID exists', async () => {
    const sample = {
      id: 1,
      originalUrl: 'a',
      shortUrl: 'b',
      accessCount: 0,
      createdAt: new Date(),
    }
    repo['links'] = [sample]

    await service.execute(sample.shortUrl)

    expect(repo['links']).toHaveLength(0) // Verifica que o link foi removido
  })

  it('throws RecordNotFoundError(404) when the link does not exist', async () => {
    await expect(service.execute('ab')).rejects.toThrowError(
      new RecordNotFoundError('Link with short URL ab not found')
    )
  })
})
