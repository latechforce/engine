import { createRoute, Navigate, useNavigate, useParams } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { DataTable } from '../../../../../shared/interface/component/data-table.component'
import { client } from '../../../../../shared/interface/lib/client.lib'
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { adminRoute } from '../../../../app/interface/page/router'
import type { ListTablesDto } from '../../../application/dto/list-table.dto'
import type { ListRecordsDto } from '../../../application/dto/list-records.dto'
import {
  Tabs,
  TabsList,
  TabsSkeleton,
  TabsTrigger,
} from '../../../../../shared/interface/ui/tabs.ui'
import { TypographyH3, TypographyP } from '../../../../../shared/interface/ui/typography.ui'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'

const tableRecordsQueryOptions = (tableId: string) =>
  queryOptions<ListRecordsDto>({
    queryKey: ['tableRecordsData', tableId],
    queryFn: () => client.tables[`:tableId`].$get({ param: { tableId } }).then((res) => res.json()),
  })

export const tablesQueryOptions = () =>
  queryOptions<ListTablesDto>({
    queryKey: ['tablesData'],
    queryFn: () => client.tables.$get().then((res) => res.json()),
  })

const RecordsDataTable = () => {
  const { tableId } = useParams({ from: '/admin/tables/$tableId' })
  const {
    data: { tables },
  } = useSuspenseQuery(tablesQueryOptions())
  const {
    data: { records },
  } = useSuspenseQuery(tableRecordsQueryOptions(tableId))
  const table = tables.find((table) => table.id === tableId)
  if (!table) {
    return <Navigate to="/404" />
  }
  return (
    <DataTable
      columns={table.fields.map((field) => ({
        accessorKey: field.name,
        header: field.name,
      }))}
      data={records.map((record) => ({ ...record.fields, _id: record.id }))}
      getRowLink={(row) => `/admin/tables/${tableId}/${row._id}`}
    />
  )
}

const TablesTabs = () => {
  const { data } = useSuspenseQuery(tablesQueryOptions())
  const navigate = useNavigate()
  const { tableId } = useParams({ from: '/admin/tables/$tableId' })
  if (!data.tables.find((table) => table.id === tableId)) {
    return <Navigate to="/404" />
  }
  return (
    <Tabs
      defaultValue={tableId}
      className="overflow-x-auto"
    >
      <TabsList>
        {data.tables.map((table) => (
          <TabsTrigger
            key={table.id}
            value={table.id}
            onClick={() => {
              navigate({ to: '/admin/tables/$tableId', params: { tableId: table.id } })
            }}
          >
            {table.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

const TablesPage = () => {
  const { data } = useQuery(tablesQueryOptions())
  const { tableId } = useParams({ from: '/admin/tables/$tableId' })
  const table = data?.tables.find((table) => table.id === tableId)
  return (
    <Layout
      breadcrumbs={[
        { title: 'Tables', url: '/admin/tables' },
        { title: table?.name ?? '', url: '/admin/tables/$tableId' },
      ]}
    >
      <div className="flex flex-col gap-4 p-6">
        <TypographyH3>Tables</TypographyH3>
        <Suspense fallback={<TabsSkeleton />}>
          <TablesTabs />
        </Suspense>
        <Suspense fallback={<TableSkeleton />}>
          <RecordsDataTable />
        </Suspense>
      </div>
    </Layout>
  )
}

const TablesRedirect = () => {
  const { data } = useSuspenseQuery(tablesQueryOptions())
  const firstTable = data.tables[0]
  if (firstTable) {
    return (
      <Navigate
        to="/admin/tables/$tableId"
        params={{ tableId: firstTable.id }}
      />
    )
  }
  return (
    <Layout breadcrumbs={[{ title: 'Tables', url: '/admin/tables' }]}>
      <div className="flex flex-col gap-4 p-6">
        <TypographyP>No tables found</TypographyP>
      </div>
    </Layout>
  )
}

export const tablesAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/tables/$tableId',
  loader: async ({ context: { queryClient }, params: { tableId } }) => {
    const { tables } = await queryClient.ensureQueryData(tablesQueryOptions())
    const { records } = await queryClient.ensureQueryData(tableRecordsQueryOptions(tableId))
    return {
      tables,
      records,
    }
  },
  component: TablesPage,
  head: ({ loaderData, params: { tableId } }) => {
    const table = loaderData?.tables.find((table) => table.id === tableId)
    return {
      meta: [
        {
          title: `Table "${table?.name}" - Admin`,
        },
        {
          name: 'description',
          content: `Table "${table?.name}" page for admin`,
        },
      ],
    }
  },
})

export const tablesRedirectAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/tables',
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(tablesQueryOptions())
  },
  component: TablesRedirect,
  head: () => ({
    meta: [
      {
        title: 'Tables - Admin',
      },
    ],
  }),
})
