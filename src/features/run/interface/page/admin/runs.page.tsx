import { createRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Layout from '../../../../app/interface/page/admin/layout'
import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { client } from '../../../../../shared/interface/lib/client.lib'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import type { ListRunsDto } from '../../../application/dto/list-runs.dto'
import { adminRoute } from '../../../../app/interface/page/router'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'
import { RunsDataTable } from '../../component/runs-data-table.component'
import type { PaginationState } from '@tanstack/react-table'
import type { ListRunsParams } from '../../../domain/repository-interface/run-repository.interface'

const runsQueryOptions = (
  params: ListRunsParams = {
    search: '',
    pageIndex: 0,
    pageSize: 10,
  }
) =>
  queryOptions<ListRunsDto>({
    queryKey: ['runsData', params],
    queryFn: () =>
      client.runs
        .$get({
          query: {
            search: params.search,
            pageIndex: params.pageIndex.toString(),
            pageSize: params.pageSize.toString(),
          },
        })
        .then((res) => res.json()),
    placeholderData: keepPreviousData,
  })

const AllRunsDataTable = () => {
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const params = {
    search: search,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  }
  const { data } = useQuery(runsQueryOptions(params))
  if (!data) return <TableSkeleton />
  return (
    <RunsDataTable
      runs={data.runs}
      search={{
        value: search,
        onChange: setSearch,
      }}
      pagination={{
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        pageCount: data.pagination.pageCount,
        rowCount: data.pagination.rowCount,
        onPaginationChange: setPagination,
      }}
      queryKey={['runsData', params]}
    />
  )
}

const RunsPage = () => {
  return (
    <Layout breadcrumbs={[{ title: 'Automation History', url: runsAdminRoute.fullPath }]}>
      <div className="container mx-auto max-w-4xl p-6">
        <TypographyH3 className="mb-4">Automation History</TypographyH3>
        <AllRunsDataTable />
      </div>
    </Layout>
  )
}

export const runsAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/automation-history',
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(runsQueryOptions())
  },
  component: RunsPage,
  head: () => ({
    meta: [
      {
        title: 'Automation History - Admin',
      },
      {
        name: 'description',
        content: `Automation history page for admin`,
      },
    ],
  }),
})
