import type { MultipleAttachmentFieldConfig } from '/domain/entities/Field/MultipleAttachment'

/**
 * Multiple attachment field interface
 * @title Multiple attachment
 * @description Represents a field that stores multiple attachments.
 */
export type MultipleAttachmentFieldTableSchema = {
  name: MultipleAttachmentFieldConfig['name']
  type: MultipleAttachmentFieldConfig['type']
  /**
   * @default '`false`'
   */
  required?: MultipleAttachmentFieldConfig['required']
}
