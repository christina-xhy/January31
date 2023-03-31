import { createBrowserRouter, Navigate } from 'react-router-dom'
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
import axios, { AxiosError } from 'axios'
import { ItemsErrorPage } from '../pages/ItemsPageError'
import { preload } from 'swr'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/home',
    element: <Home title='首页' />
  },
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
  {
    path: '/items',
    element: <ItemsPage title='记账页面' />,
    errorElement: <ItemsErrorPage />,
    loader: async () => {
      const onError = (error: AxiosError) => {
        const errors = error.response?.status
        if (errors === 401) {
          throw new Error('unAuthorized')
        } else {
          throw error
        }
      }
      return preload('/api/v1/items?page=1', async (path) => {
        debugger
        const response = await axios.get<Resources<Item>>(path).catch(onError)
        if (response.data.resources.length > 0) {
          return response.data
        } else {
          throw new Error('not_found')
        }
      })
    }
  },
  { path: '/items/new', element: <NewItemsPage /> },
  { path: '/tags/new', element: <TagsNewPage /> },
  { path: '/sign_in', element: <SignInPage /> },
  { path: '/chart', element: <div>图表</div> },
  { path: '/export', element: <div>敬请期待</div> },
  { path: '/tags', element: <div>标签</div> },
  { path: '/tags/:id', element: <TagsEditPage /> },
  { path: '/statistics', element: <StatisticPage /> },
  { path: '/notice', element: <div>敬请期待</div> },

])
