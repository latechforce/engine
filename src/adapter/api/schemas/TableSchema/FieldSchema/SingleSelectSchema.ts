import type { SingleSelectFieldConfig } from '/domain/entities/Field/SingleSelect'

/**
 * Single select field interface
 * @title Single select
 * @description Represents a field that allows selecting a single option from a predefined list.
 */
export type SingleSelectFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: SingleSelectFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: SingleSelectFieldConfig['type']
  /**
   * Field options
   * @title Options
   * @description The options of the field.
   */
  options: SingleSelectFieldConfig['options']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: SingleSelectFieldConfig['required']
}
