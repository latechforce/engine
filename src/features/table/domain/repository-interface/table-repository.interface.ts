import type { Table } from '@/table/domain/entity/table.entity'
import type { TableRow } from '../object-value/table-row.object-value'
import type { TableFieldRow } from '../object-value/table-field-row.object-value'
import type { Field } from '../entity/field.entity'

export type TableTransaction = {
  createView(table: Table): Promise<void>
  exists(id: number): Promise<boolean>
  create(table: Table): Promise<void>
  update(table: Table): Promise<void>
  get(id: number): Promise<TableRow | undefined>
  list(): Promise<TableRow[]>
  field: {
    exists(id: number): Promise<boolean>
    create(tableId: number, field: Field): Promise<void>
    update(field: Field): Promise<void>
    listByTableId(tableId: number): Promise<TableFieldRow[]>
  }
}

export type ITableRepository = {
  debug(message: string): void
  transaction(callback: (tx: TableTransaction) => Promise<void>): Promise<void>
}
