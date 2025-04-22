import { PropsWithChildren } from 'react'

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
      {children}
    </div>
  )
}
