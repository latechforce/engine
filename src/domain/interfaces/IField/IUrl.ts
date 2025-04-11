import type { IBaseField } from './base'

/**
 * URL field interface
 * @title URL field
 * @description Represents a URL field in forms and tables
 * @example
 * {
 *   type: 'Url',
 *   name: 'website',
 *   required: false,
 * }
 */
export interface IUrlField extends IBaseField {
  type: 'Url'
}
