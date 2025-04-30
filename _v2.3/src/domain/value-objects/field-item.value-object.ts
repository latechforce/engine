export type FieldItem = {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  name: string
  type: 'number' | 'string' | 'boolean'
  value: string
}
