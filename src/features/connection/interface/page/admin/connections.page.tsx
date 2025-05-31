import { createRoute } from '@tanstack/react-router'
import Layout from '@/app/interface/page/admin/layout'
import { DataTable } from '@/shared/interface/component/data-table.component'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '@/shared/interface/lib/client.lib'
import type { ConnectionDto } from '@/connection/application/dto/connection.dto'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/interface/ui/dropdown-menu.ui'
import { Button } from '@/shared/interface/ui/button.ui'
import { Link, MoreHorizontal, Unlink } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { TableSkeleton } from '@/shared/interface/ui/table.ui'
import type { ListConnectionsDto } from '@/connection/application/dto/list-connections.dto'
import { adminRoute } from '@/app/interface/page/router'

const columns: ColumnDef<ConnectionDto>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'service',
    header: 'Service',
  },
  {
    accessorKey: 'authType',
    header: 'Auth Type',
    cell: ({ row }) => {
      return row.original.authType === 'oauth' ? 'OAuth' : 'API Key'
    },
  },
  {
    accessorKey: 'connected',
    header: 'Connection',
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
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {row.original.authorizationUrl ? (
              <DropdownMenuItem
                onClick={() =>
                  window.open(row.original.authorizationUrl, 'oauthPopup', 'width=500,height=600')
                }
              >
                Connect account
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const ConnectionsDataTable = () => {
  const { data } = useSuspenseQuery(connectionsQueryOptions())
  return (
    <DataTable
      columns={columns}
      data={data.connections}
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
    <Layout breadcrumbs={[{ title: 'Connections', url: '/admin/connections' }]}>
      <div className="p-6">
        <Suspense fallback={<TableSkeleton />}>
          <ConnectionsDataTable />
        </Suspense>
      </div>
    </Layout>
  )
}

const connectionsQueryOptions = () =>
  queryOptions<ListConnectionsDto>({
    queryKey: ['connectionsData'],
    queryFn: () => client.connections.$get().then((res) => res.json()),
  })

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
