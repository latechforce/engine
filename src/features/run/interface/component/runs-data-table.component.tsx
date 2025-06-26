import { useNavigate } from '@tanstack/react-router'
import type { RunDto } from '../../application/dto/run.dto'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DataTable } from '../../../../shared/interface/component/data-table.component'
import { RunStatus } from './status.component'
import type { ListRunsDto } from '../../application/dto/list-runs.dto'

export const columns: ColumnDef<RunDto>[] = [
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
    size: 446,
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

export type SearchProps = {
  value: string
  onChange: (value: string) => void
}

export const RunsDataTable = ({ runs, search }: ListRunsDto & { search?: SearchProps }) => {
  const navigate = useNavigate()
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
    />
  )
}
