import { createRoute } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { DataTable } from '../../../../../shared/interface/component/data-table.component'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '../../../../../shared/interface/lib/client.lib'
import type { ListFormsDto } from '../../../application/dto/list-forms.dto'
import type { FormDto } from '../../../application/dto/form.dto'
import { Suspense } from 'react'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import { adminRoute } from '../../../../app/interface/page/router'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'

export const columns: ColumnDef<FormDto>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    size: 424,
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      if (row.original.action.startsWith('/api/tables/')) {
        const tableId = row.original.action.replace('/api/tables/', '')
        return <div>Create a record in table "{tableId}"</div>
      } else if (row.original.action.startsWith('/api/automations/')) {
        const path = row.original.action.replace('/api/automations/', '')
        return <div>Trigger automation "{path}"</div>
      } else {
        return <div>POST to {row.original.action}</div>
      }
    },
    minSize: 424,
  },
]

export const FormsDataTable = () => {
  const { data } = useSuspenseQuery(formsQueryOptions())
  return (
    <DataTable
      columns={columns}
      data={data.forms}
      onRowClick={(row) => {
        window.open(`/forms/${row.path}`, '_blank')
      }}
    />
  )
}

const FormsPage = () => {
  return (
    <Layout breadcrumbs={[{ title: 'Forms', url: '/admin/forms' }]}>
      <div className="container mx-auto max-w-4xl p-6">
        <TypographyH3 className="mb-4">Forms</TypographyH3>
        <Suspense fallback={<TableSkeleton />}>
          <FormsDataTable />
        </Suspense>
      </div>
    </Layout>
  )
}

const formsQueryOptions = () =>
  queryOptions<ListFormsDto>({
    queryKey: ['formsData'],
    queryFn: () => client.forms.$get().then((res) => res.json()),
  })

export const formsAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/forms',
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(formsQueryOptions())
  },
  component: FormsPage,
  head: () => ({
    meta: [
      {
        title: 'Forms - Admin',
      },
      {
        name: 'description',
        content: `Forms page for admin`,
      },
    ],
  }),
})
