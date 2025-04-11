import type { IBaseField } from './base'

/**
 * Email field interface
 * @title Email field
 * @description Represents an email address field in forms and tables
 * @example
 * {
 *   type: 'Email',
 *   name: 'contactEmail',
 *   required: true,
 * }
 */
export interface IEmailField extends IBaseField {
  type: 'Email'
}
