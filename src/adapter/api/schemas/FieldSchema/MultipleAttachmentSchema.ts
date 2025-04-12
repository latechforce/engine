import type { MultipleAttachmentFieldConfig } from '/domain/entities/Field/MultipleAttachment'

/**
 * Multiple attachment field interface
 * @title Multiple attachment field
 * @description Represents a field that can store multiple file attachments
 * @example
 * {
 *   type: 'MultipleAttachment',
 *   name: 'documents',
 *   required: true
 * }
 */
export type MultipleAttachmentFieldSchema = MultipleAttachmentFieldConfig
