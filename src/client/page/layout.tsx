import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const RootLayout = () => {
  return (
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const rootRoute = createRootRoute({
  component: RootLayout,
})
