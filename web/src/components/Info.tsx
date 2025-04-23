import { FC, ReactNode } from 'react'

export interface InfoProps {
  icon?: ReactNode
  title: string
  description: string
  actionText?: string
  actionHref?: string
}

export const Info: FC<InfoProps> = ({
  icon,
  title,
  description,
  actionText,
  actionHref,
}) => {
  return (
    <div className="text-center space-y-6 text-gray-600 py-8">
      {icon && <div className="flex justify-center">{icon}</div>}
      <h6 className="text-2xl font-bold">{title}</h6>
      <p className="text-sm leading-relaxed whitespace-pre-line">
        {description}
        {actionText && actionHref && (
          <a href={actionHref} className="text-blue-base ml-1">
            {actionText}
          </a>
        )}
      </p>
    </div>
  )
}
