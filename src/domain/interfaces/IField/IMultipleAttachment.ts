import type { IBaseField } from './base'

/**
 * Multiple attachment field interface
 * @title Multiple attachment field
 * @description Represents a field that can store multiple file attachments
 * @example
 * {
 *   type: 'MultipleAttachment',
 *   name: 'documents',
 *   required: false,
 * }
 */
export interface IMultipleAttachmentField extends IBaseField {
  type: 'MultipleAttachment'
}
