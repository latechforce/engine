import type { IBaseField } from './base'

/**
 * Multiple select field interface
 * @title Multiple select field
 * @description Represents a field that can store multiple selected options from a predefined list
 * @example
 * {
 *   type: 'MultipleSelect',
 *   name: 'interests',
 *   required: false,
 *   options: ['Technology', 'Sports', 'Music', 'Art'],
 * }
 */
export interface IMultipleSelectField extends IBaseField {
  type: 'MultipleSelect'
  options: string[]
}
