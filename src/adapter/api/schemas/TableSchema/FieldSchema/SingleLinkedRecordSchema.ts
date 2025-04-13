import type { SingleLinkedRecordFieldConfig } from '/domain/entities/Field/SingleLinkedRecord'

/**
 * Single linked record field interface
 * @title Single linked record
 * @description Represents a field that can link to a single record from another table
 * @example
 * {
 *   type: 'SingleLinkedRecord',
 *   name: 'manager',
 *   required: true,
 *   table: 'users'
 * }
 */
export type SingleLinkedRecordFieldTableSchema = SingleLinkedRecordFieldConfig
