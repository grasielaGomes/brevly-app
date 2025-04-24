import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateLinkInput, ShortUrlParams } from '@/validations/linkSchemas'
import { PrismaLinkRepository } from '@/repositories/PrismaLinkRepository'
import {
  CreateLinkService,
  DeleteLinkService,
  ListLinksService,
  GetOriginalUrlService,
  ExportCsvService,
} from '@/services'

export class LinkController {
  private repo = new PrismaLinkRepository()
  private createSvc = new CreateLinkService(this.repo)
  private deleteSvc = new DeleteLinkService(this.repo)
  private listSvc = new ListLinksService(this.repo)
  private getSvc = new GetOriginalUrlService(this.repo)
  private exportSvc = new ExportCsvService(this.repo)

  public create = async (
    request: FastifyRequest<{ Body: CreateLinkInput }>,
    reply: FastifyReply
  ) => {
    const link = await this.createSvc.execute(request.body)
    return reply.code(201).send(link)
  }

  public list = async (_: FastifyRequest, reply: FastifyReply) => {
    const links = await this.listSvc.execute()
    return reply.send(links)
  }

  public remove = async (
    request: FastifyRequest<{ Params: ShortUrlParams }>,
    reply: FastifyReply
  ) => {
    const { shortUrl } = request.params
    await this.deleteSvc.execute(shortUrl)
    return reply.code(204).send()
  }

  public getOriginalUrl = async (
    request: FastifyRequest<{ Params: ShortUrlParams }>,
    reply: FastifyReply
  ) => {
    const { shortUrl } = request.params
    const link = await this.getSvc.execute(shortUrl)
    return reply.send({ originalUrl: link.originalUrl })
  }

  public exportCsv = async (_: FastifyRequest, reply: FastifyReply) => {
    const { url, filename } = await this.exportSvc.execute()
    return reply.send({ url, filename })
  }
}
