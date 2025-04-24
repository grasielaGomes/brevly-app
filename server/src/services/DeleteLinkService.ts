import { ILinkRepository } from '@/domain/repositories/ILinkRepository'
import { RecordNotFoundError } from '@/errors'

export class DeleteLinkService {
  constructor(private repository: ILinkRepository) {}

  public async execute(shortUrl: string): Promise<void> {
    const existing = await this.repository.findByShortUrl(shortUrl)
    if (!existing) {
      throw new RecordNotFoundError(`Link with short URL ${shortUrl} not found`)
    }
    await this.repository.deleteByShortUrl(shortUrl)
  }
}
