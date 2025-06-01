import type { FieldValue } from './field-value.object-value'

export type ViewRow = {
  _id: string
  _created_at: string
  _updated_at: string
  _archived_at: string | null
  [key: string]: FieldValue
}
