import type { NumberFieldConfig } from '/domain/entities/Field/Number'

/**
 * Number field interface
 * @title Number
 * @description Represents a field that stores a numeric value.
 */
export type NumberFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: NumberFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: NumberFieldConfig['type']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: NumberFieldConfig['required']
}
