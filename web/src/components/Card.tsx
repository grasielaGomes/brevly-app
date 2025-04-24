import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

export const Card: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const classes = clsx(
    'bg-white rounded-lg p-6 text-center w-full max-w-full sm:max-w-[580px]',
    className
  )
  return <div className={classes}>{children}</div>
}
