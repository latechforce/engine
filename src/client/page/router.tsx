import { createRouter } from '@tanstack/react-router'
import { homeRoute } from './home.page'
import { rootRoute } from './layout'
import { dashboardAdminRoute } from './admin/dashboard.page'
import { automationsAdminRoute } from './admin/automations/automations.page'
import { runsAdminRoute } from './admin/automations/runs.page'
import { loginAdminRoute } from './admin/login.page'
import { openapiAdminRoute } from './admin/openapi.page'
import { connectionsAdminRoute } from './admin/automations/connections.page'
import { formsAdminRoute } from './admin/forms/forms.page'
import { formRoute } from './form.page'
import { queryClient } from '../lib/query.lib'
import { notFoundRoute } from './notFound.page'

const routeTree = rootRoute.addChildren([
  notFoundRoute,
  homeRoute,
  formRoute,
  loginAdminRoute,
  dashboardAdminRoute,
  automationsAdminRoute,
  runsAdminRoute,
  openapiAdminRoute,
  connectionsAdminRoute,
  formsAdminRoute,
])

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
