import type { Table } from '../entity/table.entity'
import type { TableRow } from '../object-value/table-row.object-value'
import type { TableFieldRow } from '../object-value/table-field-row.object-value'
import type { Field } from '../entity/field.entity'
import type { RouteConfig } from '@hono/zod-openapi'

export type TableTransaction = {
  createView(table: Table): Promise<void>
  exists(id: number): Promise<boolean>
  create(table: Table): Promise<void>
  update(table: Table): Promise<void>
  get(id: number): Promise<TableRow | undefined>
  list(): Promise<TableRow[]>
  field: {
    exists(fieldId: number, tableId: number): Promise<boolean>
    get(fieldId: number, tableId: number): Promise<TableFieldRow | undefined>
    create(tableId: number, field: Field): Promise<void>
    update(tableId: number, field: Field): Promise<void>
    listByTableId(tableId: number): Promise<TableFieldRow[]>
  }
}

export type ITableRepository = {
  debug(message: string): void
  transaction(callback: (tx: TableTransaction) => Promise<void>): Promise<void>
  addOpenAPIRoute(routeConfig: RouteConfig): void
}
