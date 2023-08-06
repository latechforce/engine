import { Record, RecordState } from '@domain/entities/app/Record'
import { RecordDto } from '../dtos/RecordDto'
import { Table } from '@domain/entities/table/Table'

export class RecordMapper {
  static toDto(record: Record): RecordDto {
    const { id, created_time, last_modified_time, deleted_time, fields } = record
    return { ...fields, id, created_time, last_modified_time, deleted_time }
  }

  static toEntity(recordDto: RecordDto, table: Table, state?: RecordState): Record {
    return new Record(recordDto, table, state)
  }

  static toDtos(records: Record[]): RecordDto[] {
    return records.map((record) => this.toDto(record))
  }

  static toEntities(
    recordsDto: RecordDto[],
    table: Table,
    state?: RecordState
  ): Record[] {
    return recordsDto.map((recordDto) => this.toEntity(recordDto, table, state))
  }
}
