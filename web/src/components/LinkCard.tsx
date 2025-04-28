import { FC } from 'react'
import { Link } from 'react-router'
import { Copy, Trash } from '@phosphor-icons/react'
import { ILink } from '@/interfaces/link'
import { IconButton } from '@/components'

interface LinkCardProps {
  link: ILink
  onCopy: (slug: string) => void
  onDelete: (slug: string) => void
}

export const LinkCard: FC<LinkCardProps> = ({ link, onCopy, onDelete }) => {
  return (
    <div className="flex items-center justify-between py-2 border-t border-gray-200 first:border-t-0">
      <div className="flex-1 text-left overflow-hidden whitespace-nowrap">
        <Link
          to={`/${link.shortUrl}`}
          className="text-blue-base text-sm font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          brev.ly/{link.shortUrl}
        </Link>
        <p className="text-gray-400 text-xs truncate ">{link.originalUrl}</p>
      </div>
      <span className="text-gray-500 text-xs mr-4">
        {link.accessCount ?? 0} {link.accessCount === 1 ? 'acesso' : 'acessos'}
      </span>
      <IconButton
        icon={<Copy className="h-4 w-4" />}
        onClick={() => onCopy(link.shortUrl)}
        className="mr-2 flex-shrink-0"
      />
      <IconButton
        icon={<Trash className="h-4 w-4" />}
        onClick={() => onDelete(link.shortUrl)}
        className="flex-shrink-0"
      />
    </div>
  )
}
