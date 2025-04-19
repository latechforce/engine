import type { MultipleLinkedRecordFieldConfig } from '/domain/entities/Field/MultipleLinkedRecord'

/**
 * Multiple linked record field interface
 * @title Multiple linked record
 * @description Represents a field that links to multiple records in another table.
 */
export type MultipleLinkedRecordFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: MultipleLinkedRecordFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: MultipleLinkedRecordFieldConfig['type']
  /**
   * Linked table
   * @title Table
   * @description The name of the table to link to.
   */
  table: MultipleLinkedRecordFieldConfig['table']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: MultipleLinkedRecordFieldConfig['required']
}
