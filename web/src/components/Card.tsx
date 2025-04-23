import { FC, PropsWithChildren } from 'react'

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-full sm:max-w-[580px] text-center">
      {children}
    </div>
  )
}
