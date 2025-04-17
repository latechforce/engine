import type { EmailFieldConfig } from '/domain/entities/Field/Email'

/**
 * Email field interface
 * @title Email
 * @description Represents a field that stores an email address.
 */
export type EmailFieldTableSchema = {
  name: EmailFieldConfig['name']
  type: EmailFieldConfig['type']
  /**
   * @default '`false`'
   */
  required?: EmailFieldConfig['required']
}
