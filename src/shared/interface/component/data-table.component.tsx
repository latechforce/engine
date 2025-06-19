// Third-party imports
import * as React from 'react'
import type { ColumnDef, ColumnResizeMode } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type Row,
} from '@tanstack/react-table'
import { cn } from '../lib/utils.lib'

// Shared UI imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table.ui'
import { Input } from '../ui/input.ui'
import { Button } from '../ui/button.ui'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.ui'

type Action<TData> = {
  label: string
  icon: React.ReactNode
  onClick: (rows: Row<TData>[]) => void
  variant?: 'outline' | 'default' | 'destructive'
  activeOnSelectedRows?: boolean
}

type DropdownActions<TData> = {
  label: string
  icon: React.ReactNode
  actions: Action<TData>[]
  variant?: 'outline' | 'default' | 'destructive'
  activeOnSelectedRows?: boolean
}

type Actions<TData> = (Action<TData> | DropdownActions<TData>)[]

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  actions?: Actions<TData>
  onRowClick?: (row: TData) => void
  verticalSeparator?: boolean
  fullPage?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  actions = [],
  onRowClick,
  verticalSeparator = false,
  fullPage = false,
}: DataTableProps<TData, TValue>) {
  const [columnResizeMode] = React.useState<ColumnResizeMode>('onChange')
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode,
    enableColumnResizing: true,
    onRowSelectionChange: setRowSelection,
    initialState: {
      columnPinning: {
        left: ['expand-column'],
        right: ['actions-column'],
      },
    },
    state: {
      rowSelection,
    },
    defaultColumn: {
      size: 200,
      minSize: 20,
      maxSize: 500,
    },
  })

  return (
    <div>
      <div className={cn('flex items-center', fullPage ? 'p-2' : 'pb-4')}>
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter ?? ''}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className="mr-4 max-w-sm"
        />
        <div className="ml-auto flex items-center gap-2">
          {actions.map((action) => {
            if ('actions' in action) {
              return (
                <DropdownMenu key={action.label}>
                  <DropdownMenuTrigger
                    asChild
                    disabled={
                      action.activeOnSelectedRows
                        ? table.getFilteredSelectedRowModel().rows.length === 0
                        : false
                    }
                  >
                    <Button variant={action.variant}>
                      {action.icon}
                      {action.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {action.actions.map((action) => (
                      <DropdownMenuItem
                        onClick={() => action.onClick(table.getFilteredSelectedRowModel().rows)}
                      >
                        {action.icon}
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            } else {
              return (
                <Button
                  key={action.label}
                  variant={action.variant}
                  onClick={() => action.onClick(table.getFilteredSelectedRowModel().rows)}
                  disabled={
                    action.activeOnSelectedRows
                      ? table.getFilteredSelectedRowModel().rows.length === 0
                      : false
                  }
                >
                  {action.icon}
                  {action.label}
                </Button>
              )
            }
          })}
        </div>
      </div>
      <div className={cn(fullPage ? 'border-y' : 'rounded-md border')}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className={verticalSeparator ? 'border-border border-r' : ''}
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
                  className={onRowClick ? 'hover:bg-muted/50 cursor-pointer' : 'hover:bg-muted/50'}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        className={verticalSeparator ? 'border-border border-r' : ''}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
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
