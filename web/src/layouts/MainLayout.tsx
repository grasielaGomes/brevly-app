import { Outlet } from 'react-router'

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-3">
      <Outlet />
    </div>
  )
}
