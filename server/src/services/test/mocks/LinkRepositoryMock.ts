import { ILinkRepository } from '@/domain/repositories'
import { Link } from '@/domain/models'
import { RecordNotFoundError } from '@/errors'

export class FakeLinkRepository implements ILinkRepository {
  private links: Link[] = []
  public clear() {
    this.links = []
  }

  async create(data: { originalUrl: string; shortUrl: string }): Promise<Link> {
    const link: Link = {
      id: this.links.length + 1,
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
      accessCount: 0,
      createdAt: new Date(),
    }
    this.links.push(link)
    return link
  }

  async findByShortUrl(shortUrl: string): Promise<Link | null> {
    return this.links.find((l) => l.shortUrl === shortUrl) ?? null
  }

  async findAll(): Promise<Link[]> {
    return this.links
  }

  async findBatch(batchSize: number, lastId?: number | null): Promise<Link[]> {
    if (lastId == null) {
      return this.links.slice(0, batchSize)
    }
    const startIndex = this.links.findIndex((l) => l.id === lastId) + 1
    return this.links.slice(startIndex, startIndex + batchSize)
  }

  async deleteByShortUrl(shortUrl: string): Promise<void> {
    const index = this.links.findIndex((link) => link.shortUrl === shortUrl)
    if (index === -1) {
      throw new RecordNotFoundError(`Link with short URL ${shortUrl} not found`)
    }
    this.links.splice(index, 1)
  }

  async incrementAccessCount(shortUrl: string): Promise<void> {
    const link = this.links.find((l) => l.shortUrl === shortUrl)
    if (link) {
      link.accessCount += 1
    }
  }
}
