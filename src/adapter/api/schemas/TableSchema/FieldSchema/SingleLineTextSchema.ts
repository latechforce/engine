import type { SingleLineTextFieldConfig } from '/domain/entities/Field/SingleLineText'

/**
 * Single line text field interface
 * @title Single line text
 * @description Represents a field that stores a single line of text.
 */
export type SingleLineTextFieldTableSchema = {
  name: SingleLineTextFieldConfig['name']
  type: SingleLineTextFieldConfig['type']
  /**
   * @default '`false`'
   */
  required?: SingleLineTextFieldConfig['required']
}
