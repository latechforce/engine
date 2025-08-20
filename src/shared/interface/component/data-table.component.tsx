import { useState } from 'react'
import type {
  ColumnDef,
  ColumnResizeMode,
  Updater,
  ColumnPinningState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
  type Row,
} from '@tanstack/react-table'
import { cn } from '../lib/utils.lib'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table.ui'
import { Button } from '../ui/button.ui'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.ui'
import { DebouncedInput } from './debounce-input.component'
import { Input } from '../ui/input.ui'
import { DataTablePagination } from './data-table-pagination.component'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.ui'

type Action<TData> = {
  label: string
  icon: React.ReactNode
  onClick: (rows: Row<TData>[]) => void
  variant?: 'outline' | 'default' | 'destructive'
  activeOnSelectedRows?: boolean
  disabled?: boolean
}

type DropdownActions<TData> = {
  label: string
  icon: React.ReactNode
  actions: Action<TData>[]
  variant?: 'outline' | 'default' | 'destructive'
  activeOnSelectedRows?: boolean
}

type Actions<TData> = (Action<TData> | DropdownActions<TData>)[]

export type DataTableSearchProps = {
  value: string
  onChange: (value: string) => void
}

export type DataTablePaginationProps = {
  pageIndex: number
  pageSize: number
  pageCount: number
  rowCount: number
  onPaginationChange: (updaterOrValue: Updater<PaginationState> | PaginationState) => void
}

export type DataTableFilterProps = {
  type: 'select'
  value: string
  defaultValue: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filters?: DataTableFilterProps[]
  actions?: Actions<TData>
  onRowClick?: (row: TData) => void
  verticalSeparator?: boolean
  fullPage?: boolean
  search?: DataTableSearchProps
  pagination?: DataTablePaginationProps
  columnPinning?: ColumnPinningState
}

const globalFilterFn = <TData,>(row: Row<TData>, _: string, filterValue: string) => {
  const search = filterValue.toLowerCase()
  const rowData = row.original as Record<string, unknown>
  return Object.values(rowData).some((value) => {
    if (value == null) return false
    const stringValue = String(value).toLowerCase()
    return stringValue.includes(search)
  })
}

export function DataTable<TData, TValue>({
  columns,
  data,
  actions = [],
  onRowClick,
  verticalSeparator = false,
  fullPage = false,
  search,
  pagination,
  filters,
  columnPinning,
}: DataTableProps<TData, TValue>) {
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange')
  const [rowSelection, setRowSelection] = useState({})
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const hasColumnsWithFill = columns.some((column) => {
    type ColumnMeta = { fill?: boolean }
    return (column as { meta?: ColumnMeta })?.meta?.fill
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: search ? undefined : getFilteredRowModel(),
    getPaginationRowModel: pagination ? undefined : getPaginationRowModel(),
    columnResizeMode,
    enableColumnResizing: true,
    onRowSelectionChange: setRowSelection,
    initialState: {
      columnPinning: columnPinning ?? { left: ['expand-column'], right: ['actions-column'] },
    },
    globalFilterFn: search ? undefined : globalFilterFn,
    state: {
      rowSelection,
      pagination: pagination
        ? {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          }
        : paginationState,
    },
    defaultColumn: {
      size: 200,
      minSize: 20,
      maxSize: 500,
    },
    pageCount: pagination ? pagination.pageCount : undefined,
    rowCount: pagination ? pagination.rowCount : undefined,
    manualPagination: pagination ? true : false,
    onPaginationChange: pagination ? pagination.onPaginationChange : setPaginationState,
  })

  return (
    <div className={cn('flex flex-col', fullPage ? 'h-full' : '')}>
      <div className={cn('flex items-center', fullPage ? 'p-2' : 'pb-4')}>
        {search ? (
          <DebouncedInput
            placeholder="Search..."
            value={search.value}
            onChange={(value) => search.onChange(String(value))}
            className="mr-4 max-w-sm"
          />
        ) : (
          <Input
            placeholder="Search..."
            value={table.getState().globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className="mr-4 max-w-sm"
          />
        )}
        {filters?.map((filter) => {
          switch (filter.type) {
            case 'select':
              return (
                <Select
                  key={filter.value}
                  value={filter.defaultValue}
                  onValueChange={(value) => {
                    filter.onChange(value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a filter" />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            default:
              break
          }
        })}
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
                    action.disabled ||
                    (action.activeOnSelectedRows
                      ? table.getFilteredSelectedRowModel().rows.length === 0
                      : false)
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
      <div
        className={cn(
          'flex-1',
          fullPage ? 'min-h-0 overflow-hidden border-y' : 'rounded-md border'
        )}
      >
        <div className={cn('h-full', fullPage ? 'overflow-auto' : '')}>
          <Table
            className={cn(fullPage ? 'border-b' : '')}
            fullHeight={fullPage}
            scrollable={fullPage}
            layout={hasColumnsWithFill ? 'auto' : 'fixed'}
          >
            <TableHeader className={cn(fullPage ? 'bg-muted' : '')}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // If a column sets meta.fitContent, avoid forcing width so the browser can
                    // size the column to its content, and apply a tiny base width to bias layout.
                    type ColumnMeta = { fitContent?: boolean; fill?: boolean }
                    const fitContent = (header.column.columnDef as { meta?: ColumnMeta })?.meta
                      ?.fitContent
                    const fill = (header.column.columnDef as { meta?: ColumnMeta })?.meta?.fill
                    const minSize = (header.column.columnDef as { minSize?: number })?.minSize
                    return (
                      <TableHead
                        key={header.id}
                        style={
                          fitContent
                            ? { width: 'max-content', minWidth: minSize }
                            : fill
                              ? { minWidth: minSize }
                              : { width: header.getSize(), minWidth: minSize }
                        }
                        className={cn(
                          verticalSeparator ? 'border-border border-r' : '',
                          fill ? 'w-full' : ''
                        )}
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
                    className={
                      onRowClick ? 'hover:bg-muted/50 cursor-pointer' : 'hover:bg-muted/50'
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      type ColumnMeta = { fitContent?: boolean; fill?: boolean }
                      const fitContent = (cell.column.columnDef as { meta?: ColumnMeta })?.meta
                        ?.fitContent
                      const fill = (cell.column.columnDef as { meta?: ColumnMeta })?.meta?.fill
                      const minSize = (cell.column.columnDef as { minSize?: number })?.minSize
                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            width: fitContent ? '1%' : fill ? undefined : cell.column.getSize(),
                            minWidth: minSize,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          className={cn(
                            verticalSeparator ? 'border-border border-r' : '',
                            fill ? 'w-full' : ''
                          )}
                          onClick={() =>
                            cell.column.id !== 'select' ? onRowClick?.(row.original) : undefined
                          }
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
                    className="h-24 border-r text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination
        table={table}
        fullPage={fullPage}
        canSelectRows={actions.length > 0}
      />
    </div>
  )
}
