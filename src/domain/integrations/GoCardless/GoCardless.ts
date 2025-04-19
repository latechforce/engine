import { Integration, type BaseServices } from '../base'
import type { GoCardlessCodeRunner } from './GoCardlessCodeRunner'
import type { GoCardlessConfig } from './GoCardlessConfig'
import type {
  GoCardlessPayment,
  GoCardlessCreatePayment,
  GoCardlessPaymentList,
  GoCardlessListPayment,
} from './GoCardlessTypes'
import type { IGoCardlessSpi } from './IGoCardlessSpi'

export class GoCardless extends Integration<GoCardlessConfig, IGoCardlessSpi> {
  constructor(spis: IGoCardlessSpi[], services: BaseServices) {
    super('gocardless', spis, services)
  }

  get codeRunnerIntegration(): GoCardlessCodeRunner {
    return {
      createPayment: this.createPayment,
      listPayments: this.listPayments,
    }
  }

  createPayment = async (
    account: string,
    payment: GoCardlessCreatePayment
  ): Promise<GoCardlessPayment> => {
    const response = await this._spi(account).createPayment(payment)
    if (response.error) return Integration.throwError('createPayment', response.error)
    return response.data
  }

  listPayments = async (
    account: string,
    params?: GoCardlessListPayment
  ): Promise<GoCardlessPaymentList> => {
    const response = await this._spi(account).listPayments(params)
    if (response.error) return Integration.throwError('listPayments', response.error)
    return response.data
  }
}
