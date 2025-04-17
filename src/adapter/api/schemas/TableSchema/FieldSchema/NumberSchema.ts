import type { NumberFieldConfig } from '/domain/entities/Field/Number'

/**
 * Number field interface
 * @title Number
 * @description Represents a field that stores a numeric value.
 */
export type NumberFieldTableSchema = {
  name: NumberFieldConfig['name']
  type: NumberFieldConfig['type']
  /**
   * @default '`false`'
   */
  required?: NumberFieldConfig['required']
}
