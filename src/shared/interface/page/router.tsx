import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './root.layout'
import { formRoute } from '@/form/interface/page/form.page'
import { queryClient } from '../lib/query.lib'
import { notFoundRoute } from './notFound.page'
import { adminRoute } from '@/app/interface/page/router'
import { homeRoute } from '@/page/interface/page/home.page'
import { loginAdminRoute } from '@/user/interface/page/login.page'
import { automationsAdminRoute } from '@/automation/interface/page/admin/automations.page'
import { dashboardAdminRoute } from '@/app/interface/page/admin/dashboard.page'
import { runsAdminRoute } from '@/run/interface/page/admin/runs.page'
import { openapiAdminRoute } from '@/app/interface/page/admin/openapi.page'
import { connectionsAdminRoute } from '@/connection/interface/page/admin/connections.page'
import { formsAdminRoute } from '@/form/interface/page/admin/forms.page'
import {
  tablesAdminRoute,
  tablesRedirectAdminRoute,
} from '@/table/interface/page/admin/tables.page'

const routeTree = rootRoute.addChildren([
  notFoundRoute,
  formRoute,
  homeRoute,
  adminRoute.addChildren([
    loginAdminRoute,
    dashboardAdminRoute,
    automationsAdminRoute,
    runsAdminRoute,
    openapiAdminRoute,
    connectionsAdminRoute,
    formsAdminRoute,
    tablesAdminRoute,
    tablesRedirectAdminRoute,
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
