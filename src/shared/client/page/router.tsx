import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './root.layout'
import { formRoute } from '@/form/client/page/form.page'
import { queryClient } from '../lib/query.lib'
import { notFoundRoute } from './notFound.page'
import { adminRoute } from '@/app/client/page/router'
import { homeRoute } from '@/app/client/page/home.page'

const routeTree = rootRoute.addChildren([notFoundRoute, homeRoute, formRoute, adminRoute])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  context: { queryClient },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
