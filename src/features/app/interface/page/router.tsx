import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/shared/interface/page/root.layout'

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
})
