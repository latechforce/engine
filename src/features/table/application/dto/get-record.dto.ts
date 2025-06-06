import type { Fields } from '../../domain/object-value/fields.object-value'
import type { Record } from '../../domain/entity/record.entity'
import { toRecordDto, type RecordDto } from './record.dto'
import type { Table } from '../../domain/entity/table.entity'

export type GetRecordDto = {
  record: RecordDto
}

export function filterNullFields(fields: Fields): Fields {
  return Object.fromEntries(Object.entries(fields).filter(([_, value]) => !!value))
}

export const toGetRecordDto = (record: Record, table: Table): GetRecordDto => {
  return {
    record: toRecordDto(record, table),
  }
}
