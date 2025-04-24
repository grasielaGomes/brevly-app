import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import clsx from 'clsx'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
}

export const IconButton: FC<IconButtonProps> = ({
  icon,
  disabled = false,
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center transition-all duration-200 '
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
  const hoverStyles = !disabled ? 'cursor-pointer hover:border-blue-base' : ''

  const classes = clsx(
    baseStyles,
    'h-9 w-9 rounded-md bg-gray-200 text-gray-500 border border-transparent',
    hoverStyles,
    disabledStyles,
    className
  )

  return (
    <button className={classes} disabled={disabled} {...props}>
      {icon}
    </button>
  )
}
