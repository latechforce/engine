import type {
  PersistedRecordFieldsDto,
  RecordFieldsToCreateDto,
  RecordFieldsToUpdateDto,
} from '../dtos/RecordDto'
import {
  Record,
  type RecordFields,
  type RecordFieldsToCreate,
  type RecordFieldsToUpdate,
} from '/domain/entities/Record'

export class RecordMapper {
  static toEntity = <T extends RecordFields>(record: PersistedRecordFieldsDto<T>): Record<T> => {
    const { id, created_at, updated_at, fields } = record
    return new Record<T>(
      id,
      fields,
      new Date(created_at),
      updated_at ? new Date(updated_at) : new Date(created_at)
    )
  }

  static toCreateDto = <T extends RecordFields>(
    record: RecordFieldsToCreate<T>
  ): RecordFieldsToCreateDto<T> => {
    const { id, created_at, fields } = record
    return {
      id,
      created_at: created_at.toISOString(),
      fields,
    }
  }

  static toUpdateDto = <T extends RecordFields>(
    record: RecordFieldsToUpdate<T>
  ): RecordFieldsToUpdateDto<T> => {
    const { id, updated_at, fields } = record
    return {
      id,
      updated_at: updated_at!.toISOString(),
      fields,
    }
  }

  static toManyEntity = <T extends RecordFields>(
    records: PersistedRecordFieldsDto<T>[]
  ): Record<T>[] => {
    return records.map(this.toEntity<T>)
  }

  static toManyCreateDto = <T extends RecordFields>(
    records: RecordFieldsToCreate<T>[]
  ): RecordFieldsToCreateDto<T>[] => {
    return records.map(this.toCreateDto<T>)
  }

  static toManyUpdateDto = <T extends RecordFields>(
    records: RecordFieldsToUpdate<T>[]
  ): RecordFieldsToUpdateDto<T>[] => {
    return records.map(this.toUpdateDto<T>)
  }
}
