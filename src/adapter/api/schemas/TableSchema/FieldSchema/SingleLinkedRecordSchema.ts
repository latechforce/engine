import type { SingleLinkedRecordFieldConfig } from '/domain/entities/Field/SingleLinkedRecord'

/**
 * Single linked record field interface
 * @title Single linked record
 * @description Represents a field that links to a single record in another table.
 */
export type SingleLinkedRecordFieldTableSchema = {
  name: SingleLinkedRecordFieldConfig['name']
  type: SingleLinkedRecordFieldConfig['type']
  table: SingleLinkedRecordFieldConfig['table']
  /**
   * @default '`false`'
   */
  required?: SingleLinkedRecordFieldConfig['required']
}
