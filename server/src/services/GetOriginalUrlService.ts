import { ILinkRepository } from '@/domain/repositories/ILinkRepository'
import { Link } from '@/domain/models/Link'
import { ApplicationError } from '@/errors/ApplicationError'

export class GetOriginalUrlService {
  constructor(private repository: ILinkRepository) {}

  /**
   * Executes the retrieval process:
   * 1. Finds the link by its shortUrl.
   * 2. Throws ApplicationError if not found.
   * 3. Increments the access count.
   * @param shortUrl The short URL to resolve.
   * @returns The Link entity with updated accessCount.
   * @throws ApplicationError when link not found.
   */
  public async execute(shortUrl: string): Promise<Link> {
    const link = await this.repository.findByShortUrl(shortUrl)
    if (!link) {
      throw new ApplicationError(`Short URL '${shortUrl}' not found.`, 404)
    }

    await this.repository.incrementAccessCount(shortUrl)
    return { ...link, accessCount: link.accessCount + 1 }
  }
}
