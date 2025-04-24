import { FC, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Card, Info, LogoIcon } from '@/components'
const API = import.meta.env.VITE_API_URL

export const Redirect: FC = () => {
  const navigate = useNavigate()
  const { shortUrl } = useParams<{ shortUrl: string }>()

  const handleRedirect = useCallback(async () => {
    if (!shortUrl) return

    try {
      const res = await fetch(`${API}/links/${shortUrl}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        const data = (await res.json()) as { originalUrl: string }
        window.location.replace(data.originalUrl)
      }
      if (res.status === 404 || res.status === 400) {
        navigate('/notFound')
        return
      }
    } catch (e) {
      console.error(e)
    }
  }, [shortUrl, navigate])

  useEffect(() => {
    handleRedirect()
  }, [handleRedirect])

  return (
    <Card>
      <Info
        icon={<LogoIcon />}
        title="Redirecionando..."
        description="O link será aberto automaticamente em alguns instantes.
        Não foi redirecionado?"
        actionText="Acesse aqui"
        actionHref="/"
      />
    </Card>
  )
}
