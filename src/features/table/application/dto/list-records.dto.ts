import type { Record } from '../../domain/entity/record.entity'
import { toRecordDto, type RecordDto } from './record.dto'
import type { Table } from '../../domain/entity/table.entity'

export type ListRecordsDto = {
  records: RecordDto[]
}

export const toListRecordsDto = (records: Record[], table: Table): ListRecordsDto => {
  return {
    records: records.map((record) => toRecordDto(record, table)),
  }
}
