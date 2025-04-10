import type {
  IGoCardlessSpi,
  GoCardlessConfig,
  GoCardlessCreatePayment,
  GoCardlessPayment,
  GoCardlessListPayment,
  GoCardlessPaymentList,
} from '/domain/integrations/GoCardless'
import { BaseSpi, type BaseIntegration } from './base'
import type { IntegrationResponse } from '/domain/integrations/base'

export interface IGoCardlessIntegration extends BaseIntegration<GoCardlessConfig> {
  createPayment: (
    payment: GoCardlessCreatePayment
  ) => Promise<IntegrationResponse<GoCardlessPayment>>
  listPayments: (
    params?: GoCardlessListPayment
  ) => Promise<IntegrationResponse<GoCardlessPaymentList>>
}

export class GoCardlessSpi
  extends BaseSpi<GoCardlessConfig, IGoCardlessIntegration>
  implements IGoCardlessSpi
{
  constructor(integration: IGoCardlessIntegration) {
    super(integration)
  }

  createPayment = async (payment: GoCardlessCreatePayment) => {
    return this._integration.createPayment(payment)
  }

  listPayments = async (params?: GoCardlessListPayment) => {
    return this._integration.listPayments(params)
  }
}
