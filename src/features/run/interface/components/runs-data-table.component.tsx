import { useNavigate } from '@tanstack/react-router'
import type { RunDto } from '../../application/dto/run.dto'
import type { ColumnDef } from '@tanstack/react-table'
import { CheckCircle, Filter, Play, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { DataTable } from '../../../../shared/interface/component/data-table.component'

export const columns: ColumnDef<RunDto>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    size: 200,
    cell: ({ row }) => {
      switch (row.original.status) {
        case 'success':
          return (
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle /> Success
            </div>
          )
        case 'stopped':
          return (
            <div className="flex items-center gap-2 text-red-700">
              <XCircle /> Stopped
            </div>
          )
        case 'filtered':
          return (
            <div className="flex items-center gap-2 text-gray-500">
              <Filter /> Filtered
            </div>
          )
        case 'playing':
          return (
            <div className="flex items-center gap-2 text-blue-700">
              <Play /> Playing
            </div>
          )
      }
    },
  },
  {
    accessorKey: 'automation_name',
    header: 'Automation',
    size: 446,
  },
  {
    accessorKey: 'created_at',
    header: 'Created at',
    size: 200,
    cell: ({ row }) => {
      return format(new Date(row.getValue('created_at')), 'MMM dd, yyyy HH:mm:ss')
    },
  },
]

type RunsDataTableProps = {
  runs: RunDto[]
}

export const RunsDataTable = ({ runs }: RunsDataTableProps) => {
  const navigate = useNavigate()
  return (
    <DataTable
      columns={columns}
      data={runs}
      onRowClick={(row) => {
        navigate({
          to: `/admin/automations/$automationId/runs/$runId`,
          params: { automationId: row.automation_id, runId: row.id },
        })
      }}
    />
  )
}
