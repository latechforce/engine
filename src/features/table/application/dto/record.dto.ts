import type { Record } from '../../domain/entity/record.entity'
import type { Fields } from '../../domain/object-value/fields.object-value'

export type RecordDto = {
  id: string
  createdAt: string
  updatedAt: string
  archivedAt: string | null
  fields: Fields
}

export function toRecordDto(record: Record): RecordDto {
  return {
    id: record.id,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
    archivedAt: record.archivedAt?.toISOString() ?? null,
    fields: record.fields,
  }
}
