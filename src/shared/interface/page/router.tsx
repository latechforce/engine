import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './root.layout'
import { formRoute } from '@/form/interface/page/form.page'
import { queryClient } from '../lib/query.lib'
import { notFoundRoute } from './notFound.page'
import { adminRoute } from '@/app/interface/page/router'
import { homeRoute } from '@/page/interface/page/home.page'

const routeTree = rootRoute.addChildren([notFoundRoute, formRoute, homeRoute, adminRoute])

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
