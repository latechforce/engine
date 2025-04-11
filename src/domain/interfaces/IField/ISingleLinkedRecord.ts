import type { IBaseField } from './base'

/**
 * Single linked record field interface
 * @title Single linked record field
 * @description Represents a field that can link to a single record from another table
 * @example
 * {
 *   type: 'SingleLinkedRecord',
 *   name: 'manager',
 *   required: true,
 *   table: 'users',
 * }
 */
export interface ISingleLinkedRecordField extends IBaseField {
  type: 'SingleLinkedRecord'
  table: string
}
