import type { Record } from '../entity/record.entity'
import type { FieldValue } from '../object-value/field-value.object-value'
import type { Table } from '../entity/table.entity'
import type { RecordFieldRow } from '../object-value/record-field-row.object-value'
import type { SchemaObject } from 'ajv'

export type RecordTransaction = {
  create(tableId: number, record: Record): Promise<void>
  update(recordId: string): Promise<void>
  delete(recordId: string): Promise<void>
  exists(recordId: string): Promise<boolean>
  field: {
    create(fieldId: number, record: Record, value: FieldValue): Promise<void>
    listByRecordId(recordId: string): Promise<RecordFieldRow[]>
    update(recordFieldId: string, value: FieldValue): Promise<void>
    delete(recordFieldId: string): Promise<void>
  }
}

export type IRecordRepository = {
  validateSchema(schema: SchemaObject, body: unknown): boolean
  transaction(callback: (tx: RecordTransaction) => Promise<void>): Promise<void>
  exists(table: Table, recordId: string): Promise<boolean>
  read(table: Table, recordId: string): Promise<Record | undefined>
  list(table: Table): Promise<Record[]>
  listByIds(table: Table, recordIds: string[]): Promise<Record[]>
}
