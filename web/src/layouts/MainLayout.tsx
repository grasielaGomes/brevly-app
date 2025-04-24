import { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-3">
      <Outlet />
      {children}
    </div>
  )
}
