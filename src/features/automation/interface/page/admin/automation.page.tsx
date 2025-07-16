import { createRoute, Link, useParams } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { client } from '../../../../../shared/interface/lib/client.lib'
import { useState } from 'react'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import { adminRoute } from '../../../../app/interface/page/router'
import {
  TypographyH3,
  TypographyP,
  TypographySmall,
} from '../../../../../shared/interface/ui/typography.ui'
import type { GetAutomationDto } from '../../../application/dto/get-automation.dto'
import { RunsDataTable } from '../../../../run/interface/component/runs-data-table.component'
import { setStatusMutation } from '../../mutations/set-status.mutation'
import { Switch } from '../../../../../shared/interface/ui/switch.ui'
import { Button } from '../../../../../shared/interface/ui/button.ui'
import { PencilIcon } from 'lucide-react'
import { runsAdminRoute } from '../../../../run/interface/page/admin/runs.page'
import type { ListRunsParams } from '../../../../run/domain/repository-interface/run-repository.interface'
import type { PaginationState } from '@tanstack/react-table'

const automationQueryOptions = (
  automationId: string,
  params: ListRunsParams = {
    search: '',
    pageIndex: 0,
    pageSize: 10,
  }
) =>
  queryOptions<GetAutomationDto>({
    queryKey: ['automationData', automationId, params],
    queryFn: () =>
      client.automations[':automationId'].runs
        .$get({
          param: { automationId },
          query: {
            search: params.search,
            pageIndex: params.pageIndex.toString(),
            pageSize: params.pageSize.toString(),
          },
        })
        .then((res) => res.json()),
    placeholderData: keepPreviousData,
  })

const AutomationDataTable = () => {
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { automationId } = useParams({ from: '/admin/automations/$automationId' })
  const { data } = useQuery(
    automationQueryOptions(automationId, {
      search: search,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    })
  )
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
    />
  )
}

const AutomationPage = () => {
  const { automationId } = useParams({ from: '/admin/automations/$automationId' })
  const { data } = useQuery(automationQueryOptions(automationId))
  const mutation = setStatusMutation('automationData')
  return (
    <Layout
      breadcrumbs={[
        { title: 'Automation History', url: runsAdminRoute.fullPath },
        { title: data?.automation?.name ?? '...', url: automationAdminRoute.fullPath },
      ]}
    >
      <div className="container mx-auto max-w-4xl p-6">
        <div className="flex items-center justify-between">
          <TypographyH3 className="mb-4">{data?.automation?.name ?? '...'}</TypographyH3>
          <div className="flex items-center gap-2">
            <TypographySmall>
              Automation is <strong>{data?.automation?.active ? 'ON' : 'OFF'}</strong>
            </TypographySmall>
            <Switch
              checked={data?.automation?.active}
              onCheckedChange={() => {
                if (data?.automation) {
                  mutation.mutate(data.automation)
                }
              }}
            />
            {data?.automation?.editUrl && (
              <Link
                to={data.automation.editUrl}
                target="_blank"
              >
                <Button variant="outline">
                  <PencilIcon className="h-4 w-4" />
                  Edit on Github
                </Button>
              </Link>
            )}
          </div>
        </div>
        {data?.automation?.description && (
          <div className="flex items-center justify-between">
            <TypographyP>{data.automation.description}</TypographyP>
          </div>
        )}
        <AutomationDataTable />
      </div>
    </Layout>
  )
}

export const automationAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/automations/$automationId',
  loader: async ({ context: { queryClient }, params: { automationId } }) => {
    return queryClient.ensureQueryData(automationQueryOptions(automationId))
  },
  component: AutomationPage,
  head: ({ loaderData }) => {
    const automation = loaderData?.automation
    return {
      meta: [
        {
          title: automation ? `Automation ${automation.name} - Admin` : 'Automation - Admin',
        },
        {
          name: 'description',
          content: automation
            ? `Automation ${automation.name} page for admin`
            : 'Automation page for admin',
        },
      ],
    }
  },
})
