import type { Fields } from '../../domain/object-value/fields.object-value'
import type { Record } from '../../domain/entity/record.entity'
import { toRecordDto, type RecordDto } from './record.dto'
import type { Table } from '../../domain/entity/table.entity'

export type GetRecordDto = {
  record: RecordDto & { primaryFieldValue: string }
}

export function filterNullFields(fields: Fields): Fields {
  return Object.fromEntries(Object.entries(fields).filter(([_, value]) => !!value))
}

export const toGetRecordDto = (record: Record, table: Table): GetRecordDto => {
  const primaryField = table.fields[0]
  if (!primaryField) {
    throw new Error('Table must have a primary field')
  }
  return {
    record: {
      ...toRecordDto(record),
      primaryFieldValue: record.fields[primaryField.schema.name]
        ? String(record.fields[primaryField.schema.name])
        : 'Record without name',
    },
  }
}
