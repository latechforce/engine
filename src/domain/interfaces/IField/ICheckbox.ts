import type { IBaseField } from './base'

/**
 * Checkbox field interface
 * @title Checkbox field
 * @description Represents a boolean checkbox field in forms and tables
 * @example
 * {
 *   type: 'Checkbox',
 *   name: 'termsAccepted',
 *   required: true,
 * }
 */
export interface ICheckboxField extends IBaseField {
  type: 'Checkbox'
}
