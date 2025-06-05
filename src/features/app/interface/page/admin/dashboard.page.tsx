import { authClient } from '../../../../user/interface/lib/auth.lib'
import { createRoute } from '@tanstack/react-router'
import Layout from './layout'
import { adminRoute } from '../router'
import {
  TypographyBlockquote,
  TypographyH3,
} from '../../../../../shared/interface/ui/typography.ui'

export const DashboardPage = () => {
  const { data: session } = authClient.useSession()
  return (
    <Layout breadcrumbs={[{ title: 'Dashboard', url: '/admin' }]}>
      <div className="p-6">
        <TypographyH3 className="mb-4">Dashboard</TypographyH3>
        <TypographyBlockquote>
          Welcome to the Admin Dashboard, "{session?.user?.name}"!
        </TypographyBlockquote>
      </div>
    </Layout>
  )
}

export const dashboardAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/',
  component: DashboardPage,
  head: () => ({
    meta: [
      {
        title: 'Dashboard - Admin',
      },
      {
        name: 'description',
        content: `Dashboard page for admin`,
      },
    ],
  }),
})
