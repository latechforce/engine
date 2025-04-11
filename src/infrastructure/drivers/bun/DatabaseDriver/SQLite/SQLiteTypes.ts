import type { RecordFieldValue } from '/domain/entities/Record'

export interface ColumnInfo {
  name: string
  type: string
  required: number
}

export interface Column {
  name: string
  type: 'TEXT' | 'TIMESTAMP' | 'NUMERIC' | 'BOOLEAN' | 'TEXT[]'
  formula?: string
  options?: string[]
  required?: boolean
  table?: string
  tableField?: string
  onMigration?: {
    replace?: string
  }
}

export type Row = {
  id: string
  created_at: number
  updated_at?: number
  [key: string]: RecordFieldValue
}
