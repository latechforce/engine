import type { FieldSchema } from '../schema/field'

export type TableFieldRow = {
  id: number
  table_id: number
  name: string
  slug: string
  type: FieldSchema['type']
  created_at: Date
  updated_at: Date
}
