import type { IBaseField } from './base'

/**
 * Single select field interface
 * @title Single select field
 * @description Represents a field that can store a single selected option from a predefined list
 * @example
 * {
 *   type: 'SingleSelect',
 *   name: 'status',
 *   required: true,
 *   options: ['Active', 'Inactive', 'Pending'],
 * }
 */
export interface ISingleSelectField extends IBaseField {
  type: 'SingleSelect'
  options: string[]
}
