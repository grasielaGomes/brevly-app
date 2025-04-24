import { FC } from 'react'
import { Link } from '@/interfaces/links'
import { Copy, Trash } from '@phosphor-icons/react'
import { IconButton } from './IconButton'

interface LinkCardProps {
  link: Link
  onCopy: (slug: string) => void
  onDelete: (slug: string) => void
}

export const LinkCard: FC<LinkCardProps> = ({ link, onCopy, onDelete }) => {
  return (
    <div className="flex items-center justify-between py-2 border-t border-gray-200 first:border-t-0">
      <div className="flex-1 text-left">
        <a
          href={`/${link.shortUrl}`}
          className="text-blue-base block truncate text-sm font-medium"
        >
          brev.ly/{link.shortUrl}
        </a>
        <p className="text-gray-400 text-xs truncate">{link.originalUrl}</p>
      </div>
      <span className="text-gray-500 text-xs mr-4">
        {link.accessCount} acessos
      </span>
      <IconButton
        icon={<Copy className="h-4 w-4" />}
        onClick={() => onCopy(link.shortUrl)}
        className="mr-2"
      />
      <IconButton
        icon={<Trash className="h-4 w-4" />}
        onClick={() => onDelete(link.shortUrl)}
      />
    </div>
  )
}
