import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './root.layout'
import { formRoute } from '../../../features/form/interface/page/form.page'
import { queryClient } from '../lib/query.lib'
import { notFoundRoute } from './notFound.page'
import { adminRoute } from '../../../features/app/interface/page/router'
import { homeRoute } from '../../../features/page/interface/page/home.page'
import { loginAdminRoute } from '../../../features/user/interface/page/login.page'
import { automationsAdminRoute } from '../../../features/automation/interface/page/admin/automations.page'
import { dashboardAdminRoute } from '../../../features/app/interface/page/admin/dashboard.page'
import { runsAdminRoute } from '../../../features/run/interface/page/admin/runs.page'
import { openapiAdminRoute } from '../../../features/app/interface/page/admin/openapi.page'
import { connectionsAdminRoute } from '../../../features/connection/interface/page/admin/connections.page'
import { formsAdminRoute } from '../../../features/form/interface/page/admin/forms.page'
import {
  tablesAdminRoute,
  tablesRedirectAdminRoute,
} from '../../../features/table/interface/page/admin/tables.page'
import { runAdminRoute } from '../../../features/run/interface/page/admin/run.page'
import { recordAdminRoute } from '../../../features/table/interface/page/admin/record.page'

const routeTree = rootRoute.addChildren([
  notFoundRoute,
  formRoute,
  homeRoute,
  adminRoute.addChildren([
    loginAdminRoute,
    dashboardAdminRoute,
    automationsAdminRoute,
    runsAdminRoute,
    runAdminRoute,
    openapiAdminRoute,
    connectionsAdminRoute,
    formsAdminRoute,
    tablesAdminRoute,
    tablesRedirectAdminRoute,
    recordAdminRoute,
  ]),
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
