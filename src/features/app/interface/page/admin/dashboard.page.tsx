import { authClient } from '../../../../user/interface/lib/auth.lib'
import { createRoute } from '@tanstack/react-router'
import Layout from './layout'
import { adminRoute } from '../router'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'

export const DashboardPage = () => {
  const { data: session } = authClient.useSession()
  return (
    <Layout breadcrumbs={[{ title: 'Dashboard', url: '/admin' }]}>
      <div className="flex h-full items-center justify-center p-6">
        <TypographyH3>Welcome, {session?.user?.name}.</TypographyH3>
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
