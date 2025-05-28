import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'
import Layout from './layout'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from '@/client/component/data-table.component'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '@/client/lib/client.lib'
import type { FormDto } from '@/application/dto/forms.dto'
import { Button } from '@/client/ui/button.ui'

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
            href={row.original.path}
            target="_blank"
          >
            <Button>Ouvrir</Button>
          </a>
        </div>
      )
    },
  },
]

export const FormsDataTable = () => {
  const { isPending, error, data } = useQuery<FormDto[]>({
    queryKey: ['formsData'],
    queryFn: () => client.forms.$get().then((res) => res.json()),
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

export const FormsPage = () => {
  return (
    <Layout breadcrumbs={[{ title: 'Forms', url: '/_admin/forms' }]}>
      <div className="container mx-auto max-w-4xl p-6">
        <FormsDataTable />
      </div>
    </Layout>
  )
}

export const formsAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/_admin/forms',
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
