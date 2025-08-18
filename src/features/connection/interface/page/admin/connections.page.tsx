import { createRoute } from '@tanstack/react-router'
import Layout from '../../../../app/interface/page/admin/layout'
import { DataTable } from '../../../../../shared/interface/component/data-table.component'
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '../../../../../shared/interface/lib/client.lib'
import type { ConnectionDto } from '../../../application/dto/connection.dto'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../../shared/interface/ui/dropdown-menu.ui'
import { Button } from '../../../../../shared/interface/ui/button.ui'
import { Link, MoreVertical, Unlink } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { TableSkeleton } from '../../../../../shared/interface/ui/table.ui'
import type { ListConnectionsDto } from '../../../application/dto/list-connections.dto'
import { adminRoute } from '../../../../app/interface/page/router'
import { TypographyH3 } from '../../../../../shared/interface/ui/typography.ui'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { queryClient } from '../../../../../shared/interface/lib/query.lib'

const connectionsQueryOptions = () =>
  queryOptions<ListConnectionsDto>({
    queryKey: ['connectionsData'],
    queryFn: () => client.connections.$get().then((res) => res.json()),
  })

const ConnectionsDataTable = () => {
  const { data } = useSuspenseQuery(connectionsQueryOptions())

  const disconnectConnectionMutation = useMutation({
    mutationFn: async (id: number): Promise<ConnectionDto> => {
      const response = await client.connections[`:id`].disconnect.$post({
        param: { id: id.toString() },
      })
      return await response.json()
    },
    onSuccess: (data: ConnectionDto) => {
      queryClient.invalidateQueries({ queryKey: ['connectionsData'] })
      toast.success(`Connection "${data.name}" disconnected`)
    },
  })

  const columns: ColumnDef<ConnectionDto>[] = [
    {
      accessorKey: 'connected',
      header: 'Status',
      cell: ({ row }) => {
        return row.original.connected ? (
          <div className="flex items-center gap-2 text-green-700">
            <Link /> Connected
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-700">
            <Unlink /> Disconnected
          </div>
        )
      },
      meta: { fitContent: true },
      minSize: 140,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      // Fill remaining space
      meta: { fill: true },
      minSize: 200,
    },
    {
      accessorKey: 'service',
      header: 'Service',
      meta: { fitContent: true },
      minSize: 120,
      cell: ({ row }) => {
        const words = row.original.service.split('-')
        return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      },
    },
    {
      accessorKey: 'email_used',
      header: 'Email used',
      meta: { fitContent: true },
      minSize: 160,
      cell: ({ row }) => {
        return <div>{row.original.email_used ?? 'N/A'}</div>
      },
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated at',
      meta: { fitContent: true },
      minSize: 150,
      cell: ({ row }) => {
        return <div>{format(row.original.updatedAt, 'dd/MM/yyyy HH:mm')}</div>
      },
    },
    {
      id: 'actions',
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
              {row.original.authorizationUrl ? (
                <DropdownMenuItem
                  onClick={() =>
                    window.open(row.original.authorizationUrl, 'oauthPopup', 'width=500,height=600')
                  }
                >
                  {row.original.connected ? 'Reconnect account' : 'Connect account'}
                </DropdownMenuItem>
              ) : null}
              {row.original.connected ? (
                <DropdownMenuItem
                  onClick={() => {
                    disconnectConnectionMutation.mutate(row.original.id)
                  }}
                >
                  Disconnect account
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      meta: { fitContent: true },
      minSize: 80,
    },
  ]
  return (
    <DataTable
      columns={columns}
      data={data.connections}
      columnPinning={{ right: ['service', 'email_used', 'updatedAt', 'actions'] }}
    />
  )
}

const ConnectionsPage = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'oauth:success') {
        window.location.reload()
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <Layout
      breadcrumbs={[
        { title: 'Automations', url: '/admin/automations' },
        { title: 'Connections', url: '/admin/connections' },
      ]}
    >
      <div className="container mx-auto p-6">
        <TypographyH3 className="mb-4">Connections</TypographyH3>
        <Suspense fallback={<TableSkeleton />}>
          <ConnectionsDataTable />
        </Suspense>
      </div>
    </Layout>
  )
}

export const connectionsAdminRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/connections',
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(connectionsQueryOptions())
  },
  component: ConnectionsPage,
  head: () => ({
    meta: [
      {
        title: 'Connections - Admin',
      },
      {
        name: 'description',
        content: `Connections page for admin`,
      },
    ],
  }),
})
