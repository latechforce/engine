import type { Fields } from '@/table/domain/object-value/fields.object-value'
import type { Record } from '@/table/domain/entity/record.entity'

export type GetRecordDto = {
  record: {
    id: string
    createdAt: string
    updatedAt: string
    fields: Fields
  }
}

export function filterNullFields(fields: Fields): Fields {
  return Object.fromEntries(Object.entries(fields).filter(([_, value]) => !!value))
}

export const toGetRecordDto = (record: Record): GetRecordDto => {
  return {
    record: {
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
      fields: filterNullFields(record.fields),
    },
  }
}
