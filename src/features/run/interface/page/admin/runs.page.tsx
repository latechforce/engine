import { createRoute } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { DataTable } from '../../../../../shared/interface/component/data-table.component'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { client } from '../../../../../shared/interface/lib/client.lib'
import type { RunDto } from '../../../application/dto/run.dto'
import { Suspense } from 'react'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import type { ListRunsDto } from '../../../application/dto/list-runs.dto'
import { adminRoute } from '../../../../app/interface/page/router'
import { TypographyH3 } from 'src/shared/interface/ui/typography.ui'

const columns: ColumnDef<RunDto>[] = [
  {
    accessorKey: 'automation_name',
    header: 'Automation',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      return format(new Date(row.getValue('created_at')), 'dd/MM/yyyy HH:mm:ss')
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]

const runsQueryOptions = () =>
  queryOptions<ListRunsDto>({
    queryKey: ['runsData'],
    queryFn: () => client.runs.$get().then((res) => res.json()),
  })

const RunsDataTable = () => {
  const { data } = useSuspenseQuery(runsQueryOptions())
  return (
    <DataTable
      columns={columns}
      data={data.runs}
    />
  )
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
          <RunsDataTable />
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
