import type { RetrieveAttachmentQontoActionConfig } from '/domain/entities/Action/integrations/qonto/RetrieveAttachment'

/**
 * Interface for retrieving an attachment from Qonto
 * @title Retrieve Attachment
 * @description Retrieves an attachment using Qonto integration
 */
export interface RetrieveAttachmentQontoIntegrationActionAutomationSchema {
  /**
   * The name for this action
   * @title Name
   * @description The name for this action
   */
  name: RetrieveAttachmentQontoActionConfig['name']
  /**
   * The integration type for this action
   * @title Integration
   * @description The integration type for this action
   */
  integration: 'Qonto'
  /**
   * The action type for this action
   * @title Action
   * @description The action type for this action
   */
  action: 'RetrieveAttachment'
  /**
   * The attachment identifier for this action
   * @title Attachment
   * @description The attachment identifier for this action
   */
  attachmentId: RetrieveAttachmentQontoActionConfig['attachmentId']
  /**
   * The account identifier for this action
   * @title Account
   * @description The account identifier for this action
   */
  account: RetrieveAttachmentQontoActionConfig['account']
}
