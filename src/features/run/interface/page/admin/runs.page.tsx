import { createRoute } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { client } from '../../../../../shared/interface/lib/client.lib'
import { Suspense } from 'react'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import type { ListRunsDto } from '../../../application/dto/list-runs.dto'
import { adminRoute } from '../../../../app/interface/page/router'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'
import { RunsDataTable } from '../../component/runs-data-table.component'

const runsQueryOptions = () =>
  queryOptions<ListRunsDto>({
    queryKey: ['runsData'],
    queryFn: () => client.runs.$get().then((res) => res.json()),
  })

const AllRunsDataTable = () => {
  const { data } = useSuspenseQuery(runsQueryOptions())
  return <RunsDataTable runs={data.runs} />
}

const RunsPage = () => {
  return (
    <Layout
      breadcrumbs={[
        { title: 'Automations', url: '/admin/automations' },
        { title: 'Runs', url: '/admin/runs' },
      ]}
    >
      <div className="container mx-auto max-w-4xl p-6">
        <TypographyH3 className="mb-4">Runs</TypographyH3>
        <Suspense fallback={<TableSkeleton />}>
          <AllRunsDataTable />
        </Suspense>
      </div>
    </Layout>
  )
}

export const runsAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/runs',
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(runsQueryOptions())
  },
  component: RunsPage,
  head: () => ({
    meta: [
      {
        title: 'Runs - Admin',
      },
      {
        name: 'description',
        content: `Runs page for admin`,
      },
    ],
  }),
})
