import { createRoute } from '@tanstack/react-router'
import Layout from './layout'
import { adminRoute } from '../router'

export const APIPage = () => {
  return (
    <Layout breadcrumbs={[{ title: 'API Docs', url: '/admin/api' }]}>
      <div className="h-full w-full">
        <iframe
          src="/openapi/scalar"
          title="API Docs"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    </Layout>
  )
}

export const apiAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/api',
  component: APIPage,
  head: () => ({
    meta: [
      {
        title: 'API Docs - Admin',
      },
      {
        name: 'description',
        content: `API page for admin`,
      },
    ],
  }),
})
