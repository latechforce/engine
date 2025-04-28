export type TableSearchProps = {
  placeholder?: string
  value?: string
  field: string
  label?: string
  searchAttributes?: Record<string, string>
}

export type TableSearch = React.ComponentType<TableSearchProps>
