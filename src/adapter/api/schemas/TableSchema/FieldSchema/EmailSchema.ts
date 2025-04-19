import type { EmailFieldConfig } from '/domain/entities/Field/Email'

/**
 * Email field interface
 * @title Email
 * @description Represents a field that stores an email address.
 */
export type EmailFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: EmailFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: EmailFieldConfig['type']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: EmailFieldConfig['required']
}
