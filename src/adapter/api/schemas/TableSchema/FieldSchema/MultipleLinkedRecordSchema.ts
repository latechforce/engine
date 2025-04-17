import type { MultipleLinkedRecordFieldConfig } from '/domain/entities/Field/MultipleLinkedRecord'

/**
 * Multiple linked record field interface
 * @title Multiple linked record
 * @description Represents a field that links to multiple records in another table.
 */
export type MultipleLinkedRecordFieldTableSchema = {
  name: MultipleLinkedRecordFieldConfig['name']
  type: MultipleLinkedRecordFieldConfig['type']
  table: MultipleLinkedRecordFieldConfig['table']
  /**
   * @default '`false`'
   */
  required?: MultipleLinkedRecordFieldConfig['required']
}
