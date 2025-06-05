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
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'
import { CheckCircle, Filter, Play, XCircle } from 'lucide-react'

const columns: ColumnDef<RunDto>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    size: 50,
    cell: ({ row }) => {
      switch (row.original.status) {
        case 'success':
          return (
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle /> Success
            </div>
          )
        case 'stopped':
          return (
            <div className="flex items-center gap-2 text-red-700">
              <XCircle /> Stopped
            </div>
          )
        case 'filtered':
          return (
            <div className="flex items-center gap-2 text-gray-500">
              <Filter /> Filtered
            </div>
          )
        case 'playing':
          return (
            <div className="flex items-center gap-2 text-blue-700">
              <Play /> Playing
            </div>
          )
      }
    },
  },
  {
    accessorKey: 'automation_name',
    header: 'Automation',
    size: 200,
  },
  {
    accessorKey: 'created_at',
    header: 'Created at',
    size: 50,
    cell: ({ row }) => {
      return format(new Date(row.getValue('created_at')), 'MMM dd, yyyy HH:mm:ss')
    },
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
      getRowLink={(row) => `/admin/runs/${row.id}`}
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
