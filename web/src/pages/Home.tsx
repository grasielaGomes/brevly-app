import { useState, FormEvent } from 'react'
import { DownloadSimple, Warning } from '@phosphor-icons/react'
import { CreateLinkSchema, CreateLinkInput } from '@/validations/linkSchemas'
import {
  Button,
  LinkCard,
  Input,
  Card,
  Logo,
  Spinner,
  EmptyList,
} from '@/components'

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

  const hasLinks = links.length > 0

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
    <div className="w-full md:w-3/4 flex flex-col items-center justify-center gap-4">
      <div className="md:self-start">
        <Logo />
      </div>
      <div className="flex flex-col gap-4 justify-center w-full md:flex-row">
        <Card className="max-h-fit md:max-w-[380px]">
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

        <Card className="sm:max-w-full">
          <div className="flex items-center justify-between mb-4 ">
            <div className="flex items-center gap-2">
              <h6 className="text-lg font-bold">Meus links</h6>
              {isLoading && <Spinner />}
            </div>
            <Button
              variant="secondary"
              icon={<DownloadSimple className="h-4 w-4" />}
              onClick={exportCsv}
              disabled={!hasLinks || isLoading}
            >
              Baixar CSV
            </Button>
          </div>
          {!hasLinks && <EmptyList />}
          <div className="max-h-[400px] overflow-y-auto">
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onCopy={copyLink}
                onDelete={deleteLink}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
