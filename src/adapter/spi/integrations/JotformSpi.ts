import { BaseSpi } from './base'
import type { IJotformSpi } from '/domain/integrations/Jotform/IJotformSpi'
import type {
  JotformWebhookResponse,
  JotformWebhookParams,
  DeleteWebhookParams,
} from '/domain/integrations/Jotform/JotformTypes'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'
import type { IntegrationResponse } from '/domain/integrations/base'

export type IJotformIntegration = IJotformSpi

export class JotformSpi extends BaseSpi<JotformConfig, IJotformIntegration> implements IJotformSpi {
  constructor(integration: IJotformIntegration) {
    super(integration)
  }

  listWebhooks = async (formId: string): Promise<IntegrationResponse<JotformWebhookResponse>> => {
    return this._integration.listWebhooks(formId)
  }

  addWebhook = async (
    params: JotformWebhookParams
  ): Promise<IntegrationResponse<JotformWebhookResponse>> => {
    return this._integration.addWebhook(params)
  }

  deleteWebhook = async (params: DeleteWebhookParams) => {
    return this._integration.deleteWebhook(params)
  }
}
