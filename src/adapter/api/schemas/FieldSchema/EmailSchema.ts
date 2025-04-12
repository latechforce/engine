import type { EmailFieldConfig } from '/domain/entities/Field/Email'

/**
 * Email field interface
 * @title Email field
 * @description Represents a field that stores an email address
 * @example
 * {
 *   type: 'Email',
 *   name: 'email',
 *   required: true
 * }
 */
export type EmailFieldSchema = EmailFieldConfig
