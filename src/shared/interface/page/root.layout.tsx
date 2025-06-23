import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, HeadContent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NotFoundPage } from './notFound.page'
import { Toaster } from '../ui/sonner.ui'

export const RootLayout = () => {
  return (
    <>
      <HeadContent />
      <Outlet />
      <Toaster position="top-center" />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  )
}

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  head: () => ({
    links: [
      {
        rel: 'icon',
        href: '/static/favicon.ico',
      },
    ],
  }),
})
