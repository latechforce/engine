import type { RetrieveAttachmentQontoActionConfig } from '/domain/entities/Action/integrations/qonto/RetrieveAttachment'

export interface IRetrieveAttachmentQontoAction extends RetrieveAttachmentQontoActionConfig {
  integration: 'Qonto'
  action: 'RetrieveAttachment'
}
