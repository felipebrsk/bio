import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

import { Loadable as L } from './components'
import Error from './pages/Error'

export const Routes = () => {
  const Home = L(lazy(() => import('./pages/Home')))

  return useRoutes([
    { path: '/', element: <Home /> },
    {
      path: '*',
      element: (
        <Error
          error={404}
          description="Your path is lost in the darkness..."
        />
      ),
    },
  ])
}
