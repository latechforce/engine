import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/shared/client/page/root.layout'
import { formsAdminRoute } from './admin/forms/forms.page'
import { dashboardAdminRoute } from './admin/dashboard.page'
import { loginAdminRoute } from './admin/login.page'
import { automationsAdminRoute } from './admin/automations/automations.page'
import { runsAdminRoute } from './admin/automations/runs.page'
import { openapiAdminRoute } from './admin/openapi.page'
import { connectionsAdminRoute } from './admin/automations/connections.page'

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
})

adminRoute.addChildren([
  loginAdminRoute,
  dashboardAdminRoute,
  automationsAdminRoute,
  runsAdminRoute,
  openapiAdminRoute,
  connectionsAdminRoute,
  formsAdminRoute,
])
