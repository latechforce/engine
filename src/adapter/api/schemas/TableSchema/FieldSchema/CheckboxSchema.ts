import type { CheckboxFieldConfig } from '/domain/entities/Field/Checkbox'

/**
 * Checkbox field interface
 * @title Checkbox
 * @description Represents a boolean checkbox field in forms and tables.
 */
export type CheckboxFieldTableSchema = {
  name: CheckboxFieldConfig['name']
  type: CheckboxFieldConfig['type']
  /**
   * @default '`false`'
   */
  required?: CheckboxFieldConfig['required']
}
