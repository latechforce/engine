import type { IntegrationResponse, BaseSpi } from '../base'
import type { JotformWebhookResponse, JotformWebhookParams } from './JotformTypes'
import type { JotformConfig } from './JotformConfig'

export interface IJotformSpi extends BaseSpi<JotformConfig> {
  listWebhooks: (formId: string) => Promise<IntegrationResponse<JotformWebhookResponse>>
  addWebhook: (params: JotformWebhookParams) => Promise<IntegrationResponse<JotformWebhookResponse>>
  deleteWebhook: (
    params: DeleteWebhookParams
  ) => Promise<IntegrationResponse<DeleteWebhookResponse>>
}
