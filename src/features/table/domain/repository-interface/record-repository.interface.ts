import type { Record } from '../entity/record.entity'
import type { FieldValue } from '../object-value/field-value.object-value'
import type { Table } from '../entity/table.entity'
import type { RecordBody } from '../object-value/record-body.object-value'

export type RecordTransaction = {
  create(tableId: number, record: Record): Promise<void>
  field: {
    create(fieldId: number, record: Record, value: FieldValue): Promise<void>
  }
}

export type IRecordRepository = {
  validateRecordBody(table: Table, body: unknown): body is RecordBody
  transaction(callback: (tx: RecordTransaction) => Promise<void>): Promise<void>
  read(table: Table, recordId: string): Promise<Record | undefined>
}
