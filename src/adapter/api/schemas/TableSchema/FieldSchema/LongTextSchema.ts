import type { LongTextFieldConfig } from '/domain/entities/Field/LongText'

/**
 * Long text field interface
 * @title Long text
 * @description Represents a field that stores multiple lines of text.
 */
export type LongTextFieldTableSchema = {
  name: LongTextFieldConfig['name']
  type: LongTextFieldConfig['type']
  /**
   * @default '`false`'
   */
  required?: LongTextFieldConfig['required']
}
