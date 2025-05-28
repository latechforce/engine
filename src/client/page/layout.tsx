import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, HeadContent, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const RootLayout = () => {
  return (
    <>
      <HeadContent />
      <Outlet />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  )
}

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootLayout,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  },
})
