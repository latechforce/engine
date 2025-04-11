import type { IBaseField } from './base'

/**
 * Long text field interface
 * @title Long text field
 * @description Represents a multi-line text field in forms and tables
 * @example
 * {
 *   type: 'LongText',
 *   name: 'description',
 *   required: false,
 * }
 */
export interface ILongTextField extends IBaseField {
  type: 'LongText'
}
