import type { RetrieveAttachmentQontoActionConfig } from '/domain/entities/Action/integrations/qonto/RetrieveAttachment'

/**
 * Interface for retrieving an attachment from Qonto
 * @title Retrieve Attachment
 * @description Retrieves an attachment using Qonto integration
 *
 * @example
 * {
 *   integration: 'Qonto',
 *   action: 'RetrieveAttachment',
 *   attachmentId: 'att_123456789'
 * }
 */
export interface RetrieveAttachmentQontoActionSchema extends RetrieveAttachmentQontoActionConfig {
  integration: 'Qonto'
  action: 'RetrieveAttachment'
}
