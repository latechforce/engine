import { createRoute } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { DataTable } from '../../../../../shared/interface/component/data-table.component'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '../../../../../shared/interface/lib/client.lib'
import type { AutomationDto } from '../../../application/dto/automation.dto'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import type { ListAutomationsDto } from '../../../application/dto/list-automations.dto'
import { adminRoute } from '../../../../app/interface/page/router'
import { formatDistance } from 'date-fns'
import { Switch } from '../../../../../shared/interface/ui/switch.ui'

const columns: ColumnDef<AutomationDto>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last modified',
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt)
      const now = new Date()
      return <div>{formatDistance(date, now, { addSuffix: true })}</div>
    },
  },
  {
    accessorKey: 'active',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Switch checked={row.original.active} />
        </div>
      )
    },
  },
]

const automationsQueryOptions = () =>
  queryOptions<ListAutomationsDto>({
    queryKey: ['automationsData'],
    queryFn: () => client.automations.$get().then((res) => res.json()),
  })

const AutomationsDataTable = () => {
  const { data } = useSuspenseQuery(automationsQueryOptions())
  return (
    <DataTable
      columns={columns}
      data={data.automations}
    />
  )
}

const AutomationsPage = () => {
  return (
    <Layout breadcrumbs={[{ title: 'Automations', url: '/admin/automations' }]}>
      <div className="container mx-auto max-w-4xl p-6">
        <Suspense fallback={<TableSkeleton />}>
          <AutomationsDataTable />
        </Suspense>
      </div>
    </Layout>
  )
}

export const automationsAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/automations',
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(automationsQueryOptions())
  },
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
