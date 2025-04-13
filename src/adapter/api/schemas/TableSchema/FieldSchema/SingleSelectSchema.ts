import type { SingleSelectFieldConfig } from '/domain/entities/Field/SingleSelect'

/**
 * Single select field interface
 * @title Single select
 * @description Represents a field that allows selecting one option from a predefined list
 * @example
 * {
 *   type: 'SingleSelect',
 *   name: 'status',
 *   required: true,
 *   options: ['Active', 'Inactive', 'Pending']
 * }
 */
export type SingleSelectFieldTableSchema = SingleSelectFieldConfig
