import type { IJotformSpi } from './IJotformSpi'
import { Integration } from '../base'
import type { JotformWebhookResponse, JotformWebhookParams } from './JotformTypes'
import type { JotformConfig } from './JotformConfig'
import type { DeleteWebhookParams, DeleteWebhookResponse } from './JotformTypes'

export class Jotform extends Integration<JotformConfig, IJotformSpi> {
  constructor(spis: IJotformSpi[]) {
    super(spis)
  }

  listWebhooks = async (account: string, formId: string): Promise<JotformWebhookResponse> => {
    const response = await this._spi(account).listWebhooks(formId)
    if (response.error) return Integration.throwError('listWebhooks', response.error)
    return response.data
  }

  addWebhook = async (
    account: string,
    params: JotformWebhookParams
  ): Promise<JotformWebhookResponse> => {
    const response = await this._spi(account).addWebhook(params)
    if (response.error) return Integration.throwError('addWebhook', response.error)
    return response.data
  }

  deleteWebhook = async (
    account: string,
    params: DeleteWebhookParams
  ): Promise<IntegrationResponse<DeleteWebhookResponse>> => {
    const response = await this._spi(account).deleteWebhook(params)
    if (response.error) return Integration.throwError('deleteWebhook', response.error)
    return response.data
  }
}
