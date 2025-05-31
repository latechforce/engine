import type { JSONSchema7 } from 'json-schema'
import type { Fields } from '../object-value/fields.object-value'
import type { Record } from '../entity/record.entity'
import type { FieldValue } from '../object-value/field-value.object-value'
import type { Table } from '../entity/table.entity'

export type RecordTransaction = {
  create(tableId: number, record: Record): Promise<void>
  field: {
    create(fieldId: number, record: Record, value: FieldValue): Promise<void>
  }
}

export type IRecordRepository = {
  validateFields(schema: JSONSchema7, body: unknown): body is Fields
  transaction(callback: (tx: RecordTransaction) => Promise<void>): Promise<void>
  read(table: Table, recordId: string): Promise<Record | undefined>
}
