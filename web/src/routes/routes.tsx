import { MainLayout } from '@/layouts'
import { Home, NotFound, Redirect } from '@/pages'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: '/redirect', element: <Redirect /> },
    ],
    errorElement: <NotFound />,
  },
])
