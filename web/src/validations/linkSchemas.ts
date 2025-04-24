import { z } from 'zod'

export const CreateLinkSchema = z.object({
  originalUrl: z.string().url('Formato de URL inválido'),
  shortUrl: z
    .string()
    .min(1, 'Slug é obrigatório')
    .regex(
      /^[A-Za-z0-9_-]+$/,
      'O campo “Link encurtado” só pode conter letras, números, hífens e underscores'
    ),
})
export type CreateLinkInput = z.infer<typeof CreateLinkSchema>
