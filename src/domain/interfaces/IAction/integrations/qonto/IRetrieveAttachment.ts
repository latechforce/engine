import type { RetrieveAttachmentQontoActionConfig } from '/domain/entities/Action/integrations/qonto/RetrieveAttachment'

/**
 * Interface for retrieving an attachment from Qonto
 * @title Retrieve Qonto Attachment Action
 * @description Retrieves a specific attachment from Qonto using its ID
 *
 * @example
 * {
 *   integration: 'Qonto',
 *   action: 'RetrieveAttachment',
 *   attachmentId: '{{trigger.payload.attachmentId}}'
 * }
 *
 * @property {string} integration - Always 'Qonto' for Qonto integration
 * @property {string} action - Always 'RetrieveAttachment' for attachment retrieval
 * @property {string} attachmentId - The ID of the attachment to retrieve
 */
export interface IRetrieveAttachmentQontoAction extends RetrieveAttachmentQontoActionConfig {
  integration: 'Qonto'
  action: 'RetrieveAttachment'
}
