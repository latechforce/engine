import type { Record } from '../../domain/entity/record.entity'
import type { Fields } from '../../domain/object-value/fields.object-value'
import type { Table } from '../../domain/entity/table.entity'

export type RecordDto = {
  id: string
  createdAt: string
  updatedAt: string
  archivedAt: string | null
  fields: Fields
  primaryFieldValue: string
}

export function filterNullFields(fields: Fields): Fields {
  return Object.fromEntries(Object.entries(fields).filter(([_, value]) => !!value))
}

export function toRecordDto(record: Record, table: Table): RecordDto {
  const primaryField = table.fields[0]
  if (!primaryField) {
    throw new Error('Table must have a primary field')
  }
  return {
    id: record.id,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
    archivedAt: record.archivedAt?.toISOString() ?? null,
    fields: filterNullFields(record.fields),
    primaryFieldValue: record.fields[primaryField.schema.name]
      ? String(record.fields[primaryField.schema.name])
      : 'Record without name',
  }
}
