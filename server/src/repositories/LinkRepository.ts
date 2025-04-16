import prisma from '@/plugins/prisma'
import { Link } from '@/domain/models'
import { ILinkRepository } from '@/domain/repositories'

export class PrismaLinkRepository implements ILinkRepository {
  async create(data: { originalUrl: string; shortUrl: string }): Promise<Link> {
    const record = await prisma.link.create({
      data: {
        originalUrl: data.originalUrl,
        shortUrl: data.shortUrl,
      },
    })

    return {
      id: record.id,
      originalUrl: record.originalUrl,
      shortUrl: record.shortUrl,
      accessCount: record.accessCount,
      createdAt: record.createdAt,
    }
  }

  async findByShortUrl(shortUrl: string): Promise<Link | null> {
    const record = await prisma.link.findUnique({
      where: { shortUrl },
    })
    if (!record) {
      return null
    }
    return {
      id: record.id,
      originalUrl: record.originalUrl,
      shortUrl: record.shortUrl,
      accessCount: record.accessCount,
      createdAt: record.createdAt,
    }
  }

  async findAll(): Promise<Link[]> {
    const records = await prisma.link.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return records.map((record) => ({
      id: record.id,
      originalUrl: record.originalUrl,
      shortUrl: record.shortUrl,
      accessCount: record.accessCount,
      createdAt: record.createdAt,
    }))
  }

  async delete(id: number): Promise<void> {
    await prisma.link.delete({
      where: { id },
    })
  }

  async incrementAccessCount(shortUrl: string): Promise<void> {
    await prisma.link.update({
      where: { shortUrl },
      data: {
        accessCount: {
          increment: 1,
        },
      },
    })
  }
}
