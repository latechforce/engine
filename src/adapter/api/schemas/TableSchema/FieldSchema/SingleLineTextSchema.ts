import type { SingleLineTextFieldConfig } from '/domain/entities/Field/SingleLineText'

/**
 * Single line text field interface
 * @title Single line text
 * @description Represents a field that stores a single line of text.
 */
export type SingleLineTextFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: SingleLineTextFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: SingleLineTextFieldConfig['type']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: SingleLineTextFieldConfig['required']
}
