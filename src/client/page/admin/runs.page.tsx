import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'
import Layout from './layout'
import { DataTable } from '@/client/component/data-table.component'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { client } from '@/client/lib/client.lib'
import type { RunDto } from '@/application/dto/run.dto'

export const columns: ColumnDef<RunDto>[] = [
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

export const RunsDataTable = () => {
  const { isPending, error, data } = useQuery<RunDto[]>({
    queryKey: ['runsData'],
    queryFn: () => client.runs.$get().then((res) => res.json()),
  })

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <DataTable
      columns={columns}
      data={data}
    />
  )
}

export const AutomationHistoryPage = () => {
  return (
    <Layout
      breadcrumbs={[
        { title: 'Automations', url: '/_admin/automations' },
        { title: 'History', url: '/_admin/automation/history' },
      ]}
    >
      <div className="p-6">
        <RunsDataTable />
      </div>
    </Layout>
  )
}

export const runsHistoryAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/_admin/automation/history',
  component: AutomationHistoryPage,
  head: () => ({
    meta: [
      {
        title: 'Automation History - Admin',
      },
      {
        name: 'description',
        content: `Automation history page for admin`,
      },
    ],
  }),
})
