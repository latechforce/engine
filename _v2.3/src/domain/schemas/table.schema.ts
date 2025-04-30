import type { FieldSchema } from './field.schema'

export type TableSchema = {
  id: number
  name: string
  fields: FieldSchema[]
}
