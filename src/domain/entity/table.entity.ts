import type { TableSchema } from '@/types'
import { Field } from './field.entity'

export class Table {
  public readonly fields: Field[]

  constructor(public readonly schema: TableSchema) {
    this.fields = schema.fields.map((field) => new Field(field))
  }

  get name() {
    return this.schema.name
  }
}
