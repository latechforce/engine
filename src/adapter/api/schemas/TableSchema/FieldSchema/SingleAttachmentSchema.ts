import type { SingleAttachmentFieldConfig } from '/domain/entities/Field/SingleAttachment'

/**
 * Single attachment field interface
 * @title Single attachment
 * @description Represents a field that stores a single attachment.
 */
export type SingleAttachmentFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: SingleAttachmentFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: SingleAttachmentFieldConfig['type']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: SingleAttachmentFieldConfig['required']
}
