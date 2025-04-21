import { Link } from '@/domain/models/Link'

export interface ILinkRepository {
  /**
   * Creates a new shortened link record.
   * @param data.originalUrl The original URL to be shortened.
   * @param data.shortUrl The desired short URL identifier.
   * @returns The created Link entity.
   */
  create(data: { originalUrl: string; shortUrl: string }): Promise<Link>

  /**
   * Finds a link by its short URL identifier.
   * @param shortUrl The short URL string to search.
   * @returns The Link entity or null if not found.
   */
  findByShortUrl(shortUrl: string): Promise<Link | null>

  /**
   * Retrieves all link records.
   * @returns An array of Link entities.
   */
  findAll(): Promise<Link[]>

  /**
   * Retrieves a batch of link records, ordered by ID, for streaming exports.
   * @param batchSize Number of records to retrieve in one batch.
   * @param lastId The ID of the last record from the previous batch (exclusive).
   * @returns An array of Link entities.
   */
  findBatch(batchSize: number, lastId?: number | null): Promise<Link[]>

  /**
   * Deletes a link by its ID.
   * @param id The unique identifier of the link.
   */
  deleteByShortUrl(shortUrl: string): Promise<void>

  /**
   * Increments the access count for the given short URL.
   * @param shortUrl The short URL whose count should be incremented.
   */
  incrementAccessCount(shortUrl: string): Promise<void>
}
