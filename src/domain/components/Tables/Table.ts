import type { DropdownProps } from '../Overlays/Dropdown'

export type TableColumn = { label: string; key: string }

export type TableRow = Record<string, string | React.ReactNode>

export type TableProps = {
  columns: TableColumn[]
  rows: TableRow[]
  dropdown?: (row: TableRow) => DropdownProps
}

export type Table = React.ComponentType<TableProps>
