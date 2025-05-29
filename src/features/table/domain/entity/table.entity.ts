import type { TableSchema } from '@/table/domain/schema/table.schema'

export class Table {
  constructor(public readonly schema: TableSchema) {}
}
