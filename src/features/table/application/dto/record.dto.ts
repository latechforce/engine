import type { Fields } from '@/table/domain/object-value/fields.object-value'
import type { Record } from '@/table/domain/entity/record.entity'

export type SingleRecordDto = {
  record: {
    id: string
    createdAt: string
    updatedAt: string
    fields: Fields
  }
}

export type MultipleRecordDto = {
  records: {
    id: string
    createdAt: string
    updatedAt: string
    fields: Fields
  }[]
}

export type RecordDto = SingleRecordDto | MultipleRecordDto

export const toSingleRecordDto = (record: Record): SingleRecordDto => {
  return {
    record: {
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
      fields: record.fields,
    },
  }
}

export const toMultipleRecordDto = (records: Record[]): MultipleRecordDto => {
  return {
    records: records.map((record) => ({
      id: record.id,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
      fields: record.fields,
    })),
  }
}
