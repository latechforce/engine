import { createRouter } from '@tanstack/react-router'
import { homeRoute } from './home.page'
import { rootRoute } from './layout'
import { dashboardAdminRoute } from './admin/dashboard.page'
import { automationsAdminRoute } from './admin/automations.page'
import { automationHistoryAdminRoute } from './admin/automation-history.page'
import { loginAdminRoute } from './admin/login.page'
import { openapiAdminRoute } from './admin/openapi.page'
import { connectionsAdminRoute } from './admin/connections.page'

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginAdminRoute,
  dashboardAdminRoute,
  automationsAdminRoute,
  automationHistoryAdminRoute,
  openapiAdminRoute,
  connectionsAdminRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
