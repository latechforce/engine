import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../../layout'
import Layout from '../layout'
import { DataTable } from '@/client/component/data-table.component'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { client } from '@/client/lib/client.lib'
import type { RunDto } from '@/application/dto/run/run.dto'
import { Suspense } from 'react'
import { TableSkeleton } from '@/client/ui/table.ui'
import type { ListRunsDto } from '@/application/dto/run/list-runs.dto'

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
    accessorKey: 'updated_at',
    header: 'Updated At',
    cell: ({ row }) => {
      return format(new Date(row.getValue('updated_at')), 'dd/MM/yyyy HH:mm:ss')
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
        { title: 'History', url: '/admin/automation/history' },
      ]}
    >
      <div className="p-6">
        <Suspense fallback={<TableSkeleton />}>
          <RunsDataTable />
        </Suspense>
      </div>
    </Layout>
  )
}

export const runsAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/runs',
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
