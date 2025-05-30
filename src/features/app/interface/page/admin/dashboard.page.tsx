import { authClient } from '@/shared/interface/lib/auth.lib'
import { createRoute } from '@tanstack/react-router'
import Layout from './layout'
import { adminRoute } from '../router'

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
