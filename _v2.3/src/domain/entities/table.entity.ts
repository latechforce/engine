import type { TableSchema } from '../schemas/table.schema'
import type { TableItem } from '../value-objects/table-item.value-object'

export class Table {
  constructor(public schema: TableSchema) {}

  toItem(): TableItem {
    return {
      id: this.schema.id,
      name: this.schema.name,
    }
  }
}
