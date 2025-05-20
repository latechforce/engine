import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'
import Layout from './layout'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from '@/client/component/data-table.component'
import type { AutomationSchema } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '@/client/lib/client.lib'

export const columns: ColumnDef<AutomationSchema>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
]

export const AutomationsDataTable = () => {
  const { isPending, error, data } = useQuery<AutomationSchema[]>({
    queryKey: ['automationsData'],
    queryFn: () => client.automations.$get().then((res) => res.json()),
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

export const AutomationsPage = () => {
  return (
    <Layout breadcrumbs={[{ title: 'Automations', url: '/_admin/automations' }]}>
      <div className="p-6">
        <AutomationsDataTable />
      </div>
    </Layout>
  )
}

export const automationsAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/_admin/automations',
  component: AutomationsPage,
  head: () => ({
    meta: [
      {
        title: 'Automations - Admin',
      },
      {
        name: 'description',
        content: `Automations page for admin`,
      },
    ],
  }),
})
