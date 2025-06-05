// Third-party imports
import * as React from 'react'
import type { ColumnDef, ColumnResizeMode } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useNavigate } from '@tanstack/react-router'

// Shared UI imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table.ui'
import { Input } from '../ui/input.ui'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  getRowLink?: (row: TData) => string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  getRowLink,
}: DataTableProps<TData, TValue>) {
  const [columnResizeMode] = React.useState<ColumnResizeMode>('onChange')
  const navigate = useNavigate()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode,
    enableColumnResizing: true,
    initialState: {
      columnPinning: {
        left: ['expand-column'],
        right: ['actions-column'],
      },
    },
  })

  const handleRowClick = (row: TData) => {
    if (onRowClick) {
      onRowClick(row)
    }
    if (getRowLink) {
      navigate({ to: getRowLink(row) })
    }
  }

  return (
    <div>
      <div className="flex items-center pb-4">
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ''}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                      />
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => handleRowClick(row.original)}
                  className={onRowClick || getRowLink ? 'hover:bg-muted/50 cursor-pointer' : ''}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
