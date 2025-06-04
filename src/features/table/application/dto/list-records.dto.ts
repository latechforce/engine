import type { Fields } from '../../domain/object-value/fields.object-value'
import type { Record } from '../../domain/entity/record.entity'
import { filterNullFields } from './get-record.dto'

export type ListRecordsDto = {
  records: {
    id: string
    createdAt: string
    updatedAt: string
    fields: Fields
  }[]
}

export const toListRecordsDto = (records: Record[]): ListRecordsDto => {
  return {
    records: records.map((record) => ({
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
      fields: filterNullFields(record.fields),
    })),
  }
}
