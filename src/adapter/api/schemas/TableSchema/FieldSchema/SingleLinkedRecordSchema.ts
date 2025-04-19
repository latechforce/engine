import type { SingleLinkedRecordFieldConfig } from '/domain/entities/Field/SingleLinkedRecord'

/**
 * Single linked record field interface
 * @title Single linked record
 * @description Represents a field that links to a single record in another table.
 */
export type SingleLinkedRecordFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: SingleLinkedRecordFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: SingleLinkedRecordFieldConfig['type']
  /**
   * Linked table
   * @title Table
   * @description The name of the table to link to.
   */
  table: SingleLinkedRecordFieldConfig['table']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: SingleLinkedRecordFieldConfig['required']
}
