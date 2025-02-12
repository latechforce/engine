import type {
  PersistedRecordFields,
  RecordFields,
  RecordFieldsToCreate,
  RecordFieldsToUpdate,
} from '/domain/entities/Record'

export type PersistedRecordFieldsDto<T extends RecordFields> = Omit<
  PersistedRecordFields<T>,
  'created_at' | 'updated_at'
> & {
  created_at: string
  updated_at?: string
}
export type RecordFieldsToCreateDto<T extends RecordFields> = Omit<
  RecordFieldsToCreate<T>,
  'created_at'
> & {
  created_at: string
}
export type RecordFieldsToUpdateDto<T extends RecordFields> = Omit<
  RecordFieldsToUpdate<T>,
  'updated_at'
> & {
  updated_at: string
}
