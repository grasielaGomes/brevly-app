import { Readable } from 'stream'
import { uuidv7 } from 'uuidv7'
import { Upload } from '@aws-sdk/lib-storage'
import { ILinkRepository } from '@/domain/repositories'
import { ApplicationError } from '@/errors/ApplicationError'
import { formatCsvRow } from '@/utils/csvFormatter'
import { storageClient, bucketName, publicUrl } from '@/plugins'

export interface ExportCsvResult {
  url: string
  filename: string
}

export class ExportCsvService {
  constructor(private repository: ILinkRepository) {}
  /**
   * Generates CSV data from the link repository.
   * - Yields each row as a string.
   * - Uses a batch size to limit memory usage.
   * @returns An async generator yielding CSV rows.
   */
  private async *generateCsv(): AsyncGenerator<string> {
    yield '"originalUrl","shortUrl","accessCount","createdAt"\n'

    const batchSize = 1000
    let lastId: number | null = null
    while (true) {
      const records = await this.repository.findBatch(batchSize, lastId)
      if (records.length === 0) break

      for (const link of records) {
        yield formatCsvRow([
          link.originalUrl,
          link.shortUrl,
          link.accessCount.toString(),
          link.createdAt.toISOString(),
        ])
      }

      lastId = records[records.length - 1].id
    }
  }

  /**
   * Executes the export process:
   * - Generates a sortable UUID v7 filename.
   * - Streams CSV data from the generator.
   * - Uploads the stream to Cloudflare R2 via the shared storage client.
   * @returns The public URL and filename of the uploaded CSV.
   */
  public async execute(): Promise<ExportCsvResult> {
    const filename = `${uuidv7()}.csv`
    const bodyStream = Readable.from(this.generateCsv())

    const uploader = new Upload({
      client: storageClient,
      params: {
        Bucket: bucketName,
        Key: filename,
        Body: bodyStream,
        ContentType: 'text/csv',
      },
      queueSize: 4,
      partSize: 1024 * 1024 * 5, // 5MB
    })

    try {
      await uploader.done()
    } catch (error: any) {
      throw new ApplicationError(
        `Failed to upload CSV to R2: ${error.message}`,
        500
      )
    }

    const url = `${publicUrl}/${filename}`
    return { url, filename }
  }
}
