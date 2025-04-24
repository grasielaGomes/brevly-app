import { useState, FormEvent } from 'react'
import { DownloadSimple, Warning } from '@phosphor-icons/react'
import { CreateLinkSchema, CreateLinkInput } from '@/validations/linkSchemas'
import { Button, LinkCard, Input, Card } from '@/components'
import { useLinks } from '@/hooks/useLinks'

export const Home = () => {
  const { links, isLoading, createLink, deleteLink, exportCsv, copyLink } =
    useLinks()
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [apiError, setApiError] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<
    Partial<Record<keyof CreateLinkInput, string>>
  >({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFieldError({})

    const result = CreateLinkSchema.safeParse({ originalUrl, shortUrl })
    if (!result.success) {
      const fieldError: Partial<Record<keyof CreateLinkInput, string>> = {}
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof CreateLinkInput
        if (!fieldError[fieldName]) {
          fieldError[fieldName] = issue.message
        }
      }
      setFieldError(fieldError)
      return
    }
    try {
      await createLink(result.data)
      setOriginalUrl('')
      setShortUrl('')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message)
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full md:flex-row md:w-5/6">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h6 className="text-lg font-bold text-left">Novo link</h6>
          <Input
            id="originalUrl"
            label="Link original"
            placeholder="https://www.exemplo.com.br"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            disabled={isLoading}
            error={!!fieldError.originalUrl}
            hint={fieldError.originalUrl}
            hintIcon={<Warning />}
          />
          <Input
            id="shortUrl"
            label="Link encurtado"
            placeholder="brev.ly"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            disabled={isLoading}
            error={!!fieldError.shortUrl}
            hint={fieldError.shortUrl}
            hintIcon={<Warning />}
          />
          {apiError && (
            <p className="text-danger text-[10px] text-left">{apiError}</p>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={!originalUrl || !shortUrl || isLoading}
            className="w-full"
          >
            Salvar link
          </Button>
        </form>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold">Meus links</h6>
          <Button
            variant="secondary"
            icon={<DownloadSimple className="h-4 w-4" />}
            onClick={exportCsv}
          >
            Baixar CSV
          </Button>
        </div>
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onCopy={copyLink}
            onDelete={deleteLink}
          />
        ))}
      </Card>
    </div>
  )
}
