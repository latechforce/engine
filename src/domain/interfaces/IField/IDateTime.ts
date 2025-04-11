import type { IBaseField } from './base'

/**
 * DateTime field interface
 * @title DateTime field
 * @description Represents a date and time field in forms and tables
 * @example
 * {
 *   type: 'DateTime',
 *   name: 'appointmentTime',
 *   required: true,
 * }
 */
export interface IDateTimeField extends IBaseField {
  type: 'DateTime'
}
