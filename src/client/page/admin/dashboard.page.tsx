import { authClient } from '@/client/lib/auth.lib'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'
import Layout from './layout'

export const DashboardPage = () => {
  const { data: session } = authClient.useSession()
  return (
    <Layout breadcrumbs={[{ title: 'Dashboard', url: '/admin' }]}>
      <div className="p-6">
        <p>Welcome to the admin dashboard "{session?.user?.email}"!</p>
        <button onClick={() => authClient.signOut()}>Sign out</button>
      </div>
    </Layout>
  )
}

export const dashboardAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
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
