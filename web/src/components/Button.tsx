import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import clsx from 'clsx'

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  icon?: ReactNode
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  disabled = false,
  icon,
  children,
  className,
  ...props
}) => {
  const variantClasses = {
    primary: clsx(
      'h-12 px-20 rounded-md font-500 text-sm transition-all duration-200',
      'bg-blue-base text-white',
      !disabled && 'cursor-pointer hover:bg-blue-dark',
      disabled && 'bg-blue-base/50 text-white cursor-not-allowed'
    ),
    secondary: clsx(
      'inline-flex items-center h-9 px-2 rounded-sm font-500 text-xs transition-all duration-200',
      'bg-gray-200 text-gray-500',
      !disabled &&
        'cursor-pointer hover:border-blue-base border border-transparent',
      disabled && 'opacity-50 cursor-not-allowed'
    ),
  }

  return (
    <button
      className={clsx(variantClasses[variant], className)}
      disabled={disabled}
      {...props}
    >
      {variant === 'secondary' && icon && (
        <span className="inline-flex items-center justify-center h-4 w-4 mr-1">
          {icon}
        </span>
      )}
      {children}
    </button>
  )
}
