import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Root } from '../components/Root'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { Home } from '../pages/Home'
import { ItemsPage } from '../pages/ItemsPage'
import { SignInPage } from '../pages/SignInPage'
import { NewItemsPage } from '../pages/newItemsPage/NewItemsPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { TagsEditPage } from '../pages/TagsEditPage'
import { StatisticPage } from '../pages/StatisticPage'
import { ItemsErrorPage } from '../pages/ItemsPageError'
import { ErrorEmptyData, ErrorUnAuthorized } from '../errors'
import { ErrorPage } from '../pages/ErrorPage'
import { ajax } from '../lib/ajax'
import { ComingSoonPage } from '../pages/ComingSoonPage'

export const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/home', element: <Home title='首页' /> },
  {
    path: '/welcome',
    element: <WelcomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '1', element: <Welcome1 /> },
      { path: '2', element: <Welcome2 /> },
      { path: '3', element: <Welcome3 /> },
      { path: '4', element: <Welcome4 /> },
    ],
  },
  { path: '/sign_in', element: <SignInPage /> },

  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    // loader: async () =>
    //   preload('/api/v1/me', (path) => axios.get<Resource<User>>(path)
    //     .then(response => response.data, e => { throw new ErrorUnAuthorized() })
    //   ),
    loader: async () => {
      return await ajax.get<Resource<User>>('/api/v1/me').catch(e => {
        if (e.response?.status === 401) {
          throw new ErrorUnAuthorized
        }
      })
    },
    children: [
      {
        path: '/items',
        element: <ItemsPage title='记账页面' />,
        errorElement: <ItemsErrorPage />,
        loader: async () => {
          const onError = (error: AxiosError) => {
            const errors = error.response?.status
            if (errors === 401) {
              throw new ErrorUnAuthorized()
            } else {
              throw error
            }
          }
          const response = await ajax.get<Resources<Item>>('/api/v1/items?page=1').catch(onError)
          if (response.data.resources.length > 0) {
            return response.data
          } else {
            throw new ErrorEmptyData()
          }
        }
      },
      { path: '/items/new', element: <NewItemsPage /> },
      { path: '/tags/new', element: <TagsNewPage /> },
      { path: '/chart', element: <div>图表</div> },
      { path: '/export', element: <ComingSoonPage /> },
      { path: '/tags', element: <ComingSoonPage /> },
      { path: '/tags/:id', element: <TagsEditPage /> },
      { path: '/statistics', element: <StatisticPage /> },
      { path: '/notice', element: <ComingSoonPage /> },
    ]
  },
])
