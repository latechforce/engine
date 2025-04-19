import type { MultipleSelectFieldConfig } from '/domain/entities/Field/MultipleSelect'

/**
 * Multiple select field interface
 * @title Multiple select
 * @description Represents a field that allows selecting multiple options from a predefined list.
 */
export type MultipleSelectFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: MultipleSelectFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: MultipleSelectFieldConfig['type']
  /**
   * Field options
   * @title Options
   * @description The options of the field.
   */
  options: MultipleSelectFieldConfig['options']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: MultipleSelectFieldConfig['required']
}
