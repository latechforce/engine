import type { DropdownProps } from '../Overlays/Dropdown'

export type TableColumn = {
  label: string
  key: string
  formatter?: (value: unknown) => React.ReactNode | string
}

export type TableRow = Record<string, string | number | Date | React.ReactNode>

export type TableProps = {
  id: string
  columns: TableColumn[]
  rows: TableRow[]
  dropdown?: (row: TableRow) => DropdownProps
  total: number
  page?: number
  perPage?: number
  query?: string
  searchRoute: string
}

export type Table = React.ComponentType<TableProps>
