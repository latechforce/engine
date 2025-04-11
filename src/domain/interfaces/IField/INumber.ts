import type { IBaseField } from './base'

/**
 * Number field interface
 * @title Number field
 * @description Represents a numeric field in forms and tables
 * @example
 * {
 *   type: 'Number',
 *   name: 'age',
 *   required: true,
 * }
 */
export interface INumberField extends IBaseField {
  type: 'Number'
}
