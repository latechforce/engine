import type { MultipleAttachmentFieldConfig } from '/domain/entities/Field/MultipleAttachment'

/**
 * Multiple attachment field interface
 * @title Multiple attachment
 * @description Represents a field that stores multiple attachments.
 */
export type MultipleAttachmentFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: MultipleAttachmentFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: MultipleAttachmentFieldConfig['type']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: MultipleAttachmentFieldConfig['required']
}
