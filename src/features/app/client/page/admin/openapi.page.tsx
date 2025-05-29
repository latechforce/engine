import { createRoute } from '@tanstack/react-router'
import Layout from './layout'
import { adminRoute } from '../router'

export const OpenAPIPage = () => {
  return (
    <Layout breadcrumbs={[{ title: 'OpenAPI', url: '/admin/openapi' }]}>
      <div className="h-full w-full">
        <iframe
          src="/openapi/scalar"
          title="API Documentation"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    </Layout>
  )
}

export const openapiAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/openapi',
  component: OpenAPIPage,
  head: () => ({
    meta: [
      {
        title: 'OpenAPI - Admin',
      },
      {
        name: 'description',
        content: `OpenAPI page for admin`,
      },
    ],
  }),
})
