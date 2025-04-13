import type { MultipleSelectFieldConfig } from '/domain/entities/Field/MultipleSelect'

/**
 * Multiple select field interface
 * @title Multiple select
 * @description Represents a field that allows selecting multiple options from a predefined list
 * @example
 * {
 *   type: 'MultipleSelect',
 *   name: 'interests',
 *   required: true,
 *   options: ['Sports', 'Music', 'Travel']
 * }
 */
export type MultipleSelectFieldSchema = MultipleSelectFieldConfig
