import type { IBaseField } from './base'

/**
 * Multiple linked record field interface
 * @title Multiple linked record field
 * @description Represents a field that can link to multiple records from another table
 * @example
 * {
 *   type: 'MultipleLinkedRecord',
 *   name: 'assignedTasks',
 *   required: false,
 *   table: 'tasks',
 * }
 */
export interface IMultipleLinkedRecordField extends IBaseField {
  type: 'MultipleLinkedRecord'
  table: string
}
