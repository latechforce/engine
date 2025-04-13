import type { CheckboxFieldConfig } from '/domain/entities/Field/Checkbox'

/**
 * Checkbox field interface
 * @title Checkbox
 * @description Represents a boolean checkbox field in forms and tables
 * @example
 * {
 *   type: 'Checkbox',
 *   name: 'termsAccepted',
 *   required: true,
 * }
 */
export type CheckboxFieldTableSchema = CheckboxFieldConfig
