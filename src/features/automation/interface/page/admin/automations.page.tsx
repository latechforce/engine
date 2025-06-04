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

const columns: ColumnDef<AutomationDto>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
      <div className="p-6">
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
