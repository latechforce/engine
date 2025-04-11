import type { IBaseField } from './base'

/**
 * Single line text field interface
 * @title Single line text field
 * @description Represents a single-line text field in forms and tables
 * @example
 * {
 *   type: 'SingleLineText',
 *   name: 'firstName',
 *   required: true,
 * }
 */
export interface ISingleLineTextField extends IBaseField {
  type: 'SingleLineText'
}
