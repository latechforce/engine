import { createRoute, Link } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { DataTable } from '../../../../../shared/interface/component/data-table.component'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '../../../../../shared/interface/lib/client.lib'
import type { AutomationDto } from '../../../application/dto/automation.dto'
import { queryOptions, useSuspenseQuery, type UseMutationResult } from '@tanstack/react-query'
import { Suspense } from 'react'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import type { ListAutomationsDto } from '../../../application/dto/list-automations.dto'
import { adminRoute } from '../../../../app/interface/page/router'
import { formatDistance } from 'date-fns'
import { Switch } from '../../../../../shared/interface/ui/switch.ui'
import { Button } from '../../../../../shared/interface/ui/button.ui'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../../../../shared/interface/ui/dropdown-menu.ui'
import { MoreVertical } from 'lucide-react'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'
import { setStatusMutation } from '../../mutations/set-status.mutation'

const columns = (mutation: UseMutationResult<AutomationDto, Error, AutomationDto, unknown>) =>
  [
    {
      accessorKey: 'name',
      header: 'Name',
      size: 446,
    },
    {
      accessorKey: 'updatedAt',
      header: 'Last modified',
      size: 200,
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt)
        const now = new Date()
        return <div>{formatDistance(date, now, { addSuffix: true })}</div>
      },
    },
    {
      accessorKey: 'active',
      header: 'Status',
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Switch
              checked={row.original.active}
              onCheckedChange={() => mutation.mutate(row.original)}
              disabled={mutation.isPending}
            />
          </div>
        )
      },
    },
    {
      id: 'actions',
      size: 100,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                disabled={!row.original.editUrl}
                onClick={() => {
                  window.open(row.original.editUrl, '_blank')
                }}
              >
                Edit this automation
              </DropdownMenuItem>
              <Link
                to={`/admin/automations/$automationId`}
                params={{ automationId: row.original.id.toString() }}
              >
                <DropdownMenuItem>View runs</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ] satisfies ColumnDef<AutomationDto>[]

const automationsQueryOptions = () =>
  queryOptions<ListAutomationsDto>({
    queryKey: ['automationsData'],
    queryFn: () => client.automations.$get().then((res) => res.json()),
  })

const AutomationsDataTable = () => {
  const { data } = useSuspenseQuery(automationsQueryOptions())
  const mutation = setStatusMutation('automationsData')
  return (
    <DataTable
      columns={columns(mutation)}
      data={data.automations}
    />
  )
}

const AutomationsPage = () => {
  return (
    <Layout breadcrumbs={[{ title: 'Automations', url: automationsAdminRoute.fullPath }]}>
      <div className="container mx-auto max-w-4xl p-6">
        <TypographyH3 className="mb-4">Automations</TypographyH3>
        <Suspense fallback={<TableSkeleton />}>
          <AutomationsDataTable />
        </Suspense>
      </div>
    </Layout>
  )
}

export const automationsAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/automations',
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
