import type { TableItem } from '../value-objects/table-item.value-object'

export type ITableRepository = {
  migrate: () => Promise<void>
  insert: (item: TableItem) => Promise<void>
  update: (item: TableItem) => Promise<void>
  delete: (id: number) => Promise<void>
  findById: (id: number) => Promise<TableItem | undefined>
  findAll: () => Promise<TableItem[]>
}
