import type { Table } from '@/table/domain/entity/table.entity'
import type { FieldSchema } from '../schema/field'

export type TableTransaction = {
  exists(id: number): Promise<boolean>
  create(table: Table): Promise<void>
  update(table: Table): Promise<void>
  field: {
    exists(id: number): Promise<boolean>
    create(tableId: number, field: FieldSchema): Promise<void>
    update(field: FieldSchema): Promise<void>
  }
}

export type ITableRepository = {
  debug(message: string): void
  transaction(callback: (tx: TableTransaction) => Promise<void>): Promise<void>
}
