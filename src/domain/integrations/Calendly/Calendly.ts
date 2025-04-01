import type { ICalendlySpi } from './ICalendlySpi'
import { Integration } from '../base'
import type {
  CreateWebhookSubscriptionParams,
  CreateWebhookSubscriptionResponse,
} from './CalendlyTypes'

export class Calendly extends Integration<ICalendlySpi> {
  constructor(spi: ICalendlySpi) {
    super(spi)
  }

  createWebhookSubscription = async (
    params: CreateWebhookSubscriptionParams
  ): Promise<CreateWebhookSubscriptionResponse> => {
    const response = await this._spi.createWebhookSubscription(params)
    if (response.error) return this._throwError('createWebhookSubscription', response.error)
    return response.data
  }
}
