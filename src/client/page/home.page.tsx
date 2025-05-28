import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './layout'
import Hero01 from '../component/hero/hero-01'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { client } from '../lib/client.lib'
import type { MetadataDto } from '@/application/dto/metadata.dto'

const HomePage = () => {
  const { data } = useSuspenseQuery(metadataQueryOptions())
  return (
    <Hero01
      title={data.metadata.name}
      badge={`Version ${data.metadata.version}`}
      description={data.metadata.description}
      buttonText="Go to Admin"
      buttonLink="/admin"
    />
  )
}

const metadataQueryOptions = () =>
  queryOptions<{ metadata: MetadataDto }>({
    queryKey: ['metadataData'],
    queryFn: () => client.metadata.$get().then((res) => res.json()),
  })

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  loader: async ({ context }) => context.queryClient.ensureQueryData(metadataQueryOptions()),
  head: () => ({
    title: 'Home',
    meta: [
      {
        name: 'description',
        content: `Home page`,
      },
    ],
  }),
})
