import { BaseSpi } from './base'
import type { IJotformSpi } from '/domain/integrations/Jotform/IJotformSpi'
import type {
  JotformWebhookResponse,
  JotformWebhookParams,
} from '/domain/integrations/Jotform/JotformTypes'
import type { JotformConfig } from '/domain/integrations/Jotform/JotformConfig'

export type IJotformIntegration = IJotformSpi

export class JotformSpi extends BaseSpi<IJotformIntegration> implements IJotformSpi {
  constructor(integration: IJotformIntegration) {
    super(integration)
  }

  listWebhooks = async (formId: string): Promise<JotformWebhookResponse> => {
    return this._integration.listWebhooks(formId)
  }

  addWebhook = async (params: JotformWebhookParams): Promise<JotformWebhookResponse> => {
    return this._integration.addWebhook(params)
  }
}
