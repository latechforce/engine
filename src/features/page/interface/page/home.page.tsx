import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../../../../shared/interface/page/root.layout'
import Hero01 from '../component/hero/hero-01'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { client } from '../../../../shared/interface/lib/client.lib'
import type { GetAppMetadataDto } from '../../../app/application/dto/get-app-metadata.dto'

const HomePage = () => {
  const { data } = useSuspenseQuery(appMetadataQueryOptions())
  return (
    <Hero01
      title={data.app.name}
      badge={`Version ${data.app.version}`}
      description={data.app.description}
      buttonText="Go to Admin"
      buttonLink="/admin"
    />
  )
}

const appMetadataQueryOptions = () =>
  queryOptions<GetAppMetadataDto>({
    queryKey: ['appMetadataData'],
    queryFn: () => client.metadata.app.$get().then((res) => res.json()),
  })

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  loader: async ({ context }) => context.queryClient.ensureQueryData(appMetadataQueryOptions()),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.app.name,
      },
      {
        name: 'description',
        content: loaderData?.app.description,
      },
    ],
  }),
})
