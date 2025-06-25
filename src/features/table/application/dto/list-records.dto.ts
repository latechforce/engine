import type { Record } from '../../domain/entity/record.entity'
import { toRecordDto, type RecordDto } from './record.dto'

export type ListRecordsDto = {
  records: RecordDto[]
}

export const toListRecordsDto = (records: Record[]): ListRecordsDto => {
  return {
    records: records.map((record) => toRecordDto(record)),
  }
}
