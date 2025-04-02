export type RecordFieldValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | RecordFieldAttachment[]
  | null
  | undefined

export type RecordFieldAttachment = {
  id: string
  url: string
  name: string
  mime_type: string
  created_at: string
}

export type RecordFields = {
  [key: string]: RecordFieldValue
} & {
  id?: never
  created_at?: never
  updated_at?: never
}

export interface RecordFieldsConfig {
  [key: string]: string | number | boolean | null | string[] | RecordFieldAttachment[]
}

export type UpdateRecordFields<T extends RecordFields = RecordFields> = {
  id: string
  fields: Partial<T>
}

export type RecordFieldsToCreate<T extends RecordFields = RecordFields> = {
  id: string
  created_at: Date
  fields: T
}

export type RecordFieldsToUpdate<T extends RecordFields = RecordFields> = {
  id: string
  updated_at: Date
  fields: Partial<T>
}

export type PersistedRecordFields<T extends RecordFields = RecordFields> = {
  id: string
  created_at: Date
  updated_at?: Date
  fields: T
}
