import { createRoute, Navigate, useParams } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { client } from '../../../../../shared/interface/lib/client.lib'
import { queryOptions, useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { adminRoute } from '../../../../app/interface/page/router'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'
import type { GetRecordDto } from '../../../application/dto/get-record.dto'
import { tablesQueryOptions } from './tables.page'
import { Form } from '../../../../../shared/interface/component/form.component'
import { FormSkeleton } from '../../../../../shared/interface/ui/form.ui'
import { Suspense } from 'react'
import { toast } from 'sonner'
import { queryClient } from '../../../../../shared/interface/lib/query.lib'

const recordQueryOptions = (tableId: string, recordId: string) =>
  queryOptions<GetRecordDto>({
    queryKey: ['recordData', tableId, recordId],
    queryFn: () =>
      client.tables[`:tableId`][':recordId']
        .$get({ param: { tableId, recordId } })
        .then((res) => res.json()),
  })

const RecordForm = () => {
  const { tableId, recordId } = useParams({ from: '/admin/tables/$tableId/records/$recordId' })
  const { data: dataTables } = useSuspenseQuery(tablesQueryOptions())
  const { data: dataRecord } = useSuspenseQuery(recordQueryOptions(tableId, recordId))
  const table = dataTables?.tables.find((table) => table.id === tableId)

  const mutation = useMutation({
    mutationFn: async (values: Record<string, string | File>) => {
      await client.tables[':tableId'][':recordId'].form.$patch({
        param: { tableId, recordId },
        form: values,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recordData', tableId, recordId] })
      toast.success(`Record updated successfully`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <Form
      inputs={table!.inputs.map((input) => {
        const value = dataRecord.record.fields[input.name]
        if (value === undefined) {
          return input
        }
        if (input.type === 'checkbox') {
          return {
            ...input,
            defaultValue: Boolean(value),
          }
        }
        return {
          ...input,
          defaultValue: String(value),
        }
      })}
      onSubmit={async (values) => {
        await mutation.mutateAsync(values)
      }}
      submitLabel="Update"
    />
  )
}

const RecordPage = () => {
  const { tableId, recordId } = useParams({ from: '/admin/tables/$tableId/records/$recordId' })
  const { data: dataTables, isLoading: isLoadingTables } = useQuery(tablesQueryOptions())
  const { data: dataRecord, isLoading: isLoadingRecord } = useQuery(
    recordQueryOptions(tableId, recordId)
  )
  const table = dataTables?.tables.find((table) => table.id === tableId)
  const record = dataRecord?.record

  if ((!dataTables || !dataRecord) && !isLoadingTables && !isLoadingRecord) {
    return <Navigate to="/admin/tables" />
  }

  return (
    <Layout
      breadcrumbs={[
        { title: 'Tables', url: '/admin/tables' },
        { title: table?.name ?? '', url: '/admin/tables/$tableId' },
        { title: record?.primaryFieldValue ?? '', url: '/admin/tables/$tableId/records/$recordId' },
      ]}
    >
      <div className="container mx-auto max-w-3xl p-6">
        <TypographyH3 className="mb-4">{record?.primaryFieldValue}</TypographyH3>
        <Suspense fallback={<FormSkeleton />}>
          <RecordForm />
        </Suspense>
      </div>
    </Layout>
  )
}

export const updateRecordAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/tables/$tableId/records/$recordId',
  loader: async ({ context: { queryClient }, params: { tableId, recordId } }) =>
    queryClient.ensureQueryData(recordQueryOptions(tableId, recordId)),
  component: RecordPage,
  head: ({ loaderData }) => {
    const { record } = loaderData ?? { record: undefined }
    return {
      meta: [
        {
          title: `Record "${record?.primaryFieldValue}" - Admin`,
        },
        {
          name: 'description',
          content: `Record "${record?.primaryFieldValue}" page for admin`,
        },
      ],
    }
  },
})
