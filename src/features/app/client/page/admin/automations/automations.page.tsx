import { createRoute } from '@tanstack/react-router'
import Layout from '../layout'
import { DataTable } from '@/shared/client/component/data-table.component'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '@/shared/client/lib/client.lib'
import type { AutomationDto } from '@/automation/application/dto/automation.dto'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { TableSkeleton } from '@/shared/client/ui/table.ui'
import type { ListAutomationsDto } from '@/automation/application/dto/list-automations.dto'
import { adminRoute } from '../../router'

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

const AutomationsDataPage = () => {
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
          <AutomationsDataPage />
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
