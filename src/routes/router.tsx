import { createBrowserRouter, Outlet } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Root } from '../components/Root'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { Home } from '../pages/Home'
import { ItemsPage } from '../pages/ItemsPage'

export const router = createBrowserRouter([
  {
    path:'/',
    element: <Root />
  },
  {
    path:'/home',
    element:<Home title = '首页'/>
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
    path:'/items',
    element: <ItemsPage title='记账页面'/>
  },
  {path:'/sign_in', element: <div>sign in</div> },
  {path:'/chart', element: <div>图表</div> },
  {path:'/export', element: <div>敬请期待</div> },
  {path:'/tags', element: <div>标签</div> },
  {path:'/notice', element: <div>敬请期待</div> },
])
