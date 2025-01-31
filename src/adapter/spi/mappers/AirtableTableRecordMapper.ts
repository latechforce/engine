import type { AirtableTableRecordDto } from '../dtos/AirtableTableRecordDto'
import {
  AirtableTableRecord,
  type AirtableTableRecordFields,
} from '/domain/integrations/Airtable/AirtableTableRecord'

export class AirtableTableRecordMapper {
  static toEntity<T extends AirtableTableRecordFields>(
    tableRecordDto: AirtableTableRecordDto<T>
  ): AirtableTableRecord<T> {
    return new AirtableTableRecord(
      tableRecordDto.id,
      tableRecordDto.fields,
      tableRecordDto.created_time
    )
  }

  static toManyEntities<T extends AirtableTableRecordFields>(
    tableRecordDtos: AirtableTableRecordDto<T>[]
  ): AirtableTableRecord<T>[] {
    return tableRecordDtos.map(AirtableTableRecordMapper.toEntity<T>)
  }
}
