import { ILinkRepository } from '@/domain/repositories'
import { Link } from '@/domain/models'
import { ApplicationError } from '../errors/ApplicationError'

export interface CreateLinkDTO {
  originalUrl: string
  shortUrl: string
}

export class CreateLinkService {
  constructor(private repository: ILinkRepository) {}

  /**
   * Executes the creation process:
   * 1. Checks for duplicate shortUrl.
   * 2. Delegates persistence to the repository.
   * @param data CreateLinkDTO containing originalUrl and shortUrl.
   * @returns The created Link entity.
   * @throws ApplicationError if shortUrl already exists.
   */
  public async execute(data: CreateLinkDTO): Promise<Link> {
    const existing = await this.repository.findByShortUrl(data.shortUrl)
    if (existing) {
      throw new ApplicationError(
        `Short URL '${data.shortUrl}' is already in use.`,
        409
      )
    }

    const link = await this.repository.create({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
    })

    return link
  }
}
