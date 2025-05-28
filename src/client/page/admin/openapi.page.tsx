import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'
import Layout from './layout'

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
  getParentRoute: () => rootRoute,
  path: '/admin/openapi',
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
