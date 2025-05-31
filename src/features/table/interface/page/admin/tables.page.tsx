import { createRoute, Navigate, useNavigate, useParams } from '@tanstack/react-router'
import Layout from '@/app/interface/page/admin/layout'
import { DataTable } from '@/shared/interface/component/data-table.component'
import { client } from '@/shared/interface/lib/client.lib'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { TableSkeleton } from '@/shared/interface/ui/table.ui'
import { adminRoute } from '@/app/interface/page/router'
import type { ListTablesDto } from '@/table/application/dto/list-table.dto'
import type { ListRecordsDto } from '@/table/application/dto/list-records.dto'
import { Tabs, TabsList, TabsSkeleton, TabsTrigger } from '@/shared/interface/ui/tabs.ui'
import { TypographyP } from '@/shared/interface/ui/typography.ui'

const tableRecordsQueryOptions = (tableId: string) =>
  queryOptions<ListRecordsDto>({
    queryKey: ['tableRecordsData', tableId],
    queryFn: () => client.tables[`:tableId`].$get({ param: { tableId } }).then((res) => res.json()),
  })

const tablesQueryOptions = () =>
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
      columns={table.fields
        .filter((field) => field.name != null)
        .map((field) => ({
          accessorKey: field.name,
          header: field.name,
        }))}
      data={records.map((record) => record.fields)}
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
      className="w-[400px]"
    >
      <TabsList>
        {data.tables.map((table) => (
          <TabsTrigger
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
  return (
    <Layout breadcrumbs={[{ title: 'Tables', url: '/admin/tables' }]}>
      <div className="flex flex-col gap-4 p-6">
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
