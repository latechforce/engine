import type { LongTextFieldConfig } from '/domain/entities/Field/LongText'

/**
 * Long text field interface
 * @title Long text
 * @description Represents a field that stores multiple lines of text.
 */
export type LongTextFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: LongTextFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: LongTextFieldConfig['type']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: LongTextFieldConfig['required']
}
