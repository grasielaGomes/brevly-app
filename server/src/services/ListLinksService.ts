import { ILinkRepository } from '@/domain/repositories/ILinkRepository'
import { Link } from '@/domain/models/Link'

/**
 * Service responsible for listing all shortened links.
 */
export class ListLinksService {
  constructor(private repository: ILinkRepository) {}

  /**
   * Executes the listing process:
   * @returns An array of Link entities.
   */
  public async execute(): Promise<Link[]> {
    const links: Link[] = await this.repository.findAll()
    return links
  }
}
