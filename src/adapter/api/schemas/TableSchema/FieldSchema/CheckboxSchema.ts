import type { CheckboxFieldConfig } from '/domain/entities/Field/Checkbox'

/**
 * Checkbox field interface
 * @title Checkbox
 * @description Represents a boolean checkbox field in forms and tables.
 */
export type CheckboxFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: CheckboxFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: CheckboxFieldConfig['type']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: CheckboxFieldConfig['required']
}
