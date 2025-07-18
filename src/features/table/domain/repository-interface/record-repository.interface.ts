import type { Record } from '../entity/record.entity'
import type { FieldValue } from '../object-value/field-value.object-value'
import type { Table } from '../entity/table.entity'
import type { RecordFieldRow } from '../object-value/record-field-row.object-value'
import type { SchemaObject } from 'ajv'
import type { Fields } from '../object-value/fields.object-value'
import type { RecordRow } from '../object-value/record-row.object-value'
import type { ConditionsSchema } from '../../../action/domain/schema/condition'

export type RecordTransaction = {
  create(tableId: number, record: Record): Promise<void>
  update(recordId: string): Promise<void>
  delete(recordId: string): Promise<void>
  exists(recordId: string): Promise<boolean>
  field: {
    create(tableId: number, fieldId: number, recordId: string, value: FieldValue): Promise<void>
    listByRecordId(recordId: string): Promise<RecordFieldRow[]>
    update(recordFieldId: string, value: FieldValue): Promise<void>
    delete(recordFieldId: string): Promise<void>
  }
}

export type IRecordRepository = {
  validateSchema(schema: SchemaObject, body: unknown): boolean
  getSchemaErrors(schema: SchemaObject, body: unknown): string[]
  transaction(callback: (tx: RecordTransaction) => Promise<void>): Promise<void>
  exists(table: Table, recordId: string): Promise<boolean>
  create(table: Table, record: Record): Promise<void>
  createMany(table: Table, records: Record[]): Promise<void>
  update(recordId: string, fields: Fields): Promise<void>
  updateMany(records: { id: string; fields: Fields }[]): Promise<void>
  delete(recordId: string): Promise<void>
  deleteMany(recordIds: string[]): Promise<void>
  read<T extends Fields>(table: Table, recordId: string): Promise<Record<T> | undefined>
  list<T extends Fields>(table: Table, filter?: ConditionsSchema): Promise<Record<T>[]>
  listByIds<T extends Fields>(table: Table, recordIds: string[]): Promise<Record<T>[]>
  onRecordCreated(callback: (record: RecordRow) => Promise<void>): void
  onRecordUpdated(callback: (record: RecordRow) => Promise<void>): void
}
