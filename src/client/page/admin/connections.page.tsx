import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'
import Layout from './layout'
import { DataTable } from '@/client/component/data-table.component'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { client } from '@/client/lib/client.lib'
import type { ConnectionDto } from '@/application/dto/connection.dto'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/client/ui/dropdown-menu.ui'
import { Button } from '@/client/ui/button.ui'
import { Link, MoreHorizontal, Unlink } from 'lucide-react'
import { useEffect } from 'react'

export const columns: ColumnDef<ConnectionDto>[] = [
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

export const ConnectionsDataTable = () => {
  const { isPending, error, data } = useQuery<ConnectionDto[]>({
    queryKey: ['connectionsData'],
    queryFn: () => client.connections.$get().then((res) => res.json()),
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

export const ConnectionsPage = () => {
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
    <Layout breadcrumbs={[{ title: 'Connections', url: '/_admin/connections' }]}>
      <div className="p-6">
        <ConnectionsDataTable />
      </div>
    </Layout>
  )
}

export const connectionsAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/_admin/connections',
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
