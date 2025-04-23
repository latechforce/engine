import type { DropdownProps } from '../Overlays/Dropdown'

export type TableColumn = {
  label: string
  key: string
  formatter?: (value: unknown) => React.ReactNode | string
}

export type TableRow = Record<string, string | number | Date | React.ReactNode>

export type TableProps = {
  id?: string
  columns: TableColumn[]
  rows: TableRow[]
  dropdown?: (row: TableRow) => DropdownProps
  count?: number
  page?: number
  perPage?: number
}

export type Table = React.ComponentType<TableProps>
