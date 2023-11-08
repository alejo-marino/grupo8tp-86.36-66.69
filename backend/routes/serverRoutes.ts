import { Route } from '../interfaces/server'
import usersRouter from './users.routes'

export const serverRoutes: Route[] = [
  {
    path: '/users',
    router: usersRouter,
  },
]
