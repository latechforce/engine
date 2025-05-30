import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/shared/interface/page/root.layout'
import Hero01 from '../component/hero/hero-01'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { client } from '@/shared/interface/lib/client.lib'
import type { AppMetadataDto } from '@/app/application/dto/metadata.dto'

// TODO: Make this server-side rendered
const HomePage = () => {
  const { data } = useSuspenseQuery(metadataQueryOptions())
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

const metadataQueryOptions = () =>
  queryOptions<AppMetadataDto>({
    queryKey: ['metadataData'],
    queryFn: () => client.metadata.$get().then((res) => res.json()),
  })

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  loader: async ({ context }) => context.queryClient.ensureQueryData(metadataQueryOptions()),
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
