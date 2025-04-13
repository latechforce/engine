import type { DateTimeFieldConfig } from '/domain/entities/Field/DateTime'

/**
 * DateTime field interface
 * @title DateTime
 * @description Represents a date and time field in forms and tables
 * @example
 * {
 *   type: 'DateTime',
 *   name: 'appointmentTime',
 *   required: true,
 * }
 */
export type DateTimeFieldTableSchema = DateTimeFieldConfig
