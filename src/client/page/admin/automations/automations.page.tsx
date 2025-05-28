import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../../layout'
import Layout from '../layout'
import { DataTable } from '@/client/component/data-table.component'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '@/client/lib/client.lib'
import type { AutomationDto } from '@/application/dto/automation.dto'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { TableSkeleton } from '@/client/ui/table.ui'

const columns: ColumnDef<AutomationDto>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
]

const automationsQueryOptions = () =>
  queryOptions<{ automations: AutomationDto[] }>({
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
  getParentRoute: () => rootRoute,
  path: '/admin/automations',
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
