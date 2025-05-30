import { createRoute } from '@tanstack/react-router'
import Layout from '../layout'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { DataTable } from '@/shared/interface/component/data-table.component'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '@/shared/interface/lib/client.lib'
import type { ListFormsDto } from '@/form/application/dto/list-forms.dto'
import type { FormDto } from '@/form/application/dto/form.dto'
import { Button } from '@/shared/interface/ui/button.ui'
import { Suspense } from 'react'
import { TableSkeleton } from '@/shared/interface/ui/table.ui'
import { adminRoute } from '../../router'

export const columns: ColumnDef<FormDto>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    id: 'actions-column',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <a
            href={`/forms/${row.original.path}`}
            target="_blank"
          >
            <Button>Open</Button>
          </a>
        </div>
      )
    },
  },
]

export const FormsDataTable = () => {
  const { data } = useSuspenseQuery(formsQueryOptions())
  return (
    <DataTable
      columns={columns}
      data={data.forms}
    />
  )
}

const FormsPage = () => {
  return (
    <Layout breadcrumbs={[{ title: 'Forms', url: '/admin/forms' }]}>
      <div className="container mx-auto max-w-4xl p-6">
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
