// Third-party imports
import { createRoute } from '@tanstack/react-router'

// Shared client imports
import { rootRoute } from '@/shared/interface/page/root.layout'

// App client imports
import { automationsAdminRoute } from './admin/automations/automations.page'
import { connectionsAdminRoute } from './admin/automations/connections.page'
import { dashboardAdminRoute } from './admin/dashboard.page'
import { formsAdminRoute } from './admin/forms/forms.page'
import { loginAdminRoute } from './admin/login.page'
import { openapiAdminRoute } from './admin/openapi.page'
import { runsAdminRoute } from './admin/automations/runs.page'

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
