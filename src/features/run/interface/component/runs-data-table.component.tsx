import { useNavigate } from '@tanstack/react-router'
import type { RunDto } from '../../application/dto/run.dto'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DataTable } from '../../../../shared/interface/component/data-table.component'
import { RunStatus } from './status.component'
import type {
  DataTablePaginationProps,
  DataTableSearchProps,
} from '../../../../shared/interface/component/data-table.component'
import { Checkbox } from '../../../../shared/interface/ui/checkbox.ui'
import { RotateCcw } from 'lucide-react'
import { client } from '../../../../shared/interface/lib/client.lib'
import { useMutation, type QueryKey } from '@tanstack/react-query'
import { queryClient } from '../../../../shared/interface/lib/query.lib'
import { toast } from 'sonner'
import type { ReplayedRunsDto } from '../../application/dto/replay-runs-dto'

export const columns: ColumnDef<RunDto>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="cursor-pointer"
      />
    ),
    size: 30,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 200,
    cell: ({ row }) => {
      return <RunStatus status={row.original.status} />
    },
  },
  {
    accessorKey: 'automationName',
    header: 'Automation',
    size: 415,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
    size: 200,
    cell: ({ row }) => {
      return format(new Date(row.getValue('createdAt')), 'MMM dd, yyyy HH:mm:ss')
    },
  },
]

export type RunsDataTableStatusProps = {
  value: string
  onChange: (value: string) => void
}

type RunsDataTableProps = {
  runs: RunDto[]
  search?: DataTableSearchProps
  pagination?: DataTablePaginationProps
  status?: RunsDataTableStatusProps
  queryKey: QueryKey
}

export const RunsDataTable = ({
  runs,
  search,
  pagination,
  queryKey,
  status,
}: RunsDataTableProps) => {
  const navigate = useNavigate()

  const replayRunsMutation = useMutation({
    mutationFn: async (rowsIds: string[]) => {
      const response = await client.runs.replay.$post({
        json: {
          runIds: rowsIds,
        },
      })
      return await response.json()
    },
    onSuccess: (data: ReplayedRunsDto) => {
      queryClient.invalidateQueries({ queryKey })
      toast.success(`${data.replayed.length} runs replayed`)
    },
  })

  return (
    <DataTable
      columns={columns}
      data={runs}
      onRowClick={(row) => {
        navigate({
          to: `/admin/automations/$automationId/runs/$runId`,
          params: { automationId: row.automationId, runId: row.id },
        })
      }}
      search={search}
      pagination={pagination}
      filters={
        status
          ? [
              {
                type: 'select',
                value: 'status',
                defaultValue: status.value,
                options: [
                  { label: 'All statuses', value: 'all' },
                  { label: 'Success', value: 'success' },
                  { label: 'Stopped', value: 'stopped' },
                  { label: 'Filtered', value: 'filtered' },
                ],
                onChange: (value) => {
                  status.onChange(value)
                },
              },
            ]
          : []
      }
      actions={[
        {
          label: 'Replay run(s)',
          icon: <RotateCcw />,
          variant: 'outline',
          activeOnSelectedRows: true,
          disabled: replayRunsMutation.isPending,
          onClick: async (rows) => {
            replayRunsMutation.mutate(rows.map((row) => row.original.id))
          },
        },
      ]}
    />
  )
}
