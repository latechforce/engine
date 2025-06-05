import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { type GetRunDto } from '../../../application/dto/get-run.dto'
import { client } from '../../../../../shared/interface/lib/client.lib'
import Layout from '../../../../app/interface/page/admin/layout'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'
import { createRoute, useParams } from '@tanstack/react-router'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import { Suspense } from 'react'
import { adminRoute } from '../../../../app/interface/page/router'

const runQueryOptions = (runId: string) =>
  queryOptions<GetRunDto>({
    queryKey: ['runData', runId],
    queryFn: () => client.runs[':runId'].$get({ param: { runId } }).then((res) => res.json()),
  })

const RunDataPage = () => {
  const { runId } = useParams({ from: '/admin/runs/$runId' })
  const { data } = useSuspenseQuery(runQueryOptions(runId))
  return (
    <div>
      <TypographyH3 className="mb-4">{data.run.automation_name}</TypographyH3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const RunPage = () => {
  const { runId } = useParams({ from: '/admin/runs/$runId' })
  const { data } = useQuery(runQueryOptions(runId))
  return (
    <Layout
      breadcrumbs={[
        { title: 'Automations', url: '/admin/automations' },
        { title: 'Runs', url: '/admin/runs' },
        { title: data?.run.automation_name ?? 'Run', url: '/admin/runs/' + data?.run.id },
      ]}
    >
      <div className="container p-6">
        <Suspense fallback={<TableSkeleton />}>
          <RunDataPage />
        </Suspense>
      </div>
    </Layout>
  )
}

export const runAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/runs/$runId',
  loader: async ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(runQueryOptions(params.runId))
  },
  component: RunPage,
  head: ({ loaderData }) => {
    const run = loaderData?.run
    return {
      meta: [
        {
          title: run ? `Run ${run.automation_name} - Admin` : 'Run - Admin',
        },
        {
          name: 'description',
          content: run ? `Run ${run.automation_name} page for admin` : 'Run page for admin',
        },
      ],
    }
  },
})
