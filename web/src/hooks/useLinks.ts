import { Link } from '@/interfaces/links'
import { useState, useEffect, useCallback } from 'react'
const API = import.meta.env.VITE_API_URL

interface ExportResponse {
  url: string
  filename: string
}

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchLinks = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${API}/links`)
      if (!res.ok) throw new Error('Failed to fetch links')
      const data: Link[] = await res.json()
      setLinks(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchLinks()
  }, [fetchLinks])

  const createLink = useCallback(
    async ({
      originalUrl,
      shortUrl,
    }: {
      originalUrl: string
      shortUrl: string
    }) => {
      setIsLoading(true)
      try {
        const res = await fetch(`${API}/links`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ originalUrl, shortUrl }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to create link')
        const newLink: Link = await res.json()
        setLinks((prev) => [newLink, ...prev])
      } catch (err) {
        console.error(err)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const deleteLink = useCallback(async (slug: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${API}/links/${slug}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete link')
      setLinks((prev) => prev.filter((l) => l.shortUrl !== slug))
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const exportCsv = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${API}/links/export`)
      if (!res.ok) throw new Error('Failed to export CSV')
      const data: ExportResponse = await res.json()
      window.open(data.url, '_blank')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const copyLink = useCallback((slug: string) => {
    const url = `${window.location.origin}/${slug}`
    navigator.clipboard.writeText(url).catch(console.error)
  }, [])

  return {
    links,
    isLoading,
    createLink,
    deleteLink,
    exportCsv,
    copyLink,
  }
}
