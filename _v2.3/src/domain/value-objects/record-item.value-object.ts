import type { FieldItem } from './field-item.value-object'

export type RecordItem = {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  fields: FieldItem['id'][]
}
