import type { TableSchema } from '@/types'
import { Column } from './column.entity'

export class Table {
  public readonly fields: Column[]

  constructor(public readonly schema: TableSchema) {
    this.fields = schema.fields.map((field) => new Column(field))
  }
}
