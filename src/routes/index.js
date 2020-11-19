import Root from '../components/Root'
import Bundle from '../components/Bundle'

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/login',
        exact: true,
        component: Bundle(() => import('../pages/Login')),
      },
      {
        path: '/',
        component: Bundle(() => import('../pages/Home/components/Root')),
        routes: [
          {
            path: '/',
            exact: true,
            component: Bundle(() => import('../pages/Home')),
          },
          {
            path: '/tasks',
            exact: true,
            component: Bundle(() => import('../pages/Task')),
          },
          {
            path: '/books',
            exact: true,
            component: Bundle(() => import('../pages/Books')),
          },
          {
            path: '/book/:bookId',
            exact: true,
            component: Bundle(() => import('../pages/Book')),
          },
          {
            path: '/chapter/:chapterId',
            exact: true,
            component: Bundle(() => import('../pages/Chapter')),
          },
        ],
      },
    ],
  },
]

export default routes
