import { Readable } from 'node:stream'
import { ExportCsvService } from '@/services/ExportCsvService'
import { FakeLinkRepository } from '@/services/test/mocks'

vi.mock('@/plugins/r2Client', () => ({
  storageClient: {},
  bucketName: 'test-bucket',
  publicUrl: 'test-endpoint',
}))

vi.mock('@aws-sdk/lib-storage', () => {
  let capturedBodyStream: any
  const doneSpy = vi.fn().mockResolvedValue(undefined)
  const Upload = vi.fn().mockImplementation((options: any) => {
    capturedBodyStream = options.params.Body
    return {
      params: options.params,
      done: () => doneSpy(),
    }
  })
  return {
    __esModule: true,
    Upload,
    doneSpy,
    getCapturedBodyStream: () => capturedBodyStream,
  }
})

describe('ExportCsvService', () => {
  let repo: FakeLinkRepository
  let service: ExportCsvService

  beforeEach(() => {
    repo = new FakeLinkRepository()
    repo.clear()
    service = new ExportCsvService(repo)
    vi.clearAllMocks()
  })

  it('returns a valid { url, filename } and calls Upload', async () => {
    const sampleLinks = [
      {
        id: 1,
        originalUrl: 'https://example.com',
        shortUrl: 'abc123',
        accessCount: 10,
        createdAt: new Date('2025-04-17T00:00:00Z'),
      },
    ]
    repo['links'] = sampleLinks

    const result = await service.execute()

    expect(result).toHaveProperty('url')
    expect(result).toHaveProperty('filename')
    expect(result.url).toMatch(/^test-endpoint\/.+\.csv$/)
    expect(result.filename).toMatch(/.+\.csv$/)
  })

  it('sends correct CSV content via Upload Body', async () => {
    const sampleLinks = [
      {
        id: 1,
        originalUrl: 'https://example.com',
        shortUrl: 'abc123',
        accessCount: 10,
        createdAt: new Date('2025-04-17T00:00:00.000Z'),
      },
      {
        id: 2,
        originalUrl: 'https://another.com',
        shortUrl: 'xyz789',
        accessCount: 5,
        createdAt: new Date('2025-04-16T00:00:00.000Z'),
      },
    ]
    repo['links'] = sampleLinks

    await service.execute()
    const { getCapturedBodyStream } = (await import(
      '@aws-sdk/lib-storage'
    )) as any
    const bodyStream: Readable = getCapturedBodyStream()

    const chunks: Buffer[] = []
    for await (const chunk of bodyStream) {
      chunks.push(Buffer.from(chunk))
    }
    const csvContent = Buffer.concat(chunks).toString('utf-8')

    const expectedLines = [
      '"originalUrl","shortUrl","accessCount","createdAt"',
      '"https://example.com","abc123","10","2025-04-17T00:00:00.000Z"',
      '"https://another.com","xyz789","5","2025-04-16T00:00:00.000Z"',
    ]
    const expectedCsv = expectedLines.join('\n') + '\n'
    expect(csvContent).toBe(expectedCsv)
  })
})
