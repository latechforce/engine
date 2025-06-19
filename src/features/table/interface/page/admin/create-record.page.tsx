import { createRoute, Navigate, useNavigate, useParams } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { client } from '../../../../../shared/interface/lib/client.lib'
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { adminRoute } from '../../../../app/interface/page/router'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'
import { tablesQueryOptions } from './tables.page'
import { Form } from '../../../../../shared/interface/component/form.component'
import { FormSkeleton } from '../../../../../shared/interface/ui/form.ui'
import { Suspense } from 'react'
import { toast } from 'sonner'
import { queryClient } from '../../../../../shared/interface/lib/query.lib'

const RecordForm = () => {
  const navigate = useNavigate()
  const { tableId } = useParams({ from: '/admin/tables/$tableId/record/new' })
  const {
    data: { tables },
  } = useSuspenseQuery(tablesQueryOptions())
  const table = tables.find((table) => table.id === tableId)
  if (!table) {
    return <Navigate to="/404" />
  }

  const mutation = useMutation({
    mutationFn: async (values: Record<string, string | File>) => {
      const response = await client.tables[`:tableId`].form.$post({
        param: { tableId },
        form: values,
      })
      return await response.json()
    },
    onSuccess: (data) => {
      if ('record' in data) {
        queryClient.invalidateQueries({ queryKey: ['tableRecordsData', tableId] })
        navigate({ to: `/admin/tables/${tableId}/records/${data.record.id}` })
        toast.success(`Record created successfully`)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <Form
      inputs={table.inputs}
      onSubmit={async (values) => {
        await mutation.mutateAsync(values)
      }}
      submitLabel="Create"
    />
  )
}

const RecordPage = () => {
  const { tableId } = useParams({ from: '/admin/tables/$tableId/record/new' })
  const { data: dataTables, isLoading: isLoadingTables } = useQuery(tablesQueryOptions())
  const table = dataTables?.tables.find((table) => table.id === tableId)

  if (!dataTables && !isLoadingTables) {
    return <Navigate to="/admin/tables" />
  }

  return (
    <Layout
      breadcrumbs={[
        { title: 'Tables', url: '/admin/tables' },
        { title: table?.name ?? '', url: '/admin/tables/$tableId' },
        { title: 'New record', url: '/admin/tables/$tableId/record/new' },
      ]}
    >
      <div className="container mx-auto max-w-3xl p-6">
        <TypographyH3 className="mb-4">New record</TypographyH3>
        <Suspense fallback={<FormSkeleton />}>
          <RecordForm />
        </Suspense>
      </div>
    </Layout>
  )
}

export const createRecordAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/tables/$tableId/record/new',
  component: RecordPage,
  head: () => {
    return {
      meta: [
        {
          title: `New record - Admin`,
        },
        {
          name: 'description',
          content: `New record page for admin`,
        },
      ],
    }
  },
})
