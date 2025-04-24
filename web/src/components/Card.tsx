import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const Card: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const base =
    'bg-white rounded-lg p-6 text-center w-full max-w-full sm:max-w-[580px]'
  const classes = twMerge(base, className)
  return <div className={classes}>{children}</div>
}
