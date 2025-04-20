export type TableColumn = { label: string; key: string }

export type TableRow = Record<string, string>

export type TableAction = (row: TableRow) => {
  label: string
  aAttributes: Record<string, string>
}

export type TableProps = {
  columns: TableColumn[]
  rows: TableRow[]
  actions?: TableAction[]
}

export type Table = React.ComponentType<TableProps>
