import type {
  IGoCardlessSpi,
  GoCardlessConfig,
  GoCardlessCreatePayment,
  GoCardlessPayment,
} from '/domain/integrations/GoCardless'

export interface IGoCardlessIntegration {
  getConfig: () => GoCardlessConfig
  createPayment: (payment: GoCardlessCreatePayment) => Promise<GoCardlessPayment>
}

export class GoCardlessSpi implements IGoCardlessSpi {
  constructor(private _integration: IGoCardlessIntegration) {}

  getConfig = () => {
    return this._integration.getConfig()
  }

  createPayment = async (payment: GoCardlessCreatePayment) => {
    return this._integration.createPayment(payment)
  }
}
