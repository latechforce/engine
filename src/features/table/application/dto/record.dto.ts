import type { Fields } from '@/table/domain/object-value/fields.object-value'
import type { Record } from '@/table/domain/entity/record.entity'

export type RecordDto = {
  record: {
    id: string
    createdAt: string
    updatedAt: string
    fields: Fields
  }
}

export const toRecordDto = (record: Record): RecordDto => {
  return {
    record: {
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
      fields: record.fields,
    },
  }
}
